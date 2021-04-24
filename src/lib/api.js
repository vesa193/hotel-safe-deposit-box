export const endpoint = (code = null) => {
  return {
    validation: `${process.env.REACT_APP_VALIDATION_ENDPOINT}${code}`,
  };
};

export const validationMasterCode = (code) => {
  fetch(endpoint(code).validation)
    .then((response) => response.json())
    .then((myJson) => myJson);
};
