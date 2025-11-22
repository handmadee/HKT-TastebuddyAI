# USER STORIES - Ứng Dụng Dinh Dưỡng Thông Minh

## 1. PHÂN HỆ ĐĂNG NHẬP & HỒ SƠ (AUTH & PROFILE)

### US-001: Đăng ký tài khoản qua OAuth
**As a** người dùng mới  
**I want** đăng ký tài khoản bằng Google hoặc Apple  
**So that** tôi có thể đăng nhập nhanh chóng mà không cần tạo mật khẩu mới

**Acceptance Criteria:**
- [ ] Hiển thị nút "Sign in with Google"
- [ ] Sau khi OAuth thành công, tự động lấy fullName, email, avatar từ provider
- [ ] Tạo tài khoản mới trong database nếu email chưa tồn tại
- [ ] Chuyển hướng đến màn hình onboarding nếu là lần đầu đăng ký
- [ ] Chuyển hướng đến Home nếu đã có hồ sơ đầy đủ

**Priority:** High  
**Story Points:** 5

---

### US-002: Đăng ký tài khoản thông thường
**As a** người dùng mới  
**I want** đăng ký tài khoản bằng email và mật khẩu  
**So that** tôi có thể tạo tài khoản mà không cần dùng Google/Apple

**Acceptance Criteria:**
- [ ] Form đăng ký có các trường: Email, Password, Confirm Password, Họ và tên
- [ ] Validate email format
- [ ] Password phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số
- [ ] Confirm Password phải khớp với Password
- [ ] Hiển thị lỗi nếu email đã tồn tại
- [ ] Gửi email xác nhận (optional)
- [ ] Chuyển hướng đến onboarding sau khi đăng ký thành công

**Priority:** High  
**Story Points:** 5

---

### US-003: Đăng nhập
**As a** người dùng đã có tài khoản  
**I want** đăng nhập vào ứng dụng  
**So that** tôi có thể truy cập dữ liệu cá nhân của mình

**Acceptance Criteria:**
- [ ] Hỗ trợ đăng nhập bằng Email/Password
- [ ] Hỗ trợ đăng nhập bằng Google OAuth
- [ ] Hỗ trợ đăng nhập bằng Apple Sign In
- [ ] Hiển thị lỗi nếu thông tin đăng nhập sai
- [ ] Lưu session/token để tự động đăng nhập lần sau
- [ ] Chuyển đến Home nếu đã có profile đầy đủ
- [ ] Chuyển đến onboarding nếu chưa hoàn thành thiết lập

**Priority:** High  
**Story Points:** 3

---

### US-004: Thiết lập ngôn ngữ hiển thị
**As a** người dùng mới  
**I want** chọn ngôn ngữ hiển thị cho ứng dụng  
**So that** tôi có thể sử dụng ứng dụng bằng ngôn ngữ mình quen thuộc

**Acceptance Criteria:**
- [ ] Hiển thị danh sách ngôn ngữ: Tiếng Việt, Tiếng Anh, Tiếng Nhật, v.v.
- [ ] Cho phép chọn 1 ngôn ngữ
- [ ] Lưu lựa chọn vào UserProfile
- [ ] Toàn bộ UI chuyển sang ngôn ngữ đã chọn

**Priority:** Medium  
**Story Points:** 3

---

### US-005: Thiết lập sở thích ăn uống
**As a** người dùng mới  
**I want** chọn các sở thích ăn uống của mình  
**So that** ứng dụng có thể gợi ý món ăn phù hợp với tôi

**Acceptance Criteria:**
- [ ] Hiển thị danh sách tags: Vegan, Halal, Asian Food, Mediterranean, Low-Carb, v.v.
- [ ] Cho phép chọn nhiều tags
- [ ] Lưu danh sách tags đã chọn vào UserProfile
- [ ] Tags được dùng cho tính năng Food Search và Suggestion

**Priority:** Medium  
**Story Points:** 3

---

### US-006: Thiết lập thông tin dị ứng
**As a** người dùng có dị ứng thực phẩm  
**I want** khai báo các loại thực phẩm tôi bị dị ứng và mức độ  
**So that** ứng dụng có thể cảnh báo khi tôi ăn món có nguy cơ gây dị ứng

