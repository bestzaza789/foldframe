const $ = (id) => document.getElementById(id);
const EXT = !!(globalThis.chrome && chrome.runtime && chrome.runtime.id);
const params = new URLSearchParams(location.search);

// ---------- state ----------
const saved = (() => { try { return JSON.parse(localStorage.getItem("foldframe") || "{}"); } catch { return {}; } })();
const state = {
  device: saved.device || "iphone-18-pro",
  // The orientation the user wants; it carries across devices.
  orient: saved.orient === "landscape" ? "landscape" : "portrait",
  folded: !!saved.folded,
  zoom: saved.zoom || "fit",
  cw: saved.cw || 400,
  ch: saved.ch || 800,
};
if (params.has("device")) state.device = params.get("device");
if (params.has("orient")) state.orient = params.get("orient") === "landscape" ? "landscape" : "portrait";
if (params.has("folded")) state.folded = params.get("folded") === "1";
if (params.has("zoom")) state.zoom = params.get("zoom");
if (!DEVICES.some((d) => d.id === state.device)) state.device = DEVICES[0].id;

const save = () => { try { localStorage.setItem("foldframe", JSON.stringify(state)); } catch {} };
const current = () => DEVICES.find((d) => d.id === state.device);

// ---------- static text ----------
document.documentElement.lang = LANG;
document.querySelectorAll("[data-t]").forEach((el) => { el.textContent = t(el.dataset.t); });
$("url").placeholder = t("urlPlaceholder");
$("reload").title = t("reload");
$("orientSeg").title = t("rotateHint");
$("foldSeg").title = t("foldHint");
$("cw").title = t("width");
$("ch").title = t("height");

// ---------- device list ----------
{
  const groups = {};
  for (const d of DEVICES) {
    if (!groups[d.group]) {
      groups[d.group] = document.createElement("optgroup");
      groups[d.group].label = T.groups[d.group] || d.group;
      $("device").append(groups[d.group]);
    }
    const o = document.createElement("option");
    o.value = d.id;
    o.textContent = d.custom ? t("custom") : d.name;
    groups[d.group].append(o);
  }
}

// ---------- layout ----------
function geometry() {
  const d = current();
  const useFold = d.fold && state.folded;
  const s = useFold ? d.fold : d;
  let w = d.custom ? state.cw : s.w;
  let h = d.custom ? state.ch : s.h;
  const style = useFold ? d.fold.style : d.style;
  let crease = !useFold && d.crease ? d.crease : "";
  // "rotated" = turned away from the screen's listed (natural) orientation.
  const rotated = (state.orient === "landscape") !== (w > h);
  if (rotated) {
    [w, h] = [h, w];
    if (crease) crease = crease === "v" ? "h" : "v";
  }
  return { d, w, h, style, crease, rotated };
}

function render() {
  const { d, w, h, style, crease, rotated } = geometry();
  const frame = $("device-frame");
  frame.className = `device s-${style}` + (rotated ? " rot" : "");
  $("screen").style.width = w + "px";
  $("screen").style.height = h + "px";
  $("crease").className = "crease " + crease;

  $("device").value = d.id;
  $("customBox").hidden = !d.custom;
  $("cw").value = state.cw;
  $("ch").value = state.ch;
  $("foldSeg").hidden = !d.fold;
  setOn("foldSeg", "fold", state.folded ? "1" : "0");
  setOn("orientSeg", "orient", w > h ? "landscape" : "portrait");
  setOn("zoomSeg", "zoom", state.zoom);

  // scale to fit the stage
  const stage = $("stage");
  const fw = frame.offsetWidth;
  const fh = frame.offsetHeight;
  let scale = 1;
  if (state.zoom === "fit") {
    scale = Math.min(1, (stage.clientWidth - 48) / fw, (stage.clientHeight - 72) / fh);
  }
  $("scaler").style.transform = `scale(${scale})`;
  $("scaler").style.width = fw + "px";
  $("scaler").style.height = fh * scale + "px";
  $("info").textContent = `${w} × ${h}` + (scale < 0.995 ? ` · ${Math.round(scale * 100)}%` : "");
  save();
}

function setOn(groupId, key, value) {
  $(groupId).querySelectorAll("button").forEach((b) => b.classList.toggle("on", b.dataset[key] === value));
}

// ---------- loading ----------
let tabId = null;

