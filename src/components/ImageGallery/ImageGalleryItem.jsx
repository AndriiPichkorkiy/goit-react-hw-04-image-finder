import { ImageGalleryLi, ImageGalleryImage } from './ImageGallery.styled'
import PropTypes from 'prop-types';

export function ImageGalleryItem({ card: { webformatURL, tags }, onClick, i }) {
    return <ImageGalleryLi>
        <ImageGalleryImage src={webformatURL} alt={tags} data-id={i} onClick={onClick} loading="lazy" />
    </ImageGalleryLi>



}

ImageGalleryItem.propTypes = {
    card: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};