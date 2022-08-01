export function ImageGalleryItem({ cards }) {

    return cards?.map(card => {
        console.log(card);
        return <li className="ImageGalleryItem">
            <img src={card.webformatURL} alt={card.tags} className="ImageGalleryItem-image" />
        </li>
    }

    )
}