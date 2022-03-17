export const createType = (keys: string[]) => {
  let obj: any = {};
  keys.forEach((item: string) => {
    obj[item] = item;
  })
  return obj;
}
