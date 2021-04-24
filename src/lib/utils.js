export function convertArrayToString(arr) {
  arr.forEach((item) => {
    return `${item}`;
  });
}

export function formatArrayToString(arr) {
  return arr.toString().replaceAll(',', '');
}

// Cookie setter
export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires}`;
}
