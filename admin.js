/**
 * ADMIN.JS - LOGIC QUẢN TRỊ THIỆP SINH NHẬT & FULL HEX COLOR INPUT ENGINE
 */

let previewAudioObj = null;
let currentPreviewUrl = null;

document.addEventListener("DOMContentLoaded", () => {
  // 1. Nạp toàn bộ thông tin hiện tại vào form admin
  loadAdminForm();

  // 2. Nạp danh sách RSVP, Lời chúc, Playlist Nhạc, 30 Color Swatches, Theme Cards & Timeline
  renderAdminRSVPTable();
  renderAdminWishesList();
  renderAdminPlaylist();
  renderAdminThemeCards();
  renderAdminColorSwatches();
  renderAdminTimeline();

  // 3. Khởi tạo lắng nghe Avatar Upload, QR Upload, Color Picker & Submit Form
  initAvatarListener();
  initQRListener();
  initColorPickerListener();
  initFormSubmit();
});

function loadAdminForm() {
  if (typeof CONFIG === "undefined") return;

  const savedName = localStorage.getItem("birthday_custom_name") || CONFIG.name;
  const savedNickname = localStorage.getItem("birthday_custom_nickname") || CONFIG.nickname;
  const savedAge = localStorage.getItem("birthday_custom_age") || CONFIG.age;

  // Avatar
  const savedAvatar = localStorage.getItem("birthday_custom_avatar") || CONFIG.avatarUrl;
  const avatarPreview = document.getElementById("admin-avatar-preview");
  if (avatarPreview && savedAvatar) avatarPreview.src = savedAvatar;

  // Information fields
  setValue("admin-name", savedName);
  setValue("admin-nickname", savedNickname);
  setValue("admin-age", savedAge);
  setValue("admin-title", localStorage.getItem("birthday_custom_title") || CONFIG.title);
  setValue("admin-subtitle", localStorage.getItem("birthday_custom_subtitle") || CONFIG.subtitle);

  // Section Visibilities (Default true)
  setCheckbox("admin-show-countdown", localStorage.getItem("birthday_show_countdown") !== "false");
  setCheckbox("admin-show-cake", localStorage.getItem("birthday_show_cake") !== "false");
  setCheckbox("admin-show-event", localStorage.getItem("birthday_show_event") !== "false");
  setCheckbox("admin-show-timeline", localStorage.getItem("birthday_show_timeline") !== "false");
  setCheckbox("admin-show-dresscode", localStorage.getItem("birthday_show_dresscode") !== "false");
  setCheckbox("admin-show-gallery", localStorage.getItem("birthday_show_gallery") !== "false");
  setCheckbox("admin-show-qr", localStorage.getItem("birthday_show_qr") !== "false");
  setCheckbox("admin-show-rsvp", localStorage.getItem("birthday_show_rsvp") !== "false");
  setCheckbox("admin-show-wish", localStorage.getItem("birthday_show_wish") !== "false");

  // Wax Seal Customization
  setValue("admin-wax-icon", localStorage.getItem("birthday_wax_icon") || "👑");
  setValue("admin-wax-seal", localStorage.getItem("birthday_custom_wax_seal") || CONFIG.waxSealText || "ANH KHOA");
  setValue("admin-wax-subtext", localStorage.getItem("birthday_wax_subtext") || "MỞ THIỆP ✨");

  setValue("admin-event-date", localStorage.getItem("birthday_custom_event_date") || CONFIG.eventDate);
  setValue("admin-date-text", localStorage.getItem("birthday_custom_date_text") || CONFIG.dateText);
  setValue("admin-location-name", localStorage.getItem("birthday_custom_location_name") || CONFIG.locationName);
  setValue("admin-location-address", localStorage.getItem("birthday_custom_location_address") || CONFIG.locationAddress);
  setValue("admin-map-url", localStorage.getItem("birthday_custom_map_url") || CONFIG.mapUrl);
  setValue("admin-dresscode", localStorage.getItem("birthday_custom_dresscode") || CONFIG.dressCodeText);

  // Cake Tiers & Wish Toast
  setValue("admin-cake-tier-1", localStorage.getItem("birthday_cake_tier_1") || `Tuổi ${savedAge}`);
  setValue("admin-cake-tier-2", localStorage.getItem("birthday_cake_tier_2") || "✨ Happy Birthday ✨");
  setValue("admin-cake-tier-3", localStorage.getItem("birthday_cake_tier_3") || `🍓 ${savedName} 🎂`);
  setValue("admin-cake-toast", localStorage.getItem("birthday_cake_wish_toast") || `🎂 Ước nguyện của bạn đã được gửi tới ${savedName}!`);

  // RSVP Section Customization
  setValue("admin-rsvp-tagline", localStorage.getItem("birthday_rsvp_tagline") || "Xác Nhận Tham Dự");
  setValue("admin-rsvp-title", localStorage.getItem("birthday_rsvp_title") || `Gửi Phản Hồi Cho ${savedName}`);
  setValue("admin-rsvp-btn-text", localStorage.getItem("birthday_rsvp_btn_text") || "💌 Gửi Xác Nhận Tham Dự");
  setValue("admin-rsvp-toast", localStorage.getItem("birthday_rsvp_toast") || "🎉 Cảm ơn bạn đã gửi xác nhận tham dự!");

  // Wishbook Section Customization & Limit
  setValue("admin-wish-tagline", localStorage.getItem("birthday_wish_tagline") || "Sổ Lưu Bút");
  setValue("admin-wish-title", localStorage.getItem("birthday_wish_title") || "Gửi Lời Chúc Mừng Sinh Nhật");
  setValue("admin-wish-limit", localStorage.getItem("birthday_wish_limit") || "4");
  setValue("admin-wish-name-ph", localStorage.getItem("birthday_wish_name_ph") || "Tên của bạn...");
  setValue("admin-wish-msg-ph", localStorage.getItem("birthday_wish_msg_ph") || `Viết lời chúc ngọt ngào gửi tới ${savedName}...`);
  setValue("admin-wish-btn-text", localStorage.getItem("birthday_wish_btn_text") || "💖 Gửi Lời Chúc");
  setValue("admin-wish-toast", localStorage.getItem("birthday_wish_toast") || "💖 Cảm ơn lời chúc ngọt ngào của bạn!");

  // Bank Info & QR Code
  const bankInfo = CONFIG.bankInfo || {};
  setValue("admin-bank-name", localStorage.getItem("birthday_custom_bank_name") || bankInfo.bankName);
  setValue("admin-bank-acc-num", localStorage.getItem("birthday_custom_bank_acc_num") || bankInfo.accountNumber);
  setValue("admin-bank-acc-name", localStorage.getItem("birthday_custom_bank_acc_name") || bankInfo.accountName);

  const savedQR = localStorage.getItem("birthday_custom_qr_img") || bankInfo.qrUrl;
  const qrPreview = document.getElementById("admin-qr-preview");
  if (qrPreview && savedQR) qrPreview.src = savedQR;

  // Current Song Badge
  const currentSongName = localStorage.getItem("birthday_song_name") || "Lofi Chill Birthday";
  const songBadge = document.getElementById("admin-current-song-badge");
  if (songBadge) songBadge.textContent = `Bài hát đang chọn: ${currentSongName}`;

  // Primary Color Picker, Cover BG Picker, Box Color Picker & Wax Seal Color Picker
  const savedColor = localStorage.getItem("birthday_custom_primary_color") || "#f43f5e";
  const savedCoverBg = localStorage.getItem("birthday_custom_cover_bg") || "#4c0519";
  const savedBoxColor = localStorage.getItem("birthday_custom_box_color") || "#9f1239";
  const savedWaxColor = localStorage.getItem("birthday_custom_wax_color") || "#d97706";

  setValue("admin-primary-color-picker", savedColor);
  setValue("admin-cover-bg-picker", savedCoverBg);
  setValue("admin-box-color-picker", savedBoxColor);
  setValue("admin-wax-color-picker", savedWaxColor);

  setValue("admin-hex-color-input", savedColor.toUpperCase());
  setValue("admin-primary-hex-input", savedColor.toUpperCase());
  setValue("admin-cover-hex-input", savedCoverBg.toUpperCase());
  setValue("admin-box-hex-input", savedBoxColor.toUpperCase());
  setValue("admin-wax-hex-input", savedWaxColor.toUpperCase());

  adminPreviewHexColor(savedColor);
  updateLiveColorBadge(savedColor);

  // Gallery render
  renderAdminGallery();
}

