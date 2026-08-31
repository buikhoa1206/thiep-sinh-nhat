# 👑 Thiệp Mời Sinh Nhật Hoàng Gia 3D Online (Royal 3D Birthday Invitation) ✨

Một ứng dụng web **Thiệp Mời Sinh Nhật Hoàng Gia 3D Online** hiện đại, sang trọng, tích hợp đầy đủ trang **Admin Quản Lý Tùy Chỉnh Thời Gian Thực**, hiệu ứng **Pháo hoa Confetti**, **Nến ước nguyện**, **Bộ 30 mẫu màu Hot Trend 2026** và **Playlist nhạc Lofi Chill**.

---

## 🌟 Tính Năng Nổi Bật

- ✉️ **Phong Bì 3D Hoàng Gia**: Hiệu ứng mở nắp phong bì 3D chân thật kèm con dấu sáp nổi lộng lẫy.
- 🎨 **Tùy Chỉnh Chi Tiết Bộ 4 Thẻ Màu (Color Customizer)**:
  - 🎨 Màu Chủ Đạo Thiệp
  - 🌌 Màu Phông Nền Mở Đầu
  - ✉️ Màu Thân Phong Bì 3D
  - 👑 Màu Con Dấu Sáp 3D
  - Thanh gõ/dán mã màu Hex cá nhân (`#F43F5E`, `#FFD700`, `#10B981`, `#A855F7`...)
- 🎭 **Bộ 30 Mẫu Màu Hot Trend 2026**: Chọn phong cách giao diện 1-Click (Rose Gold, Midnight, Lavender, Botanical, Cyber Neon...).
- ⚙️ **Trang Admin Quản Lý Trực Quan (`admin.html`)**:
  - Tùy chỉnh Tên, Biệt danh, Tuổi, Ngày tiệc, Địa điểm & Link Google Maps.
  - Quản lý Album ảnh kỷ niệm (Tải ảnh từ máy hoặc URL).
  - Quản lý Lịch trình tiệc (Timeline).
  - Tùy chỉnh chữ dập trên con dấu sáp và bánh sinh nhật.
  - Xem danh sách phản hồi RSVP & Lời chúc mừng từ khách mời.
- 🎂 **Bánh Sinh Nhật & Nến Ước Nguyện Tương Tác**: Thổi nến tắt ngọn lửa, bắn pháo hoa Confetti và hiện thông báo Toast lộng lẫy giữa màn hình.
- 🎵 **Trình Phát Nhạc Nền**: Tích hợp sẵn bản nhạc Lofi Chill Birthday gốc (`lofi-birthday.mp3`), nghe thử và đổi bài mượt mà.
- 💳 **Mã QR Mừng Tuổi Mới**: Tích hợp mã QR VietQR / Ngân hàng và nút sao chép STK 1-Click.
- ⚙️ **Lối Tắt Admin Bí Mật**: Bấm trực tiếp vào dòng chữ nhỏ ở chân trang thiệp để mở ngay trang Admin.

---

## 📁 Cấu Trúc Dự Án

```
C:\THIEP\
├── index.html        # Trang Thiệp Mời Gửi Khách Mời
├── admin.html        # Trang Quản Lý Admin Chỉnh Sửa
├── config.js         # Cấu hình dữ liệu tiệc & 30 mẫu màu theme
├── script.js         # Trình điều khiển giao diện thiệp & hiệu ứng
├── admin.js          # Trình điều khiển trang Admin quản lý
├── style.css         # CSS Styling & Hiệu ứng 3D
├── lofi-birthday.mp3 # Bản nhạc Lofi Chill Birthday gốc
├── server.js         # Express static file server cho Render.com
├── package.json      # Khai báo dependencies Node.js
├── render.yaml       # File cấu hình Render Blueprint
└── README.md         # Tài liệu hướng dẫn sử dụng dự án
```

---

## 🚀 Hướng Dẫn Deploy Lên Render.com

1. **Đẩy Code Lên GitHub**:
   ```cmd
   cd C:\THIEP
   git add .
   git commit -m "Add README.md"
   git push origin main
   ```

2. **Deploy Trên Render.com**:
   - Chọn **New +** -> **Static Site**.
   - Chọn kho GitHub `thiep-sinh-nhat`.
   - **Publish Directory**: `.`
   - **Link Trang Thiệp**: `https://thiep-sinh-nhat.onrender.com`
   - **Link Trang Admin**: `https://thiep-sinh-nhat.onrender.com/admin.html`

---

## 💖 Tác Giả & Bản Quyền
- **Project**: Thiệp Mời Sinh Nhật Hoàng Gia 3D Online
- **Author**: Bùi Anh Khoa (buikhoa1206)
- Built with Love & Magic ✨
