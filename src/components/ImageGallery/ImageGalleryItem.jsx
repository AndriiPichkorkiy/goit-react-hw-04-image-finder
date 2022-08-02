export function ImageGalleryItem({ cards, onClick }) {
    return cards?.map((card, i) => {
        // console.log(card);
        return <li className="ImageGalleryItem" key={card.id}>
            <img src={card.webformatURL} alt={card.tags} className="ImageGalleryItem-image" data-id={i} onClick={onClick} />
        </li>
    }

    )
}