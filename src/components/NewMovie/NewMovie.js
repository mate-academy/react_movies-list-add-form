import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    isTitleValid: false,
    isImgUrlValid: false,
    isImdbUrlValid: false,
    isImdbIdValid: false,
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  focused = {
    isTitleFocused: false,
    isImgUrlFocused: false,
    isImdbUrlFocused: false,
    isImdbIdFocused: false,
  }

  pattern2 = new RegExp(`^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?`
    + `[A-Za-z0-9.-]+|(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)((?:\\/`
    + `[+~%/.\\w-_]*)?\\??(?:[-+=&;%@.\\w_]*)#?(?:[.!/\\\\\\w]*))?)$`, 'gim');

  onSubmit = (event) => {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    event.preventDefault();
    this.props.onAdd({
      title: title.trim(),
      description: description.trim(),
      imgUrl,
      imdbUrl,
      imdbId: imdbId.trim(),
    });

    this.focused = {
      isTitleFocused: false,
      isImgUrlFocused: false,
      isImdbUrlFocused: false,
      isImdbIdFocused: false,
    };

    this.setState({
      isTitleValid: false,
      isImgUrlValid: false,
      isImdbUrlValid: false,
      isImdbIdValid: false,
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  titleChange = (event) => {
    const { value } = event.target;

    this.setState({
      title: value,
      isTitleValid: value.trim(),
    });
  }

  descriptionChange = (event) => {
    this.setState({
      description: event.target.value,
    });
  }

  imgUrlChange= (event) => {
    const { value } = event.target;

    this.setState({
      imgUrl: value,
      isImgUrlValid: value.trim().match(this.pattern2),
    });
  }

  imdbUrlChange= (event) => {
    const { value } = event.target;

    this.setState({
      imdbUrl: value,
      isImdbUrlValid: value.trim().match(this.pattern2),
    });
  }

  imdbIdChange= (event) => {
    const { value } = event.target;

    this.setState({
      imdbId: value,
      isImdbIdValid: value.trim(),
    });
  }

  onBlurHandlerTitle = (event) => {
    const { target, currentTarget } = event;

    if (this.state.isTitleValid) {
      target.classList.remove('error-border');
      currentTarget.classList.remove('error');
    } else {
      target.classList.add('error-border');
      currentTarget.classList.add('error');
    }
  }

  onBlurHandlerImgUrl = (event) => {
    const { target, currentTarget } = event;

    if (this.state.isImgUrlValid) {
      target.classList.remove('error-border');
      currentTarget.classList.remove('error');
    } else {
      target.classList.add('error-border');
      currentTarget.classList.add('error');
    }
  }

  onBlurHandlerImdbUrl = (event) => {
    const { target, currentTarget } = event;

    if (this.state.isImdbUrlValid) {
      target.classList.remove('error-border');
      currentTarget.classList.remove('error');
    } else {
      target.classList.add('error-border');
      currentTarget.classList.add('error');
    }
  }

  onBlurHandlerImdbId = (event) => {
    const { target, currentTarget } = event;

    if (this.state.isImdbIdValid) {
      target.classList.remove('error-border');
      currentTarget.classList.remove('error');
    } else {
      target.classList.add('error-border');
      currentTarget.classList.add('error');
    }
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

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
              onFocus={(this.focused.isTitleFocused = true)}
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
              onFocus={(this.focused.isImgUrlFocused = true)}
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
              onFocus={(this.focused.isImdbUrlFocused = true)}
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
              onFocus={(this.focused.isImdbIdFocused = true)}
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={!(this.state.isTitleValid
            && this.state.isImgUrlValid
            && this.state.isImdbUrlValid
            && this.state.isImdbIdValid)}
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
