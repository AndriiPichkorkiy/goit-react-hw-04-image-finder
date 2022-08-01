import { Component } from "react";
import { Formik, Field, ErrorMessage, Form } from 'formik';

export class Searchbar extends Component {

    render() {
        return <header className="Searchbar">
            <Formik
                initialValues={{ searchField: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.searchField) {
                        errors.searchField = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values);
                    setSubmitting(false);
                    this.props.onSubmit(values.searchField);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="SearchForm">
                        <button type="submit" className="SearchForm-button" disabled={isSubmitting}>
                            <span class="button-label">Search</span>
                        </button>
                        <Field
                            name="searchField"
                            class="input"
                            type="text"
                            autoComplete="off"
                            autoFocus
                            placeholder="Search images and photos"
                        />
                        <ErrorMessage name="searchField" component="div" />
                    </Form>
                )}
            </Formik>

        </header >
    }
}