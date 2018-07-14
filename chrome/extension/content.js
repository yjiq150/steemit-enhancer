import './content/sidePreview.scss';
import './content/readability';


// [Note: Why page script cannot use HMR (hot module reloading)?]
// 1. Page script run on "the context of current web page" not in "the context of chrome extension".
// 2. Loading script from localhost "http://localhost:3030/js/script.js" is not possible,
//    because the web page itself prevents dynamic script loading.
//    (ONLY allows dynamic script loading from specific domains in CSP(Content Sercurity Policy) header)
// 3. Therefore, hot module reload is not possible for page script.

// [Note: What's the best option for page script development without HMR?]
// 1. Content script can inject page script into page context using chrome.extension.getURL().
//    (chrome.extension.getURL() allows load data from extension package only.)
// 2. Page script does not support HMR but it can be watched and automatically rebuilt using "webpack --watch"
// 3. After the page script is rebuilt, refresh the page manually. 'content.js' will load newly built page.bundle.js
//    from unpacked extension (NO NEED TO REFRESH unpacked extension manually in chrome://extensions )

const s = document.createElement('script');
s.src = chrome.extension.getURL('js/page.bundle.js');
s.onload = function () {
  this.remove();
};

(document.head || document.documentElement).appendChild(s);
