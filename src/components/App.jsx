import { Component } from 'react';

// let searchQuery;
// let perPageItems;
// let pageSet;
class App extends Component {
  state = {
    key: '18941965-072e6ae370689f800c64fac36',
    q: null,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 10,
    page: 1,
  };
  handleOnChange = e => {
    this.setState({
      q: e.target.value,
    });
    console.log(this.state.q);
  };
  handleSubmit = e => {
    e.preventDefault();
    // const URL = `https://pixabay.com/api/?${this.state.q}`;

    const { key, q, image_type, orientation, safesearch, per_page, page } =
      this.state;

    // Konstruujemy URL zapytania do Pixabay API zgodnie z dokumentacją
    const URL = `https://pixabay.com/api/?key=${key}&q=${encodeURIComponent(
      q
    )}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}&per_page=${per_page}&page=${page}`;

    fetch(URL)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => {
        console.log(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      });
  };

  render() {
    return (
      <>
        <header className="searchbar">
          <form className="form" onSubmit={this.handleSubmit}>
            <button type="submit" className="button">
              <span className="button-label">Search</span>
            </button>

            <input
              className="input"
              type="text"
              // autocomplete="off"
              // autofocus
              placeholder="Search images and photos"
              onChange={this.handleOnChange}
            />
          </form>
        </header>
        <ul className="gallery">
          {data.hits.map((value, index) => {
            <li key={index} className="gallery-item">
              <img src={value.largeImageURL} alt="" />
            </li>;
          })}
        </ul>
      </>
    );
  }
}

export default App;
