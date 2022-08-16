import { ImageGallery } from "components/ImageGallery";
import { useMemo, useState } from "react";
import { Searchbar } from "./Searchbar";

import { searchAPI } from "tools/pixabayAPI";
import { ButtonLoadMore } from "./ButtonLoadMore/";
import { Loader } from "./Loader/Loader";

import { Modal } from "./Modal";
import { Slider } from "./Slider";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useCallback } from "react";


export function App() {
  const [getCollection, setCollection] = useState([]);
  const [getIsLoading, setIsLoading] = useState(false);
  const [getShowBtn, setShowBtn] = useState(false);

  const [getPage, setPage] = useState(null);
  const [getQuery, setQuery] = useState(null);
  const [getPerPage] = useState(12);

  const [getModalIsHow, setModalIsHow] = useState(false);
  const [getModalImgId, setModalImgId] = useState(null);

  useEffect(() => {
    if (getPage === null) return
    getImgs();
  }, [getPage, getQuery])

  useEffect(() => {
    if (getCollection.length > 12) {
      const { offsetHeight } = document.querySelector('header');
      window.scrollBy({
        top: window.innerHeight - offsetHeight * 2,
        behavior: 'smooth',
      });
    }
  }, [getCollection])

  const toggleModal = () => {
    setModalIsHow(prevValue => !prevValue)

  }

  const openSlider = useCallback((e) => {
    toggleModal();
    const imgId = e.target.dataset.id;
    setModalImgId(imgId)
  }, [])

  const hideLoading = useCallback(() => {
    setIsLoading(false);
  }, [])

  const getImgs = async () => {
    try {
      const searchParams = {
        query: getQuery,
        page: getPage,
        per_page: getPerPage
      }
      //on loader
      setIsLoading(true);

      //do fetch
      const data = await searchAPI.fetchImg(searchParams);
      //check for bad request
      if (data === null) throw Error('bad request')

      //check if we reached the end of pictures
      const isTheEnd = !checkForReachedEnd(data.total);

      //stop showing loader
      hideLoading();

      setCollection(prevValue => [...prevValue, ...data.hits]);
      setShowBtn(isTheEnd);

    } catch (error) {
      //stop showing loader
      hideLoading();
      //show message for user
      showMessage(error.message)
    }

  }

  const setSearchQuery = (query) => {
    setShowBtn(false);
    setQuery(query);
    setCollection([]);
    setPage(1);
  }

  const increasePage = useCallback(() => {
    setPage(prevValue => prevValue + 1);
  }, [])

  const checkForReachedEnd = useCallback((total) => {
    if (getPerPage * (getPage) > total)
      return true;
  }, [])


  const showMessage = useCallback(function (message) {
    toast(message);
  }, [])

  const collection = getCollection;


  return (
    <div>
      {getIsLoading && <Loader />}
      <ToastContainer
        autoClose={2000}
        pauseOnHover={true}
      />

      <Searchbar onSubmit={setSearchQuery} />
      {!!collection.length && <ImageGallery cards={collection} onClick={openSlider} />
      }
      {getShowBtn && <ButtonLoadMore onClick={increasePage} />}

      {getModalIsHow &&
        <Modal toggleModal={toggleModal}>
          <Slider imgId={getModalImgId} collection={collection} />
        </Modal>
      }
    </div>

  );


}




