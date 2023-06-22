class MoviesApi {
  constructor(options) {
    this.headers = options.headers;
    this.url = options.url;
  }

  #getDataJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(this.url).then((res) => this.#getDataJson(res));
  }
}

export const moviesApi = new MoviesApi({
  url: "https://api.nomoreparties.co/beatfilm-movies",
  headers: { "Content-Type": "application/json" },
});