**Acceptance Criteria:**
- [ ] Hiển thị danh sách loại dị ứng: Hải sản, Đậu phộng, Gluten, Sữa, Trứng, v.v.
- [ ] Cho phép chọn nhiều loại dị ứng
- [ ] Với mỗi loại, chọn mức độ: Mild (Nhẹ), Moderate (Trung bình), Severe (Nghiêm trọng)
- [ ] Lưu thông tin vào bảng Allergen
- [ ] Dữ liệu được dùng cho Safety Check trong Food Scanner và Menu Translator

**Priority:** High  
**Story Points:** 5

---

### US-007: Thiết lập chỉ số sức khỏe và mục tiêu
**As a** người dùng mới  
**I want** nhập thông tin cơ thể và chọn mục tiêu sức khỏe  
**So that** ứng dụng có thể tính toán và đề xuất lượng Calories/Macro phù hợp

**Acceptance Criteria:**
- [ ] Form nhập: Cân nặng (kg), Chiều cao (cm), Giới tính, Tuổi
- [ ] Chọn tình trạng sức khỏe (có thể chọn nhiều): Diabetes, High BP, Cholesterol, None
- [ ] Chọn mục tiêu: Lose weight, Maintain, Gain
- [ ] Hệ thống tự động tính BMI
- [ ] Hệ thống tự động tính TDEE (Total Daily Energy Expenditure)
- [ ] Đề xuất Calories mục tiêu hằng ngày
- [ ] Đề xuất Macro (Protein/Carbs/Fat) mục tiêu
- [ ] Lưu vào bảng HealthProfile
- [ ] Hiển thị kết quả trước khi hoàn tất

**Priority:** High  
**Story Points:** 8

---

### US-008: Chỉnh sửa hồ sơ cá nhân
**As a** người dùng  
**I want** chỉnh sửa thông tin cá nhân, sở thích và mục tiêu  
**So that** tôi có thể cập nhật khi có thay đổi

**Acceptance Criteria:**
- [ ] Truy cập được từ Profile/Settings
- [ ] Cho phép chỉnh sửa: Họ tên, Avatar
- [ ] Cho phép thay đổi sở thích ăn uống
- [ ] Cho phép cập nhật thông tin dị ứng
- [ ] Cho phép cập nhật chỉ số sức khỏe và mục tiêu
- [ ] Hệ thống tự động tính lại BMI, TDEE khi thay đổi
- [ ] Lưu changes vào database

**Priority:** Medium  
**Story Points:** 5

---

## 2. PHÂN HỆ TRANG CHỦ & TỔNG QUAN (HOME SUMMARY)

### US-009: Xem dashboard tổng quan dinh dưỡng
**As a** người dùng  
**I want** xem tổng quan về lượng Calories và Macro đã tiêu thụ trong ngày  
**So that** tôi có thể theo dõi tiến trình đạt mục tiêu

**Acceptance Criteria:**
- [ ] Hiển thị biểu đồ tròn hoặc thanh: Calories đã tiêu thụ / Calories mục tiêu
- [ ] Hiển thị 3 thanh Macro riêng biệt: Protein, Carbs, Fat
- [ ] Mỗi thanh cho thấy: Đã tiêu thụ / Mục tiêu
- [ ] Hiển thị % hoàn thành
- [ ] Dữ liệu được tính từ NutritionLog trong ngày hiện tại
- [ ] Refresh khi có log mới được thêm vào

**Priority:** High  
**Story Points:** 5

---

### US-010: Nhận đánh giá nhanh về dinh dưỡng
**As a** người dùng  
**I want** nhận thông báo về chất dinh dưỡng còn thiếu trong ngày  
**So that** tôi biết cần bổ sung gì

**Acceptance Criteria:**
- [ ] Hệ thống tự động phân tích Nutrition Log
- [ ] Tính toán khoảng cách giữa Current và Goal
- [ ] Hiển thị thông báo: "Bạn đang thiếu Xg Protein hôm nay"
- [ ] Ưu tiên hiển thị Protein trước tiên
- [ ] Nếu dư Calories hoặc Macro, cũng cảnh báo

