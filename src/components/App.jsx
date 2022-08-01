import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { Component } from "react";
import { Searchbar } from "./Searchbar";

import { searchAPI } from "tools/pixabayAPI";
import { ButtonLoadMore } from "./ButtonLoadMore/ButtonLoadMore";


export class App extends Component {
  state = {
    lastResponse: null,
    collection: [],
  }

  log() {
    console.log('this', this)
  }

  getImgs = async (query) => {
    const data = await searchAPI.fetchImg(query);
    console.log('data', data)
    this.setState(prevState => ({
      lastResponse: data,
      collection: [...data.hits]
    }))
  }

  getMore = async (query) => {
    const data = await searchAPI.loadMore();
    console.log('data', data)
    this.setState(prevState => ({
      lastResponse: data,
      collection: [...prevState.collection, ...data.hits]
    }))
  }



  render() {
    const doRenderBtn = Boolean(this.state.lastResponse?.total)
    return (
      <div>
        <Searchbar onSubmit={this.getImgs} />
        <ImageGallery cards={this.state.collection} />

        {doRenderBtn && <ButtonLoadMore onClick={this.getMore} />}

      </div>

    );
  }

}
