
const showList = (list) => {
  return {
    type: "SHOW_LIST",
    payload: list
  };
};

export { showList };