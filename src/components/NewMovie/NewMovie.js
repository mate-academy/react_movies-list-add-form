import React, { Component } from 'react';
import './NewMovie.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    titleError: false,
    descriptionError: false,
    imgUrlError: false,
    imdbUrlError: false,
    imdbIdError: false,
    errors: {},
    imgUrlValid: true,
    imdbUrlValid: true,
  };

  handleChange = (e) => {
    const { value, name } = e.target;

    this.setState({
      [name]: value,
      [`${name}Error`]: false,
      imgUrlValid: true,
      imdbUrlValid: true,
    });
  }

  validate = () => {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    // eslint-disable-next-line max-len
    const url = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    const errors = {
      title: [],
      description: [],
      imgUrl: [],
      imdbUrl: [],
      imdbId: [],
    };
    let valid = true;

    if (!title) {
      this.setState({ titleError: !title });
      errors.title.push('Enter title please!');
      valid = false;
    }

    if (!description) {
      this.setState({ descriptionError: !description });
      errors.description.push('Enter description please!');
      valid = false;
    }

    if (!imgUrl) {
      this.setState({
        imgUrlError: !imgUrl,
        imgUrlValid: true,
      });
      errors.imgUrl.push('Enter imgUrl please!');
      valid = false;
    }

    if (!imdbUrl) {
      this.setState({
        imdbUrlError: !imdbUrl,
        imdbUrlValid: true,
      });
      errors.imdbUrl.push('Enter imdbUrl please!');
      valid = false;
    }

    if (!imdbId) {
      this.setState({ imdbIdError: !imdbId });
      errors.imdbId.push('Enter description please!');
      valid = false;
    }

    if (!url.test(imgUrl) && imgUrl) {
      this.setState({
        imgUrlError: imgUrl,
        imgUrlValid: false,
      });
      errors.imgUrl.push('* imgUrl is not valid!');
      valid = false;
    }

    if (!url.test(imdbUrl) && imdbUrl) {
      this.setState({
        imdbUrlError: imdbUrl,
        imdbUrlValid: false,
      });
      errors.imdbUrl.push('* imdbUrl is not valid!');
      valid = false;
    }

    this.setState(state => ({
      ...state,
      errors,
    }));

    return valid;
  }

  handleSubmit = (e) => {
    const { addMovie } = this.props;

    e.preventDefault();
    if (this.validate()) {
      addMovie(this.state);
      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
    }
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      titleError,
      descriptionError,
      imgUrlError,
      imdbUrlError,
      imdbIdError,
      imdbUrlValid,
      imgUrlValid,
      errors,
    } = this.state;

    return (
      <form className="NewMovie" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          className={classNames('input')}
          onChange={this.handleChange}
        />
        {titleError && (<span>{errors.title[0]}</span>)}
        <input
          name="description"
          placeholder="Description"
          value={description}
          className={classNames('input')}
          onChange={this.handleChange}
        />
        {descriptionError && (<span>{errors.description[0]}</span>)}
        <input
          type="text"
          name="imgUrl"
          placeholder="imgUrl"
          value={imgUrl}
          className={classNames('input', { invalid: !imgUrlValid })}
          onChange={this.handleChange}
        />
        {imgUrlError && (<span>{errors.imgUrl[0]}</span>)}
        <input
          type="text"
          name="imdbUrl"
          placeholder="imdbUrl"
          value={imdbUrl}
          className={classNames('input', { invalid: !imdbUrlValid })}
          onChange={this.handleChange}
        />
        {imdbUrlError && (<span>{errors.imdbUrl[0]}</span>)}
        <input
          type="text"
          name="imdbId"
          placeholder="imdbId"
          value={imdbId}
          className={classNames('input')}
          onChange={this.handleChange}
        />
        {imdbIdError && (<span>{errors.imdbId[0]}</span>)}
        <button type="submit">Add movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
