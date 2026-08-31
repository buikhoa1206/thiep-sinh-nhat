/**
 * SCRIPT.JS - GUEST INVITATION MODE & LUXURY TOAST POPUP ENGINE
 */

let currentTheme = "rosegold";
let currentSongName = "Lofi Chill Birthday";
let isAdminMode = false;
let isEnvelopeOpening = false;

document.addEventListener("DOMContentLoaded", () => {
  // 1. Kiểm tra Chế Độ Admin / Chủ Tiệc
  checkAdminMode();

  // 2. Tải Theme & Bảng Màu Tùy Chỉnh từ LocalStorage
  const savedTheme = localStorage.getItem("birthday_theme") || "rosegold";
  applyTheme(savedTheme);

  // 3. Load thông tin tiệc, Avatar & Ẩn/Hiện Các Mục từ LocalStorage/CONFIG
  loadConfigData();

  // 4. Đếm ngược thời gian
  initCountdown();

  // 5. Khởi tạo Trình Phát Nhạc
  initMusicPlayer();

  // 6. Khởi tạo Lời chúc, RSVP, Timeline, Dresscode & Forms
  initWishesAndRSVP();
  renderTimeline();
  renderDressCodeColors();
  initAddPhotoForm();
  initAvatarForm();

  // 7. Lắng nghe tương tác phát nhạc
  setupAutoplayListener();

  // 8. Lắng nghe sự kiện Storage thay đổi từ trang Admin để tự động làm mới giao diện thời gian thực
  window.addEventListener('storage', () => {
    loadConfigData();
    const currentSavedTheme = localStorage.getItem("birthday_theme") || "rosegold";
    applyTheme(currentSavedTheme);
  });
});

