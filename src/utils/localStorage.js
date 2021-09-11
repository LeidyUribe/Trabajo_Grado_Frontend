import { enumTypesLocalStorage } from './Constants';

export function setLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

export function getLocalStorage(key) {
  const storage = localStorage.getItem(key);
  if (storage) {
    return storage;
  }

  return null;
}
