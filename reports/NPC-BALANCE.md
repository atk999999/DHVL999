# Bản vá sát thương NPC

Đã đối chiếu engine web với `rpg_objects.js` trong APK 795. Cả hai đều dùng biến toàn cục 56 cho bạo kích của mọi bên; biến này lại được sự kiện 221 đặt theo môn phái của người chơi. Chưa có tệp nào được xác minh là phiên bản 757. APK 795 không có cơ sở dữ liệu chiến đấu đầy đủ để nhập thay thế; kiểm tra dữ liệu NPC dựa trên cơ sở 781 hiện có.

## Cơ chế gây sát thương bất thường

Trạng thái 49 tên `---------------------`, iconIndex 0, không tự hết sau trận. Nó nhân sát thương nguyên tố 1 lên 3,5 lần và nguyên tố 2 lên 4,5 lần, đồng thời trừ đánh trúng và né của người chơi. Một số sự kiện trận và sự kiện chung 329 gán trạng thái này khi công tắc 287 (lỗi đọc thông tin) bật.

Không cần Kinh mạch đứt đoạn để tái hiện mức sát thương người dùng báo:

- Đoàn Dự, Lục Mạch Thần Kiếm: `(6500 + 395×6) × 4,5 × 1,5 = 59872,5`, chưa dao động ±5%.
- Cừu Thiên Nhận, Thiết Sa Chưởng, trạng thái Phẫn nộ tăng công ×3 và hệ số môn phái người chơi 2,2: `(4600 + 345×3×6) × 4,5 × 2,2 = 107019`, chưa dao động.

Đây là tái hiện từ mã/dữ liệu, không phải xác nhận trạng thái trong bản lưu của người dùng vì chưa có bản lưu đó. Giả thuyết trước về Kinh mạch đứt đoạn không được dùng để kết luận trận thực tế.

## Thay đổi đã áp dụng

1. Chặn gán trạng thái phạt 49 trong bản web.
2. Khi tạo game/đọc bản lưu, tắt cờ lỗi 287 và xóa riêng trạng thái 49 khỏi các nhân vật đã tồn tại. Giữ các thương tích thật, gồm trạng thái 41, cùng tiền, thiên phú và tiến trình.
3. NPC dùng bạo kích riêng ×1,5; người chơi tiếp tục dùng hệ số môn phái, với dự phòng ×1,5 khi giá trị chưa hợp lệ.
4. Cân bằng bổ sung theo yêu cầu: sát thương HP trực tiếp của NPC lên nhân vật ×0,75. Không giảm sát thương người chơi, hồi phục hay hiệu ứng nội lực. Đây là điều chỉnh cân bằng web, không tuyên bố là hệ số của game gốc.

Ví dụ Thiết Sa Chưởng của Cừu Thiên Nhận lên mục tiêu không thương tích/kháng/phòng ngự: bạo kích danh nghĩa khoảng 7504; khi NPC có Phẫn nộ khoảng 12161, cộng dao động ±5%.

## Kiểm tra

`tests/npc-balance-regression.cjs` dùng Game_Enemy và công thức engine thật, cùng giới hạn tham số và bộ tính công thức của plugin YEP đang bật. Quét 256 mục NPC, 414 cặp NPC–chiêu gây sát thương HP có thể dùng: giá trị hữu hạn, không có cặp gây 0 sát thương ngoài ý muốn trong bộ dữ liệu kiểm tra. Kiểm tra thêm bạo kích thường/Phẫn nộ lên mục tiêu trung tính, dọn bản lưu và chặn tái gán trạng thái 49. Không có đòn bạo kích vượt 100000 trong các tình huống này; đây không phải trần cứng cho mọi kết hợp thương tích, hỗ trợ và kháng nguyên tố.

Kiểm tra hồi quy sát thương người chơi và Kỳ ngộ Thanh Khê đều qua. Chưa chơi thử trận bằng trình duyệt hoặc bằng bản lưu thực của người dùng.