**Priority:** Medium  
**Story Points:** 5

---

### US-011: Nhận gợi ý món ăn thông minh từ AI
**As a** người dùng thiếu chất dinh dưỡng  
**I want** nhận gợi ý món ăn để lấp đầy khoảng trống  
**So that** tôi có thể đạt mục tiêu mà không ăn thừa Calories

**Acceptance Criteria:**
- [ ] Tích hợp Chatbot/LLM (ví dụ: OpenAI, Gemini)
- [ ] Input: Current nutrition status, Goal, Allergens, Preferences
- [ ] Output: Gợi ý cụ thể 1-3 món ăn
- [ ] Ví dụ: "Để đủ protein mà không bị dư Fat, bạn nên ăn thêm ức gà luộc hoặc uống 1 scoop whey"
- [ ] Hiển thị gợi ý trong Home Summary
- [ ] Cho phép refresh để lấy gợi ý khác

**Priority:** Medium  
**Story Points:** 8

---

## 3. PHÂN HỆ QUÉT MÓN ĂN (AI FOOD SCANNER)

### US-012: Quét và phân tích món ăn
**As a** người dùng  
**I want** chụp ảnh món ăn để nhận thông tin dinh dưỡng  
**So that** tôi có thể log nhanh chóng mà không cần tra cứu thủ công

**Acceptance Criteria:**
- [ ] Mở camera hoặc chọn ảnh từ thư viện
- [ ] Gửi ảnh đến AI service (ví dụ: Google Vision, OpenAI GPT-4 Vision)
- [ ] Nhận về: Tên món ăn, Ingredients, Calories, Protein, Carbs, Fat
- [ ] Hiển thị kết quả trong < 5 giây
- [ ] Cho phép chỉnh sửa thông tin nếu sai
- [ ] Lưu vào NutritionLog khi confirm

**Priority:** High  
**Story Points:** 13

---

### US-013: Kiểm tra an toàn thực phẩm
**As a** người dùng có dị ứng hoặc vấn đề sức khỏe  
**I want** kiểm tra xem món ăn có an toàn cho tôi không  
**So that** tôi tránh được các món có nguy cơ gây hại

**Acceptance Criteria:**
- [ ] So sánh Ingredients với Allergens của user
- [ ] So sánh với Health Conditions (ví dụ: đường cao với Diabetes)
- [ ] Hiển thị trạng thái:
  - ✅ Safe (An toàn) - Không có thành phần nguy hiểm
  - ⚠️ Warning (Cảnh báo) - Có thành phần cần lưu ý, kèm lý do
  - ⛔ Danger (Nguy hiểm) - Chứa allergen ở mức Severe
- [ ] Hiển thị lý do cụ thể: "Chứa đậu phộng", "Đường cao - không phù hợp với tiểu đường"
- [ ] Ưu tiên độ nhạy (thà báo nhầm còn hơn bỏ sót)

**Priority:** High  
**Story Points:** 8

---

### US-014: Lưu món yêu thích
**As a** người dùng  
**I want** lưu các món ăn tôi hay ăn vào danh sách yêu thích  
**So that** lần sau tôi có thể log nhanh mà không cần scan lại

**Acceptance Criteria:**
- [ ] Nút "Save to Favorites" sau khi scan
- [ ] Lưu vào bảng FavoriteFood
- [ ] Hiển thị danh sách Favorites trong Profile hoặc tab riêng
- [ ] Cho phép log nhanh từ Favorites (1 tap)
- [ ] Cho phép xóa khỏi Favorites

**Priority:** Medium  
**Story Points:** 3

---

## 4. PHÂN HỆ DỊCH & PHÂN TÍCH MENU (SMART MENU TRANSLATOR)

### US-015: Quét và nhận diện cấu trúc menu
**As a** người dùng ở nước ngoài  
**I want** chụp ảnh menu nhà hàng để nhận diện cấu trúc  
**So that** tôi có thể hiểu menu được chia thành những phần nào

