import { Restaurant, RestaurantFilters, RestaurantMatch, PopularDish, DietaryTag } from '../types';

const MOCK_RESTAURANTS: Restaurant[] = [
    {
        id: 'r1',
        name: 'Phở Gia Truyền',
        cuisine: 'Vietnamese',
        imageUri: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400',
        rating: 4.8,
        reviewCount: 324,
        priceLevel: 1,
        distance: 500,
        distanceText: '500 m',
        isOpen: true,
        tags: ['Casual', 'Local favorite', 'English menu'],
        dietaryOptions: [DietaryTag.GlutenFreeOptions, DietaryTag.VeganOptions],
        location: {
            lat: 21.0285,
            lng: 105.8542,
            address: '12 Hàng Trống, Hoàn Kiếm, Hà Nội',
        },
    },
    {
        id: 'r2',
        name: 'Green Leaf Vegetarian',
        cuisine: 'Vegetarian',
        imageUri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
        rating: 4.6,
        reviewCount: 156,
        priceLevel: 2,
        distance: 800,
        distanceText: '800 m',
        isOpen: true,
        tags: ['Cozy', 'Quiet', 'Wi-Fi'],
        dietaryOptions: [DietaryTag.Vegan, DietaryTag.Vegetarian, DietaryTag.DedicatedKitchen],
        location: {
            lat: 21.0295,
            lng: 105.8552,
            address: '28 Hàng Bạc, Hoàn Kiếm, Hà Nội',
        },
    },
    {
        id: 'r3',
        name: 'Bún Chả Hương Liên',
        cuisine: 'Vietnamese',
        imageUri: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400',
        rating: 4.7,
        reviewCount: 892,
        priceLevel: 1,
        distance: 650,
        distanceText: '650 m',
        isOpen: true,
        tags: ['Famous', 'Traditional', 'Busy'],
        dietaryOptions: [DietaryTag.GlutenFreeOptions],
        location: {
            lat: 21.0275,
            lng: 105.8530,
            address: '24 Lê Văn Hưu, Hai Bà Trưng, Hà Nội',
        },
    },
    {
        id: 'r4',
        name: 'Sushi Master Hanoi',
        cuisine: 'Japanese',
        imageUri: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400',
        rating: 4.5,
        reviewCount: 234,
        priceLevel: 3,
        distance: 1200,
        distanceText: '1.2 km',
        isOpen: true,
        tags: ['Modern', 'Clean', 'English menu', 'Air-conditioned'],
        dietaryOptions: [DietaryTag.GlutenFreeOptions, DietaryTag.VeganOptions],
        location: {
            lat: 21.0310,
            lng: 105.8560,
            address: '45 Trần Hưng Đạo, Hoàn Kiếm, Hà Nội',
        },
    },
    {
        id: 'r5',
        name: 'Vegan Heaven',
        cuisine: 'Vietnamese Fusion',
        imageUri: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
        rating: 4.9,
        reviewCount: 445,
        priceLevel: 2,
        distance: 900,
        distanceText: '900 m',
        isOpen: true,
        tags: ['Instagram-worthy', 'Healthy', 'Organic'],
        dietaryOptions: [DietaryTag.Vegan, DietaryTag.GlutenFree, DietaryTag.DedicatedKitchen],
        location: {
            lat: 21.0300,
            lng: 105.8545,
            address: '15 Nhà Thờ, Hoàn Kiếm, Hà Nội',
        },
    },
    {
        id: 'r6',
        name: 'Bánh Mì 25',
        cuisine: 'Vietnamese Street Food',
        imageUri: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400',
        rating: 4.4,
        reviewCount: 567,
        priceLevel: 1,
        distance: 400,
        distanceText: '400 m',
        isOpen: true,
        tags: ['Quick bite', 'Budget-friendly', 'Takeaway'],
        dietaryOptions: [DietaryTag.VeganOptions],
        location: {
            lat: 21.0280,
            lng: 105.8535,
            address: '25 Hàng Cá, Hoàn Kiếm, Hà Nội',
        },
    },
    {
        id: 'r7',
        name: 'La Table Française',
        cuisine: 'French',
        imageUri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
        rating: 4.8,
        reviewCount: 178,
        priceLevel: 4,
        distance: 1500,
        distanceText: '1.5 km',
        isOpen: false,
        tags: ['Fine dining', 'Romantic', 'Wine selection', 'Reservation required'],
        dietaryOptions: [DietaryTag.VeganOptions, DietaryTag.GlutenFreeOptions],
        location: {
            lat: 21.0320,
            lng: 105.8575,
            address: '34 Phan Chu Trinh, Hoàn Kiếm, Hà Nội',
        },
    },
    {
        id: 'r8',
        name: 'Chay Garden',
        cuisine: 'Vietnamese Vegetarian',
        imageUri: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
        rating: 4.5,
        reviewCount: 289,
        priceLevel: 2,
        distance: 750,
        distanceText: '750 m',
        isOpen: true,
        tags: ['Buddhist cuisine', 'Peaceful', 'Garden seating'],
        dietaryOptions: [DietaryTag.Vegan, DietaryTag.Vegetarian, DietaryTag.DedicatedKitchen],
        location: {
            lat: 21.0290,
            lng: 105.8548,
            address: '18 Hàng Dầu, Hoàn Kiếm, Hà Nội',
        },
    },
    {
        id: 'r9',
        name: 'Pasta & Co',
        cuisine: 'Italian',
        imageUri: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
        rating: 4.6,
        reviewCount: 312,
        priceLevel: 3,
        distance: 1100,
        distanceText: '1.1 km',
        isOpen: true,
        tags: ['Family-friendly', 'Homemade pasta', 'English menu'],
        dietaryOptions: [DietaryTag.VeganOptions, DietaryTag.GlutenFreeOptions],
        location: {
            lat: 21.0305,
            lng: 105.8555,
            address: '56 Tràng Tiền, Hoàn Kiếm, Hà Nội',
        },
    },
    {
        id: 'r10',
        name: 'Cơm Tấm Sài Gòn',
        cuisine: 'Vietnamese',
        imageUri: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=400',
        rating: 4.3,
        reviewCount: 421,
        priceLevel: 1,
        distance: 600,
        distanceText: '600 m',
        isOpen: true,
        tags: ['Local', 'Affordable', 'Quick service'],
        dietaryOptions: [DietaryTag.GlutenFreeOptions],
        location: {
            lat: 21.0288,
            lng: 105.8540,
            address: '42 Hàng Bồ, Hoàn Kiếm, Hà Nội',
        },
    },
];

