export function toArray (list, start = 0) {
  let i = list.length - start;
  const ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }

  return ret;
}
