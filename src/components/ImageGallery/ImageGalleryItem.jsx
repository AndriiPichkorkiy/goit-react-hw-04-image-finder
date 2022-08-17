import { ImageGalleryLi, ImageGalleryImage } from './ImageGallery.styled'
import { memo } from 'react';
import PropTypes from 'prop-types';

function ImageGalleryItem({ webformatURL, tags, onClick, i }) {
    console.log('render: ' + i)
    return <ImageGalleryLi>
        <ImageGalleryImage src={webformatURL} alt={tags} data-id={i} onClick={onClick} loading="lazy" />
    </ImageGalleryLi>



}

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    i: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default memo(ImageGalleryItem);