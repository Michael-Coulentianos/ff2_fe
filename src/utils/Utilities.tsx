// utils.js

export const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const addPropertyIfNotEmpty = (obj, key, value) => {
  if (value !== null && value !== undefined) {
    obj[key] = value;
  }
};

export default {
  formatDate,
  addPropertyIfNotEmpty,
};
