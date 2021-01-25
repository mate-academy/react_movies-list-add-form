import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    errors: {
      title: false,
      imdbId: false,
      imgUrl: false,
      imdbUrl: false,
      isDisabled: false,
    },
  };

  checkingToEmpty = (fields) => {
    Object.entries(fields).forEach((field) => {
      if (!field[1]) {
        this.setState(state => ({
          errors: {
            ...state.errors,
            isDisabled: true,
            [field[0]]: true,
          },
        }));
      }
    });
  }

  handleChangeUrl = ({ target }) => {
    // eslint-disable-next-line max-len
    const valid = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    const { name, value } = target;

    !valid.test(value)
      ? this.setState(state => ({ errors: {
        ...state.errors, [name]: true,
      } }))
      : this.setState(state => ({ errors: {
        ...state.errors, [name]: false,
      } }));

    this.setState({ [name]: value });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    if (!value) {
      this.setState(state => ({ errors: {
        ...state.errors, isDisabled: true, [name]: true,
      } }));
    }

    this.setState(this.setState(state => ({ errors: {
      ...state.errors, isDisabled: false, [name]: false,
    } })));

    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, imdbId, imdbUrl, imgUrl } = this.state;
    const newMovie = {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    };

    if (Object.values(newMovie).some(field => !field)) {
      this.checkingToEmpty(newMovie);

      return;
    }

    this.props.onAdd(newMovie);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const { title,
      description, imgUrl, imdbUrl, imdbId, errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">
          Title:
          {errors.title && <span>Title is required</span>}
          <input
            placeholder="..."
            id="title"
            name="title"
            className={errors.title ? 'red' : ''}
            type="text"
            value={title}
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="description">
          Description:
          <input
            placeholder="..."
            id="description"
            name="description"
            type="text"
            value={description}
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="imgUrl">
          Link to poster:
          {errors.imgUrl && <span>Invalid link</span>}
          <input
            placeholder="..."
            id="imgUrl"
            name="imgUrl"
            className={errors.imgUrl ? 'red' : ''}
            type="text"
            value={imgUrl}
            onChange={this.handleChangeUrl}
          />
        </label>

        <label htmlFor="imdbUrl">
          Link to IMDb:
          {errors.imdbUrl && <span>Invalid link</span>}
          <input
            placeholder="..."
            id="imdbUrl"
            name="imdbUrl"
            className={errors.imdbUrl ? 'red' : ''}
            type="text"
            value={imdbUrl}
            onChange={this.handleChangeUrl}
          />
        </label>

        <label htmlFor="imdbId">
          Id:
          {errors.imdbId && <span>Id is required</span>}
          <input
            placeholder="..."
            id="imdbId"
            name="imdbId"
            className={errors.imdbId ? 'red' : ''}
            type="text"
            value={imdbId}
            onChange={this.handleChange}
          />
        </label>

        <button type="submit" disabled={errors.isDisabled}>Add film</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
