import { Component } from 'react';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

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
    imageData: [],
  };

  componentDidMount() {
    // Instantiate the lightbox
    this.lightbox = new simpleLightbox('.gallery a', {
      captions: true,
      captionSelector: 'img',
      captionType: 'attr',
      captionsData: 'alt',
      captionDelay: 250,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // Refresh the lightbox when imageData changes
    if (prevState.imageData !== this.state.imageData) {
      this.lightbox.refresh();
    }
  }

  handleOnChange = e => {
    this.setState({
      q: e.target.value,
    });
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
      .then(data => {
        this.setState({ imageData: data.hits }); // Store fetched data in state
      })
      .catch(error => {
        console.log(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      });
  };

  // loadMoreImages = e => {
  //   e.preventDefault();
  //   this.setState(prevState => ({
  //     per_page: prevState.per_page + 10,
  //   }));
  // };

  // loadMoreImages = e => {
  //   e.preventDefault();
  //   this.setState(
  //     prevState => ({
  //       per_page: prevState.per_page + 10,
  //       page: Math.floor((prevState.per_page + 10) / 10) + 1, // Increment page number
  //     }),
  //     () => {
  //       this.handleSubmit(e); // Trigger search with updated parameters
  //     }
  //   );
  // };

  loadMoreImages = e => {
    e.preventDefault();
    const { key, q, image_type, orientation, safesearch, per_page, page } =
      this.state;

    const nextPage = page + 1; // Calculate the next page

    const URL = `https://pixabay.com/api/?key=${key}&q=${encodeURIComponent(
      q
    )}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}&per_page=${per_page}&page=${nextPage}`;

    fetch(URL)
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => ({
          imageData: [...prevState.imageData, ...data.hits],
          page: nextPage,
        }));
      })
      .catch(error => {
        console.log(
          'Sorry, there was an error while loading more images. Please try again.'
        );
      });
  };

  render() {
    const { imageData } = this.state;

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
        {imageData.length > 0 ? (
          <>
            <ul className="gallery">
              {imageData.map((value, index) => {
                return (
                  <li key={index} className="gallery-item">
                    <a href={value.largeImageURL}>
                      <img src={value.largeImageURL} alt="" />
                    </a>
                  </li>
                );
              })}
            </ul>
            <button className="loadMore" onClick={this.loadMoreImages}>
              Load More images
            </button>
          </>
        ) : (
          console.log('no image')
        )}
      </>
    );
  }
}

export default App;
