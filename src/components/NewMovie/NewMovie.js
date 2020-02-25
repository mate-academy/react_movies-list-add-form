import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewMovie.scss';

const pattern = new RegExp(`^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?`
    + `[A-Za-z0-9.-]+|(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)((?:\\/`
    + `[+~%/.\\w-_]*)?\\??(?:[-+=&;%@.\\w_]*)#?(?:[.!/\\\\\\w]*))?)$`, 'gim');

export class NewMovie extends Component {
  state = {
    validation: {
      isTitleValid: false,
      isImgUrlValid: false,
      isImdbUrlValid: false,
      isImdbIdValid: false,
    },
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  onSubmit = (event) => {
    event.preventDefault();

    const { title,
      description,
      imgUrl,
      imdbUrl,
      imdbId } = this.state;

    this.props.onAdd({
      title: title.trim(),
      description: description.trim(),
      imgUrl,
      imdbUrl,
      imdbId: imdbId.trim(),
    });

    this.setState({
      validation: {
        isTitleValid: false,
        isImgUrlValid: false,
        isImdbUrlValid: false,
        isImdbIdValid: false,
      },
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  titleChange = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      title: value,
      validation: {
        ...prevState.validation, isTitleValid: value.trim(),
      },
    }));
  }

  descriptionChange = (event) => {
    this.setState({
      description: event.target.value,
    });
  }

  imgUrlChange= (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      imgUrl: value,
      validation: {
        ...prevState.validation,
        isImgUrlValid: value.trim().match(pattern),
      },
    }));
  }

  imdbUrlChange= (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      imdbUrl: value,
      validation: {
        ...prevState.validation,
        isImdbUrlValid: value.trim().match(pattern),
      },
    }));
  }

  imdbIdChange= (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      imdbId: value,
      validation: {
        ...prevState.validation,
        isImdbIdValid: value.trim(),
      },
    }));
  }

  onBlurHandlerTitle = (event) => {
    const { target, currentTarget } = event;

    if (this.state.validation.isTitleValid) {
      target.classList.remove('error-border');
      currentTarget.classList.remove('error');
    } else {
      target.classList.add('error-border');
      currentTarget.classList.add('error');
    }
  }

  onBlurHandlerImgUrl = (event) => {
    const { target, currentTarget } = event;

    if (this.state.validation.isImgUrlValid) {
      target.classList.remove('error-border');
      currentTarget.classList.remove('error');
    } else {
      target.classList.add('error-border');
      currentTarget.classList.add('error');
    }
  }

  onBlurHandlerImdbUrl = (event) => {
    const { target, currentTarget } = event;

    if (this.state.validation.isImdbUrlValid) {
      target.classList.remove('error-border');
      currentTarget.classList.remove('error');
    } else {
      target.classList.add('error-border');
      currentTarget.classList.add('error');
    }
  }

  onBlurHandlerImdbId = (event) => {
    const { target, currentTarget } = event;

    if (this.state.validation.isImdbIdValid) {
      target.classList.remove('error-border');
      currentTarget.classList.remove('error');
    } else {
      target.classList.add('error-border');
      currentTarget.classList.add('error');
    }
  }

  render() {
    const { title,
      description,
      imgUrl,
      imdbUrl,
      imdbId } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <div className="fieldWraper">
          <label onBlur={this.onBlurHandlerTitle}>
            Movie title:
            <input
              type="text"
              placeholder="title"
              value={title}
              size="40"
              onChange={this.titleChange}
            />
          </label>
        </div>
        <div className="fieldWraper">
          <label>
            Description movie:
            <textarea
              placeholder="Description movie"
              rows="10"
              cols="40"
              onChange={this.descriptionChange}
              value={description}
            />
          </label>
        </div>
        <div className="fieldWraper">
          <label onBlur={this.onBlurHandlerImgUrl}>
            ImgUrl:
            <textarea
              placeholder="ImgUrl movie"
              rows="4"
              cols="40"
              onChange={this.imgUrlChange}
              value={imgUrl}
            />
          </label>
        </div>
        <div className="fieldWraper">
          <label onBlur={this.onBlurHandlerImdbUrl}>
            ImdbUrl:
            <textarea
              placeholder="ImdbUrl movie"
              rows="2"
              cols="40"
              onChange={this.imdbUrlChange}
              value={imdbUrl}
            />
          </label>
        </div>
        <div className="fieldWraper">
          <label onBlur={this.onBlurHandlerImdbId}>
            ImdbId:
            <input
              type="text"
              placeholder="ImdbId movie"
              value={imdbId}
              size="40"
              onChange={this.imdbIdChange}
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={!(this.state.validation.isTitleValid
            && this.state.validation.isImgUrlValid
            && this.state.validation.isImdbUrlValid
            && this.state.validation.isImdbIdValid)}
        >
          Add new movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