// --- LUXURY ROYAL 3D ENVELOPE OPENING ---
function openInvitation() {
  if (isEnvelopeOpening) return;
  isEnvelopeOpening = true;

  const envelope3d = document.getElementById("envelope-3d");
  const envelopeScreen = document.getElementById("envelope-screen");
  const mainContent = document.getElementById("main-content");

  if (envelope3d) envelope3d.classList.add("open");

  try { playAudio(); } catch(e) { console.log(e); }
  try { fireConfetti(); } catch(e) { console.log(e); }

  setTimeout(() => {
    if (mainContent) {
      mainContent.classList.remove("hidden");
      mainContent.style.display = "block";
    }

    if (envelopeScreen) {
      envelopeScreen.style.opacity = "0";
      envelopeScreen.style.pointerEvents = "none";
      setTimeout(() => {
        envelopeScreen.style.display = "none";
      }, 500);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 750);
}

// --- ADMIN MODE & DATA SYNC ---
function checkAdminMode() {
  const urlParams = new URLSearchParams(window.location.search);
  const adminParam = urlParams.get('admin');
  const storedAdmin = localStorage.getItem('birthday_admin_mode') === 'true';

  if (adminParam === 'true' || storedAdmin) {
    isAdminMode = true;
    localStorage.setItem('birthday_admin_mode', 'true');
  } else {
    isAdminMode = false;
  }

  updateAdminUI();
}

function toggleAdminMode() {
  isAdminMode = !isAdminMode;
  localStorage.setItem('birthday_admin_mode', isAdminMode ? 'true' : 'false');
  updateAdminUI();

  if (isAdminMode) {
    showToast("⚙️ Đã bật Chế Độ Chủ Tiệc (Bạn có thể tùy chỉnh Avatar, Mẫu thiệp, Ảnh album)");
  } else {
    showToast("👁️ Đã chuyển sang Chế Độ Khách Mời (Giao diện sạch để gửi thiệp đi)");
  }
}

function updateAdminUI() {
  const adminElements = document.querySelectorAll(".admin-only");
  adminElements.forEach(el => {
    if (isAdminMode) {
      el.classList.remove("hidden");
    } else {
      el.classList.add("hidden");
    }
  });

  const toggleBtnText = document.getElementById("admin-toggle-text");
  if (toggleBtnText) {
    toggleBtnText.textContent = isAdminMode ? "👁️ Xem Giao Diện Khách Mời" : "⚙️ Chỉnh Sửa Thiệp (Chủ Tiệc)";
  }

  const adminBadge = document.getElementById("admin-badge");
  if (adminBadge) {
    if (isAdminMode) {
      adminBadge.classList.remove("hidden");
    } else {
      adminBadge.classList.add("hidden");
    }
  }

  renderGallery();
}

// --- LOAD CONFIG & ADMIN DATA ---
function loadConfigData() {
  if (typeof CONFIG === "undefined") return;

  const name = localStorage.getItem("birthday_custom_name") || CONFIG.name;
  const nickname = localStorage.getItem("birthday_custom_nickname") || CONFIG.nickname || name;
  const age = localStorage.getItem("birthday_custom_age") || CONFIG.age;
  const title = localStorage.getItem("birthday_custom_title") || CONFIG.title;
  const subtitle = localStorage.getItem("birthday_custom_subtitle") || CONFIG.subtitle;

  // Apply Section Visibilities
  toggleSectionVisibility("section-countdown", localStorage.getItem("birthday_show_countdown") !== "false");
  toggleSectionVisibility("section-cake", localStorage.getItem("birthday_show_cake") !== "false");
  toggleSectionVisibility("section-event", localStorage.getItem("birthday_show_event") !== "false");

  const showTimeline = localStorage.getItem("birthday_show_timeline") !== "false";
  const showDresscode = localStorage.getItem("birthday_show_dresscode") !== "false";
  toggleSectionVisibility("section-timeline", showTimeline);
  toggleSectionVisibility("section-dresscode", showDresscode);

  const timelineContainer = document.getElementById("section-timeline-dresscode");
  if (timelineContainer) {
    if (!showTimeline && !showDresscode) {
      timelineContainer.classList.add("hidden");
    } else {
      timelineContainer.classList.remove("hidden");
    }
  }

  toggleSectionVisibility("section-gallery", localStorage.getItem("birthday_show_gallery") !== "false");
  toggleSectionVisibility("section-qr", localStorage.getItem("birthday_show_qr") !== "false");
  toggleSectionVisibility("rsvp-section", localStorage.getItem("birthday_show_rsvp") !== "false");
  toggleSectionVisibility("wish-section", localStorage.getItem("birthday_show_wish") !== "false");

  // Wax Seal Dynamic Data
  const waxIcon = localStorage.getItem("birthday_wax_icon") || "👑";
  const waxSealText = localStorage.getItem("birthday_custom_wax_seal") || CONFIG.waxSealText || "ANH KHOA";
  const waxSubtext = localStorage.getItem("birthday_wax_subtext") || "MỞ THIỆP ✨";

  setTextContent("wax-seal-icon", waxIcon);
  setTextContent("wax-seal-text", waxSealText);
  setTextContent("wax-seal-subtext", waxSubtext);

  const dateText = localStorage.getItem("birthday_custom_date_text") || CONFIG.dateText;
  const timeText = CONFIG.timeText;
  const locationName = localStorage.getItem("birthday_custom_location_name") || CONFIG.locationName;
  const locationAddress = localStorage.getItem("birthday_custom_location_address") || CONFIG.locationAddress;
  const mapUrl = localStorage.getItem("birthday_custom_map_url") || CONFIG.mapUrl;
  const dressCodeText = localStorage.getItem("birthday_custom_dresscode") || CONFIG.dressCodeText;

  document.title = `Thiệp Mời Sinh Nhật - ${name}`;

  setTextContent("config-name", name);
  setTextContent("config-nickname", nickname);
  setTextContent("config-age", age);
  setTextContent("config-title", title);
  setTextContent("config-subtitle", subtitle);

  setTextContent("config-dateText", dateText);
  setTextContent("config-timeText", timeText);
  setTextContent("config-locationName", locationName);
  setTextContent("config-locationAddress", locationAddress);
  setTextContent("config-dressCodeText", dressCodeText);

  // Cake Tiers Text
  const cakeTier1 = localStorage.getItem("birthday_cake_tier_1") || `Tuổi ${age}`;
  const cakeTier2 = localStorage.getItem("birthday_cake_tier_2") || "✨ Happy Birthday ✨";
  const cakeTier3 = localStorage.getItem("birthday_cake_tier_3") || `🍓 ${name} 🎂`;

  setTextContent("cake-tier-1", cakeTier1);
  setTextContent("cake-tier-2", cakeTier2);
  setTextContent("cake-tier-3", cakeTier3);

  // RSVP Section Customization
  const rsvpTagline = localStorage.getItem("birthday_rsvp_tagline") || "Xác Nhận Tham Dự";
  const rsvpTitle = localStorage.getItem("birthday_rsvp_title") || `Gửi Phản Hồi Cho ${name}`;
  const rsvpBtnText = localStorage.getItem("birthday_rsvp_btn_text") || "💌 Gửi Xác Nhận Tham Dự";

  setTextContent("rsvp-tagline", rsvpTagline);
  setTextContent("rsvp-title", rsvpTitle);
  setTextContent("rsvp-btn-text", rsvpBtnText);

  // Wishbook Section Customization
  const wishTagline = localStorage.getItem("birthday_wish_tagline") || "Sổ Lưu Bút";
  const wishTitle = localStorage.getItem("birthday_wish_title") || "Gửi Lời Chúc Mừng Sinh Nhật";
  const wishNamePh = localStorage.getItem("birthday_wish_name_ph") || "Tên của bạn...";
  const wishMsgPh = localStorage.getItem("birthday_wish_msg_ph") || `Viết lời chúc ngọt ngào gửi tới ${name}...`;
  const wishBtnText = localStorage.getItem("birthday_wish_btn_text") || "💖 Gửi Lời Chúc";

  setTextContent("wish-tagline", wishTagline);
  setTextContent("wish-title", wishTitle);
  setTextContent("wish-btn-text", wishBtnText);

  const wishNameInput = document.getElementById("wish-name");
  if (wishNameInput && wishNamePh) wishNameInput.placeholder = wishNamePh;

  const wishMsgInput = document.getElementById("wish-message");
  if (wishMsgInput && wishMsgPh) wishMsgInput.placeholder = wishMsgPh;

  // Map Link
  const mapBtn = document.getElementById("config-mapUrl");
  if (mapBtn && mapUrl) mapBtn.href = mapUrl;

  // Avatar
  const savedAvatar = localStorage.getItem("birthday_custom_avatar") || CONFIG.avatarUrl;
  const avatarImg = document.getElementById("config-avatar");
  if (avatarImg && savedAvatar) avatarImg.src = savedAvatar;

  // Bank Info & QR Image
  const bankInfo = CONFIG.bankInfo || {};
  const bankName = localStorage.getItem("birthday_custom_bank_name") || bankInfo.bankName;
  const bankAccNum = localStorage.getItem("birthday_custom_bank_acc_num") || bankInfo.accountNumber;
  const bankAccName = localStorage.getItem("birthday_custom_bank_acc_name") || bankInfo.accountName;

  const savedQR = localStorage.getItem("birthday_custom_qr_img") || bankInfo.qrUrl;
  const bankQRImg = document.getElementById("bank-qr-img");
  if (bankQRImg && savedQR) bankQRImg.src = savedQR;

  setTextContent("bank-name", bankName);
  setTextContent("bank-acc-num", bankAccNum);
  setTextContent("bank-acc-name", bankAccName);

  // Gallery & Timeline & Wishes
  renderGallery();
  renderTimeline();
  renderWishes();
}

function toggleSectionVisibility(id, isVisible) {
  const el = document.getElementById(id);
  if (el) {
    if (isVisible) {
      el.classList.remove("hidden");
    } else {
      el.classList.add("hidden");
    }
  }
}

function setTextContent(id, text) {
  const el = document.getElementById(id);
  if (el && text !== undefined && text !== "") el.textContent = text;
}

// --- DYNAMIC COLOR & THEME ENGINE ---
function applyTheme(themeId) {
  currentTheme = themeId;
  localStorage.setItem("birthday_theme", themeId);
  document.body.className = `theme-${themeId}`;

  const customPrimary = localStorage.getItem("birthday_custom_primary_color") || "#f43f5e";
  applyCustomColorVars(customPrimary);

  initFloatingParticles();
}

function applyCustomColorVars(colorHex) {
  const targetBody = document.body;
  const targetRoot = document.documentElement;

  if (targetBody) {
    targetBody.style.setProperty('--theme-primary', colorHex, 'important');
    targetBody.style.setProperty('--theme-primary-hover', adjustColorBrightness(colorHex, -18), 'important');
    targetBody.style.setProperty('--theme-soft-bg', hexToRgba(colorHex, 0.12), 'important');
    targetBody.style.setProperty('--theme-border', hexToRgba(colorHex, 0.35), 'important');
  }

  if (targetRoot) {
    targetRoot.style.setProperty('--theme-primary', colorHex, 'important');
    targetRoot.style.setProperty('--theme-primary-hover', adjustColorBrightness(colorHex, -18), 'important');
  }

  // Custom Cover Screen Background Gradient
  const customCoverBg = localStorage.getItem("birthday_custom_cover_bg");
  if (customCoverBg) {
    const darkerCover = adjustColorBrightness(customCoverBg, -25);
    const customGradient = `linear-gradient(135deg, ${darkerCover} 0%, ${customCoverBg} 50%, ${darkerCover} 100%)`;
    if (targetBody) targetBody.style.setProperty('--cover-gradient', customGradient, 'important');
    if (targetRoot) targetRoot.style.setProperty('--cover-gradient', customGradient, 'important');

    const envelopeScreen = document.getElementById("envelope-screen");
    if (envelopeScreen) envelopeScreen.style.background = customGradient;
  }

  // Custom 3D Envelope Box Color
  const customBoxColor = localStorage.getItem("birthday_custom_box_color");
  if (customBoxColor) {
    if (targetBody) targetBody.style.setProperty('--box-bg', customBoxColor, 'important');
    if (targetRoot) targetRoot.style.setProperty('--box-bg', customBoxColor, 'important');

    const envelope3d = document.getElementById("envelope-3d");
    if (envelope3d) envelope3d.style.backgroundColor = customBoxColor;
  }
}

function adjustColorBrightness(hex, percent) {
  let num = parseInt(hex.replace("#",""), 16),
  amt = Math.round(2.55 * percent),
  R = (num >> 16) + amt,
  G = (num >> 8 & 0x00FF) + amt,
  B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R<255?R<0?0:R:255)*0x10000 + (G<255?G<0?0:G:255)*0x100 + (B<255?B<0?0:B:255)).toString(16).slice(1);
}