**Acceptance Criteria:**
- [ ] Chụp hoặc upload ảnh menu
- [ ] Dùng OCR (ví dụ: Google Cloud Vision, Tesseract) để đọc text
- [ ] Nhận diện cấu trúc: Appetizer, Main Course, Dessert, Drinks
- [ ] Decode sub-menu (ví dụ: menu gập nhiều trang)
- [ ] Tự động lưu Location Name và GPS coordinates khi scan
- [ ] Lưu vào bảng Menu và MenuItem

**Priority:** High  
**Story Points:** 13

---

### US-016: Dịch menu sang ngôn ngữ người dùng
**As a** người dùng  
**I want** dịch tên món và mô tả sang ngôn ngữ của tôi  
**So that** tôi hiểu được món ăn là gì

**Acceptance Criteria:**
- [ ] Tự động nhận diện ngôn ngữ gốc của menu
- [ ] Dịch sang ngôn ngữ đã cài đặt trong UserProfile
- [ ] Sử dụng Translation API (Google Translate, DeepL)
- [ ] Hiển thị cả bản gốc và bản dịch
- [ ] Cho phép chọn ngôn ngữ khác nếu muốn

**Priority:** High  
**Story Points:** 5

---

### US-017: Quy đổi tiền tệ trên menu
**As a** người dùng  
**I want** xem giá món ăn được quy đổi sang tiền tệ của tôi  
**So that** tôi biết món ăn đắt hay rẻ so với ngân sách

**Acceptance Criteria:**
- [ ] Tự động nhận diện loại tiền tệ trên menu (JPY, KRW, THB, USD, v.v.)
- [ ] Lấy tỷ giá real-time hoặc cached (cập nhật ít nhất 1 lần/ngày)
- [ ] Quy đổi sang tiền tệ của user (ví dụ: VND)
- [ ] Hiển thị cả giá gốc và giá quy đổi
- [ ] Cho phép chọn tiền tệ đích khác

**Priority:** Medium  
**Story Points:** 5

---

### US-018: Đánh giá an toàn menu
**As a** người dùng có dị ứng  
**I want** xem những món nào trên menu có nguy cơ gây dị ứng  
**So that** tôi tránh được các món nguy hiểm

**Acceptance Criteria:**
- [ ] Quét toàn bộ menu và so sánh ingredients với Allergens
- [ ] Highlight/Đánh dấu các món có cảnh báo
- [ ] Hiển thị icon cảnh báo: ⚠️ hoặc ⛔
- [ ] Khi tap vào món, hiển thị lý do cảnh báo
- [ ] Hỗ trợ AR overlay (optional) để highlight trực tiếp trên camera

**Priority:** High  
**Story Points:** 8

---

### US-019: Gán thẻ cho món ăn trên menu
**As a** người dùng  
**I want** xem các món được gắn thẻ như Best Seller, Spicy, Chef's Choice  
**So that** tôi có thể chọn món phù hợp với sở thích

**Acceptance Criteria:**
- [ ] Nhận diện icon đặc biệt trên menu (⭐, 🌶️, 👨‍🍳)
- [ ] Tự động gán tag: Best Seller, Spicy, Chef's Choice
- [ ] Hiển thị tag trên danh sách món
- [ ] Cho phép filter theo tag

**Priority:** Low  
**Story Points:** 5

---

## 5. PHÂN HỆ TÌM KIẾM MÓN ĂN (SMART FOOD SEARCH)

### US-020: Tìm kiếm quán ăn theo vị trí
**As a** người dùng  
**I want** tìm quán ăn gần tôi  
**So that** tôi có thể tìm được món ăn phù hợp trong khu vực

**Acceptance Criteria:**
- [ ] Mặc định dùng GPS để lấy vị trí hiện tại
- [ ] Cho phép chọn vị trí khác qua Google Place API
- [ ] Chọn bán kính: 500m, 1km, 5km, 10km
- [ ] Hiển thị map với markers của các quán
- [ ] Hiển thí danh sách kết quả

**Priority:** High  
**Story Points:** 8

---

