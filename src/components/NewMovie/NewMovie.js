import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from '../Form/Form';

export class NewMovie extends Component {
  state = {
    values: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    errors: {
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
      buttonDisabled: false,
    },
  };

  static propTypes = {
    addMovie: PropTypes.func.isRequired,
  }

  onChange = (event) => {
    const { name, value } = event.target;

    this.setState((state) => {
      const buttonDisabled = Object.keys(state.values)
        .filter(key => key !== 'description')
        .some(k => !this.state.values[k]);

      return ({
        values: {
          ...state.values,
          [name]: value,
        },
        errors: {
          ...state.errors,
          [name]: false,
          buttonDisabled,
        },
      });
    });
  }

  setErrors = (errors) => {
    this.setState({ errors });
  }

  clearForm = () => {
    this.setState({
      values: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
      errors: {
        title: false,
        imgUrl: false,
        imdbUrl: false,
        imdbId: false,
        buttonDisabled: false,
      },
    });
  }

  render() {
    const { values, errors } = this.state;
    const { addMovie } = this.props;

    return (
      <Form
        values={values}
        errors={errors}
        onChange={this.onChange}
        onAdd={addMovie}
        setErrors={this.setErrors}
        clearForm={this.clearForm}
      />
    );
  }
}