function hexToRgba(hex, alpha) {
  let c = hex.replace("#","");
  if(c.length === 3) c = c.split("").map(x => x+x).join("");
  let num = parseInt(c, 16);
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
}

// --- AVATAR MODAL ENGINE ---
function openAvatarModal() {
  const modal = document.getElementById("avatar-modal");
  if (modal) modal.classList.remove("hidden");
}

function closeAvatarModal() {
  const modal = document.getElementById("avatar-modal");
  if (modal) modal.classList.add("hidden");
}

function initAvatarForm() {
  const form = document.getElementById("avatar-form") || document.getElementById("avatar-upload-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("avatar-file-input") || document.getElementById("modal-avatar-file");
    const urlInput = document.getElementById("avatar-url-input") || document.getElementById("modal-avatar-url");

    if (fileInput && fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        saveAvatar(evt.target.result);
      };
      reader.readAsDataURL(fileInput.files[0]);
    } else if (urlInput && urlInput.value.trim()) {
      saveAvatar(urlInput.value.trim());
    } else {
      showToast("❌ Vui lòng chọn 1 file ảnh hoặc dán link URL ảnh!");
    }
  });
}

function saveAvatar(avatarSrc) {
  localStorage.setItem("birthday_custom_avatar", avatarSrc);
  const avatarImg = document.getElementById("config-avatar");
  if (avatarImg) avatarImg.src = avatarSrc;
  closeAvatarModal();
  showToast("✨ Đã cập nhật ảnh đại diện mới thành công!");
}

