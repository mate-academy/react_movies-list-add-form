import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';
import { MovieButton } from '../MovieButton/MovieButton';
import { MovieInput } from '../MovieInput/MovieInput';

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
      const regex = (/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

      if (!regex.test(event)) {
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

    this.props.handleAddMovies(this.state);

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

    // eslint-disable-next-line max-len
    const regex = (/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

    return (
      <form className="App__form" onSubmit={this.handleSubmit}>
        <h1>Add a movie</h1>
        <MovieInput
          onChangeInput={this.onChangeInput}
          handleValidate={this.handleValidate}
          value={title}
          maxLength="40"
          field="title"
          touched={touched.title}
          error={errors.title}
        />
        <MovieInput
          onChangeInput={this.onChangeInput}
          handleValidate={this.handleValidate}
          value={description}
          field="description"
          maxLength="250"
          touched={touched.description}
          error={errors.description}
        />
        <MovieInput
          onChangeInput={this.onChangeInput}
          handleValidate={this.handleValidate}
          value={imgUrl}
          field="imgUrl"
          maxLength="150"
          touched={touched.imgUrl}
          error={errors.imgUrl}
        />
        <MovieInput
          onChangeInput={this.onChangeInput}
          handleValidate={this.handleValidate}
          value={imdbUrl}
          field="imdbUrl"
          maxLength="70"
          touched={touched.imdbUrl}
          error={errors.imdbUrl}
        />
        <MovieInput
          onChangeInput={this.onChangeInput}
          handleValidate={this.handleValidate}
          value={imdbId}
          field="imdbId"
          maxLength="30"
          touched={touched.imdbId}
          error={errors.imdbId}
        />
        <MovieButton inputs={inputs} regex={regex} />
      </form>
    );
  }
}

NewMovie.propTypes = { handleAddMovies: PropTypes.func.isRequired };
