// utils.js

interface Field {
  id: string;
  label: string;
  type?: string;
  options?: Array<{ label: string; value: any; id: any; properties?: any }>;
  placeholder?: string;
}


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

export const processProperties = (properties, parentKey = ""): Field[] => {
  return properties.flatMap((prop) => {
    if (prop.key.toLowerCase() === "color") return [];
    const id =
      (parentKey ? `${parentKey}_` : "") +
      prop.key.toLowerCase().replace(/\s+/g, "");
    const result: Field[] = [
      {
        id,
        label: prop.key,
        type: prop.type,
        options:
          prop.type === "select"
            ? prop.value.map((option) => ({
                label:
                  option.Option + (option.unit ? ` (${option.unit})` : ""),
                value: option.id,
                id: option.id,
                properties: option.properties || [],
              }))
            : undefined,
      },
    ];

    return result;
  });
};