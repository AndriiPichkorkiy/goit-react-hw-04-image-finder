import { Component } from "react"
import { createPortal } from 'react-dom'

const modalRoot = document.getElementById('modal')

export class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.onPressESC);
        //hide vertical scroll
        document.body.style.overflow = "hidden";
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onPressESC);
        document.body.style.overflow = null;
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
        return createPortal(<div class="Overlay" onClick={onClickOverlay}>
            <button onClick={onCloseModal} className='Close-btn'>X</button>
            <div class="Modal">
                {children}
            </div>
        </div>, modalRoot)
    }

}