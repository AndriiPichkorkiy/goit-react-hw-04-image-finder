const { default: styled } = require('styled-components');

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1b2c4caf;
  z-index: 1200;
`;

const ModalDiv = styled.div`
  max-width: calc(100vw - 7rem);
  max-height: calc(100vh - 2rem);
  overflow: hidden;
`;

const ButtonClose = styled.button`
  position: absolute;
  cursor: pointer;

  top: 0;
  right: 0;
  background-color: transparent;
  color: white;
  width: 3rem;
  height: 3rem;
  font-size: 2rem;

  opacity: 0.5;
  border: none;

  transition-duration: 250ms;
  transition-property: all;

  &:hover {
    opacity: 1;
    color: #ffffff;
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #49ff18,
      0 0 30px #49ff18, 0 0 40px #49ff18, 0 0 55px #49ff18, 0 0 75px #49ff18;
  }
`;

export { Overlay, ModalDiv, ButtonClose };
