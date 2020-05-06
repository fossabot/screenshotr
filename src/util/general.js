export const parseNumber = (input) => {
  const cleanInput = input.replace(/[^0-9.]/);
  return Number(cleanInput) || null;
};

export const getFormattedTimeStamp = () => {
  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth() + 1;
  const d = today.getDate();
  const h = today.getHours();
  const mi = today.getMinutes();
  const s = today.getSeconds();
  return `${y}-${m}-${d}T${h}-${mi}-${s}`;
};
