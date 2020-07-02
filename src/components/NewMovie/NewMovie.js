import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    newTitle: '',
    titleError: false,
    newDescription: '',
    descriptionError: false,
    newImgUrl: '',
    imgUrlError: false,
    newImdbUrl: '',
    imdbUrlError: false,
    newImdbld: '',
    imdbldErorr: false,
  };

  handleChangeTitle = ({ target: { value } }) => {
    this.setState(prevState => ({
      newTitle: value,
      titleError: false,
    }));
  };

  handleChangeDescription = ({ target: { value } }) => {
    this.setState(prevState => ({
      newDescription: value,
      descriptionError: false,
    }));
  };

  handleChangeImgUrl = ({ target: { value } }) => {
    this.setState(prevState => ({
      newImgUrl: value,
      imgUrlError: false,
    }));
  };

  handleChangeImdbUrl = ({ target: { value } }) => {
    this.setState(prevState => ({
      newImdbUrl: value,
      imdbUrlError: false,
    }));
  };

  handleChangeImdbld = ({ target: { value } }) => {
    this.setState(prevState => ({
      newImdbld: value,
      titleError: false,
    }));
  };

  submitHandler = (e) => {
    e.preventDefault();

    if (!this.state.newTitle) {
      this.setState(prevState => ({ titleError: true }));
    }

    if (!this.state.newDescription) {
      this.setState(prevState => ({ descriptionError: true }));
    }

    if (!this.state.newImgUrl) {
      this.setState(prevState => ({ imgUrlError: true }));
    }

    if (!this.state.newImdbUrl) {
      this.setState(prevState => ({ imdbUrlError: true }));
    }

    if (!this.state.newImdbld) {
      this.setState(prevState => ({ imdbldErorr: true }));
    }

    if (this.state.newImdbld
      && this.state.newImdbUrl
      && this.state.newImgUrl
      && this.state.newDescription
      && this.state.newTitle
    ) {
      this.props.addMovie({
        title: this.state.newTitle,
        description: this.state.newDescription,
        imgUrl: this.state.newImgUrl,
        imdbUrl: this.state.imdUrl,
        imdbld: this.state.newImdbld,
      });
    }

    this.setState(prevState => ({
      newTitle: '',
      newDescription: '',
      newImgUrl: '',
      newImdbUrl: '',
      newImdbld: '',
    }));
  }

  render() {
    return (
      <form className="film__form" onSubmit={this.submitHandler}>
        <label htmlFor="">
          Title
          <input
            type="text"
            className="film__input"
            onChange={this.handleChangeTitle}
            placeholder="Enter title"
          />
        </label>
        {this.state.titleError && (
          <div className="film__error">Please, enter title text</div>
        )}
        <label htmlFor="">
          Description
          <input
            type="text"
            className="film__input"
            onChange={this.handleChangeDescription}
            placeholder="Enter description"
          />
        </label>
        {this.state.descriptionError && (
          <div className="film__error">Please, enter description text</div>
        )}
        <label htmlFor="">
          ImgUrl
          <input
            type="text"
            className="film__input"
            onChange={this.handleChangeImgUrl}
            placeholder="Enter imgUrl"
          />
        </label>
        {this.state.imgUrlError && (
          <div className="film__error">Please, enter imgUrl text</div>
        )}
        <label htmlFor="">
          ImdbUrl
          <input
            type="text"
            className="film__input"
            onChange={this.handleChangeImdbUrl}
            placeholder="Enter imdbUrl"
          />
        </label>
        {this.state.imdbUrlError && (
          <div className="film__error">Please, enter imdUrl text</div>
        )}
        <label htmlFor="">
          imdbld
          <input
            type="text"
            className="film__input"
            onChange={this.handleChangeImdbld}
            placeholder="Enter imdbld"
          />
        </label>
        {this.state.imdbldErorr && (
          <div className="film__error">Please, enter imdbld title text</div>
        )}
        <button type="submit">Save card</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
