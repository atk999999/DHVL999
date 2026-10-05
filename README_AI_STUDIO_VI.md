# Đại Hiệp Xin Hãy Quay Lại — bàn giao AI Studio
Mã nguồn bản web đã xuất bản ngày04/10/2026. Commit74ed604931ad25d06fbdd082990342663da21394.

## Chạy
Giải nén, mở thư mục package.json. Chạy `npm run dev` hoặc `npm start`, mở cổng3000. Không cần cài thư viện; server nghe0.0.0.0, nhận biến PORT.
`npm run build` kiểm tra game tĩnh. Đầu ra đã có trong dist/, không xóa dist/ khi build. `npm test` kiểm tra các bản vá chính. Xuất bản toàn bộ dist/ tại gốc website.

## Cho AI Studio
Đọc PROMPT_AI_STUDIO.txt. Dùng mã nguồn có sẵn, không viết game thay thế. Nếu bắt buộc React/Vite, chỉ tạo lớp vỏ iframe tới game/index.html và phục vụ nguyên vẹn cây game. Không đưa engine/plugin qua bundler: RPG Maker dùng biến toàn cục và thứ tự tải.
File thiếu phải trả404, không trả HTML thay cho JSON/ảnh/âm thanh. Không mở file:// vì dùng XHR. Không cần Gemini API.

## Nội dung
Engine RPG Maker MV, mã JS, dữ liệu JSON, ảnh/âm thanh/font, Việt hóa, nền chờ;300 thiên phú;999 nguyên bảo khởi đầu; vá chiến đấu và màn hình đen tuổi50/70/80.
Cổ Thần giáp +100000HP, giày +50000MP, mâu +50000ATK;100 xu/món ở Chợ phiên/Trang bị. Nút Cổ Thần để mặc/tháo, sửa đồ đã mua còn trong túi của bản lưu cũ.
Tàn Đăng Vấn Đạo sau120:8 chương,5 cảnh giới,2 kết cục.8 NPC tu tiên qua sự kiện hàng năm, có quan hệ/nhiệm vụ/thưởng thật; chưa có chân dung riêng hoặc trận chiến mới cho NPC này.

## Cấu trúc
- dist/index.html, dist/web-shell.js: vỏ web và nút.
- dist/game/index.html: thứ tự tải engine.
- dist/game/js/libs/json/: dữ liệu chơi thật; không thay bằng dữ liệu mẫu APK795.
- dist/game/js/plugins.js: danh sách plugin.
- Web_AncientEquipment.js, Web_Immortal.js, Web_ImmortalNPC.js: tính năng mới trong thư mục plugin.
- reports/ và tests/: mô tả cùng kiểm tra.

Không chứa bản lưu cá nhân. Bản lưu ở tên miền web cũ không tự chuyển sang tên miền mới; đừng xóa dữ liệu web cũ.
Đây là nền web781 với tài nguyên795 thu hồi được và truyện sáng tác, không phải đầy đủ logic795. Chưa chạy trong AI Studio; cần chơi thử UI trên điện thoại, nút Cổ Thần và chuyển tuổi120 sau khi nhập.
