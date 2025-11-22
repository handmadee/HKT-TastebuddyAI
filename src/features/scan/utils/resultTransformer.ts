/**
 * Result Transformer
 * 
 * Transforms API response to FoodScanResult or MenuScanResult
 */

import { FoodScanResult, MenuScanResult, DishItem } from '../types';
import { AllergenType } from '../../onboarding/types';

interface ApiMenuResponse {
    success: boolean;
    message: string;
    language: string;
    data: {
        extraction: {
            menuSections: Array<{
                sectionName: string;
                items: Array<{
                    name: string;
                    price: number;
                    category: string | null;
                    description: string | null;
                    visualTags: string | null;
                }>;
            }>;
            metadata: {
                totalItems: number;
                extractionQuality: string;
                confidenceScore: number;
                processingTime: number;
            };
            restaurantName: string;
        };
        allergenAnalysis: any;
        dietaryCompliance: any;
        timeline: {
            totalTime: number;
            agents: number;
        };
    };
    meta: {
        statusMessages: {
            success: string;
            extractionMethod: string;
            dishesFound: number;
            dishesFoundMessage: string;
        };
        currency: {
            code: string;
            symbol: string;
            name: string;
            exchangeRateToVND: number;
        };
        locale: string;
    };
}

/**
 * Parse allergen signal to structured format
 */
function parseAllergenSignal(signal: string): any {
    let type: any = 'unknown';
    let source = signal;
    
    if (signal.includes('shellfish')) type = 'shellfish';
    else if (signal.includes('fish')) type = 'fish';
    else if (signal.includes('peanut')) type = 'peanuts';
    else if (signal.includes('soy')) type = 'soy';
    else if (signal.includes('dairy') || signal.includes('milk')) type = 'dairy';
    else if (signal.includes('egg')) type = 'eggs';
    else if (signal.includes('wheat') || signal.includes('gluten')) type = 'wheat';
    else if (signal.includes('tree_nut')) type = 'tree_nuts';
    else if (signal.includes('sesame')) type = 'sesame';
    
    // Extract source from signal
    const sourceMatch = signal.match(/from_(.+)$/);
    if (sourceMatch) {
        source = sourceMatch[1].replace(/_/g, ' ');
    }
    
    // Determine severity based on signal prefix
    let severity: any = 'moderate';
    if (signal.startsWith('likely_')) severity = 'high';
    else if (signal.startsWith('possible_')) severity = 'low';
    
    return {
        type,
        severity,
        confidence: signal.startsWith('likely_') ? 90 : signal.startsWith('possible_') ? 50 : 70,
        source,
    };
}

/**
 * Extract ingredients and allergens from dish details
 */
function extractDishData(item: any) {
    const ingredients = item.dishDetails?.ingredients?.map((ing: any) => ({
        name: ing.name,
        amount: undefined,
        allergens: [],
    })) || [];

    const allergenSignals = item.dishDetails?.allergenSignals || [];
    const allergens = allergenSignals.map(parseAllergenSignal);

    return { ingredients, allergens };
}

/**
 * Transform API response to app format
 */
