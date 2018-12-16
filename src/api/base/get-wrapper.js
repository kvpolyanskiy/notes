import _get from 'lodash/get';

export const getWrapper = (basePath, path) => {
  const storageItem = JSON.parse(window.localStorage.getItem(basePath));

  return path ? _get(storageItem, path) : storageItem;
};