function setValue(id, val) {
  const el = document.getElementById(id);
  if (el && val !== undefined) el.value = val;
}

function setCheckbox(id, isChecked) {
  const el = document.getElementById(id);
  if (el) el.checked = isChecked;
}

function getChecked(id) {
  const el = document.getElementById(id);
  return el ? (el.checked ? "true" : "false") : "true";
}

// --- CUSTOM HEX COLOR INPUT ENGINE ---
function adminPreviewHexColor(val) {
  const swatch = document.getElementById("admin-hex-preview-swatch");
  if (!swatch) return;

  let hex = val.trim();
  if (hex && !hex.startsWith("#")) hex = "#" + hex;

  if (isValidHex(hex)) {
    swatch.style.backgroundColor = hex;
  }
}

function adminUpdatePrimaryHex(val) {
  let hex = val.trim();
  if (hex && !hex.startsWith("#")) hex = "#" + hex;

  if (isValidHex(hex)) {
    localStorage.setItem("birthday_custom_primary_color", hex);
    setValue("admin-primary-color-picker", hex);
    setValue("admin-hex-color-input", hex.toUpperCase());
    adminPreviewHexColor(hex);
    updateLiveColorBadge(hex);
    renderAdminThemeCards();
    renderAdminColorSwatches();
  }
}

function adminUpdateCoverHex(val) {
  let hex = val.trim();
  if (hex && !hex.startsWith("#")) hex = "#" + hex;

  if (isValidHex(hex)) {
    localStorage.setItem("birthday_custom_cover_bg", hex);
    setValue("admin-cover-bg-picker", hex);
  }
}

function adminUpdateBoxHex(val) {
  let hex = val.trim();
  if (hex && !hex.startsWith("#")) hex = "#" + hex;

  if (isValidHex(hex)) {
    localStorage.setItem("birthday_custom_box_color", hex);
    setValue("admin-box-color-picker", hex);
  }
}

