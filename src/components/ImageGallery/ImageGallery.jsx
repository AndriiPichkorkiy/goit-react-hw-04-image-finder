import { default as ImageGalleryItem } from "./ImageGalleryItem";
import { ImageGalleryUl } from './ImageGallery.styled'
import PropTypes from 'prop-types';
import { useMemo } from "react";

export function ImageGallery({ cards, onClick }) {
    const Items = useMemo(() => {
        return cards.map((card, i) => {
            return <ImageGalleryItem webformatURL={card.webformatURL} tags={card.tags} onClick={onClick} key={card.id} i={i} />
        })
    }, [cards, onClick])

    return <>
        <ImageGalleryUl className="ImageGallery">
            {Items}
        </ImageGalleryUl>
    </>

}

ImageGallery.propTypes = {
    onClick: PropTypes.func.isRequired,
    cards: PropTypes.array.isRequired,
};