export function trimObjectAttributes(obj) {
  const trimmedObj = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (typeof value === "string") {
        trimmedObj[key] = value.trim();
      } else {
        trimmedObj[key] = value;
      }
    }
  }
  return trimmedObj;
}