// --- ADD PHOTO MODAL ENGINE ---
function openAddPhotoModal() {
  const modal = document.getElementById("add-photo-modal");
  if (modal) modal.classList.remove("hidden");
}

function closeAddPhotoModal() {
  const modal = document.getElementById("add-photo-modal");
  if (modal) modal.classList.add("hidden");
}

function initAddPhotoForm() {
  const form = document.getElementById("add-photo-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("photo-file");
    const urlInput = document.getElementById("photo-url");
    const captionInput = document.getElementById("photo-caption");

    const caption = captionInput?.value.trim() || "Kỷ niệm mới";

    if (fileInput && fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        saveGuestPhoto(evt.target.result, caption);
      };
      reader.readAsDataURL(fileInput.files[0]);
    } else if (urlInput && urlInput.value.trim()) {
      saveGuestPhoto(urlInput.value.trim(), caption);
    } else {
      showToast("❌ Vui lòng chọn 1 file ảnh hoặc dán link URL ảnh!");
    }
  });
}

function saveGuestPhoto(url, caption) {
  const photos = getStoredGallery();
  photos.unshift({ url, caption });
  localStorage.setItem("birthday_custom_gallery", JSON.stringify(photos));

  renderGallery();
  closeAddPhotoModal();
  showToast("📷 Đã thêm ảnh mới vào album thành công!");
}

