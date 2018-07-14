
// content script can be loaded from background script dynamically.
// or can be loaded directly from manifest.json file.
import defaultSettings from './common/defaultSettings';
import { isSteemIt } from './common/util';

import { isContentScriptLoaded, loadContentScript } from './background/contentScriptLoader';


function triggerUpdate(tab) {
  if (isSteemIt(tab.url)) {
    chrome.pageAction.show(tab.id);

    // trigger update when url changes in SPA
    chrome.tabs.sendMessage(tab.id, { needToUpdate: true });
  } else {
    chrome.pageAction.hide(tab.id);
  }
}


chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status !== 'loading' || !isSteemIt(tab.url)) {
    return;
  }

  const result = await isContentScriptLoaded(tabId);
  if (chrome.runtime.lastError || result[0]) {
    return;
  }

  loadContentScript(tabId, () => {
    // console.log('load content bundle success!');
    triggerUpdate(tab);
  });
});


chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.storage.sync.set(defaultSettings);
  } else if (details.return === 'update') {
    // merge existing settings based on new defaultSettings
    chrome.storage.sync.get(null, (items) => {
      const merged = { ...defaultSettings, items };

      // migrate deprecated
      if (merged.fontOverride) {
        if (merged.fontOverride === false) {
          merged.fontName = '';
        }

        delete merged.fontOverride;
      }

      chrome.storage.sync.set(merged);
    });
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    triggerUpdate(tab);
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  triggerUpdate(tab);
});

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  for (let i = 0; i < tabs.length; i += 1) {
    const tab = tabs[i];
    triggerUpdate(tab);
  }
});
