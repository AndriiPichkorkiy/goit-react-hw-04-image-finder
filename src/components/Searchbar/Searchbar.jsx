import { Component } from "react";
import { Formik } from 'formik';
import { Header, FormStyled, ButtonSearch, FieldStyled, ErrorMessageStyled } from "./Searchbar.styled";

export class Searchbar extends Component {

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