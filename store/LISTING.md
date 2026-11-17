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

### Description (en)

See your site the way phones really show it, including the new foldables.

Click the Foldframe icon on any tab and the page opens inside a device frame at the exact CSS viewport of the device you pick.

WHAT YOU GET
• iPhone 18 Pro / Pro Max, iPhone Air, iPhone 17, iPhone SE
• Galaxy S26 Ultra, Galaxy S25, Pixel 10 / 10 Pro, Xiaomi 17
• Foldables with real folded and unfolded sizes: Galaxy Z Flip 8, Galaxy Z Fold 8, Galaxy Z Fold 8 Ultra, iPhone Duo
• iPad mini, iPad 11", iPad Pro 13"
• Custom width × height
• Portrait / landscape in one click (R), fold / unfold (F), fit to window or 100% (Z)
• Hinge crease shown on unfolded foldables so you can spot content that lands on the fold
• Works with localhost and dev servers
• Dark and light theme, English and Thai

PRIVACY FIRST
• No account, no ads, no analytics, nothing sent anywhere
• Asks for access one site at a time, only when you preview it
• Only changes headers inside its own preview tab. Your normal tabs are never touched

Viewport sizes come from public device databases. Sizes for the newest models may be refined in updates.

### Description (th)

ดูเว็บของคุณให้เหมือนบนมือถือจริง รวมถึงจอพับรุ่นใหม่

กดไอคอน Foldframe บนแท็บไหนก็ได้ หน้าเว็บจะเปิดในกรอบเครื่อง ด้วยขนาด CSS viewport ตรงตามรุ่นที่เลือก

มีอะไรบ้าง
• iPhone 18 Pro / Pro Max, iPhone Air, iPhone 17, iPhone SE
• Galaxy S26 Ultra, Galaxy S25, Pixel 10 / 10 Pro, Xiaomi 17
• จอพับ มีขนาดตอนกางและตอนพับ: Galaxy Z Flip 8, Z Fold 8, Z Fold 8 Ultra, iPhone Duo
• iPad mini, iPad 11", iPad Pro 13"
• กำหนดกว้าง × สูงเอง
• สลับแนวตั้ง/แนวนอน (R) กาง/พับ (F) พอดีจอหรือ 100% (Z)
• แสดงรอยพับบนจอกาง เห็นทันทีว่าเนื้อหาไหนตกรอยพับ
• ใช้กับ localhost และ dev server ได้
• ธีมมืด/สว่าง ภาษาไทยและอังกฤษ

เน้นความเป็นส่วนตัว
• ไม่ต้องสมัคร ไม่มีโฆษณา ไม่มี analytics ไม่ส่งข้อมูลไปไหน
• ขอสิทธิ์ทีละเว็บ เฉพาะตอนพรีวิว
• แก้ header เฉพาะในแท็บพรีวิวของตัวเอง แท็บปกติไม่โดนแตะ

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
