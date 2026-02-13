export const isAbsoluteUrl = (value) => {
  return typeof value === "string" && /^https?:\/\//i.test(value);
};

// If `value` is already absolute (e.g. Google Drive), return it as-is.
// Otherwise treat it as a server-relative path and prefix with `apiUrl`.
export const resolveMediaUrl = (apiUrl, value) => {
  if (!value) return "";
  if (isAbsoluteUrl(value)) return value;
  return `${apiUrl}${value}`;
};

