import { ObjectLiteral } from '../types';

export function omit(object: ObjectLiteral, array: string[]): ObjectLiteral {
  const cloneObj = { ...object };
  array.forEach((q) => object.hasOwnProperty(q) && delete cloneObj[q]);
  return cloneObj;
}