export function transformApiResponse(
    apiResponse: ApiMenuResponse,
    imageUri: string,
    jobId: string
): FoodScanResult | MenuScanResult {
    // ===== DEBUG: Log toàn bộ response =====
    console.log('╔═══════════════════════════════════════════════════════════════╗');
    console.log('║              API RESPONSE TRANSFORMER                         ║');
    console.log('╚═══════════════════════════════════════════════════════════════╝');
    console.log('📦 Full API Response:', JSON.stringify(apiResponse, null, 2));
    console.log('');
    console.log('🔍 Extraction Data:');
    console.log('  - Restaurant:', apiResponse.data?.extraction?.restaurantName);
    console.log('  - Total Items:', apiResponse.data?.extraction?.metadata?.totalItems);
    console.log('  - Quality:', apiResponse.data?.extraction?.metadata?.extractionQuality);
    console.log('  - Confidence:', apiResponse.data?.extraction?.metadata?.confidenceScore);
    console.log('');
    console.log('📋 Menu Sections:', JSON.stringify(apiResponse.data?.extraction?.menuSections, null, 2));
    console.log('');
    console.log('🔬 Allergen Analysis:', JSON.stringify(apiResponse.data?.allergenAnalysis, null, 2));
    console.log('');
    console.log('🥗 Dietary Compliance:', JSON.stringify(apiResponse.data?.dietaryCompliance, null, 2));
    console.log('');
    console.log('⏱️  Timeline:', JSON.stringify(apiResponse.data?.timeline, null, 2));
    console.log('');
    console.log('💰 Currency:', JSON.stringify(apiResponse.meta?.currency, null, 2));
    console.log('');
    console.log('🌍 Locale:', apiResponse.meta?.locale);
    console.log('═══════════════════════════════════════════════════════════════');
    
    const { data, meta } = apiResponse;
    const { extraction } = data;
    
    // Flatten all items from all sections
    const allItems = extraction.menuSections.flatMap(section => 
        section.items.map(item => ({
            ...item,
            sectionName: section.sectionName,
        }))
    );

    // If single item, return FoodScanResult
    if (allItems.length === 1) {
        const item = allItems[0] as any;
        
        console.log('✅ Transforming to FoodScanResult (Single Item)');
        console.log('  - Name:', item.name);
        console.log('  - Section:', item.sectionName);
        console.log('  - Price:', item.price);
        console.log('  - Description:', item.description);
        console.log('  - Dish Details:', JSON.stringify(item.dishDetails, null, 2));
        
        // Check if dishDetails exist
        const hasDishDetails = Boolean(item.dishDetails);
        console.log(`  - Has Detailed Analysis: ${hasDishDetails ? '✅ YES' : '⚠️  NO'}`);
        
        if (!hasDishDetails) {
            console.warn('⚠️  WARNING: No dishDetails found. Limited analysis available.');
            console.warn('   This may happen for:');
            console.warn('   - Low quality images');
            console.warn('   - Unknown/uncommon dishes');
            console.warn('   - Text-only menus without visual context');
        }
        
        // Extract ingredients and allergens
        const { ingredients, allergens } = extractDishData(item);

        console.log('📋 Extracted Ingredients:', ingredients.length);
        console.log('⚠️  Extracted Allergens:', allergens.length);
        if (allergens.length > 0) {
            allergens.forEach((a: any) => console.log(`   - ${a.type} (${a.severity}): ${a.source}`));
        } else if (!hasDishDetails) {
            console.warn('   ⚠️  No allergen analysis - dishDetails missing');
        }
        
        // Calculate confidence based on data quality
        let confidence = item.dishDetails?.confidenceScore 
            ? Math.round(item.dishDetails.confidenceScore * 100)
            : Math.round(extraction.metadata.confidenceScore * 100);
        
        // If no dishDetails and low quality, cap confidence at 50%
        if (!hasDishDetails && extraction.metadata.extractionQuality === 'low') {
            confidence = Math.min(confidence, 50);
            console.warn(`   ⚠️  Confidence capped at ${confidence}% due to low quality and missing details`);
        }
        
        const result = {
            id: jobId,
            name: item.name,
            confidence,
            imageUri,
            nutrition: {
                calories: 0,
                protein: 0,
                carbs: 0,
                fats: 0,
            },
            ingredients,
            allergens,
            timestamp: new Date().toISOString(),
            description: item.description || item.dishDetails?.canonicalName || undefined,
            cuisine: item.dishDetails?.cuisineRegion || extraction.restaurantName || undefined,
        } as FoodScanResult;
        
        console.log('🎯 Final FoodScanResult:', JSON.stringify(result, null, 2));
        console.log('═══════════════════════════════════════════════════════════════\n');
        
        return result;
    }

    // Otherwise, return MenuScanResult
    console.log(`✅ Transforming to MenuScanResult (${allItems.length} Items)`);
    
    const dishes: DishItem[] = allItems.map((item: any, index) => {
        console.log(`  ${index + 1}. ${item.name} - Section: ${item.sectionName} - Price: ${item.price}`);
        
        // Extract ingredients and allergens
        const { ingredients, allergens } = extractDishData(item);

        // Check if dish is safe (no high severity allergens)
        const hasHighSeverityAllergen = allergens.some((a: any) => a.severity === 'high');
        const isSafe = !hasHighSeverityAllergen;
        
        if (allergens.length > 0) {
            console.log(`     ⚠️  ${allergens.length} allergen(s): ${allergens.map((a: any) => a.type).join(', ')}`);
        }
        
        return {
            id: `${jobId}_dish_${index}`,
            name: item.name,
            nameTranslated: undefined,
            description: item.description || item.dishDetails?.canonicalName || undefined,
            confidence: item.dishDetails?.confidenceScore 
                ? Math.round(item.dishDetails.confidenceScore * 100)
                : Math.round(extraction.metadata.confidenceScore * 100),
            nutrition: {
                calories: 0,
                protein: 0,
                carbs: 0,
                fats: 0,
            },
            ingredients,
            allergens,
            price: item.price > 0 ? item.price : undefined,
            currency: meta.currency.code,
            isSafe,
            warnings: allergens.filter((a: any) => a.severity === 'high').map((a: any) => 
                `Contains ${a.type} from ${a.source}`
            ),
        };
    });

    const result = {
        id: jobId,
        imageUri,
        timestamp: new Date().toISOString(),
        dishes,
        totalDishes: allItems.length,
        safeCount: dishes.filter(d => d.isSafe).length,
        unsafeCount: dishes.filter(d => !d.isSafe).length,
        cuisine: extraction.restaurantName || undefined,
        language: apiResponse.language,
    } as MenuScanResult;
    
    console.log('🎯 Final MenuScanResult:', JSON.stringify(result, null, 2));
    console.log('═══════════════════════════════════════════════════════════════\n');
    
    return result;
}