function adminUpdateWaxHex(val) {
  let hex = val.trim();
  if (hex && !hex.startsWith("#")) hex = "#" + hex;

  if (isValidHex(hex)) {
    localStorage.setItem("birthday_custom_wax_color", hex);
    setValue("admin-wax-color-picker", hex);
  }
}

function adminApplyInputHexColor() {
  const input = document.getElementById("admin-hex-color-input");
  if (!input) return;

  let raw = input.value.trim();
  if (!raw) return alert("Vui lòng nhập hoặc dán 1 mã màu Hex (VD: #f43f5e hoặc f43f5e)!");

  if (!raw.startsWith("#")) raw = "#" + raw;

  if (raw.length === 4) {
    raw = "#" + raw[1] + raw[1] + raw[2] + raw[2] + raw[3] + raw[3];
  }

  if (!isValidHex(raw)) {
    return alert("Mã màu Hex không hợp lệ! Vui lòng nhập đúng định dạng mã màu 6 ký tự (VD: #F43F5E, #FFD700, #10B981)!");
  }

  const primaryColor = raw.toLowerCase();
  const coverBg = adjustColorBrightness(primaryColor, -65);
  const boxBg = adjustColorBrightness(primaryColor, -35);

  localStorage.setItem("birthday_custom_primary_color", primaryColor);
  localStorage.setItem("birthday_custom_cover_bg", coverBg);
  localStorage.setItem("birthday_custom_box_color", boxBg);

  setValue("admin-primary-color-picker", primaryColor);
  setValue("admin-cover-bg-picker", coverBg);
  setValue("admin-box-color-picker", boxBg);

  setValue("admin-hex-color-input", primaryColor.toUpperCase());
  setValue("admin-primary-hex-input", primaryColor.toUpperCase());
  setValue("admin-cover-hex-input", coverBg.toUpperCase());
  setValue("admin-box-hex-input", boxBg.toUpperCase());

  adminPreviewHexColor(primaryColor);
  updateLiveColorBadge(primaryColor);
  renderAdminThemeCards();
  renderAdminColorSwatches();

  alert(`🎨 ĐÃ ÁP DỤNG MÃ MÀU HEX:\nMã màu ${primaryColor.toUpperCase()} đã được cập nhật thành công 100% cho thiệp mời!`);
}

function adminSelectHexChip(hexCode) {
  setValue("admin-hex-color-input", hexCode);
  adminPreviewHexColor(hexCode);
  adminApplyInputHexColor();
}

function isValidHex(hex) {
  return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
}

// --- THEMES & 30 HOT TREND COLOR SWATCHES ENGINE ---
function renderAdminThemeCards() {
  const container = document.getElementById("admin-theme-cards-container");
  if (!container || !CONFIG.themes) return;

  const currentTheme = localStorage.getItem("birthday_theme") || "rosegold";

  container.innerHTML = CONFIG.themes.map(t => {
    const isActive = t.id === currentTheme;
    return `
      <div onclick="selectAdminTheme('${t.id}', '${t.preview}')" class="p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${isActive ? 'border-rose-500 bg-rose-500/10 shadow-md scale-102' : 'border-gray-200 bg-white hover:border-rose-300'}">
        <div class="flex items-center gap-2.5">
          <span class="text-xl">${t.icon}</span>
          <div class="text-left">
            <h4 class="font-bold text-gray-900 text-xs flex items-center gap-1.5">
              ${t.name}
              ${isActive ? '<span class="text-[9px] bg-rose-500 text-white px-2 py-0.5 rounded-full font-normal">Đang chọn</span>' : ''}
            </h4>
            <p class="text-[10px] text-gray-500 truncate max-w-[140px]">${t.desc}</p>
          </div>
        </div>
        <div class="w-5 h-5 rounded-full border border-white shadow-inner shrink-0" style="background-color: ${t.preview}"></div>
      </div>
    `;
  }).join("");
}

function selectAdminTheme(themeId, colorHex) {
  localStorage.setItem("birthday_theme", themeId);
  localStorage.setItem("birthday_custom_primary_color", colorHex);

  const picker = document.getElementById("admin-primary-color-picker");
  if (picker) picker.value = colorHex;

  setValue("admin-hex-color-input", colorHex.toUpperCase());
  setValue("admin-primary-hex-input", colorHex.toUpperCase());
  adminPreviewHexColor(colorHex);
  updateLiveColorBadge(colorHex);
  renderAdminThemeCards();
  renderAdminColorSwatches();
}

function renderAdminColorSwatches() {
  const container = document.getElementById("admin-color-swatches-grid");
  if (!container || !CONFIG.themes) return;

  const savedColor = localStorage.getItem("birthday_custom_primary_color") || "#f43f5e";

  container.innerHTML = CONFIG.themes.map(t => {
    const isSelected = savedColor.toLowerCase() === t.preview.toLowerCase();
    return `
      <div onclick="selectQuickColor('${t.id}', '${t.name}', '${t.preview}')" title="${t.name} (${t.preview})" class="group relative flex flex-col items-center cursor-pointer p-1.5 rounded-xl border transition-all ${isSelected ? 'border-2 border-rose-600 bg-rose-50 shadow-md scale-105' : 'border-gray-200 bg-white hover:border-rose-400'}">
        <div class="w-7 h-7 rounded-full border border-white shadow-inner flex items-center justify-center text-white text-[10px] font-bold shrink-0" style="background-color: ${t.preview}">
          ${isSelected ? '✓' : ''}
        </div>
        <span class="text-[9px] text-gray-700 font-semibold truncate w-full text-center mt-1">${t.icon} ${t.name.split(' ')[0]}</span>
      </div>
    `;
  }).join("");
}

