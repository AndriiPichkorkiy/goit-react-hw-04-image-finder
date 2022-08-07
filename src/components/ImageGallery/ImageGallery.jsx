import { Component } from "react";
import { ImageGalleryItem } from "./ImageGalleryItem";
import { ImageGalleryUl } from './ImageGallery.styled'
import PropTypes from 'prop-types';

export class ImageGallery extends Component {

    static propTypes = {
        onClick: PropTypes.func.isRequired,
        cards: PropTypes.array.isRequired,
    };

    render() {
        const { cards, onClick } = this.props;
        return <>

            <ImageGalleryUl className="ImageGallery">
                <ImageGalleryItem cards={cards} onClick={onClick} />
            </ImageGalleryUl>
        </>
    }
}