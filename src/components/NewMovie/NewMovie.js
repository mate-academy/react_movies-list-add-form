import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TitleInput } from './TitleInput';
import { ImageUrlInput } from './ImageUrlInput';
import { ImdbUrlInput } from './ImdbUrlInput';
import { ImdbIdInput } from './ImdbIdInput';
import { TextareaInput } from './TextareaInput';

import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    urlValid: {
      imgUrlValid: false,
      imdbUrlValid: false,
    },
  };

  formValidate = (event, formValid) => {
    const { id } = event.target;
    const { urlValid } = this.state;

    switch (id) {
      case 'imgUrl':
        this.setState({
          urlValid: {
            imgUrlValid: formValid,
            imdbIdValid: urlValid.imdbUrlValid,
          },
        });
        break;

      case 'imdbUrl':
        this.setState({
          urlValid: {
            imgUrlValid: urlValid.imgUrlValid,
            imdbIdValid: formValid,
          },
        });
        break;

      default:
        break;
    }
  }

  handleChange = (event, formValid) => {
    const { id, value } = event.target;

    switch (id) {
      case 'title':
        this.setState({
          title: value,
          isValid: { titleValid: formValid },
        });
        break;

      case 'description':
        this.setState({
          description: value,
        });
        break;

      case 'imgUrl':
        this.setState({
          imgUrl: value,
          isValid: { imgUrlValid: formValid },
        });
        break;

      case 'imdbUrl':
        this.setState({
          imdbUrl: value,
          isValid: { imdbIdValid: formValid },
        });
        break;

      case 'imdbId':
        this.setState({
          imdbId: value,
          isValid: { imdbIdValid: formValid },
        });
        break;

      default:
        break;
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const newMovie = { ...this.state };
    const { addMovie } = this.props;

    addMovie(newMovie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl, imdbUrl,
      imdbId,
      urlValid,
    } = this.state;
    const urlDisable = Object.values(urlValid).includes(false);
    const disable = title && imdbId && !urlDisable;

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <TitleInput onChange={this.handleChange} title={title} />
        <TextareaInput onChange={this.handleChange} description={description} />
        <ImageUrlInput
          onChange={this.handleChange}
          imgUrl={imgUrl}
          formValidate={this.formValidate}
        />
        <ImdbUrlInput
          onChange={this.handleChange}
          imdbUrl={imdbUrl}
          formValidate={this.formValidate}
        />
        <ImdbIdInput onChange={this.handleChange} imdbId={imdbId} />
        <button disabled={!disable} type="submit" className="form__button">
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
