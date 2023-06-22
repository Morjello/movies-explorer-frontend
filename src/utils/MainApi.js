class MainApi {
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
  #getToken() {
    const token = localStorage.getItem("token");
    return token;
  }

  register(email, password, name) {
    return fetch(`${this.url}/signup`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password, name }),
    }).then((res) => this.#getDataJson(res));
  }

  login(email, password) {
    return fetch(`${this.url}/signin`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    })
      .then((res) => this.#getDataJson(res))
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          return data;
        }
      });
  }

  getUserData(token) {
    return fetch(`${this.url}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => this.#getDataJson(res))
      .then((data) => data);
  }

  updateUser(email, name) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${this.#getToken()}`,
      },
      body: JSON.stringify({ email, name }),
    }).then((res) => this.#getDataJson(res));
  }

  saveMovie(movie) {
    return fetch(`${this.url}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${this.#getToken()}`,
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co/${movie.image.url}`,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: movie.trailerLink,
        movieId: movie.id,
      }),
    }).then((res) => this.#getDataJson(res));
  }

  deleteMovie(movieId) {
    return fetch(`${this.url}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${this.#getToken()}`,
      },
    }).then((res) => this.#getDataJson(res));
  }

  getSavedMovie() {
    return fetch(`${this.url}/movies`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${this.#getToken()}`,
      },
    }).then((res) => this.#getDataJson(res));
  }
}

export const mainApi = new MainApi({
  url: "http://localhost:3001/api",
  headers: { "Content-Type": "application/json" },
});