function updateLiveColorBadge(colorHex) {
  const badge = document.getElementById("admin-live-color-badge");
  const hexText = document.getElementById("admin-live-color-hex");
  if (badge) badge.style.backgroundColor = colorHex;
  if (hexText) hexText.textContent = colorHex.toUpperCase();
}

function selectQuickColor(themeId, themeName, colorHex) {
  localStorage.setItem("birthday_theme", themeId);
  localStorage.setItem("birthday_custom_primary_color", colorHex);

  const picker = document.getElementById("admin-primary-color-picker");
  if (picker) picker.value = colorHex;

  setValue("admin-hex-color-input", colorHex.toUpperCase());
  setValue("admin-primary-hex-input", colorHex.toUpperCase());
  adminPreviewHexColor(colorHex);
  updateLiveColorBadge(colorHex);
  renderAdminThemeCards();
  renderAdminColorSwatches();
}

function initColorPickerListener() {
  const picker = document.getElementById("admin-primary-color-picker");
  if (picker) {
    picker.addEventListener("input", (e) => {
      const colorHex = e.target.value;
      localStorage.setItem("birthday_custom_primary_color", colorHex);
      setValue("admin-hex-color-input", colorHex.toUpperCase());
      setValue("admin-primary-hex-input", colorHex.toUpperCase());
      adminPreviewHexColor(colorHex);
      updateLiveColorBadge(colorHex);
      renderAdminThemeCards();
      renderAdminColorSwatches();
    });
  }

  const coverPicker = document.getElementById("admin-cover-bg-picker");
  if (coverPicker) {
    coverPicker.addEventListener("input", (e) => {
      const hex = e.target.value;
      localStorage.setItem("birthday_custom_cover_bg", hex);
      setValue("admin-cover-hex-input", hex.toUpperCase());
    });
  }

  const boxPicker = document.getElementById("admin-box-color-picker");
  if (boxPicker) {
    boxPicker.addEventListener("input", (e) => {
      const hex = e.target.value;
      localStorage.setItem("birthday_custom_box_color", hex);
      setValue("admin-box-hex-input", hex.toUpperCase());
    });
  }

  const waxPicker = document.getElementById("admin-wax-color-picker");
  if (waxPicker) {
    waxPicker.addEventListener("input", (e) => {
      const hex = e.target.value;
      localStorage.setItem("birthday_custom_wax_color", hex);
      setValue("admin-wax-hex-input", hex.toUpperCase());
    });
  }
}

// --- GALLERY MANAGEMENT ENGINE ---
function getStoredGallery() {
  const saved = localStorage.getItem("birthday_custom_gallery");
  if (saved === null) {
    const defaultGallery = CONFIG.gallery || [];
    localStorage.setItem("birthday_custom_gallery", JSON.stringify(defaultGallery));
    return defaultGallery;
  }
  try {
    return JSON.parse(saved) || [];
  } catch (e) {
    return [];
  }
}

function renderAdminGallery() {
  const container = document.getElementById("admin-gallery-list");
  if (!container) return;

  const allPhotos = getStoredGallery();

  if (!allPhotos.length) {
    container.innerHTML = `<div class="col-span-full text-center py-6 text-xs text-gray-400">Album hiện tại đang trống (Hãy bấm nút "Khôi Phục Album Mặc Định" nếu muốn lấy lại ảnh mẫu)</div>`;
    return;
  }

  container.innerHTML = allPhotos.map((photo, idx) => `
    <div class="relative group rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-gray-50">
      <img src="${photo.url}" alt="${photo.caption || 'Kỷ niệm'}" class="h-32 w-full object-cover">
      <div class="p-2 text-[11px] truncate font-medium text-gray-700">${escapeHtml(photo.caption || 'Kỷ niệm')}</div>
      <button type="button" onclick="adminDeletePhoto(${idx})" class="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-md transition-all" title="Xóa ảnh này vĩnh viễn">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  `).join("");
}

