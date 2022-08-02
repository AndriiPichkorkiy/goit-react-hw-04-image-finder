import { Component } from "react"

export class Slider extends Component {

    state = {
        currentImgId: 0,
    }

    componentDidMount() {
        this.setState({
            currentImgId: +this.props.imgId,
        })
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onPressESC);
    }

    getImgSrc = () => {

    }

    onChangeImg = (e) => {
        const { innerText } = e.target;
        const { currentImgId } = this.state;
        const { collection } = this.props;

        let nextImgId = innerText === 'Next' ? currentImgId + 1 : currentImgId - 1
        console.log('nextImgId', nextImgId)
        if (nextImgId > collection.length - 1) return this.setState({ currentImgId: 0 });
        if (nextImgId < 0) return this.setState({ currentImgId: collection.length - 1 });

        this.setState({ currentImgId: nextImgId });
    }

    render() {
        const { onChangeImg } = this
        const src = this.props.collection[this.state.currentImgId].largeImageURL
        return <>
            <button onClick={onChangeImg}>Pre</button>
            <button onClick={onChangeImg}>Next</button>
            <img src={src} alt="" />
        </>
    }

}