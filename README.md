# Foldframe

Chrome extension (MV3): preview any page on phones, tablets and foldables.

```
extension/   the extension itself (load this folder unpacked)
store/       store listing text, privacy policy, screenshots, promo tile, demo site
tools/       serve.js (static server), render-assets.sh (icons + store images)
dist/        zip to upload to the Chrome Web Store
```

## Try it locally
1. `chrome://extensions` → Developer mode → Load unpacked → pick `extension/`
2. Open any site, click the Foldframe icon. First time on a site it asks to allow that site.

## Edit devices
`extension/devices.js`: `w`/`h` = CSS viewport (unfolded for foldables), `fold` = cover screen.

## Rebuild store images
```
node tools/serve.js 5317
bash tools/render-assets.sh
```

## Release
1. Bump `version` in `extension/manifest.json`
2. Zip the contents of `extension/` into `dist/foldframe-<version>.zip`
3. Upload in the Developer Dashboard; listing text is in `store/LISTING.md`
