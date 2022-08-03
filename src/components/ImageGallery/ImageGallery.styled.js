const { default: styled } = require('styled-components');

const ImageGalleryUl = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-auto-rows: minmax(0.5fr, 1fr);
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

const ImageGalleryLi = styled.li`
  /* border-radius: 2px; */
  box-shadow: 0px 2px 4px -1px #1b2c4c55, 0px 4px 5px 0px #1b2c4c55,
    0px 1px 10px 0px #1b2c4c33;
    min-height: 20rem;
`;

const ImageGalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.03);
    cursor: zoom-in;
  }
`;

export { ImageGalleryUl, ImageGalleryLi, ImageGalleryImage };
