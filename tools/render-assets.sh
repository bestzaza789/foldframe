#!/usr/bin/env bash
# Renders icons, store screenshots and the promo tile with headless Chrome.
# Needs the static server running first:  node tools/serve.js 5317
set -euo pipefail
cd "$(dirname "$0")/.."

CHROME="${CHROME:-/c/Program Files/Google/Chrome/Application/chrome.exe}"
BASE="http://localhost:5317"
PROFILE="$(mktemp -d)"

shot() { # out width height url
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --no-first-run \
    --user-data-dir="$PROFILE" --default-background-color=00000000 \
    --virtual-time-budget=4000 --window-size="$2,$3" --screenshot="$(cygpath -w "$PWD/$1")" "$4" 2>/dev/null
  echo "wrote $1"
}

for s in 16 32 48 128; do
  shot "extension/icons/icon-$s.png" "$s" "$s" "$BASE/store/icon.html?s=$s"
done
cp extension/icons/icon-128.png store/icon.png

SITE="$BASE/store/demo-site.html"
SIM="$BASE/extension/simulator.html?clock=9:41&url=$SITE"
shot store/screenshots/1-iphone.png        1280 800 "$SIM&lang=en&device=iphone-18-pro&orient=portrait&zoom=fit"
shot store/screenshots/2-fold-unfolded.png 1280 800 "$SIM&lang=en&device=galaxy-z-fold-8&orient=landscape&folded=0&zoom=fit"
shot store/screenshots/3-flip-folded.png   1280 800 "$SIM&lang=en&device=galaxy-z-flip-8&orient=portrait&folded=1&zoom=100"
shot store/screenshots/4-ipad-landscape.png 1280 800 "$SIM&lang=en&device=ipad-11&orient=landscape&zoom=fit"
shot store/screenshots/5-thai-duo.png      1280 800 "$SIM&lang=th&device=iphone-duo&orient=landscape&folded=0&zoom=fit"

shot store/promo-440x280.png 440 280 "$BASE/store/promo.html"
rm -rf "$PROFILE"
