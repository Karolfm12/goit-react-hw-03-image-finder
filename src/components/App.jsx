import Notiflix from 'notiflix';
import { Component } from 'react';
import simpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';
import Header from './Header';
import Images from './Images';

class App extends Component {
  state = {
    key: '18941965-072e6ae370689f800c64fac36',
    q: '',
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
      page: 1,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { key, q, image_type, orientation, safesearch, per_page, page } =
      this.state;

    if (!q) {
      Notiflix.Notify.info('Please enter a search query.');
      return;
    }

    const URL = `https://pixabay.com/api/?key=${key}&q=${encodeURIComponent(
      q
    )}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}&per_page=${per_page}&page=${page}`;

    fetch(URL)
      .then(response => response.json())
      .then(data => {
        if (data.hits.length === 0) {
          // throw new Error('No images matching your search query');
          Notiflix.Notify.failure('No images matching your search query');
        }
        this.setState({ imageData: data.hits });
      })
      .catch(error => {
        this.setState({ imageData: [] });
        console.log(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      });
    e.target.reset();
  };

  loadMoreImages = e => {
    e.preventDefault();
    const { key, q, image_type, orientation, safesearch, per_page, page } =
      this.state;

    const nextPage = page + 1;

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
    return (
      <>
        <Header
          handleSubmit={this.handleSubmit}
          handleOnChange={this.handleOnChange}
        />
        <Images
          imageData={this.state.imageData}
          loadMoreImages={this.loadMoreImages}
        />
      </>
    );
  }
}

export default App;
