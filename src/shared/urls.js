// URLs break on safari if there is no trailing slash. i.e adding trailing slash
const deafultQueryParams =
  "&api_key=04e60b00ed58ddfaf5cb3ad26756f424&extras=url_m&format=json&nojsoncallback=1/";

const urls = {
  defaultImages: ({ page }) =>
    `?&method=flickr.photos.getRecent&page=${page}${deafultQueryParams}`,

  searchedImages: ({ page, search }) =>
    `?&method=flickr.photos.search&text=${search}&page=${page}&content-type=1${deafultQueryParams}`,
};
export default urls;