// --- COUNTDOWN ENGINE ---
function initCountdown() {
  const targetDateStr = localStorage.getItem("birthday_custom_event_date") || CONFIG.eventDate;
  const targetDate = new Date(targetDateStr).getTime();

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      setTextContent("cd-days", "00");
      setTextContent("cd-hours", "00");
      setTextContent("cd-minutes", "00");
      setTextContent("cd-seconds", "00");
      setTextContent("days", "00");
      setTextContent("hours", "00");
      setTextContent("minutes", "00");
      setTextContent("seconds", "00");
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    const ds = d < 10 ? `0${d}` : `${d}`;
    const hs = h < 10 ? `0${h}` : `${h}`;
    const ms = m < 10 ? `0${m}` : `${m}`;
    const ss = s < 10 ? `0${s}` : `${s}`;

    setTextContent("cd-days", ds);
    setTextContent("cd-hours", hs);
    setTextContent("cd-minutes", ms);
    setTextContent("cd-seconds", ss);
    setTextContent("days", ds);
    setTextContent("hours", hs);
    setTextContent("minutes", ms);
    setTextContent("seconds", ss);
  }

  update();
  setInterval(update, 1000);
}

// --- MUSIC PLAYER ENGINE ---
let audioObj = null;
let isPlaying = false;

function initMusicPlayer() {
  let songUrl = localStorage.getItem("birthday_song_url");
  if (!songUrl || songUrl.includes("pixabay.com")) {
    songUrl = "lofi-birthday.mp3";
    localStorage.setItem("birthday_song_url", "lofi-birthday.mp3");
    localStorage.setItem("birthday_song_name", "🌸 Lofi Chill Birthday (Bài Gốc)");
  }
  const songName = localStorage.getItem("birthday_song_name") || "🌸 Lofi Chill Birthday (Bài Gốc)";
  currentSongName = songName;

  audioObj = new Audio(songUrl);
  audioObj.loop = true;

  const titleEl = document.getElementById("music-title");
  if (titleEl) titleEl.textContent = songName;
}

function playAudio() {
  if (!audioObj) initMusicPlayer();
  audioObj.play().then(() => {
    isPlaying = true;
    updateMusicUI();
  }).catch(err => {
    console.log("Autoplay blocked:", err);
  });
}

function togglePlay() {
  if (!audioObj) initMusicPlayer();

  if (isPlaying) {
    audioObj.pause();
    isPlaying = false;
  } else {
    audioObj.play().then(() => {
      isPlaying = true;
    }).catch(e => console.log(e));
  }
  updateMusicUI();
}

