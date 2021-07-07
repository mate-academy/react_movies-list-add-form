import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';
import { MovieButton } from '../MovieButton/MovieButton';
import { MovieInput } from '../MovieInput/MovieInput';
import { urlValidator } from '../Helpers/urlValidator';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    errors: {
      title: true,
      description: true,
      imgUrl: true,
      imdbUrl: true,
      imdbId: true,
    },
    touched: {
      title: false,
      description: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },
  };

  onChangeInput = (event, field) => {
    this.setState({
      [field]: event.replace(/^\s/, '').replace(/\s/g, ' '),
    });
  }

  handleValidate = (event, field) => {
    if (field === 'imgUrl' || field === 'imdbUrl') {
      // eslint-disable-next-line max-len

      if (!urlValidator.test(event)) {
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            [field]: true,
          },
          touched: {
            ...prevState.touched,
            [field]: true,
          },
        }));
      } else {
        this.setState(prevState => ({
          errors: {
            ...prevState.errors,
            [field]: false,
          },
        }));
      }
    } else if (event.length === 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [field]: true,
        },
        touched: {
          ...prevState.touched,
          [field]: true,
        },
      }));
    } else {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          [field]: false,
        },
      }));
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.addNewMovie(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      errors: {
        title: true,
        description: true,
        imgUrl: true,
        imdbUrl: true,
        imdbId: true,
      },
      touched: {
        title: false,
        description: false,
        imgUrl: false,
        imdbUrl: false,
        imdbId: false,
      },
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      errors,
      touched,
    } = this.state;

    const inputs = {
      fieldTitle: title,
      fieldDescription: description,
      fieldImgUrl: imgUrl,
      fieldImdbUrl: imdbUrl,
      fieldImdbId: imdbId,
    };

    const movieInputs = [
      {
        onChangeInput: this.onChangeInput,
        handleValidate: this.handleValidate,
        value: title,
        maxLength: '40',
        field: 'title',
        touched: touched.title,
        error: errors.title,
      },
      {
        onChangeInput: this.onChangeInput,
        handleValidate: this.handleValidate,
        value: description,
        maxLength: '250',
        field: 'description',
        touched: touched.description,
        error: errors.description,
      },
      {
        onChangeInput: this.onChangeInput,
        handleValidate: this.handleValidate,
        value: imgUrl,
        maxLength: '150',
        field: 'imgUrl',
        touched: touched.imgUrl,
        error: errors.imgUrl,
      },
      {
        onChangeInput: this.onChangeInput,
        handleValidate: this.handleValidate,
        value: imdbUrl,
        maxLength: '70',
        field: 'imdbUrl',
        touched: touched.imdbUrl,
        error: errors.imdbUrl,
      },
      {
        onChangeInput: this.onChangeInput,
        handleValidate: this.handleValidate,
        value: imdbId,
        maxLength: '30',
        field: 'imdbId',
        touched: touched.imdbId,
        error: errors.imdbId,
      },
    ];

    // eslint-disable-next-line max-len

    return (
      <form className="App__form" onSubmit={this.handleSubmit}>
        <h1>Add a movie</h1>
        {movieInputs.map(input => (
          <MovieInput
            onChangeInput={input.onChangeInput}
            handleValidate={input.handleValidate}
            value={input.value}
            maxLength={input.maxLength}
            field={input.field}
            touched={input.touched}
            error={input.error}
            key={input.field}
          />
        ))}
        <MovieButton inputs={inputs} />
      </form>
    );
  }
}

NewMovie.propTypes = { addNewMovie: PropTypes.func.isRequired };
