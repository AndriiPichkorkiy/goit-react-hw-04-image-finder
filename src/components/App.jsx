import { ImageGallery } from "components/ImageGallery";
import { Component } from "react";
import { Searchbar } from "./Searchbar";

import { searchAPI } from "tools/pixabayAPI";
import { ButtonLoadMore } from "./ButtonLoadMore/";
import { Loader } from "./Loader/Loader";


export class App extends Component {
  state = {
    collection: [],
    isLoading: false,
    showBtn: false,
  }

  getImgs = async (query) => {
    //on loader
    this.setState({
      isLoading: true,
    })

    //do fetch
    const data = await searchAPI.fetchImg(query);

    //stop showing loader
    this.setState({ isLoading: false, });

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

  showMessage(message) { alert(message) }

  render() {
    const { collection, isLoading, showBtn } = this.state
    return (
      <div>
        <Searchbar onSubmit={this.getImgs} />
        {!!collection.length && <ImageGallery cards={collection} />
        }
        {showBtn && <ButtonLoadMore onClick={this.getImgs} />}
        {isLoading && <Loader />}

      </div>

    );
  }

}