function updateMusicUI() {
  const btn = document.getElementById("music-toggle-btn");
  const disc = document.getElementById("music-disc");

  if (btn) {
    btn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
  }

  if (disc) {
    if (isPlaying) {
      disc.classList.add("animate-spin-slow");
    } else {
      disc.classList.remove("animate-spin-slow");
    }
  }
}

function setupAutoplayListener() {
  const playOnce = () => {
    if (!isPlaying) {
      playAudio();
    }
    document.removeEventListener('click', playOnce);
    document.removeEventListener('touchstart', playOnce);
  };

  document.addEventListener('click', playOnce);
  document.addEventListener('touchstart', playOnce);
}

// --- FLOATING PARTICLES & CONFETTI ENGINE ---
function initFloatingParticles() {
  const container = document.getElementById("floating-bg") || document.getElementById("floating-particles-container");
  if (!container) return;

  container.innerHTML = "";

  const icons = CONFIG.floatingIcons || ["🌸", "✨", "💖", "🎂", "🎈", "🌟", "🕯️", "🎁", "🎉"];
  const particleCount = 24;

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement("div");
    p.className = "floating-particle";
    p.textContent = icons[Math.floor(Math.random() * icons.length)];

    const leftPos = Math.random() * 95;
    const duration = 8 + Math.random() * 12; // 8s đến 20s
    const delay = Math.random() * 10;
    const fontSize = 16 + Math.random() * 16; // 16px đến 32px

    p.style.left = `${leftPos}%`;
    p.style.fontSize = `${fontSize}px`;
    p.style.animationDuration = `${duration}s`;
    p.style.animationDelay = `${delay}s`;

    container.appendChild(p);
  }
}

function fireConfetti() {
  if (typeof confetti !== "function") return;

  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 }
  });

  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });
  }, 250);
}

// --- WISHBOOK & RSVP ENGINE ---
function initWishesAndRSVP() {
  const rsvpForm = document.getElementById("rsvp-form");
  if (rsvpForm) {
    rsvpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      saveRSVP();
    });
  }

  const wishForm = document.getElementById("wish-form");
  if (wishForm) {
    wishForm.addEventListener("submit", (e) => {
      e.preventDefault();
      saveWish();
    });
  }
}

function saveRSVP() {
  const name = document.getElementById("rsvp-name")?.value.trim();
  const phone = document.getElementById("rsvp-phone")?.value.trim();
  const status = document.getElementById("rsvp-status")?.value;
  const guests = document.getElementById("rsvp-guests")?.value;
  const note = document.getElementById("rsvp-note")?.value.trim();

  if (!name) return showToast("❌ Vui lòng nhập họ và tên của bạn!");

  const newRSVP = {
    name,
    phone,
    status,
    guests,
    note,
    date: new Date().toLocaleString("vi-VN")
  };

  const storedRSVPs = JSON.parse(localStorage.getItem("birthday_rsvps") || "[]");
  storedRSVPs.unshift(newRSVP);
  localStorage.setItem("birthday_rsvps", JSON.stringify(storedRSVPs));

  const customToast = localStorage.getItem("birthday_rsvp_toast") || "🎉 Cảm ơn bạn đã gửi xác nhận tham dự!";
  showToast(customToast);

  document.getElementById("rsvp-form").reset();
  fireConfetti();
}

function saveWish() {
  const nameInput = document.getElementById("wish-name");
  const msgInput = document.getElementById("wish-message");

  const name = nameInput?.value.trim();
  const message = msgInput?.value.trim();

  if (!name || !message) return showToast("❌ Vui lòng nhập đầy đủ tên và lời chúc ngọt ngào!");

  const newWish = {
    name,
    message,
    time: "Vừa xong"
  };

  const storedWishes = JSON.parse(localStorage.getItem("birthday_wishes") || "[]");
  storedWishes.unshift(newWish);
  localStorage.setItem("birthday_wishes", JSON.stringify(storedWishes));

  const customToast = localStorage.getItem("birthday_wish_toast") || "💖 Cảm ơn lời chúc ngọt ngào của bạn!";
  showToast(customToast);

  nameInput.value = "";
  msgInput.value = "";

  renderWishes();
  fireConfetti();
}

