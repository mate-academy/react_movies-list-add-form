import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    titleClassName: 'input is-primary is-small',
    imgUrlClassName: 'input is-primary is-small',
    imdbUrlClassName: 'input is-primary is-small',
    imdbIdClassName: 'input is-primary is-small',
    isTitle: false,
    isImgUrl: false,
    isImdbUrl: false,
    isImdbId: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { addMovie } = this.props;
    const {
      title, description, imgUrl, imdbUrl, imdbId,
    } = this.state;
    const movie = {
      title, description, imgUrl, imdbUrl, imdbId,
    };
    // const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)
    // (?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)
    // ((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (!(title === ''
      || imgUrl === '' || imdbUrl === ''
      || imdbId === '')) {
      addMovie(movie);
      this.clearInputs();
    }

    if (title === '') {
      this.setState({
        titleClassName: 'input is-primary is-small is-danger',
        isTitle: true,
      });
    }

    if (imgUrl === '') {
      this.setState({
        imgUrlClassName: 'input is-primary is-small is-danger',
        isImgUrl: true,
      });
    }

    if (imdbUrl === '') {
      this.setState({
        imdbUrlClassName: 'input is-primary is-small is-danger',
        isImdbUrl: true,
      });
    }

    if (imdbId === '') {
      this.setState({
        imdbIdClassName: 'input is-primary is-small is-danger',
        isImdbId: true,
      });
    }
  };

  handleTitleInput = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
      titleClassName: 'input is-primary is-small',
      isTitle: false,
    });
  };

  handleDescriptionInput = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  handleImgUrlInput = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
      imgUrlClassName: 'input is-primary is-small',
      isImgUrl: false,
    });
  };

  handleImdbUrlInput = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
      imdbUrlClassName: 'input is-primary is-small',
      isImdbUrl: false,
    });
  };

  handleImdbId = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
      imdbIdClassName: 'input is-primary is-small',
      isImdbId: false,
    });
  };

  clearInputs = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      titleClassName,
      imgUrlClassName,
      imdbUrlClassName,
      imdbIdClassName,
      isTitle,
      isImgUrl,
      isImdbUrl,
      isImdbId,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">Name Film:</label>
        { isTitle
          ? <p className="text-error">Enter title!</p>
          : <p className="text-error"> </p>}
        <input
          name="title"
          id="title"
          value={title}
          className={titleClassName}
          type="text"
          onChange={this.handleTitleInput}
        />

        <label htmlFor="description">Description:</label>
        <input
          name="description"
          id="description"
          value={description}
          className="input is-primary is-small description"
          type="textarea"
          onChange={this.handleDescriptionInput}
        />
        <label htmlFor="imgUrl">imgUrl:</label>
        { isImgUrl
          ? <p className="text-error">Invalid value!</p>
          : <p className="text-error"> </p>}
        <input
          name="imgUrl"
          id="imgUrl"
          value={imgUrl}
          className={imgUrlClassName}
          type="text"
          onChange={this.handleImgUrlInput}

        />
        <label htmlFor="imdbUrl">imdbUrl:</label>
        { isImdbUrl
          ? <p className="text-error">Invalid value!</p>
          : <p className="text-error"> </p>}
        <input
          name="imdbUrl"
          id="imdbUrl"
          value={imdbUrl}
          className={imdbUrlClassName}
          type="text"
          onChange={this.handleImdbUrlInput}

        />
        <label htmlFor="imdbId">imdbId:</label>
        { isImdbId
          ? <p className="text-error">Enter imdbId</p>
          : <p className="text-error"> </p>}
        <input
          name="imdbId"
          id="imdbId"
          value={imdbId}
          className={imdbIdClassName}
          type="text"
          onChange={this.handleImdbId}

        />
        <button type="submit" className="button is-primary">Add</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
