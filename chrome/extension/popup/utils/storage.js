
export default function () {
  return next => (reducer, initialState) => {
    const store = next(reducer, initialState);

    store.subscribe(() => {
      const state = store.getState();
      chrome.storage.sync.set(state.settings);
    });

    return store;
  };
}
