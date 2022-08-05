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

    page: null,
    query: null,
    per_page: 12,
  }

  // async shouldComponentUpdate(nextProps, nextState) {
  //   //reset if new query
  //   if (nextState.query !== this.state.query) {

  //     return false;
  //   }
  //   return true;
  // }

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
    const { collection, isLoading, showBtn } = this.state
    return (
      <div>
        {isLoading && <Loader />}
        <Searchbar onSubmit={this.setQuery} />
        {!!collection.length && <ImageGallery cards={collection} />
        }
        {showBtn && <ButtonLoadMore onClick={this.increasePage} />}
        <ToastContainer
          autoClose={2000}
          pauseOnHover={true}
        />
      </div>

    );
  }

}




