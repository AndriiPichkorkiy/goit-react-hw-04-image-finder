import { ImageGalleryLi, ImageGalleryImage } from './ImageGallery.styled'

export function ImageGalleryItem({ cards, onClick }) {
    return cards?.map((card, i) => {
        return <ImageGalleryLi key={card.id}>
            <ImageGalleryImage src={card.webformatURL} alt={card.tags} data-id={i} onClick={onClick} loading="lazy" />
        </ImageGalleryLi>
    }

    )
}