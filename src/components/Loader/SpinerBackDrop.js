const { default: styled } = require('styled-components');

const SpinerBackDrop = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #aaaaaaaa;
  z-index: 10000;
  position: absolute;
  top: 0;
  left: 0;
`;

const SpinerImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25%;

  animation: 3s linear 5s infinite alternate scale;

  @keyframes scale {
    from {
      width: 25%;
    }
    to {
      width: 30%;
    }
  }
`;

export { SpinerBackDrop, SpinerImg };
