import { ObjectLiteral } from "../types";

export function isValidDate(dateString: string) {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false; // Invalid format
  var d = new Date(dateString);
  var dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0, 10) === dateString;
}

export function omit(object: ObjectLiteral, array: string[]): ObjectLiteral {
  const cloneObj = { ...object };
  array.forEach((q) => object.hasOwnProperty(q) && delete cloneObj[q]);
  return cloneObj;
}
