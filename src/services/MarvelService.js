class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'apikey=38ee0717cf7e2183132afbe8335fee2b';

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  getAllCharacters = async () => {
    const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
    return res.data.results.map(this._transformCharacter);
  }

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
  }

  _transformCharacter = (char) => {
    const maxDescriptionLength = 200;
    let description = char.description || "Данных о персонаже нет";

    if (description.length > maxDescriptionLength) {
      description = description.substring(0, maxDescriptionLength) + '...';
    }

    const thumbnailPath = char.thumbnail.path + '.' + char.thumbnail.extension;
    const isImageAvailable = char.thumbnail.path.includes('image_not_available'); // Проверка на доступность изображения

    return {
      name: char.name,
      description: description,
      thumbnail: thumbnailPath,
      isImageAvailable: isImageAvailable, // Добавляем флаг
      homepage: char.urls[0].url,
      wiki: char.urls[1].url
    }
  }
}

export default MarvelService;