
export function isSteemIt(url) {
  const steemPattern = /^https?:\/\/steemit\.com.*/;
  return steemPattern.test(url);
}

export function zeroPadding(str, size) {
  let s = String(str);
  while (s.length < (size || 2)) { s = `0${s}`; }
  return s;
}
