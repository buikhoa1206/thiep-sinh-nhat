/**
 * CONFIG.JS - TOÀN BỘ CẤU HÌNH THÔNG TIN TIỆC SINH NHẬT & 30 MẪU MÀU HOT TREND 2026
 */

const CONFIG = {
  // --- THÔNG TIN TIỆC SINH NHẬT ---
  name: "Nguyễn Minh Anh",
  nickname: "Minh Anh",
  age: "20",
  title: "CELEBRATING 20TH BIRTHDAY",
  subtitle: "Trân trọng kính mời bạn đến tham dự đêm tiệc mừng tuổi 20 ngọt ngào & rực rỡ nhất!",
  waxSealText: "MA 20",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",

  // --- THỜI GIAN & ĐỊA ĐIỂM ---
  eventDate: "2026-09-15 18:00:00",
  dateText: "Thứ Ba, Ngày 15/09/2026",
  timeText: "18:00 PM (Đón khách từ 17:30)",
  locationName: "GEM Center - Ball Room",
  locationAddress: "Số 8 Nguyễn Bỉnh Khiêm, Phường Đa Kao, Quận 1, TP.HCM",
  mapUrl: "https://maps.google.com/?q=GEM+Center+Ho+Chi+Minh",

  // --- DRESSCODE GOI Y ---
  dressCodeText: "Trắng Kem / Hồng Pastel / Champagne",
  dressCodeColors: [
    { name: "Trắng Kem", hex: "#fffdd0" },
    { name: "Hồng Pastel", hex: "#ffd1dc" },
    { name: "Champagne", hex: "#f7e7ce" },
    { name: "Vàng Ánh Kim", hex: "#eab308" }
  ],

  // --- NGHỆ THUẬT & HÌNH ẢNH ALBUM ---
  gallery: [
    { url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80", caption: "Đêm tiệc sinh nhật rực rỡ ✨" },
    { url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80", caption: "Bóng bong & Nến cầu nguyện 🎈" },
    { url: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&q=80", caption: "Bánh ngọt ngọt ngào tuổi 20 🎂" },
    { url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80", caption: "Khoảnh khắc tươi đẹp tuổi trẻ 💕" }
  ],

  // --- BẢNG 30 MẪU MÀU & THEME HOT TREND 2026 ---
  themes: [
    { id: "rosegold", name: "Rose Gold Luxury", icon: "🌸", desc: "Hồng Kim Sang Trọng & Lãng Mạn", preview: "#f43f5e", color: "#f43f5e" },
    { id: "midnight", name: "Midnight Starry Gold", icon: "🌙", desc: "Đêm Dải Ngân Hà & Vàng Quyến Rũ", preview: "#eab308", color: "#eab308" },
    { id: "lavender", name: "Sweet Lavender Pearl", icon: "💜", desc: "Tím Oải Hương & Trắng Ngọc Trai", preview: "#9333ea", color: "#9333ea" },
    { id: "botanical", name: "Botanical Sage Green", icon: "🌿", desc: "Xanh Thiên Nhiên & Vintage Chic", preview: "#16a34a", color: "#16a34a" },
    { id: "neon", name: "Neon Cyber Party", icon: "🖤", desc: "Đêm Đèn Neon Cá Tính & Rực Rỡ", preview: "#ec4899", color: "#ec4899" },
    { id: "ocean", name: "Ocean Breeze Aqua", icon: "🌊", desc: "Xanh Biển Tươi Mát & Phóng Khoáng", preview: "#06b6d4", color: "#06b6d4" },
    { id: "peach", name: "Peach Sunset Glow", icon: "🍑", desc: "Cam Đào Hoàng Hôn Ấm Áp", preview: "#f97316", color: "#f97316" },
    { id: "matcha", name: "Matcha Latte Cream", icon: "🍵", desc: "Xanh Trà Sữa Matcha Hàn Quốc", preview: "#84cc16", color: "#84cc16" },
    { id: "sapphire", name: "Royal Sapphire Blue", icon: "💎", desc: "Xanh Hoàng Gia Quý Phái", preview: "#2563eb", color: "#2563eb" },
    { id: "cherry", name: "Cherry Red Passion", icon: "🍒", desc: "Đỏ Mận Quyến Rũ & Nổi Bật", preview: "#dc2626", color: "#dc2626" },
    { id: "champagne", name: "Warm Champagne Gold", icon: "🥂", desc: "Vàng Rượu Champagne Ấm Áp", preview: "#d97706", color: "#d97706" },
    { id: "cottoncandy", name: "Cotton Candy Pink", icon: "🍧", desc: "Hồng Kẹo Bông Ngọt Ngào", preview: "#f472b6", color: "#f472b6" },
    { id: "plum", name: "Vintage Plum Wine", icon: "🍇", desc: "Tím Mận Chín Độc Đáo", preview: "#7e22ce", color: "#7e22ce" },
    { id: "emerald", name: "Deep Emerald Forest", icon: "🌲", desc: "Xanh Lục Bảo Huyền Bí", preview: "#047857", color: "#047857" },
    { id: "espresso", name: "Rich Espresso Mocha", icon: "☕", desc: "Nâu Cà Phê Espresso Sang Trọng", preview: "#78350f", color: "#78350f" },
    { id: "coral", name: "Coral Reef Sunset", icon: "🌅", desc: "Cam San Hô Hạn Nắng", preview: "#fb923c", color: "#fb923c" },
    { id: "periwinkle", name: "Periwinkle Blue Bloom", icon: "🪻", desc: "Xanh Tím Hoa Dừa Mới Lạ", preview: "#6366f1", color: "#6366f1" },
    { id: "galaxy", name: "Galaxy Electric Violet", icon: "🌌", desc: "Tím Điện Tử Huyền Diệu", preview: "#8b5cf6", color: "#8b5cf6" },
    { id: "lemon", name: "Lemon Chiffon Sunshine", icon: "🍋", desc: "Vàng Nắng Chanh Tươi Trẻ", preview: "#facc15", color: "#facc15" },
    { id: "terracotta", name: "Terracotta Rust Warmth", icon: "🪸", desc: "Đất Nung Terracotta Retro", preview: "#c2410c", color: "#c2410c" },
    { id: "mint", name: "Eucalyptus Mint Soft", icon: "🍃", desc: "Xanh Bạc Hà Eucalyptus Nhẹ Nhàng", preview: "#10b981", color: "#10b981" },
    { id: "fuchsia", name: "Fuchsia Magenta Glam", icon: "🌺", desc: "Hồng Fuchsia Thời Thượng", preview: "#e11d48", color: "#e11d48" },
    { id: "slate", name: "Slate Minimal Silver", icon: "🪨", desc: "Tối Giản Xám Bạc Hiện Đại", preview: "#64748b", color: "#64748b" },
    { id: "bordeaux", name: "Bordeaux Velvet Red", icon: "🍷", desc: "Đỏ Nhung Bordeaux Quý Phái", preview: "#991b1b", color: "#991b1b" },
    { id: "cashmere", name: "Nude Cashmere Beige", icon: "🐚", desc: "Tông Nude Cashmere Thanh Lịch", preview: "#b45309", color: "#b45309" },
    { id: "flamingo", name: "Flamingo Coral Pink", icon: "🦩", desc: "Hồng Hạc San Hô Tươi Tắn", preview: "#fb7185", color: "#fb7185" },
    { id: "blueberry", name: "Blueberry Twilight", icon: "🫐", desc: "Xanh Việt Quất Hoàng Hôn", preview: "#3b82f6", color: "#3b82f6" },
    { id: "avocado", name: "Avocado Green Chic", icon: "🥑", desc: "Xanh Bơ Trendy Hàn Quốc", preview: "#65a30d", color: "#65a30d" },
    { id: "imperial", name: "Imperial Gold Luxe", icon: "⚜️", desc: "Vàng Hoàng Gia Imperial", preview: "#ca8a04", color: "#ca8a04" },
    { id: "rainbow", name: "Pastel Rainbow Dreams", icon: "🦄", desc: "Cầu Vồng Pastel Mộng Mơ", preview: "#a855f7", color: "#a855f7" }
  ],

  // --- PLAYLIST NHẠC CHILL ---
  musicUrl: "lofi-birthday.mp3",
  chillPlaylist: [
    { id: "lofi", name: "🌸 Lofi Chill Birthday (Bài Gốc)", artist: "Lofi Beats", url: "lofi-birthday.mp3" },
    { id: "acoustic", name: "☕ Acoustic Guitar Birthday", artist: "Chill Acoustic", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { id: "jazz", name: "🎷 Sweet Birthday Jazz", artist: "Jazz Trio Lounge", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    { id: "party", name: "🎈 Celebration Pop Chill", artist: "Pop Vibe", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" }
  ],

  // --- LỊCH TRÌNH TIỆC ---
  timeline: [
    { time: "17:30", title: "Đón Khách & Chụp Ảnh Kỷ Niệm 📸", desc: "Gặp gỡ, check-in thảm đỏ & lưu giữ khoảnh khắc tại backdrop" },
    { time: "18:30", title: "Khai Mạc Đêm Tiệc & Thổi Nến 🎂", desc: "Phát biểu khai mạc, cắt bánh sinh nhật & thổi nến ước nguyện" },
    { time: "19:00", title: "Dùng Tiệc Buffet & Giao Lưu 🍷", desc: "Thưởng thức ẩm thực cao cấp & hòa mình cùng âm nhạc" },
    { time: "20:30", title: "Mini Game & Bốc Thăm Trúng Thưởng 🎁", desc: "Các trò chơi vui nhộn & nhận quà kỷ niệm ngọt ngào" }
  ],

  // --- THÔNG TIN MỪNG TUỔI MỚI / BANK QR ---
  bankInfo: {
    bankName: "MB Bank",
    accountNumber: "999988882026",
    accountName: "NGUYEN MINH ANH",
    qrUrl: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=STK:999988882026-BANK:MBBANK-NAME:NGUYEN+MINH+ANH"
  },

  // --- LỜI NHẮN HỘP QUÀ BÍ MẬT ---
  secretGiftMessage: "Sự hiện diện của bạn tại buổi tiệc chính là món quà ý nghĩa nhất dành cho Minh Anh! 💕 Thật mong chờ được gặp bạn!",

  // --- LỜI CHÚC MẪU ---
  sampleWishes: [
    { name: "Hoàng Yến", message: "Chúc Minh Anh tuổi 20 luôn rạng rỡ, xinh đẹp và gặt hái được thật nhiều thành công nhé! 🌸✨", time: "2 giờ trước" },
    { name: "Bảo Nam", message: "Happy 20th Birthday! Chúc bạn tuổi mới luôn tràn ngập niềm vui và hạnh phúc! 🎉🥂", time: "4 giờ trước" }
  ]
};

if (typeof module !== "undefined") {
  module.exports = CONFIG;
}
