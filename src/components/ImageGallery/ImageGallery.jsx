import { Component } from "react";
import { ImageGalleryItem } from "./ImageGalleryItem";
import { Modal } from "../Modal";
import { Slider } from "../Slider";

export class ImageGallery extends Component {
    state = {
        modal: {
            show: false,
            imgId: null,
        },
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     // if (this.props.cards !== nextProps.cards) return true
    //     // else return false
    // }

    toggleModal = () => {
        this.setState(prevState => {
            return { modal: { ...prevState.modal, show: !prevState.modal.show } }
        });
    }

    openSlider = (e) => {
        this.toggleModal();
        const imgId = e.target.dataset.id;
        // const src = this.props.cards[imgId];
        // console.log(src);
        console.log(this.state.modal.show);
        this.setState(prevState => ({ modal: { ...prevState.modal, imgId } }));
    }

    render() {
        const { state: { modal }, openSlider, toggleModal } = this;
        const { cards } = this.props;
        console.log((modal));
        return <>

            <ul className="ImageGallery">
                <ImageGalleryItem cards={cards} onClick={openSlider} />
            </ul>
            {modal.show &&
                <Modal toggleModal={toggleModal}>
                    <Slider imgId={modal.imgId} collection={cards} />
                </Modal>
            }
        </>
    }
}