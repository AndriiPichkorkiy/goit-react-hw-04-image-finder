import { Component } from "react"
import { ButtonChangeImg, ImgSlider, LoaderForImg } from "./Slider.styled";

export class Slider extends Component {

    state = {
        currentImgId: 0,
        showLoader: true,
    }

    componentDidMount() {
        this.setState({
            currentImgId: +this.props.imgId,
        })
    }

    // componentDidUpdate() {

    // }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onPressESC);
    }

    disableLoader = () => {
        this.setState(prevState => ({
            showLoader: false,
        }))
    }

    onChangeImg = (e) => {
        //show loader
        this.setState(prevState => ({
            showLoader: true,
        }))

        const { dataset: { type } } = e.target;
        const { currentImgId } = this.state;
        const { collection } = this.props;

        let nextImgId = type === 'Next' ? currentImgId + 1 : currentImgId - 1
        if (nextImgId > collection.length - 1) return this.setState({ currentImgId: 0 });
        if (nextImgId < 0) return this.setState({ currentImgId: collection.length - 1 });

        this.setState({ currentImgId: nextImgId });
    }

    render() {
        const { state: { showLoader }, onChangeImg, disableLoader } = this
        const img = this.props.collection[this.state.currentImgId];
        const src = img.largeImageURL;
        const tags = img.tags;
        return <>
            {showLoader && <LoaderForImg />}
            <ButtonChangeImg onClick={onChangeImg} type="Pre" data-type="Pre">&#60;</ButtonChangeImg>
            <ButtonChangeImg onClick={onChangeImg} type="Next" data-type="Next">&#62;</ButtonChangeImg>
            <ImgSlider src={src} alt={tags} onLoad={disableLoader} />

        </>
    }
}