chrome.action.onClicked.addListener((tab) => {
  const target = tab.url && /^https?:/.test(tab.url) ? tab.url : "";
  const page = chrome.runtime.getURL("simulator.html") + (target ? "?url=" + encodeURIComponent(target) : "");
  chrome.tabs.create({ url: page, index: tab.index + 1 });
});

// Each preview tab owns one session rule (id = tabId); drop it when the tab closes.
chrome.tabs.onRemoved.addListener((tabId) => {
  chrome.declarativeNetRequest.updateSessionRules({ removeRuleIds: [tabId] }).catch(() => {});
});
