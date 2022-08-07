import { ImageGallery } from "components/ImageGallery";
import { Component } from "react";
import { Searchbar } from "./Searchbar";

import { searchAPI } from "tools/pixabayAPI";
import { ButtonLoadMore } from "./ButtonLoadMore/";
import { Loader } from "./Loader/Loader";

import { Modal } from "./Modal";
import { Slider } from "./Slider";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export class App extends Component {
  state = {
    collection: [],
    isLoading: false,
    showBtn: false,

    page: null,
    query: null,
    per_page: 12,

    modal: {
      show: false,
      imgId: null,
    },
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (this.state.isLoading || prevState.collection.length === 0) {
      return null;
    }
    if (prevState.collection.length < this.state.collection.length) {
      const { offsetHeight } = document.querySelector('header');
      return window.innerHeight - offsetHeight * 2;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //do scroll only if load more btn was clicked
    if (snapshot !== null) {
      window.scrollBy({
        top: snapshot,
        behavior: 'smooth',
      });
    }

    return true
  }

  toggleModal = () => {
    this.setState(prevState => {
      return { modal: { ...prevState.modal, show: !prevState.modal.show } }
    });
  }

  openSlider = (e) => {
    this.toggleModal();
    const imgId = e.target.dataset.id;
    this.setState(prevState => ({ modal: { ...prevState.modal, imgId } }));
  }

  hideLoading = () => {
    this.setState({ isLoading: false, });
  }

  getImgs = async () => {
    try {
      const { query, page, per_page } = this.state;
      //on loader
      this.setState({
        isLoading: true,
      })

      //do fetch
      const data = await searchAPI.fetchImg({ query, page, per_page });
      //check for bad request
      if (data === null) throw Error('bad request')

      //check if we reached the end of pictures
      const isTheEnd = !this.checkForReachedEnd(data.total);

      //stop showing loader
      this.hideLoading();

      this.setState(prevState => {
        //check if it is the first time we search or it is a click btn load-more
        const collection = [...prevState.collection, ...data.hits];

        return {
          collection,
          showBtn: isTheEnd,
        }
      })
    } catch (error) {
      //stop showing loader
      this.hideLoading();
      //show message for user
      this.showMessage(error.message)
    }

  }

  setQuery = async (query) => {
    await this.setState({
      collection: [],
      showBtn: false,
      query,
      page: 1,
    })
    this.getImgs();
  }

  increasePage = async () => {
    await this.setState(prevState => ({ page: prevState.page + 1 }))
    this.getImgs();
  }

  checkForReachedEnd = (total) => {
    if (this.state.per_page * (this.state.page) > total)
      return true;
  }


  showMessage(message) {
    toast(message);
  }

  render() {
    const { collection, isLoading, showBtn, modal } = this.state
    const { toggleModal, openSlider } = this
    return (
      <div>
        {isLoading && <Loader />}
        <ToastContainer
          autoClose={2000}
          pauseOnHover={true}
        />

        <Searchbar onSubmit={this.setQuery} />
        {!!collection.length && <ImageGallery cards={collection} onClick={openSlider} />
        }
        {showBtn && <ButtonLoadMore onClick={this.increasePage} />}

        {modal.show &&
          <Modal toggleModal={toggleModal}>
            <Slider imgId={modal.imgId} collection={collection} />
          </Modal>
        }
      </div>

    );
  }

}




