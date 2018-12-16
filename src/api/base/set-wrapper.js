import _set from 'lodash/set';

export const setWrapper = ({basePath, path, value}) => {
  const storageItem = JSON.parse(window.localStorage.getItem(basePath)) || {};
  const newStorageItem = path ? _set(storageItem, path, value) : value;

  window.localStorage.setItem(basePath, JSON.stringify(newStorageItem));
};
