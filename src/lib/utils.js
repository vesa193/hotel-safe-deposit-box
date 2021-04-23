export function convertArrayToString(arr) {
  arr.forEach((item) => {
    return `${item}`;
  });
}

export function formatArrayToString(arr) {
  return arr.toString().replaceAll(',', '');
}
