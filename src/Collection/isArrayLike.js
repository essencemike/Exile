export const MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

export default (collection) => {
  const length = collection.length;
  return typeof length == 'number' && length >=0 && length <= MAX_ARRAY_INDEX;
}
