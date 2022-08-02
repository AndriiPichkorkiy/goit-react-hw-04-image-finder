const searchAPI = {
  url: 'https://pixabay.com/api/?',

  params: {
    key: '27649790-7921965d78458e948654f4c92',
    q: null,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 12,
  },

  fetchImg: async function (query) {
    this.params.q = query;
    const response = await this.doFetch();
    return this.getParsedData(response);
  },

  loadMore: async function () {
    const response = await this.doFetch();
    return this.getParsedData(response);
  },

  doFetch: async function () {
    const qs = new URLSearchParams(this.params);
    this.params.page += 1;
    return await fetch(this.url + qs);
  },

  async getParsedData(response) {
    //check for 'ok'
    if (!response.ok) return null;

    const data = await response.json();
    console.log('data', data);

    //check if data present
    if (!data.total) return null;

    return data;
  },
};

export { searchAPI };
