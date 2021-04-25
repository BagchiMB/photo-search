const SEARCHED_ITEMS = "searchItems";
export const getSearchQueries = () => {
  if (localStorage.getItem(SEARCHED_ITEMS)) {
    return JSON.parse(localStorage.getItem(SEARCHED_ITEMS));
  } else {
    let emptyArray = [];
    localStorage.setItem(SEARCHED_ITEMS, JSON.stringify(emptyArray));
    return [];
  }
};

export const setSearchQueries = (arr) => {
  localStorage.setItem(SEARCHED_ITEMS, JSON.stringify(arr));
};
