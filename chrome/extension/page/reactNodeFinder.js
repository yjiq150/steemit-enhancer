export default function findReactComponentFromElement(el) {
  for (const propKey in el) {
    if (propKey.startsWith('__reactInternalInstance$')) {
      return el[propKey]._currentElement._owner._instance;
    }
  }
  return null;
}
