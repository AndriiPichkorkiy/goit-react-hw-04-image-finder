import { useState } from "react"
import { ButtonChangeImg, ImgSlider, LoaderForImg } from "./Slider.styled";
import PropTypes from 'prop-types';
import { useCallback } from "react";

export function Slider({ imgId, collection }) {
    const [getImgId, setImgId] = useState(+imgId)
    const [getShowLoader, setShowLoader] = useState(true)

    const disableLoader = useCallback( () => {
        setShowLoader(false)
    }, [])

    const onChangeImg = useCallback((e) => {
        //show loader
        setShowLoader(true);

        const { dataset: { type } } = e.target;
        const currentImgId = getImgId

        let nextImgId = type === 'Next' ? currentImgId + 1 : currentImgId - 1
        if (nextImgId > collection.length - 1) nextImgId = 0
        else if (nextImgId < 0) nextImgId = collection.length - 1

        setImgId(nextImgId)
    }, [])

    const img = collection[getImgId];
    const src = img.largeImageURL;
    const tags = img.tags;
    return <>
        {getShowLoader && <LoaderForImg />}
        <ButtonChangeImg onClick={onChangeImg} type="Pre" data-type="Pre">&#60;</ButtonChangeImg>
        <ButtonChangeImg onClick={onChangeImg} type="Next" data-type="Next">&#62;</ButtonChangeImg>
        <ImgSlider src={src} alt={tags} onLoad={disableLoader} />

    </>

}


Slider.propTypes = {
    collection: PropTypes.array.isRequired,
    imgId: PropTypes.string.isRequired,
};