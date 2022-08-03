import Spiner from '../../imgs/loader.svg';
const { default: styled } = require('styled-components');

const ButtonChangeImg = styled.button`
  position: absolute;
  cursor: pointer;

  font-size: 3rem;
  color: #d6f0cd;
  background-color: transparent;
  border: none;
  height: 10rem;
  width: 3rem;
  opacity: 0.5;

  top: 50%;
  transform: translate(0, -50%);
  transition-duration: 250ms;
  transition-property: all;

  ${props => (props.type !== 'Next' ? 'left: 0rem;' : 'right: 0rem;')}

  &:hover {
    opacity: 1;
    color: #ffffff;
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #49ff18,
      0 0 30px #49ff18, 0 0 40px #49ff18, 0 0 55px #49ff18, 0 0 75px #49ff18;
  }
`;

const ImgSlider = styled.img`
  position: relative;
  display: block;
  max-width: 100%;
  height: auto;
  z-index: 5;
`;

const LoaderForImg = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;

  width: 50%;
  height: 50%;

  background-image: url(${Spiner});
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 20;
`;

export { ButtonChangeImg, ImgSlider, LoaderForImg };
