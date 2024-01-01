export function getDataStorage(param: string, storage = 'o-auth') {
  const data = localStorage.getItem(storage);
  if (data) {
    const verifyObject = data.startsWith('{') && data.endsWith('}');
    const verifyArray = data.startsWith('[') && data.endsWith(']');
    if (!verifyObject && !verifyArray) {
      return data;
    }
    return param ? JSON.parse(data)[param] : JSON.parse(data);
  }
  return null;
}
export function setDataStorage<T>(data: T, storage = 'o-auth') {
  localStorage.setItem(storage, JSON.stringify(data));
}