function adminAddPhoto() {
  const fileInput = document.getElementById("admin-new-photo-file");
  const urlInput = document.getElementById("admin-new-photo-url");
  const captionInput = document.getElementById("admin-new-photo-caption");

  const caption = captionInput?.value.trim() || "Kỷ niệm mới";

  if (fileInput && fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = (evt) => {
      saveNewAdminPhoto(evt.target.result, caption);
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else if (urlInput && urlInput.value.trim()) {
    saveNewAdminPhoto(urlInput.value.trim(), caption);
  } else {
    alert("Vui lòng chọn 1 file ảnh hoặc dán link URL ảnh!");
  }
}

function saveNewAdminPhoto(url, caption) {
  const photos = getStoredGallery();
  photos.unshift({ url, caption });
  localStorage.setItem("birthday_custom_gallery", JSON.stringify(photos));

  renderAdminGallery();
  alert("📷 Đã tải ảnh lên album thành công!");

  document.getElementById("admin-new-photo-file").value = "";
  document.getElementById("admin-new-photo-url").value = "";
  document.getElementById("admin-new-photo-caption").value = "";
}

function adminDeletePhoto(idx) {
  if (!confirm("Bạn có chắc muốn xóa vĩnh viễn bức ảnh này khỏi Album?")) return;
  
  const photos = getStoredGallery();
  photos.splice(idx, 1);
  localStorage.setItem("birthday_custom_gallery", JSON.stringify(photos));
  
  renderAdminGallery();
  alert("🗑️ Đã xóa vĩnh viễn bức ảnh khỏi Album!");
}

function adminResetGallery() {
  if (!confirm("Bạn có muốn khôi phục lại toàn bộ Album ảnh mẫu ban đầu?")) return;
  localStorage.setItem("birthday_custom_gallery", JSON.stringify(CONFIG.gallery || []));
  renderAdminGallery();
  alert("🔄 Đã khôi phục Album ảnh mặc định!");
}

// --- QR CODE UPLOADER ENGINE ---
function initQRListener() {
  const fileInput = document.getElementById("admin-qr-file");
  const urlInput = document.getElementById("admin-qr-url");
  const preview = document.getElementById("admin-qr-preview");

  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          if (preview) preview.src = evt.target.result;
          localStorage.setItem("birthday_custom_qr_img", evt.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    });
  }

  if (urlInput) {
    urlInput.addEventListener("input", (e) => {
      if (e.target.value.trim()) {
        if (preview) preview.src = e.target.value.trim();
        localStorage.setItem("birthday_custom_qr_img", e.target.value.trim());
      }
    });
  }
}

// --- TIMELINE MANAGEMENT ENGINE ---
function renderAdminTimeline() {
  const container = document.getElementById("admin-timeline-list");
  if (!container) return;

  const userTimeline = JSON.parse(localStorage.getItem("birthday_custom_timeline") || "null");
  const timeline = userTimeline || CONFIG.timeline || [];

  if (!timeline.length) {
    container.innerHTML = `<p class="text-xs text-gray-400 text-center py-3">Chưa có mốc lịch trình nào</p>`;
    return;
  }

  container.innerHTML = timeline.map((item, idx) => `
    <div class="flex items-center justify-between p-3.5 bg-rose-50/50 rounded-2xl border border-rose-100 text-xs sm:text-sm">
      <div class="flex items-center gap-3">
        <span class="px-3 py-1 bg-rose-500 text-white font-bold rounded-xl text-xs shrink-0">${escapeHtml(item.time)}</span>
        <div>
          <h4 class="font-bold text-gray-900 text-xs sm:text-sm">${escapeHtml(item.title)}</h4>
          <p class="text-gray-600 text-xs mt-0.5">${escapeHtml(item.desc || '')}</p>
        </div>
      </div>

      <button type="button" onclick="adminDeleteTimelineItem(${idx})" class="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-xl flex items-center justify-center text-xs shadow-sm shrink-0" title="Xóa mốc lịch trình này">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  `).join("");
}

function adminAddTimelineItem() {
  const timeInput = document.getElementById("admin-timeline-time");
  const titleInput = document.getElementById("admin-timeline-title");
  const descInput = document.getElementById("admin-timeline-desc");

  const time = timeInput?.value.trim();
  const title = titleInput?.value.trim();
  const desc = descInput?.value.trim() || "";

  if (!time || !title) {
    return alert("Vui lòng nhập Thời gian (VD: 18:00) và Tiêu đề mốc tiệc!");
  }

  const userTimeline = JSON.parse(localStorage.getItem("birthday_custom_timeline") || "null") || [...CONFIG.timeline];
  userTimeline.push({ time, title, desc });
  localStorage.setItem("birthday_custom_timeline", JSON.stringify(userTimeline));

  renderAdminTimeline();
  alert("🕒 Đã thêm mốc lịch trình mới thành công!");

  if (timeInput) timeInput.value = "";
  if (titleInput) titleInput.value = "";
  if (descInput) descInput.value = "";
}

function adminDeleteTimelineItem(idx) {
  if (!confirm("Bạn có chắc muốn xóa mốc lịch trình này?")) return;

  const userTimeline = JSON.parse(localStorage.getItem("birthday_custom_timeline") || "null") || [...CONFIG.timeline];
  userTimeline.splice(idx, 1);
  localStorage.setItem("birthday_custom_timeline", JSON.stringify(userTimeline));

  renderAdminTimeline();
}

