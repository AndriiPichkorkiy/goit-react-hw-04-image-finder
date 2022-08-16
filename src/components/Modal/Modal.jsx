import { useEffect } from "react"
import { createPortal } from 'react-dom'
import { Overlay, ModalDiv, ButtonClose } from "./Modal.styled";
import PropTypes from 'prop-types';
import { useCallback } from "react";
// import { useEffect } from "react";

const modalRoot = document.getElementById('modal')

export function Modal({ children, toggleModal }) {

    useEffect(() => {
        window.addEventListener('keydown', onPressESC);
        // hide vertical scroll
        document.documentElement.style.overflow = "hidden";

        return () => {
            window.removeEventListener('keydown', onPressESC);
            document.documentElement.style.overflow = null;
        }
    }, [])

    const onCloseModal = useCallback( () => {
        toggleModal();
    }, [])

    const onPressESC = useCallback( (e) => {
        const { keyCode } = e;
        if (keyCode === 27) onCloseModal() //if it is a ESC
    }, [])

    const onClickOverlay = useCallback( (e) => {
        const { currentTarget, target } = e;
        if (currentTarget === target) onCloseModal()
    }, [])

    return createPortal(<Overlay onClick={onClickOverlay}>
        <ButtonClose onClick={onCloseModal}>X</ButtonClose>
        <ModalDiv>
            {children}
        </ModalDiv>
    </Overlay>, modalRoot)


}

Modal.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};
