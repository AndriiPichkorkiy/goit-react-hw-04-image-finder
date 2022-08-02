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
    lastResponse: null,
    collection: [],
    isLoading: false,
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
    this.setState({
      isLoading: true,
    })
    const data = await searchAPI.fetchImg(query);
    // console.log('data', data)
    this.setState(prevState => ({
      lastResponse: data,
      collection: [...data.hits],
      isLoading: false,
    }))
  }

  getMore = async (query) => {
    const data = await searchAPI.loadMore();
    // console.log('data', data)
    this.setState(prevState => ({
      lastResponse: data,
      collection: [...prevState.collection, ...data.hits]
    }))
  }



  render() {
    const { collection, isLoading, modal } = this.state
    const needRenderBtn = Boolean(this.state.lastResponse?.total)
    return (
      <div>
        <Searchbar onSubmit={this.getImgs} />
        {!!collection.length && <ImageGallery cards={collection} onClick={this.openSlider} />
        }
        {needRenderBtn && <ButtonLoadMore onClick={this.getMore} />}
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


