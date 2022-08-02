import { Component } from "react";
import { ImageGalleryItem } from "./ImageGalleryItem";

export class ImageGallery extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.cards !== nextProps.cards) return true
        else return false
    }

    render() {
        console.log('ImageGallery render');
        return <ul className="ImageGallery">
            <ImageGalleryItem cards={this.props.cards} onClick={this.props.onClick} />
        </ul>
    }
}