// --- MUSIC MANAGEMENT ENGINE ---
function renderAdminPlaylist() {
  const container = document.getElementById("admin-playlist-container");
  if (!container || !CONFIG.chillPlaylist) return;

  const currentUrl = localStorage.getItem("birthday_song_url") || CONFIG.musicUrl;

  container.innerHTML = CONFIG.chillPlaylist.map(song => {
    const isSelected = currentUrl.includes(song.url);
    const isPlayingThis = previewAudioObj && !previewAudioObj.paused && currentPreviewUrl === song.url;
    return `
      <div class="p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between ${isSelected ? 'border-rose-500 bg-rose-500/10 shadow-sm' : 'border-gray-200 bg-white'}">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center text-sm font-bold shrink-0">
            <i class="fas ${isPlayingThis ? 'fa-volume-up animate-pulse text-rose-600' : 'fa-music'}"></i>
          </div>
          <div>
            <h4 class="font-bold text-gray-900 text-xs sm:text-sm flex items-center gap-1.5">
              ${song.name}
              ${isSelected ? '<span class="text-[10px] bg-rose-500 text-white px-2 py-0.5 rounded-full font-normal">Đang dùng</span>' : ''}
            </h4>
            <p class="text-[11px] text-gray-500">${song.artist}</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button type="button" onclick="previewSong('${song.url}')" class="px-3 py-1.5 ${isPlayingThis ? 'bg-rose-500 text-white shadow-md' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} text-xs font-semibold rounded-xl transition-all flex items-center gap-1 cursor-pointer">
            <i class="fas ${isPlayingThis ? 'fa-pause' : 'fa-play'} text-[10px]"></i> ${isPlayingThis ? 'Tạm Dừng' : 'Nghe Thử'}
          </button>
          <button type="button" onclick="selectAdminSong('${song.name}', '${song.url}')" class="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer">
            Chọn Bài Này
          </button>
        </div>
      </div>
    `;
  }).join("");
}

function previewSong(songUrl) {
  if (previewAudioObj && currentPreviewUrl === songUrl) {
    if (previewAudioObj.paused) {
      previewAudioObj.play().then(() => renderAdminPlaylist()).catch(e => alert("Không thể phát nhạc: " + e.message));
    } else {
      previewAudioObj.pause();
      renderAdminPlaylist();
    }
    return;
  }

  if (previewAudioObj) {
    previewAudioObj.pause();
  }

  previewAudioObj = new Audio(songUrl);
  currentPreviewUrl = songUrl;
  
  previewAudioObj.play().then(() => {
    renderAdminPlaylist();
  }).catch(e => {
    alert("Không thể phát nhạc từ link này: " + e.message);
  });
}

function selectAdminSong(name, url) {
  localStorage.setItem("birthday_song_url", url);
  localStorage.setItem("birthday_song_name", name);

  const badge = document.getElementById("admin-current-song-badge");
  if (badge) badge.textContent = `Bài hát đang chọn: ${name}`;

  renderAdminPlaylist();
  alert(`🎵 Đã chọn bài hát làm nhạc nền thiệp: ${name}`);
}

function adminApplyCustomMusic() {
  const fileInput = document.getElementById("admin-music-file");
  const urlInput = document.getElementById("admin-custom-song-url");

  if (fileInput && fileInput.files && fileInput.files[0]) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      selectAdminSong(file.name, evt.target.result);
      alert("🎵 Đã tải file MP3 cá nhân lên làm nhạc nền thiệp thành công!");
    };
    reader.readAsDataURL(file);
  } else if (urlInput && urlInput.value.trim()) {
    selectAdminSong("Nhạc Cá Nhân MP3", urlInput.value.trim());
    alert("🎵 Đã áp dụng đường link MP3 làm nhạc nền thiệp!");
  } else {
    alert("Vui lòng chọn 1 file MP3 từ máy hoặc dán link URL MP3!");
  }
}

// --- AVATAR LISTENER ---
function initAvatarListener() {
  const fileInput = document.getElementById("admin-avatar-file");
  const urlInput = document.getElementById("admin-avatar-url");
  const preview = document.getElementById("admin-avatar-preview");

  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          if (preview) preview.src = evt.target.result;
          localStorage.setItem("birthday_custom_avatar", evt.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    });
  }

  if (urlInput) {
    urlInput.addEventListener("input", (e) => {
      if (e.target.value.trim()) {
        if (preview) preview.src = e.target.value.trim();
        localStorage.setItem("birthday_custom_avatar", e.target.value.trim());
      }
    });
  }
}

