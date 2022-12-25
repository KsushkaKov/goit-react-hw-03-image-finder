import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  webformatURL,
  alt,
  largeImageURL,
  onImageClick,
}) => {
  return (
    <li
      className={css.ImageGalleryItem}
      onClick={() => onImageClick(largeImageURL)}
    >
      <img
        src={webformatURL}
        alt={alt}
        name={largeImageURL}
        className={css.ImageGalleryItemImage}
      />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  alt: PropTypes.string,
  onclick: PropTypes.func,
};
