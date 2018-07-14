import './readability.scss';

const styleElement = document.createElement('style');
styleElement.type = 'text/css';
const linkElement = document.createElement('link');


function updateInlineFontStyle(fontModel) {
  if (fontModel == null || fontModel.name === '') {
    styleElement.innerText = '';
    return;
  }

  if (fontModel.type === 'google') {
    linkElement.href = `${document.location.protocol === 'https:' ? 'https' : 'http'}://fonts.googleapis.com/css?family=${fontModel.name.replace(/\s/g, '+')}`;
    linkElement.type = 'text/css';
    linkElement.rel = 'stylesheet';

    if (document.head) {
      document.head.appendChild(linkElement);
    } else {
      document.documentElement.appendChild(linkElement);
    }
  } else if (fontModel.type === 'custom') {
    // var d = "@font-face{  font-family: '" + fontModel.name + "';src: url(" + fontModel.url + ");} ";
  }

  styleElement.innerText = `.Markdown, .Comment .Markdown.MarkdownViewer--small { font-family: '${fontModel.name}', 'Apple SD Gothic Neo', 'Malgun Gothic', 'Source Serif Pro', 'Helvetica Neue', Helvetica, Arial, serif !important; }`;
  if (document.head) {
    document.head.appendChild(styleElement);
  } else {
    document.documentElement.appendChild(styleElement);
  }
}


function toggleBodyClass(checked, className) {
  const body = document.querySelector('body');
  if (checked) {
    body.classList.add(className);
  } else {
    body.classList.remove(className);
  }
}

function setFontClass(fontName) {
  if (fontName !== '') {
    updateInlineFontStyle({
      type: 'google',
      name: fontName,
      url: null
    });
  } else {
    updateInlineFontStyle(null);
  }
}


function updateContentStyle() {
  chrome.storage.sync.get(null, (items) => {
    toggleBodyClass(items.readabilityMode, 'ste-readability');
    toggleBodyClass(items.sidePreview, 'ste-side-preview');
    setFontClass(items.fontName);
  });
}


chrome.storage.onChanged.addListener((changes, namespace) => {
  updateContentStyle();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.needToUpdate) {
    updateContentStyle();
  }
});


updateContentStyle();