### US-021: Lọc kết quả theo ngân sách và thời gian
**As a** người dùng  
**I want** lọc quán ăn theo ngân sách và thời gian ăn  
**So that** tôi tìm được quán phù hợp với túi tiền và bữa ăn

**Acceptance Criteria:**
- [ ] Input ngân sách (giá/người): < 50k, 50k-100k, 100k-200k, > 200k
- [ ] Chọn thời gian: Sáng, Trưa, Tối, Ăn nhẹ
- [ ] Chọn sở thích: Dựa trên Profile hoặc chọn nhanh
- [ ] Filter kết quả theo các tiêu chí
- [ ] Hiển thị số lượng kết quả

**Priority:** Medium  
**Story Points:** 5

---

### US-022: Xem gợi ý món phù hợp với mục tiêu sức khỏe
**As a** người dùng  
**I want** xem các món được xếp hạng theo độ phù hợp với mục tiêu của tôi  
**So that** tôi chọn được món vừa ngon vừa đạt goal

**Acceptance Criteria:**
- [ ] Tính Matching Score giữa món ăn và Health Goal
- [ ] Các yếu tố: Calories, Protein, Carbs, Fat, Allergens
- [ ] Sắp xếp kết quả theo score cao -> thấp
- [ ] Hiển thị badge: "Highly Recommended", "Good Match", "Fair"
- [ ] Hiển thị lý do: "High Protein - Low Fat", "Fits your calorie budget"

**Priority:** Medium  
**Story Points:** 8

---

### US-023: Xem chi tiết quán và món gợi ý
**As a** người dùng  
**I want** xem thông tin chi tiết quán và món gợi ý  
**So that** tôi có đủ thông tin để quyết định

**Acceptance Criteria:**
- [ ] Hiển thị: Tên quán, Địa chỉ, Khoảng cách
- [ ] Hiển thị món gợi ý (1-3 món phù hợp nhất)
- [ ] Giá ước tính/món
- [ ] Đánh giá (rating) nếu có
- [ ] Nút "Get Directions" mở Google Maps
- [ ] Nút "Log Food" để nhanh chóng log món vào Nutrition Log

**Priority:** Medium  
**Story Points:** 5

---

## 6. PHÂN HỆ HỆ THỐNG CẢNH BÁO & GỢI Ý THÔNG MINH

### US-024: Nhận cảnh báo thiếu Protein
**As a** người dùng  
**I want** nhận thông báo khi thiếu Protein trong ngày  
**So that** tôi kịp bổ sung trước khi kết thúc ngày

**Acceptance Criteria:**
- [ ] Hệ thống kiểm tra Nutrition Log vào các mốc: 12h, 18h, 21h
- [ ] Nếu Protein < 70% mục tiêu, gửi notification
- [ ] Nội dung: "Bạn đang thiếu Xg Protein hôm nay"
- [ ] Tap vào notification mở Dashboard hoặc AI Suggestion

**Priority:** Medium  
**Story Points:** 5

---

### US-025: Nhận gợi ý điều chỉnh bữa ăn
**As a** người dùng  
**I want** nhận gợi ý điều chỉnh bữa ăn tiếp theo  
**So that** tôi đạt được cân bằng dinh dưỡng trong ngày

**Acceptance Criteria:**
- [ ] Phân tích nutrition gap (thiếu/dư gì)
- [ ] Gợi ý món ăn cho bữa tiếp theo
- [ ] Ví dụ: "Bữa tối nên ăn thêm rau xanh và cá để đủ Omega-3"
- [ ] Tích hợp LLM để gợi ý thông minh hơn

**Priority:** Low  
**Story Points:** 8

---

### US-026: Cảnh báo dị ứng khi quét món
**As a** người dùng có dị ứng nghiêm trọng  
**I want** nhận cảnh báo ngay lập tức khi scan món có allergen  
**So that** tôi không ăn nhầm

**Acceptance Criteria:**
- [ ] Sau khi scan, kiểm tra allergen ngay
- [ ] Nếu phát hiện allergen mức Severe, hiển thị popup cảnh báo đỏ
- [ ] Không cho phép log món cho đến khi user confirm "I understand the risk"
- [ ] Ghi log cảnh báo để tracking