// --- GLOBAL SAVE FUNCTION (GUARANTEED 100% RELIABLE) ---
function saveAllAdminData(e) {
  if (e) e.preventDefault();

  const name = getVal("admin-name") || (typeof CONFIG !== "undefined" ? CONFIG.name : "Bùi Anh Khoa");
  const age = getVal("admin-age") || (typeof CONFIG !== "undefined" ? CONFIG.age : "20");

  localStorage.setItem("birthday_custom_name", name);
  localStorage.setItem("birthday_custom_nickname", getVal("admin-nickname") || name);
  localStorage.setItem("birthday_custom_age", age);
  localStorage.setItem("birthday_custom_title", getVal("admin-title"));
  localStorage.setItem("birthday_custom_subtitle", getVal("admin-subtitle"));

  // Save Section Visibilities
  localStorage.setItem("birthday_show_countdown", getChecked("admin-show-countdown"));
  localStorage.setItem("birthday_show_cake", getChecked("admin-show-cake"));
  localStorage.setItem("birthday_show_event", getChecked("admin-show-event"));
  localStorage.setItem("birthday_show_timeline", getChecked("admin-show-timeline"));
  localStorage.setItem("birthday_show_dresscode", getChecked("admin-show-dresscode"));
  localStorage.setItem("birthday_show_gallery", getChecked("admin-show-gallery"));
  localStorage.setItem("birthday_show_qr", getChecked("admin-show-qr"));
  localStorage.setItem("birthday_show_rsvp", getChecked("admin-show-rsvp"));
  localStorage.setItem("birthday_show_wish", getChecked("admin-show-wish"));

  // Save Wax Seal Customization
  localStorage.setItem("birthday_wax_icon", getVal("admin-wax-icon"));
  localStorage.setItem("birthday_custom_wax_seal", getVal("admin-wax-seal"));
  localStorage.setItem("birthday_wax_subtext", getVal("admin-wax-subtext"));

  localStorage.setItem("birthday_custom_event_date", getVal("admin-event-date"));
  localStorage.setItem("birthday_custom_date_text", getVal("admin-date-text"));
  localStorage.setItem("birthday_custom_location_name", getVal("admin-location-name"));
  localStorage.setItem("birthday_custom_location_address", getVal("admin-location-address"));
  localStorage.setItem("birthday_custom_map_url", getVal("admin-map-url"));
  localStorage.setItem("birthday_custom_dresscode", getVal("admin-dresscode"));

  // Save Cake Customization
  localStorage.setItem("birthday_cake_tier_1", getVal("admin-cake-tier-1"));
  localStorage.setItem("birthday_cake_tier_2", getVal("admin-cake-tier-2"));
  localStorage.setItem("birthday_cake_tier_3", getVal("admin-cake-tier-3"));
  localStorage.setItem("birthday_cake_wish_toast", getVal("admin-cake-toast"));

  // Save RSVP Section Customization
  localStorage.setItem("birthday_rsvp_tagline", getVal("admin-rsvp-tagline"));
  localStorage.setItem("birthday_rsvp_title", getVal("admin-rsvp-title"));
  localStorage.setItem("birthday_rsvp_btn_text", getVal("admin-rsvp-btn-text"));
  localStorage.setItem("birthday_rsvp_toast", getVal("admin-rsvp-toast"));

  // Save Wishbook Section Customization & Limit
  localStorage.setItem("birthday_wish_tagline", getVal("admin-wish-tagline"));
  localStorage.setItem("birthday_wish_title", getVal("admin-wish-title"));
  localStorage.setItem("birthday_wish_limit", getVal("admin-wish-limit"));
  localStorage.setItem("birthday_wish_name_ph", getVal("admin-wish-name-ph"));
  localStorage.setItem("birthday_wish_msg_ph", getVal("admin-wish-msg-ph"));
  localStorage.setItem("birthday_wish_btn_text", getVal("admin-wish-btn-text"));
  localStorage.setItem("birthday_wish_toast", getVal("admin-wish-toast"));

  localStorage.setItem("birthday_custom_bank_name", getVal("admin-bank-name"));
  localStorage.setItem("birthday_custom_bank_acc_num", getVal("admin-bank-acc-num"));
  localStorage.setItem("birthday_custom_bank_acc_name", getVal("admin-bank-acc-name"));

  const primaryColor = getVal("admin-primary-color-picker") || getVal("admin-primary-hex-input");
  if (primaryColor) localStorage.setItem("birthday_custom_primary_color", primaryColor);

  const coverBg = getVal("admin-cover-bg-picker") || getVal("admin-cover-hex-input");
  if (coverBg) localStorage.setItem("birthday_custom_cover_bg", coverBg);

  const boxColor = getVal("admin-box-color-picker") || getVal("admin-box-hex-input");
  if (boxColor) localStorage.setItem("birthday_custom_box_color", boxColor);

  const waxColor = getVal("admin-wax-color-picker") || getVal("admin-wax-hex-input");
  if (waxColor) localStorage.setItem("birthday_custom_wax_color", waxColor);

  alert("🎉 ĐÃ LƯU THÀNH CÔNG!\nToàn bộ thay đổi đã được lưu lại. Đang mở trang Thiệp Mời...");
  window.open("index.html", "_blank");
}

function initFormSubmit() {
  const form = document.getElementById("admin-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    saveAllAdminData(e);
  });
}

function adjustColorBrightness(hex, percent) {
  let num = parseInt(hex.replace("#",""), 16),
  amt = Math.round(2.55 * percent),
  R = (num >> 16) + amt,
  G = (num >> 8 & 0x00FF) + amt,
  B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R<255?R<0?0:R:255)*0x10000 + (G<255?G<0?0:G:255)*0x100 + (B<255?B<0?0:B:255)).toString(16).slice(1);
}

function getVal(id) {
  return document.getElementById(id)?.value.trim() || "";
}

