# Tàn Đăng Vấn Đạo

Cốt truyện sáng tác riêng, nối sự kiện 120 tuổi; không phải dữ liệu giải mã từ APK.

- CE190 mở chương đầu thay cho cái chết bắt buộc. CE9 chuyển mọi năm từ 120 đến CE190; không chạy nhầm các CE191+ vốn dành cho logic khác.
- 8 chương mở ở tuổi 120, 125, 135, 150, 180, 220, 300, 400. Lựa chọn truyện quyết định hai kết cục; sau kết cục vẫn tu luyện tiếp.
- Luyện Khí / Trúc Cơ / Kim Đan / Nguyên Anh / Hóa Thần: thọ nguyên 180 / 300 / 600 / 1200 / 2400. Tu vi đột phá tương ứng 80 / 180 / 360 / 600. Đột phá qua lựa chọn hàng năm; không tăng cảnh giới miễn phí khi thiếu tu vi.
- Mỗi đột phá cấp n tăng 10.000*n HP, 2.500*n MP và 1.000*n ATK qua thông số thực của actor2, đồng thời nâng trần tương ứng. Không buff NPC.
- Kỳ ngộ xen kẽ đem lại tu vi, linh thạch và đạo tâm. Giao dịch thiếu linh thạch cho chọn lại trong cùng năm. Lựa chọn dùng hộp thoại game gốc; không phụ thuộc dịch vụ AI.
- State `_webImmortalV1` trên Game_System: cảnh giới, tài nguyên, phần thưởng, lịch sử, năm đã xử lý và lựa chọn đang chờ. Đời mới xóa state. Chặn thưởng trùng cùng năm.
- Bản lưu cũ kết thúc đúng tuổi120, nguyên nhân13, danh hiệu `thọ cùng trời đất`: tự chuyển lại Map3, giữ tuổi và đồ, mở CE190 một lần. Không phục hồi chết do chiến đấu hay các nguyên nhân khác.
- Kiểm tra Node: mô phỏng năm120–450, hai nhánh truyện, chỉ số trang bị kết hợp, giao dịch thiếu tiền, hết thọ, lưu state, đời mới và phục hồi đúng loại bản lưu. Chưa QA một lượt chơi đầy đủ trên trình duyệt.

Ba trang bị Cổ Thần của thay đổi trước được giữ cùng bản phát hành này.
