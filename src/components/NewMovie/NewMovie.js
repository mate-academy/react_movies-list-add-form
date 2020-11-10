/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
/* eslint-disable arrow-parens */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input } from '../UI/Input';

const initialState = {
  options: {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  },
  errors: {},
};

export class NewMovie extends Component {
  state = initialState;

  vaidateForm = () => {
    const { title, imgUrl, imdbId, imdbUrl } = this.state.options;
    const errors = {};
    const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (!title) {
      errors.title = 'required';
    }

    if (!imgUrl) {
      errors.imgUrl = 'required';
    }

    if (!imdbId) {
      errors.imdbId = 'required';
    }

    if (!imdbUrl) {
      errors.imdbUrl = 'required';
    }

    if (imgUrl && !regex.test(imgUrl)) {
      errors.imgUrl = 'error';
    }

    if (imdbId && !regex.test(imdbId)) {
      errors.imdbId = 'error';
    }

    if (imdbUrl && !regex.test(imdbUrl)) {
      errors.imdbUrl = 'error';
    }

    return errors;
  };

  onChange = (e) => {
    const { name, value } = e.target;

    this.setState((state) => ({
      options: {
        ...state.options,
        [name]: value,
      },
    }));
  };

  onAdd = (e) => {
    e.preventDefault();
    const errors = this.vaidateForm();

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
    } else {
      this.props.addMovie({ ...this.state.options });
      this.setState(initialState);
    }
  };

  render() {
    const {
      options: { title, description, imgUrl, imdbUrl, imdbId },
      errors,
    } = this.state;

    return (
      <>
        <h1>Add movie</h1>
        <form onSubmit={(e) => this.onAdd(e)}>
          <Input
            placeholder="title"
            value={title}
            name="title"
            onChange={this.onChange}
            label="Title"
            error={errors.title}
          />

          <Input
            placeholder="description"
            value={description}
            name="description"
            onChange={this.onChange}
            label="Description"
            error={errors.description}
          />

          <Input
            placeholder="imgUrl"
            value={imgUrl}
            name="imgUrl"
            onChange={this.onChange}
            label="imgUrl"
            error={errors.imgUrl}
          />

          <Input
            placeholder="imdbUrl"
            value={imdbUrl}
            name="imdbUrl"
            onChange={this.onChange}
            label="imdbUrl"
            error={errors.imdbUrl}
          />

          <Input
            placeholder="imdbId"
            value={imdbId}
            name="imdbId"
            onChange={this.onChange}
            label="imdbId"
            error={errors.imdbId}
          />

          <button type="submit">Add</button>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

NewMovie.defaultProps = {};