**Priority:** High  
**Story Points:** 5

---

## 7. PHÂN HỆ AGENT SYSTEM ARCHITECTURE

### US-027: Orchestrate multi-agent workflow cho Food Scanner
**As a** system administrator  
**I want** các agents trong Food Scanner group được orchestrate tối ưu  
**So that** việc quét món ăn diễn ra nhanh chóng và chính xác

**Acceptance Criteria:**
- [ ] Agent Orchestrator khởi chạy Image Analysis Agent khi user upload ảnh
- [ ] Sau khi nhận được ingredients, parallel trigger Safety Check Agent và Nutrition Calculator Agent
- [ ] Timeout mechanism: Mỗi agent tối đa 5 giây
- [ ] Fallback: Nếu một agent fail, vẫn trả về partial results
- [ ] Logging: Ghi log workflow execution time và success rate

**Priority:** High  
**Story Points:** 8

---

### US-028: Parallel processing cho Menu Translation
**As a** system  
**I want** xử lý song song OCR, Translation, và Currency Conversion  
**So that** menu được xử lý nhanh hơn

**Acceptance Criteria:**
- [ ] OCR Agent chạy trước, parse menu structure
- [ ] Khi OCR hoàn thành, trigger parallel:
  - Translation Agent (dịch tất cả items)
  - Currency Conversion Agent (quy đổi giá)
  - Menu Safety Scanner Agent (quét allergens)
- [ ] Tag Recognition Agent chạy sau khi OCR xong
- [ ] Tổng thời gian xử lý < 10 giây cho menu 20 món
- [ ] Progress indicator cho user (OCR 30% → Translation 60% → Complete 100%)

**Priority:** High  
**Story Points:** 13

---

### US-029: LLM Recommendation Agent với context awareness
**As a** người dùng  
**I want** nhận gợi ý món ăn từ AI dựa trên toàn bộ context cá nhân  
**So that** gợi ý phù hợp và thực tế hơn

**Acceptance Criteria:**
- [ ] LLM Agent nhận input:
  - Current nutrition gap (từ Gap Analyzer Agent)
  - User preferences (từ UserProfile)
  - Allergens và severity (từ Allergen table)
  - Health conditions (từ HealthProfile)
  - Meal time context (sáng/trưa/tối)
  - Location context (nếu có)
- [ ] Output: 3-5 gợi ý món ăn cụ thể với reasoning
- [ ] Mỗi gợi ý có: Tên món, lý do chọn, nutrition breakdown
- [ ] Response time < 3 giây
- [ ] Caching: Cache recommendations cho 1 giờ nếu context không đổi

**Priority:** Medium  
**Story Points:** 13

---

### US-030: Agent retry mechanism và error handling
**As a** system  
**I want** agents tự động retry khi gặp lỗi tạm thời  
**So that** hệ thống resilient hơn với API failures

**Acceptance Criteria:**
- [ ] Mỗi agent có exponential backoff retry (3 lần)
- [ ] Retry delay: 1s, 2s, 4s
- [ ] Phân biệt lỗi tạm thời (network timeout, rate limit) và lỗi vĩnh viễn (invalid input)
- [ ] Chỉ retry lỗi tạm thời
- [ ] Sau 3 lần retry fail, trả về error message rõ ràng cho user
- [ ] Logging: Ghi log mỗi lần retry

**Priority:** High  
**Story Points:** 8

---

### US-031: Agent performance monitoring
**As a** system administrator  
**I want** theo dõi performance của từng agent  
**So that** tôi có thể optimize bottlenecks

**Acceptance Criteria:**
- [ ] Track metrics cho mỗi agent:
  - Average response time
  - Success rate (%)
  - Error rate (%)
  - Retry count
  - API quota usage
- [ ] Dashboard hiển thị metrics real-time
- [ ] Alert khi:
  - Agent response time > 5s
  - Error rate > 10%
  - API quota > 80%
- [ ] Metrics được lưu để phân tích trend

**Priority:** Medium  
**Story Points:** 5