async function initExtension() {
  if (!EXT) return;
  const tab = await chrome.tabs.getCurrent();
  tabId = tab.id;
  // Strip frame-blocking headers, but only for sub-frames inside THIS preview tab.
  // Only applies on sites the user has granted host access to.
  await chrome.declarativeNetRequest.updateSessionRules({
    removeRuleIds: [tabId],
    addRules: [{
      id: tabId,
      priority: 1,
      action: {
        type: "modifyHeaders",
        responseHeaders: [
          { header: "x-frame-options", operation: "remove" },
          { header: "content-security-policy", operation: "remove" },
        ],
      },
      condition: { tabIds: [tabId], resourceTypes: ["sub_frame"] },
    }],
  });
}

function normalize(raw) {
  let s = (raw || "").trim();
  if (!s) return null;
  if (!/^[a-z][a-z0-9+.-]*:/i.test(s)) {
    s = (/^(localhost|127\.|\[::1\]|[^/]+\.localhost)/i.test(s) ? "http://" : "https://") + s;
  }
  try {
    const u = new URL(s);
    return /^https?:$/.test(u.protocol) ? u : null;
  } catch { return null; }
}

const originPattern = (u) => `${u.protocol}//${u.hostname}/*`;

let pending = null;

async function load(raw) {
  const u = normalize(raw);
  $("gateErr").hidden = true;
  if (!u) {
    if (raw && raw.trim()) showGate(null, t("badUrl"));
    else showEmpty();
    return;
  }
  $("url").value = u.href;
  history.replaceState(null, "", "?" + new URLSearchParams({ ...Object.fromEntries(params), url: u.href }));

  if (EXT && !(await chrome.permissions.contains({ origins: [originPattern(u)] }))) {
    pending = u;
    showGate(u);
    return;
  }
  show("frame");
  $("frame").src = u.href;
}

function show(which) {
  $("empty").hidden = which !== "empty";
  $("gate").hidden = which !== "gate";
}

function showEmpty() {
  $("frame").removeAttribute("src");
  show("empty");
}

function showGate(u, error) {
  $("frame").removeAttribute("src");
  show("gate");
  $("gateTitle").textContent = u ? t("gateTitle", { host: u.hostname }) : "";
  $("gateAllow").hidden = !u;
  if (error) { $("gateErr").textContent = error; $("gateErr").hidden = false; }
}

$("gateAllow").onclick = async () => {
  if (!pending) return;
  // Must run inside the click handler (user gesture).
  const ok = await chrome.permissions.request({ origins: [originPattern(pending)] });
  if (ok) load(pending.href);
  else { $("gateErr").textContent = t("gateDenied"); $("gateErr").hidden = false; }
};

// ---------- events ----------
$("urlForm").onsubmit = (e) => { e.preventDefault(); load($("url").value); };
$("reload").onclick = () => load($("url").value);
$("device").onchange = (e) => { state.device = e.target.value; render(); };
$("cw").oninput = (e) => { state.cw = Math.max(200, +e.target.value || 400); render(); };
$("ch").oninput = (e) => { state.ch = Math.max(200, +e.target.value || 800); render(); };

$("foldSeg").onclick = (e) => {
  const b = e.target.closest("button"); if (!b) return;
  state.folded = b.dataset.fold === "1"; render();
};
$("orientSeg").onclick = (e) => {
  const b = e.target.closest("button"); if (!b) return;
  state.orient = b.dataset.orient;
  render();
};
$("zoomSeg").onclick = (e) => {
  const b = e.target.closest("button"); if (!b) return;
  state.zoom = b.dataset.zoom; render();
};

document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "r") { e.preventDefault(); load($("url").value); return; }
  if (e.target.matches("input, select") || e.ctrlKey || e.metaKey || e.altKey) return;
  const k = e.key.toLowerCase();
  if (k === "r") { state.orient = state.orient === "landscape" ? "portrait" : "landscape"; render(); }
  if (k === "f" && current().fold) { state.folded = !state.folded; render(); }
  if (k === "z") { state.zoom = state.zoom === "fit" ? "100" : "fit"; render(); }
});
// Re-fit whenever the stage changes size (window resize, toolbar wrapping, late font load).
let lastStage = "";
new ResizeObserver(() => {
  const key = $("stage").clientWidth + "x" + $("stage").clientHeight;
  if (key !== lastStage) { lastStage = key; render(); }
}).observe($("stage"));

// live clock in the status bar
const tick = () => {
  const n = new Date();
  $("clock").textContent = params.get("clock") || `${n.getHours()}:${String(n.getMinutes()).padStart(2, "0")}`;
};
tick(); setInterval(tick, 15000);

// ---------- start ----------
render();
requestAnimationFrame(render);
if (document.fonts) document.fonts.ready.then(render);
initExtension()
  .catch((err) => console.error("Foldframe init failed", err))
  .finally(() => load(params.get("url") || ""));
