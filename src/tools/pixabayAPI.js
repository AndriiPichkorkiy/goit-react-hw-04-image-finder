const searchAPI = {
  url: 'https://pixabay.com/api/?',

  params: {
    key: '27649790-7921965d78458e948654f4c92',
    // q: null,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    // page: 1,
    // per_page: 12,
  },

  lastData: null,

  fetchImg: async function ({ query, page, per_page }) {
    this.params.q = query;
    this.params.page = page;
    this.params.per_page = per_page;

    const response = await this.doFetch();
    return this.getParsedData(response);
  },

  doFetch: async function () {
    const qs = new URLSearchParams(this.params);
    return await fetch(this.url + qs);
  },

  async getParsedData(response) {
    //check for 'ok'
    if (!response.ok) return null;

    const data = await response.json();

    //check if data present
    if (!data.total) return null;

    this.lastData = data;
    return data;
  },
};

export { searchAPI };