---

### US-032: Agent load balancing và quota management
**As a** system  
**I want** phân phối load giữa nhiều AI service providers  
**So that** tối ưu cost và tránh rate limiting

**Acceptance Criteria:**
- [ ] Image Analysis Agent có thể switch giữa:
  - OpenAI GPT-4 Vision (primary)
  - Google Cloud Vision (fallback)
- [ ] Translation Agent có thể switch giữa:
  - DeepL (primary cho quality)
  - Google Translate (fallback cho cost)
- [ ] Quota tracking per provider per day
- [ ] Auto switch khi quota gần hết (> 90%)
- [ ] Config file để set priority và quota limits

**Priority:** Medium  
**Story Points:** 8

---

### US-034: Cache Management Agent cho faster response
**As a** system  
**I want** cache kết quả của agents thường dùng  
**So that** giảm API calls và tăng tốc độ

**Acceptance Criteria:**
- [ ] Cache strategy:
  - Food scan results: Cache 7 ngày (key: image hash)
  - Currency rates: Cache 24 giờ
  - Translation results: Cache 30 ngày (key: text + lang pair)
  - LLM recommendations: Cache 1 giờ (key: nutrition gap + preferences)
- [ ] Cache invalidation khi user thay đổi profile
- [ ] Cache hit rate tracking
- [ ] Auto cleanup stale cache entries
- [ ] Redis backend cho distributed caching

**Priority:** Medium  
**Story Points:** 5

---

### US-035: Matching Score Agent algorithm
**As a** người dùng  
**I want** thấy món ăn được rank theo độ phù hợp với mục tiêu  
**So that** tôi dễ dàng chọn món đúng

**Acceptance Criteria:**
- [ ] Matching Score tính dựa trên:
  - Nutrition fit (40%): Calorie và macro phù hợp với gap
  - Safety score (30%): Không chứa allergens hoặc conflict với health conditions
  - Preference match (20%): Khớp với food preferences
  - Budget fit (10%): Giá phù hợp với budget input
- [ ] Score range: 0-100
- [ ] Classification:
  - 80-100: "Highly Recommended" (badge xanh)
  - 60-79: "Good Match" (badge vàng)
  - 40-59: "Fair" (badge xám)
  - < 40: Không hiển thị
- [ ] Hiển thị breakdown của score khi user tap

**Priority:** High  
**Story Points:** 13

---

### US-036: Agent health check và auto-recovery
**As a** system administrator  
**I want** hệ thống tự động phát hiện và recover agent failures  
**So that** downtime được giảm thiểu

**Acceptance Criteria:**
- [ ] Health check endpoint cho mỗi agent
- [ ] Check interval: 30 giây
- [ ] Khi agent fail health check:
  - Ghi log với alert level
  - Thử restart agent
  - Nếu restart fail 3 lần, disable agent và dùng fallback
  - Gửi notification cho admin
- [ ] Circuit breaker pattern: Tạm ngưng gọi agent khi error rate > 50%
- [ ] Auto recovery khi health check pass trở lại

**Priority:** Medium  
**Story Points:** 8

---

## TỔNG KẾT

**Tổng số User Stories:** 36  
**Phân bố Priority:**
- High: 17 stories
- Medium: 16 stories  
- Low: 3 stories

**Tổng Story Points:** ~269 points

**Phân bố theo Subsystem:**
1. Auth & Profile: 8 stories (36 points)
2. Home Summary: 3 stories (18 points)
3. AI Food Scanner: 3 stories (24 points)
4. Smart Menu Translator: 5 stories (36 points)
5. Smart Food Search: 4 stories (26 points)
6. Notifications & Suggestions: 3 stories (18 points)
7. **Agent System Architecture: 10 stories (89 points)** ✨

**Agent Stories Distribution:**
- Orchestration & Workflows: 2 stories (US-027, US-028)
- AI/LLM Integration: 1 story (US-029)
- Error Handling & Reliability: 3 stories (US-030, US-031, US-036)
- Performance Optimization: 3 stories (US-032, US-033, US-034)
- Business Logic Agents: 1 story (US-035)