const MOCK_DISHES: Record<string, PopularDish[]> = {
    r1: [
        {
            id: 'd1',
            name: 'Phở Bò (Beef Pho)',
            description: 'Traditional Vietnamese beef noodle soup with rice noodles',
            tags: [DietaryTag.GlutenFreeOptions],
            price: 45000,
        },
        {
            id: 'd2',
            name: 'Phở Gà (Chicken Pho)',
            description: 'Light and flavorful chicken noodle soup',
            tags: [DietaryTag.GlutenFreeOptions],
            price: 40000,
        },
    ],
    r2: [
        {
            id: 'd3',
            name: 'Buddha Bowl',
            description: 'Mixed vegetables, tofu, quinoa with tahini dressing',
            tags: [DietaryTag.Vegan, DietaryTag.GlutenFree],
            price: 85000,
        },
        {
            id: 'd4',
            name: 'Mushroom Risotto',
            description: 'Creamy Italian rice with mixed mushrooms',
            tags: [DietaryTag.Vegetarian],
            price: 95000,
        },
    ],
    r3: [
        {
            id: 'd5',
            name: 'Bún Chả Set',
            description: 'Grilled pork, vermicelli noodles, herbs, and dipping sauce',
            tags: [DietaryTag.GlutenFreeOptions],
            price: 50000,
        },
        {
            id: 'd6',
            name: 'Nem Rán (Spring Rolls)',
            description: 'Crispy fried spring rolls with dipping sauce',
            tags: [],
            price: 35000,
        },
    ],
    r4: [
        {
            id: 'd7',
            name: 'Sashimi Platter',
            description: 'Fresh assorted sashimi (salmon, tuna, yellowtail)',
            tags: [DietaryTag.GlutenFree],
            price: 350000,
        },
        {
            id: 'd8',
            name: 'Vegetable Tempura',
            description: 'Lightly battered seasonal vegetables',
            tags: [DietaryTag.VeganOptions],
            price: 120000,
        },
    ],
    r5: [
        {
            id: 'd9',
            name: 'Jackfruit Tacos',
            description: 'Pulled jackfruit with fresh salsa and guacamole',
            tags: [DietaryTag.Vegan, DietaryTag.GlutenFree],
            price: 75000,
        },
        {
            id: 'd10',
            name: 'Raw Pad Thai',
            description: 'Zucchini noodles with tamarind sauce and cashews',
            tags: [DietaryTag.Vegan, DietaryTag.GlutenFree],
            price: 85000,
        },
    ],
    r6: [
        {
            id: 'd11',
            name: 'Bánh Mì Thịt',
            description: 'Classic Vietnamese baguette with pork, pate, and vegetables',
            tags: [],
            price: 25000,
        },
        {
            id: 'd12',
            name: 'Bánh Mì Chay',
            description: 'Vegetarian version with tofu and vegetables',
            tags: [DietaryTag.VeganOptions],
            price: 22000,
        },
    ],
    r7: [
        {
            id: 'd13',
            name: 'Coq au Vin',
            description: 'Chicken braised in red wine with mushrooms',
            tags: [],
            price: 480000,
        },
        {
            id: 'd14',
            name: 'Ratatouille',
            description: 'Provençal vegetable stew',
            tags: [DietaryTag.Vegan, DietaryTag.GlutenFree],
            price: 320000,
        },
    ],
    r8: [
        {
            id: 'd15',
            name: 'Cơm Chay',
            description: 'Buddhist vegetarian rice with mock meat and vegetables',
            tags: [DietaryTag.Vegan],
            price: 55000,
        },
        {
            id: 'd16',
            name: 'Phở Chay',
            description: 'Vegetarian pho with mushrooms and tofu',
            tags: [DietaryTag.Vegan],
            price: 50000,
        },
    ],
    r9: [
        {
            id: 'd17',
            name: 'Spaghetti Carbonara',
            description: 'Classic pasta with eggs, cheese, and pancetta',
            tags: [],
            price: 180000,
        },
        {
            id: 'd18',
            name: 'Penne Arrabbiata',
            description: 'Spicy tomato sauce with garlic and chili',
            tags: [DietaryTag.Vegan],
            price: 150000,
        },
    ],
    r10: [
        {
            id: 'd19',
            name: 'Cơm Tấm Sườn',
            description: 'Broken rice with grilled pork chop and egg',
            tags: [DietaryTag.GlutenFree],
            price: 45000,
        },
        {
            id: 'd20',
            name: 'Cơm Tấm Gà Nướng',
            description: 'Broken rice with grilled chicken',
            tags: [DietaryTag.GlutenFree],
            price: 42000,
        },
    ],
};

