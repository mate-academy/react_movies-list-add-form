import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    addedMovie: {},
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    errorMessage: '',
    titleDirty: false,
    imgUrlDirty: false,
    imdbUrlDirty: false,
    imdbIdDirty: false,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.addedMovie !== this.state.addedMovie) {
      this.props.addMovie(this.state.addedMovie);
      this.clearForm();
    }
  }

  onChangeHandler = (e) => {
    const { name, value } = e.target;

    const val = `${name}Dirty`;

    this.setState({
      [name]: value,
      [val]: false,
      submitMessage: false,
    });
  }

  blurHandler = (e) => {
    if (e.target.value) {
      return;
    }

    switch (e.target.name) {
      case 'title':
        this.setState({
          titleDirty: true,
          errorMessage: `Title value is invalid`,
        });
        break;
      case 'imgUrl':
        this.setState({
          imgUrlDirty: true,
          errorMessage: `ImgUrl value is invalid`,
        });
        break;
      case 'imdbUrl':
        this.setState({
          imdbUrlDirty: true,
          errorMessage: `ImdbUrl value is invalid`,
        });
        break;
      case 'imdbId':
        this.setState({
          imdbIdDirty: true,
          errorMessage: `ImdbId value is invalid`,
        });
        break;
      default:
    }
  }

  onSubmitHandler = (e) => {
    e.preventDefault();

    if (
      !this.state.title || !this.state.title.replace(/ /g, '')
      || !this.state.imgUrl || !this.state.imgUrl.replace(/ /g, '')
      || !this.state.imdbUrl || !this.state.imdbUrl.replace(/ /g, '')
      || !this.state.imdbId || !this.state.imdbId.replace(/ /g, '')
    ) {
      this.setState({
        submitMessage: true,
      });
      this.clearForm();

      return;
    }

    this.setState(state => ({
      addedMovie: {
        title: state.title,
        description: state.description,
        imgUrl: state.imgUrl,
        imdbUrl: state.imdbUrl,
        imdbId: state.imdbId,
        submitMessage: false,
      },
    }));
  }

  clearForm() {
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
      imgUrl,
      imdbUrl,
      imdbId,
      errorMessage,
      titleDirty,
      imgUrlDirty,
      imdbUrlDirty,
      imdbIdDirty,
    } = this.state;

    let validForm = true;

    if (!title || !imgUrl
      || !imdbUrl || !imdbId) {
      validForm = false;
    }

    return (
      <form
        className="form-style-7"
        onSubmit={this.onSubmitHandler}
      >
        <ul>
          <li>
            <label htmlFor="title">Title</label>
            <input
              name="title"
              type="text"
              value={title}
              onChange={this.onChangeHandler}
              onBlur={this.blurHandler}
              id="title"
              required="true"
            />
            {(titleDirty && errorMessage)
            && <span style={{ color: 'red' }}>{errorMessage}</span>}
          </li>
          <li>
            <label htmlFor="description">Description</label>
            <input
              name="description"
              type="text"
              value={description}
              onChange={this.onChangeHandler}
              id="description"
            />
          </li>
          <li>
            <label htmlFor="imgUrl">ImgUrl</label>
            <input
              name="imgUrl"
              type="text"
              value={imgUrl}
              onChange={this.onChangeHandler}
              onBlur={this.blurHandler}
              id="imgUrl"
              required="true"
              pattern="/^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:
              [-;:&=+\$,\\w]+@)?[A-Za-z0-9.-]+|
              (?:www\\.|[-;:&=+\$,\\w]+@)[A-Za-z0-9.-]+)
              ((?:\\/[+~%/.\\w-_]*)?\\??(?:
              [-+=&;%@.\\w_]*)#?(?:[.!/\\\\\\w]*))?)\$/"
            />
            {(imgUrlDirty && errorMessage)
            && <span style={{ color: 'red' }}>{errorMessage}</span>}
          </li>
          <li>
            <label htmlFor="imdbUrl">ImdbUrl</label>
            <input
              name="imdbUrl"
              type="text"
              value={imdbUrl}
              onChange={this.onChangeHandler}
              onBlur={this.blurHandler}
              id="imdbUrl"
              required="true"
              pattern="/^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:
              [-;:&=+\$,\\w]+@)?[A-Za-z0-9.-]+|
              (?:www\\.|[-;:&=+\$,\\w]+@)[A-Za-z0-9.-]+)
              ((?:\\/[+~%/.\\w-_]*)?\\??(?:
              [-+=&;%@.\\w_]*)#?(?:[.!/\\\\\\w]*))?)\$/"
            />
            {(imdbUrlDirty && errorMessage)
            && <span style={{ color: 'red' }}>{errorMessage}</span>}
          </li>
          <li>
            <label htmlFor="imdbId">ImdbId</label>
            <input
              name="imdbId"
              type="text"
              value={imdbId}
              onChange={this.onChangeHandler}
              onBlur={this.blurHandler}
              id="imdbId"
              required="true"
            />
            {(errorMessage && imdbIdDirty)
            && <span style={{ color: 'red' }}>{errorMessage}</span>}
          </li>
          <li>
            { this.state.submitMessage
            && (
            <p style={{
              color: 'red', padding: '10px',
            }}
            >
              All inputs must must contain characters
            </p>
            )}
            <button
              type="submit"
              disabled={!validForm}
            >
              Add Movie
            </button>
          </li>
        </ul>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
