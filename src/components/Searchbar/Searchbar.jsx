import { Component } from "react";
import { Formik } from 'formik';
import { Header, FormStyled, ButtonSearch, FieldStyled } from "./Searchbar.styled";
import PropTypes from 'prop-types';

export class Searchbar extends Component {

    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    render() {
        return <Header >
            <Formik
                initialValues={{ searchField: '' }}

                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);
                    this.props.onSubmit(values.searchField);
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
}