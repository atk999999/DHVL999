# Kỳ ngộ Thanh Khê

Phần mở rộng sáng tác riêng cho bản web hiện có, dùng ảnh nhân vật WD_4 đã khôi phục từ APK 795. Không phải cốt truyện chính thức hoặc bản nâng cấp toàn bộ nội dung 795.

Nút **Kỳ ngộ** nằm trên thanh đầu trang. Bắt đầu một cuộc đời, vào màn hình sự kiện rồi mở nút này. Nếu game đang hiện lời thoại hoặc lựa chọn, cần xử lý xong trước. Màn hình kỳ ngộ tạm dừng cảnh bản đồ; **Trở về game** tiếp tục cảnh cũ.

Bốn chặng mở từ 12, 14, 16 và 18 tuổi. Người chơi lớn tuổi có thể thực hiện các chặng đã đủ tuổi theo thứ tự. Lựa chọn cộng trực tiếp biến thuộc tính gốc (Danh vọng, Học thức, Thiện ác, Thể chất, Ngộ tính) hoặc tiền xu của nhóm. Một số lựa chọn có điều kiện thuộc tính nhưng luôn có đường đi không bị khóa.

Quan hệ từ 4 trở lên ở chặng cuối: học Tử Hà Chưởng và nhận Ngộ tính +3. Quan hệ thấp hơn: nhận 100 xu và Học thức +2. Chiêu 450 thuộc cùng nhóm với Quyền pháp cơ bản, tiêu hao 35 nội lực và gây sát thương dựa trên công kích, cấp độ và Ngộ tính; dùng hệ thống đánh trúng, né và sát thương hiện có.

Tiến trình và quan hệ nằm trong Game_System, đi cùng bản lưu RPG Maker hiện có. Người chơi cần lưu game bằng chức năng gốc. Không tự ghi đè ô lưu. Bắt đầu cuộc đời mới sẽ đặt lại kỳ ngộ và xóa chiêu 450 khỏi nhân vật; bản lưu cũ tự khởi tạo tiến trình khi mở kỳ ngộ.

Kiểm tra: `node tests/encounter-regression.cjs` và `node tests/combat-regression.cjs`. Bao phủ điều kiện tuổi/thuộc tính, hai kết cục, phần thưởng một lần, lưu/đọc trạng thái, đặt lại đời mới và khả năng tính sát thương của toàn bộ kỹ năng. Chưa kiểm thử tương tác toàn tuyến bằng trình duyệt.
