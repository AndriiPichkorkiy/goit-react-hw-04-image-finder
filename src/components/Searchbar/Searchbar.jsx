import { Formik } from 'formik';
import { Header, FormStyled, ButtonSearch, FieldStyled } from "./Searchbar.styled";
import PropTypes from 'prop-types';

export function Searchbar({ onSubmit }) {
    return <Header >
        <Formik
            initialValues={{ searchField: '' }}

            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                onSubmit(values.searchField);
            }}
        >
            {({ isSubmitting }) => (
                <FormStyled>
                    <ButtonSearch type="submit" disabled={isSubmitting}>
                    </ButtonSearch>
                    <FieldStyled
                        name="searchField"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </FormStyled>
            )}
        </Formik>
    </Header >
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};