function renderWishes() {
  const container = document.getElementById("wishes-container") || document.getElementById("wishes-list");
  if (!container) return;

  const userWishes = JSON.parse(localStorage.getItem("birthday_wishes") || "[]");
  const sampleWishes = CONFIG.sampleWishes || [];
  const allWishes = [...userWishes, ...sampleWishes];

  const limitSetting = localStorage.getItem("birthday_wish_limit") || "4";
  let displayWishes = allWishes;
  if (limitSetting !== "all") {
    const limitNum = parseInt(limitSetting, 10) || 4;
    displayWishes = allWishes.slice(0, limitNum);
  }

  if (!displayWishes.length) {
    container.innerHTML = `<p class="text-center text-xs text-gray-400 col-span-full py-4">Hãy là người đầu tiên gửi lời chúc tới chủ tiệc nhé! 💖</p>`;
    return;
  }

  container.innerHTML = displayWishes.map(w => `
    <div class="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-rose-100 shadow-sm space-y-2 hover:border-rose-300 transition-all">
      <div class="flex items-center justify-between">
        <span class="font-bold text-xs sm:text-sm text-rose-600 flex items-center gap-1.5">
          <i class="fas fa-heart text-[10px] text-rose-400"></i> ${escapeHtml(w.name)}
        </span>
        <span class="text-[10px] text-gray-400">${w.time || 'Gần đây'}</span>
      </div>
      <p class="text-xs text-gray-700 leading-relaxed italic">"${escapeHtml(w.message)}"</p>
    </div>
  `).join("");
}

// --- TIMELINE & DRESSCODE RENDERERS ---
function renderTimeline() {
  const container = document.getElementById("timeline-container");
  if (!container) return;

  const userTimeline = JSON.parse(localStorage.getItem("birthday_custom_timeline") || "null");
  const timeline = userTimeline || CONFIG.timeline || [];

  container.innerHTML = timeline.map(t => `
    <div class="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/70 backdrop-blur-md border border-rose-100 shadow-sm">
      <div class="px-2.5 py-1 rounded-xl bg-rose-500 text-white font-bold text-xs shrink-0 shadow-sm">
        ${escapeHtml(t.time)}
      </div>
      <div>
        <h4 class="font-bold text-xs sm:text-sm text-gray-900">${escapeHtml(t.title)}</h4>
        <p class="text-[11px] text-gray-500 mt-0.5">${escapeHtml(t.desc || '')}</p>
      </div>
    </div>
  `).join("");
}

function renderDressCodeColors() {
  const container = document.getElementById("dresscode-swatches") || document.getElementById("dresscode-colors");
  if (!container || !CONFIG.dressCodeSwatches) return;

  container.innerHTML = CONFIG.dressCodeSwatches.map(s => `
    <div class="flex flex-col items-center gap-1">
      <div class="w-8 h-8 rounded-full border-2 border-white shadow-md" style="background-color: ${s.hex}"></div>
      <span class="text-[10px] font-semibold text-gray-600">${s.name}</span>
    </div>
  `).join("");
}

// --- GALLERY RENDERER ---
function getStoredGallery() {
  const saved = localStorage.getItem("birthday_custom_gallery");
  if (saved === null) {
    return CONFIG.gallery || [];
  }
  try {
    return JSON.parse(saved) || [];
  } catch (e) {
    return [];
  }
}

function renderGallery() {
  const container = document.getElementById("gallery-container");
  if (!container) return;

  const gallery = getStoredGallery();

  if (!gallery.length) {
    container.innerHTML = `<p class="text-xs text-gray-400 text-center col-span-full py-6">Album ảnh đang được cập nhật...</p>`;
    return;
  }

  container.innerHTML = gallery.map((item, idx) => `
    <div onclick="openLightbox(${idx})" class="group relative rounded-2xl overflow-hidden shadow-md aspect-square cursor-pointer border border-rose-100 hover:shadow-xl transition-all transform hover:-translate-y-1">
      <img src="${item.url}" alt="${escapeHtml(item.caption || 'Kỷ niệm')}" class="w-full h-full object-cover group-hover:scale-110 transition-all duration-500">
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end p-3">
        <span class="text-white text-xs font-semibold truncate">${escapeHtml(item.caption || 'Kỷ niệm')}</span>
      </div>
    </div>
  `).join("");
}

