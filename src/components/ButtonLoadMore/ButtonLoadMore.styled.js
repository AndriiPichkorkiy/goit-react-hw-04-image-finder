const { default: styled } = require('styled-components');

const ButtonLoadMoreStyled = styled.button`
  display: block;
  margin: 2rem auto;
  padding: 1rem 2.5rem;
  border-radius: 0.5rem;
  background-color: transparent;
  color: #632b24;

  cursor: pointer;

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
export { ButtonLoadMoreStyled };
