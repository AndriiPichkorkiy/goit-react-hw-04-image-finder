import { Component } from "react"
import { createPortal } from 'react-dom'
import { Overlay, ModalDiv, ButtonClose } from "./Modal.styled";

const modalRoot = document.getElementById('modal')

export class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.onPressESC);
        //hide vertical scroll
        document.documentElement.style.overflow = "hidden";
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onPressESC);
        document.documentElement.style.overflow = null;
    }

    onCloseModal = () => {
        this.props.toggleModal();
    }

    onPressESC = (e) => {
        const { keyCode } = e;
        if (keyCode === 27) this.onCloseModal() //if it is a ESC
    }

    onClickOverlay = (e) => {
        const { currentTarget, target } = e;
        if (currentTarget === target) this.onCloseModal()
    }

    render() {
        const { children } = this.props;
        const { onCloseModal, onClickOverlay } = this;
        return createPortal(<Overlay onClick={onClickOverlay}>
            <ButtonClose onClick={onCloseModal}>X</ButtonClose>
            <ModalDiv>
                {children}
            </ModalDiv>
        </Overlay>, modalRoot)
    }

}