// --- RSVP TABLE & WISHES LIST ---
function renderAdminRSVPTable() {
  const tbody = document.getElementById("admin-rsvp-table");
  if (!tbody) return;

  const rsvps = JSON.parse(localStorage.getItem("birthday_rsvps") || "[]");

  if (!rsvps.length) {
    tbody.innerHTML = `<tr><td colspan="6" class="p-4 text-center text-gray-400">Chưa có khách gửi phản hồi RSVP</td></tr>`;
    return;
  }

  tbody.innerHTML = rsvps.map(r => `
    <tr class="hover:bg-rose-50/40">
      <td class="p-3 font-bold text-gray-900">${escapeHtml(r.name)}</td>
      <td class="p-3 text-gray-600">${escapeHtml(r.phone || '-')}</td>
      <td class="p-3 font-semibold ${r.status?.includes('Chắc chắn') ? 'text-green-600' : 'text-rose-600'}">${escapeHtml(r.status || '')}</td>
      <td class="p-3 text-gray-700">${escapeHtml(r.guests || '1')}</td>
      <td class="p-3 text-gray-500 italic text-xs">${escapeHtml(r.note || '-')}</td>
      <td class="p-3 text-gray-400 text-xs">${r.date || '-'}</td>
    </tr>
  `).join("");
}

function clearRSVPs() {
  if (!confirm("Bạn có chắc muốn xóa toàn bộ danh sách RSVP?")) return;
  localStorage.removeItem("birthday_rsvps");
  renderAdminRSVPTable();
}

function renderAdminWishesList() {
  const container = document.getElementById("admin-wishes-list");
  if (!container) return;

  const userWishes = JSON.parse(localStorage.getItem("birthday_wishes") || "[]");
  const sampleWishes = CONFIG.sampleWishes || [];
  const allWishes = [...userWishes, ...sampleWishes];

  if (!allWishes.length) {
    container.innerHTML = `<p class="text-xs text-gray-400 text-center py-4">Chưa có lời chúc nào từ khách mời</p>`;
    return;
  }

  container.innerHTML = allWishes.map((w, idx) => `
    <div class="flex items-center justify-between p-3.5 bg-rose-50/50 rounded-2xl border border-rose-100 text-xs">
      <div>
        <div class="flex items-center gap-2">
          <span class="font-bold text-rose-600 text-sm">${escapeHtml(w.name)}</span>
          <span class="text-[10px] text-gray-400">(${w.time || 'Vừa xong'})</span>
        </div>
        <p class="text-gray-700 italic mt-0.5">"${escapeHtml(w.message)}"</p>
      </div>
      <button onclick="adminDeleteWish(${idx})" class="text-red-500 hover:text-red-700 p-1.5 rounded-xl hover:bg-red-50" title="Xóa lời chúc này">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  `).join("");
}

function adminDeleteWish(idx) {
  const userWishes = JSON.parse(localStorage.getItem("birthday_wishes") || "[]");
  userWishes.splice(idx, 1);
  localStorage.setItem("birthday_wishes", JSON.stringify(userWishes));
  renderAdminWishesList();
}

function clearWishes() {
  if (!confirm("Bạn có chắc muốn xóa tất cả lời chúc?")) return;
  localStorage.removeItem("birthday_wishes");
  renderAdminWishesList();
}

// --- EXPORT TO EXCEL / CSV ENGINE ---
function exportRSVPToExcel() {
  const rsvps = JSON.parse(localStorage.getItem("birthday_rsvps") || "[]");

  if (!rsvps.length) {
    return alert("Chưa có dữ liệu khách gửi phản hồi RSVP để xuất file Excel!");
  }

  // Define CSV Header with UTF-8 BOM for Microsoft Excel Vietnamese font compatibility
  let csvContent = "\uFEFF";
  csvContent += "Họ và Tên,Số Điện Thoại,Trạng Thái Tham Dự,Số Người Đi Cùng,Ghi Chú / Phản Hồi,Thời Gian Gửi\n";

  rsvps.forEach(r => {
    const name = cleanCsvValue(r.name);
    const phone = cleanCsvValue(r.phone || "-");
    const status = cleanCsvValue(r.status || "");
    const guests = cleanCsvValue(r.guests || "1");
    const note = cleanCsvValue(r.note || "-");
    const date = cleanCsvValue(r.date || "-");

    csvContent += `"${name}","${phone}","${status}","${guests}","${note}","${date}"\n`;
  });

  downloadCsvFile(csvContent, "Danh_Sach_Khach_Moi_RSVP_Sinh_Nhat.csv");
}

function exportWishesToExcel() {
  const userWishes = JSON.parse(localStorage.getItem("birthday_wishes") || "[]");
  const sampleWishes = CONFIG.sampleWishes || [];
  const allWishes = [...userWishes, ...sampleWishes];

  if (!allWishes.length) {
    return alert("Chưa có dữ liệu lời chúc từ khách mời để xuất file Excel!");
  }

  let csvContent = "\uFEFF";
  csvContent += "Người Gửi Lời Chúc,Nội Dung Lời Chúc,Thời Gian\n";

  allWishes.forEach(w => {
    const name = cleanCsvValue(w.name);
    const message = cleanCsvValue(w.message);
    const time = cleanCsvValue(w.time || "Gần đây");

    csvContent += `"${name}","${message}","${time}"\n`;
  });

  downloadCsvFile(csvContent, "Danh_Sach_Loi_Chuc_Sinh_Nhat.csv");
}

function cleanCsvValue(val) {
  if (!val) return "";
  return String(val).replace(/"/g, '""');
}

function downloadCsvFile(content, fileName) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
