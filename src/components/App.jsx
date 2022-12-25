import React from 'react';
import * as ImageService from 'service/image-service';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export class App extends React.Component {
  state = {
    images: [],
    isLoading: false,
    page: 1,
    query: '',
    error: '',
    openModal: false,
    per_page: 12,
    largeImgUrl: '',
  };

  componentDidUpdate = async (_, prevState) => {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getImages();
    }
  };

  getQuery = query => {
    this.setState({
      query,
      images: [],
      page: 1,
      totalHits: 0,
    });
  };

  handleImgClick = largeImgUrl => {
    this.setState({
      openModal: true,
      largeImgUrl,
    });
  };

  handleLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  getImages = async () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });

    try {
      const { hits, totalHits } = await ImageService.getImages(query, page);

      this.setState(prevState => {
        return {
          images: [...prevState.images, ...hits],
          totalHits,
          error: '',
        };
      });
    } catch (error) {
      this.setState({ error: 'Server not answering' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const showBtn = this.state.images.length > 0;
    const { images, isLoading, error, largeImgUrl } = this.state;
    const showGallery = images.length > 0;
    const showError = error.length > 0;
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar onSubmit={this.getQuery} />
        {showError && (
          <p>
            Ooops, something went wrong...<b>{error}</b>
          </p>
        )}
        {isLoading && <Loader />}
        {showGallery && (
          <ImageGallery onImageClick={this.handleImgClick} images={images} />
        )}
        {!showGallery && <div>Please, enter your search request 🔎</div>}

        {showBtn ? <Button onClick={this.handleLoadMore} /> : null}
        {largeImgUrl && (
          <Modal
            largeImgUrl={largeImgUrl}
            handleImgClick={this.handleImgClick}
          />
        )}
      </div>
    );
  }
}
