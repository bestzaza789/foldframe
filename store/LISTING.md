# Chrome Web Store listing – Foldframe

Copy these into the Developer Dashboard (https://chrome.google.com/webstore/devconsole).

## Store listing

**Category:** Developer Tools
**Language:** English (default) + Thai

### Name (from manifest)
- en: Foldframe – Responsive & Foldable Preview
- th: Foldframe – ดูเว็บบนมือถือและจอพับ

### Summary (from manifest, max 132 chars)
- en: Preview any site on phones, tablets and foldables. Portrait, landscape, folded or unfolded. No ads, no tracking.
- th: ดูตัวอย่างเว็บบนมือถือ แท็บเล็ต และจอพับ แนวตั้ง แนวนอน กางหรือพับ ไม่มีโฆษณา ไม่เก็บข้อมูล

### Description
Paste exactly one file per language (no device model lists: Chrome Web Store rejects those as keyword spam, Yellow Argon):
- en: `description-en.txt`
- th: `description-th.txt`

### Graphics
- Icon: `../extension/icons/icon-128.png`
- Screenshots (1280×800): `screenshots/1-iphone.png` … `screenshots/5-thai-duo.png`
- Small promo tile (440×280): `promo-440x280.png`

## Privacy tab

**Single purpose:** Preview web pages inside phone, tablet and foldable device frames at accurate viewport sizes.

**Permission justifications**
- `activeTab`: Read the URL of the tab where the user clicked the toolbar icon, to open that page in the preview.
- `declarativeNetRequestWithHostAccess`: Remove X-Frame-Options and Content-Security-Policy headers on sub-frames inside the extension's own preview tab only (scoped by tabId), so the previewed site can render in the device frame.
- Optional host permissions (`http://*/*`, `https://*/*`): Requested at runtime for one origin at a time, only when the user chooses to preview that site. Needed for the header rule above to apply to that site.
- Remote code: No.

**Data usage:** Collects no user data. Tick none of the data types. Certify all three disclosures.

**Privacy policy URL:** https://bestzaza789.github.io/foldframe/store/privacy.html
