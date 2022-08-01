import { Component } from "react";
import { ImageGalleryItem } from "./ImageGalleryItem";

export class ImageGallery extends Component {

    render() {
        return <ul className="ImageGallery">
            <ImageGalleryItem cards={this.props.cards} />
        </ul>
    }
}