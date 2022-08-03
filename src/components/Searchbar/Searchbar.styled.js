import { Field, Form, ErrorMessage } from 'formik';
import { default as icon } from '../../imgs/322497_search_icon.svg';

const { default: styled } = require('styled-components');

const Header = styled.header`
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #fff;
  background-color: #1b2e52eb;
  /* background: linear-gradient(#d6f0cd, #d6f0cd); */
  box-shadow: 0px 2px 4px -1px #1b2c4c55, 0px 4px 5px 0px #1b2c4c55,
    0px 1px 10px 0px #1b2c4c33;
`;

const FormStyled = styled(Form)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  background-color: #6aa7a7e0;
  border-radius: 4rem;
  overflow: hidden;
`;

const ButtonSearch = styled.button`
  display: inline-block;
  width: 48px;
  height: 48px;
  border: 0;
  background-color: transparent;
  background-image: url(${icon});
  background-size: 40%;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.6;
  transition-duration: 150ms;
  cursor: pointer;
  outline: none;

  &:hover {
    transform: scale(120%);
  }
`;

const FieldStyled = styled(Field)`
  border-radius: 2rem;
  padding: 0.5rem;
  color: #632b24;
  border: #632b24 1px solid;

  &:hover {
    box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #d6f0cd,
      0 0 30px #d6f0cd, 0 0 40px #d6f0cd, 0 0 55px #d6f0cd, 0 0 75px #d6f0cd;
  }
`;

const ErrorMessageStyled = styled(ErrorMessage)`
  position: absolute;
  top: 0.2rem;
  left: 1rem;
`;

export { Header, FormStyled, ButtonSearch, FieldStyled, ErrorMessageStyled };
