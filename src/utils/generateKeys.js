export const generateKeys = () => {
  return `${Math.floor(Math.random() * 1000) + Date.now()}`;
};