export const restaurantSearchService = {
    search: async (filters: RestaurantFilters): Promise<RestaurantMatch[]> => {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const matches: RestaurantMatch[] = MOCK_RESTAURANTS.map((restaurant) => {
            let score = 70;
            const reasons: string[] = [];

            // Match dietary preferences
            if (filters.dietaryPreferences.length > 0) {
                const hasMatch = filters.dietaryPreferences.some(pref =>
                    restaurant.dietaryOptions.includes(pref)
                );
                if (hasMatch) {
                    score += 15;
                    reasons.push('Matches your dietary preferences');
                }
            }

            // Distance bonus
            if (restaurant.distance <= filters.maxDistance) {
                score += 10;
                reasons.push('Within walking distance');
            }

            // Open now bonus
            if (restaurant.isOpen) {
                score += 5;
                reasons.push('Open now');
            }

            return {
                restaurant,
                matchScore: Math.min(score, 100),
                matchReasons: reasons,
            };
        });

        // Sort by score
        return matches.sort((a, b) => b.matchScore - a.matchScore);
    },

    getDetail: async (id: string): Promise<Restaurant | null> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return MOCK_RESTAURANTS.find(r => r.id === id) || null;
    },

    getPopularDishes: async (restaurantId: string): Promise<PopularDish[]> => {
        await new Promise(resolve => setTimeout(resolve, 400));
        return MOCK_DISHES[restaurantId] || [];
    },
};
