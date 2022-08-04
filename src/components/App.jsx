import { ImageGallery } from "components/ImageGallery";
import { Component } from "react";
import { Searchbar } from "./Searchbar";

import { searchAPI } from "tools/pixabayAPI";
import { ButtonLoadMore } from "./ButtonLoadMore/";
import { Loader } from "./Loader/Loader";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export class App extends Component {
  state = {
    collection: [],
    isLoading: false,
    showBtn: false,
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
    if (snapshot === null) {
      return false
    }
    window.scrollBy({
      top: snapshot,
      behavior: 'smooth',
    });

    return true
  }
  
  hideLoading = () => {
    this.setState({ isLoading: false, });



  }

  getImgs = async (query) => {
    //on loader
    this.setState({
      isLoading: true,
    })

    //do fetch
    const data = await searchAPI.fetchImg(query);

    //stop showing loader
    this.hideLoading();
    // this.setState({ isLoading: false, });

    //check for bad request
    if (data === null) return this.showMessage('bad request')

    //check if we reached the end of pictures
    const isTheEnd = !searchAPI.checkForReachedEnd();

    this.setState(prevState => {
      //check if it is the first time we search or it is a click btn load-more
      const collection = typeof query === 'string' ? [...data.hits] : [...prevState.collection, ...data.hits];

      return {
        collection,
        showBtn: isTheEnd
      }
    })
  }

  showMessage(message) {
    toast(message);
  }

  render() {
    const { collection, isLoading, showBtn } = this.state
    return (
      <div>
        <Searchbar onSubmit={this.getImgs} />
        {!!collection.length && <ImageGallery cards={collection} />
        }
        {showBtn && <ButtonLoadMore onClick={this.getImgs} />}
        {isLoading && <Loader />}
        <ToastContainer
          autoClose={2000}
          pauseOnHover={true}
        />
      </div>

    );
  }

}




