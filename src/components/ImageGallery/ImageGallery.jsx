import { Component } from "react";
import { ImageGalleryItem } from "./ImageGalleryItem";
import { Modal } from "../Modal";
import { Slider } from "../Slider";
import { ImageGalleryUl } from './ImageGallery.styled'

export class ImageGallery extends Component {
    state = {
        modal: {
            show: false,
            imgId: null,
        },
    }
    toggleModal = () => {
        this.setState(prevState => {
            return { modal: { ...prevState.modal, show: !prevState.modal.show } }
        });
    }

    openSlider = (e) => {
        this.toggleModal();
        const imgId = e.target.dataset.id;
        this.setState(prevState => ({ modal: { ...prevState.modal, imgId } }));
    }

    render() {
        const { state: { modal }, openSlider, toggleModal } = this;
        const { cards } = this.props;
        return <>

            <ImageGalleryUl className="ImageGallery">
                <ImageGalleryItem cards={cards} onClick={openSlider} />
            </ImageGalleryUl>
            {modal.show &&
                <Modal toggleModal={toggleModal}>
                    <Slider imgId={modal.imgId} collection={cards} />
                </Modal>
            }
        </>
    }
}