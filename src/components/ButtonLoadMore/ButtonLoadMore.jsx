import { ButtonLoadMoreStyled } from './ButtonLoadMore.styled'
import PropTypes from 'prop-types';

export function ButtonLoadMore({ onClick }) {
    return <ButtonLoadMoreStyled onClick={onClick}>Load More</ButtonLoadMoreStyled>
}

ButtonLoadMore.propTypes = {
    onClick: PropTypes.func.isRequired,
};