// COLORS
export const colors = {
  primary: "#017bff",            // Màu chủ đạo, nút, icon active
  secondary: "#38c85d",          // Màu xanh lá cho trạng thái healthy/success
  accent: "#fe9402",             // Màu nhấn (warning, highlight)
  error: "#ff4d4f",              // Màu đỏ, lỗi
  info: "#0096ff",               // Màu thông tin
  disabled: "#888888",           // Màu disabled, text mờ
  
  backgroundMain: "#e6f9eb",     // Nền chính dịu
  backgroundAlt: "#fff5e4",      // Nền phụ vùng thẻ, card
  backgroundWhite: "#fffefe",    // Nền trắng tinh khiết
  backgroundGray: "#f7f7fa",     // Nền vùng tracking, form, loading

  card: "#ffffff",               // Thẻ card, popup
  popup: "#f8f8f8",              // Màu popup, modal overlay
  
  border: "#e0e0e0",             // Viền card, input
  divider: "#eeeeee",            // Dòng kẻ phân cách section

  textPrimary: "#222222",        // Text thường, heading
  textSecondary: "#555555",      // Text phụ, note, mô tả
  textActive: "#017bff",         // Text link, button đang active
  textSuccess: "#38c85d",        // Text thành công
  textWarning: "#fe9402",        // Text cảnh báo
  textError: "#ff4d4f",          // Text báo lỗi
  textDisabled: "#888888",       // Text disabled
  textPlaceholder: "#ababab",    // Text placeholder trong input
};

// FONTS
export const fonts = {
  fontFamily: "SF Pro Display, Inter, Arial, sans-serif",
  fontSizeBase: 16,
  fontWeightNormal: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,

  headings: {
    h1: { fontSize: 28, fontWeight: 700, lineHeight: 34 },
    h2: { fontSize: 22, fontWeight: 700, lineHeight: 28 },
    h3: { fontSize: 18, fontWeight: 600, lineHeight: 24 },
    h4: { fontSize: 16, fontWeight: 600, lineHeight: 22 },
  },
  body: {
    regular: { fontSize: 16, fontWeight: 400, lineHeight: 22 },
    small: { fontSize: 14, fontWeight: 400, lineHeight: 20 },
    tiny: { fontSize: 12, fontWeight: 400, lineHeight: 18 },
  },
  button: {
    fontSize: 16,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  }
};

// BUTTONS
export const buttons = {
  backgroundDefault: "#017bff",
  backgroundSecondary: "#e6f9eb",
  backgroundAccent: "#fe9402",
  backgroundDisabled: "#e6f9eb",

  textDefault: "#fffefe",
  textSecondary: "#017bff",
  textAccent: "#fffefe",
  textDisabled: "#888888",

  borderRadius: 8,
  padding: { vertical: 12, horizontal: 24 },
  shadow: "0 2px 8px rgba(1,123,255,0.10)",
  border: "none",
  fontSize: 16,
  fontWeight: 600,
  iconSize: 22,
};

// INPUTS
export const inputs = {
  background: "#fffefe",
  border: "#e0e0e0",
  borderRadius: 8,
  fontSize: 16,
  fontWeight: 400,
  text: "#222222",
  placeholder: "#ababab",
  focus: "#017bff",
  error: "#ff4d4f",
};

// CARD/POPUP STRUCT
export const card = {
  background: "#ffffff",
  borderRadius: 12,
  shadow: "0 1px 8px rgba(0,0,0,0.05)",
  padding: 20,
  border: "#e0e0e0",
};

export const popup = {
  background: "#f8f8f8",
  borderRadius: 16,
  shadow: "0 4px 16px rgba(1,123,255,0.14)",
  padding: 28,
};

// ICONS, ASSETS
export const assets = {
  avatarDefault: "assets/avatar_default.png",
  icons: {
    home: "react-native-vector-icons/MaterialIcons/home",
    scan: "react-native-vector-icons/Ionicons/scan",
    track: "react-native-vector-icons/MaterialIcons/track-changes",
    profile: "react-native-vector-icons/MaterialIcons/person",
    // Add more based on standard libraries (e.g. logout, settings, flag, star, location)
    settings: "react-native-vector-icons/Feather/settings",
    location: "react-native-vector-icons/Ionicons/location-outline",
    star: "react-native-vector-icons/AntDesign/star",
    filter: "react-native-vector-icons/Feather/filter",
    warning: "react-native-vector-icons/MaterialIcons/warning",
    //... các icon bổ trợ tuỳ theo chức năng
  }
};

// SHADOW/DEPTH
export const shadow = {
  light: "0 1px 8px rgba(0,0,0,0.04)",
  normal: "0 2px 12px rgba(1,123,255,0.10)",
  strong: "0 4px 24px rgba(1,123,255,0.18)"
};

// DIVIDER
export const divider = {
  color: "#eeeeee",
  thickness: 1,
};

// LIST/ROW
export const list = {
  borderRadius: 8,
  background: "#fffefe",
  divider: "#eeeeee",
  padding: 16,
  selected: "#e6f9eb"
};

// TOAST/NORMAL UI MESSAGES
export const toast = {
  success: "#38c85d",
  warning: "#fe9402",
  error: "#ff4d4f",
  info: "#017bff",
  background: "#fffefe",
  text: "#222222",
};

// EXTRA: STATUS/OVERLAY
export const status = {
  healthy: "#38c85d",
  warning: "#fe9402",
  critical: "#ff4d4f",
  safe: "#017bff",
  background: "#e6f9eb",
};

