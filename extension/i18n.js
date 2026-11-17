const STRINGS = {
  en: {
    urlPlaceholder: "Enter a URL, e.g. localhost:3000",
    reload: "Reload (Ctrl+R)",
    portrait: "Portrait",
    landscape: "Landscape",
    unfolded: "Unfolded",
    folded: "Folded",
    fit: "Fit",
    actual: "100%",
    rotateHint: "Rotate (R)",
    foldHint: "Fold / unfold (F)",
    width: "Width",
    height: "Height",
    groups: { iphone: "iPhone", android: "Android", fold: "Foldables", tablet: "Tablets", custom: "Custom" },
    custom: "Custom size",
    emptyTitle: "Preview any page",
    emptyBody: "Type a URL above, or click the Foldframe icon on any tab.",
    gateTitle: "Allow {host}?",
    gateBody: "Foldframe needs permission to show this site inside the device frame. It only runs in this preview tab and collects nothing.",
    gateAllow: "Allow",
    gateDenied: "Permission was not granted.",
    badUrl: "That URL can't be previewed.",
  },
  th: {
    urlPlaceholder: "ใส่ URL เช่น localhost:3000",
    reload: "รีโหลด (Ctrl+R)",
    portrait: "แนวตั้ง",
    landscape: "แนวนอน",
    unfolded: "กาง",
    folded: "พับ",
    fit: "พอดีจอ",
    actual: "100%",
    rotateHint: "หมุนจอ (R)",
    foldHint: "กาง / พับ (F)",
    width: "กว้าง",
    height: "สูง",
    groups: { iphone: "iPhone", android: "Android", fold: "จอพับ", tablet: "แท็บเล็ต", custom: "กำหนดเอง" },
    custom: "กำหนดขนาดเอง",
    emptyTitle: "ดูตัวอย่างเว็บไหนก็ได้",
    emptyBody: "พิมพ์ URL ด้านบน หรือกดไอคอน Foldframe บนแท็บที่ต้องการ",
    gateTitle: "อนุญาต {host} ?",
    gateBody: "Foldframe ต้องได้สิทธิ์เพื่อแสดงเว็บนี้ในกรอบเครื่อง ทำงานเฉพาะแท็บพรีวิวนี้ และไม่เก็บข้อมูลใดๆ",
    gateAllow: "อนุญาต",
    gateDenied: "ไม่ได้รับสิทธิ์",
    badUrl: "URL นี้แสดงตัวอย่างไม่ได้",
  },
};

function pickLang() {
  const forced = new URLSearchParams(location.search).get("lang");
  if (forced && STRINGS[forced]) return forced;
  let ui = navigator.language || "en";
  try { if (globalThis.chrome?.i18n?.getUILanguage) ui = chrome.i18n.getUILanguage(); } catch {}
  return ui.toLowerCase().startsWith("th") ? "th" : "en";
}

const LANG = pickLang();
const T = STRINGS[LANG];
const t = (key, vars = {}) => String(T[key] ?? STRINGS.en[key] ?? key).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
