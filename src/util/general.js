export const parseNumber = input => {
  const cleanInput = input.replace(/[^0-9.]/);
  return Number(cleanInput) || null;
};