// --- LIGHTBOX ENGINE ---
let currentLightboxIdx = 0;

function openLightbox(idx) {
  const gallery = getStoredGallery();
  if (!gallery[idx]) return;

  currentLightboxIdx = idx;
  const modal = document.getElementById("lightbox-modal");
  const img = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");

  if (img) img.src = gallery[idx].url;
  if (caption) caption.textContent = gallery[idx].caption || "Kỷ niệm sinh nhật";
  if (modal) modal.classList.remove("hidden");
}

function closeLightbox() {
  const modal = document.getElementById("lightbox-modal");
  if (modal) modal.classList.add("hidden");
}

function changeLightbox(step) {
  const gallery = getStoredGallery();
  if (!gallery.length) return;

  currentLightboxIdx = (currentLightboxIdx + step + gallery.length) % gallery.length;
  openLightbox(currentLightboxIdx);
}

// --- CANDLE BLOWING INTERACTION ---
function blowCandles() {
  blowOutCandle();
}

function blowOutCandle() {
  const flame1 = document.getElementById("candle-flame-1");
  const flame2 = document.getElementById("candle-flame-2");
  const flames = document.querySelectorAll(".candle-flame");

  if (flame1) flame1.style.display = "none";
  if (flame2) flame2.style.display = "none";
  flames.forEach(f => f.style.display = "none");

  fireConfetti();

  const savedToast = localStorage.getItem("birthday_cake_wish_toast");
  const currentHostName = localStorage.getItem("birthday_custom_name") || CONFIG.name;
  const defaultToast = `🎂 Ước nguyện của bạn đã được gửi tới ${currentHostName}!`;
  
  showToast(savedToast || defaultToast);
}

// --- COPY UTILITIES ---
function copyAddress() {
  const addressText = document.getElementById("config-locationAddress")?.textContent || "Số 8 Nguyễn Bỉnh Khiêm, Quận 1, TP.HCM";
  navigator.clipboard.writeText(addressText).then(() => {
    showToast(`📍 Đã sao chép địa chỉ tiệc: ${addressText}`);
  }).catch(() => {
    showToast(`📍 Địa chỉ tiệc: ${addressText}`);
  });
}

function copyAccountNum() {
  const accNum = document.getElementById("bank-acc-num")?.textContent || "999988882026";
  copyBankNumber(accNum);
}

function copyBankNumber(num) {
  if (!num) return;
  navigator.clipboard.writeText(num).then(() => {
    showToast(`💳 Đã sao chép STK Ngân Hàng: ${num}`);
  }).catch(() => {
    showToast(`💳 STK Ngân Hàng: ${num}`);
  });
}

// --- LUXURY CENTERED TOAST NOTIFICATION BADGE ---
function showToast(message) {
  let toastContainer = document.getElementById("luxury-toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "luxury-toast-container";
    toastContainer.className = "fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none";
    document.body.appendChild(toastContainer);
  } else {
    toastContainer.className = "fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none";
  }

  toastContainer.innerHTML = "";

  const toast = document.createElement("div");
  toast.className = "pointer-events-auto bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 text-white px-8 py-4 rounded-full border-2 border-amber-300 shadow-2xl font-bold text-sm sm:text-base text-center flex items-center gap-3 animate-toast-center-pop";
  toast.style.boxShadow = "0 20px 60px rgba(225, 29, 72, 0.65), 0 0 35px rgba(254, 240, 138, 0.5)";
  toast.innerHTML = `<span class="text-xl">✨</span> <span class="tracking-wide">${escapeHtml(message)}</span> <span class="text-xl">✨</span>`;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "scale(0.85) translateY(-15px)";
    toast.style.transition = "all 0.4s ease";
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
