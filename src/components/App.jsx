import { ImageGallery } from "components/ImageGallery";
import { Component } from "react";
import { Searchbar } from "./Searchbar";

import { searchAPI } from "tools/pixabayAPI";
import { ButtonLoadMore } from "./ButtonLoadMore/";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal";
import { Slider } from "./Slider";


export class App extends Component {
  state = {
    collection: [],
    isLoading: false,
    showBtn: false,
    modal: {
      show: false,
      src: null,
      imgId: null,
    },
  }

  toggleModal = () => {
    this.setState(prevState => {
      return { modal: { ...prevState.modal, show: !prevState.modal.show } }
    });
  }

  openSlider = (e) => {
    this.toggleModal();
    const imgId = e.target.dataset.id;
    const src = this.state.collection[imgId];
    this.setState(prevState => ({ modal: { ...prevState.modal, imgId, src } }));
  }

  getImgs = async (query) => {
    //on loader
    this.setState({
      isLoading: true,
    })

    //do fetch
    const data = await searchAPI.fetchImg(query);

    //check for bad request
    if (data === null) return

    //check if we reached the end of pictures
    const isTheEnd = searchAPI.checkForReachedEnd();

    this.setState(prevState => {
      //check if it is the first time we search or it is a click btn load-more
      const collection = typeof query === 'string' ? [...data.hits] : [...prevState.collection, ...data.hits];

      return {
        collection,
        isLoading: false,
        showBtn: isTheEnd ? false : true,
      }
    })
  }

  render() {
    const { collection, isLoading, modal, showBtn } = this.state
    // const needRenderBtn = Boolean(this.state.lastResponse?.total)
    return (
      <div>
        <Searchbar onSubmit={this.getImgs} />
        {!!collection.length && <ImageGallery cards={collection} onClick={this.openSlider} />
        }
        {showBtn && <ButtonLoadMore onClick={this.getImgs} />}
        {isLoading && <Loader />}
        {modal.show &&
          <Modal toggleModal={this.toggleModal}>
            <Slider src={modal.src} imgId={modal.imgId} collection={collection} />
          </Modal>
        }
      </div>

    );
  }

}


