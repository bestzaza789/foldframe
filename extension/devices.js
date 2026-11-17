// CSS viewports (not physical pixels). Sources: webmobilefirst.com,
// phone-simulator.com and yesviz.com device databases, Nov 2026
// (Galaxy S25, iPad mini 7, iPad Pro 13" cross-checked on yesviz + screensizechecker). Entries marked "est."
// were computed as panel resolution / DPR because no published viewport existed.
//
// style:  "island" (pill camera), "punch" (hole camera), "tablet", "cover" (flip cover screen)
// crease: hinge axis of an unfolded foldable in its listed orientation ("v" | "h")
// fold:   size + style of the cover screen when folded
const DEVICES = [
  { id: "iphone-18-pro-max", group: "iphone", name: "iPhone 18 Pro Max", w: 440, h: 956, style: "island" },
  { id: "iphone-18-pro", group: "iphone", name: "iPhone 18 Pro", w: 402, h: 874, style: "island" },
  { id: "iphone-air", group: "iphone", name: "iPhone Air", w: 420, h: 912, style: "island" },
  { id: "iphone-17", group: "iphone", name: "iPhone 17", w: 402, h: 874, style: "island" },
  { id: "iphone-17-pro-max", group: "iphone", name: "iPhone 17 Pro Max", w: 440, h: 956, style: "island" },
  { id: "iphone-se", group: "iphone", name: "iPhone SE", w: 375, h: 667, style: "classic" },

  { id: "galaxy-s26-ultra", group: "android", name: "Galaxy S26 Ultra", w: 412, h: 891, style: "punch" },
  { id: "galaxy-s25", group: "android", name: "Galaxy S25", w: 360, h: 780, style: "punch" },
  { id: "pixel-10-pro", group: "android", name: "Pixel 10 Pro", w: 410, h: 914, style: "punch" },
  { id: "pixel-10", group: "android", name: "Pixel 10", w: 412, h: 923, style: "punch" },
  { id: "xiaomi-17", group: "android", name: "Xiaomi 17", w: 406, h: 885, style: "punch" },

  { id: "galaxy-z-flip-8", group: "fold", name: "Galaxy Z Flip 8", w: 360, h: 840, style: "punch", crease: "h",
    fold: { w: 316, h: 349, style: "cover" } }, // cover est. (948x1048 @3x)
  { id: "galaxy-z-fold-8", group: "fold", name: "Galaxy Z Fold 8", w: 816, h: 616, style: "punch", crease: "v",
    fold: { w: 416, h: 657, style: "punch" } },
  { id: "galaxy-z-fold-8-ultra", group: "fold", name: "Galaxy Z Fold 8 Ultra", w: 645, h: 715, style: "punch", crease: "v",
    fold: { w: 360, h: 840, style: "punch" } }, // cover est. (1080x2520 @3x)
  { id: "iphone-duo", group: "fold", name: "iPhone Duo", w: 890, h: 626, style: "island", crease: "v",
    fold: { w: 466, h: 678, style: "island" } },

  { id: "ipad-mini", group: "tablet", name: "iPad mini", w: 744, h: 1133, style: "tablet" },
  { id: "ipad-11", group: "tablet", name: "iPad 11\"", w: 820, h: 1180, style: "tablet" },
  { id: "ipad-pro-13", group: "tablet", name: "iPad Pro 13\"", w: 1032, h: 1376, style: "tablet" },

  { id: "custom", group: "custom", name: "Custom", w: 400, h: 800, style: "punch", custom: true },
];
