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
    errors: {
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
      button: false,
    },
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    const { title, imgUrl, imdbUrl, imdbId } = this.state;
    /* eslint-disable-next-line */
    const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    const { onAdd } = this.props;

    event.preventDefault();

    if (!title
      || !imgUrl
      || !imdbUrl
      || !imdbId
    ) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          title: !state.title,
          imgUrl: !regex.test(state.imgUrl),
          imdbUrl: !regex.test(state.imdbUrl),
          imdbId: !state.imdbId,
          button: true,
        },
      }));

      return;
    }

    onAdd({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId, errors } = this.state;

    return (
      <form
        post="./api/form"
        method="POST"
        onSubmit={this.handleSubmit}
      >
        <label htmlFor="title">
          Title
        </label>
        <input
          className={errors.title ? 'invalid' : ''}
          name="title"
          id="title"
          value={title}
          placeholder="title"
          onChange={this.handleChange}
        />
        {errors.title && (
          <div className="error">
            Title is required
          </div>
        )}
        <br />
        <label htmlFor="description">
          Description
        </label>
        <input
          name="description"
          id="description"
          value={description}
          placeholder="description"
          onChange={this.handleChange}
        />
        <br />
        <label htmlFor="imgUrl">
          imgUrl
        </label>
        <input
          className={errors.imgUrl ? 'invalid' : ''}
          name="imgUrl"
          id="imgUrl"
          value={imgUrl}
          placeholder="imgUrl"
          onChange={this.handleChange}
        />
        {errors.imgUrl && (
          <div className="error">
            Please enter a valid url
          </div>
        )}

        <br />
        <label htmlFor="imdbUrl">
          imdbUrl
        </label>
        <input
          className={errors.imdbUrl ? 'invalid' : ''}
          name="imdbUrl"
          id="imdbUrl"
          value={imdbUrl}
          placeholder="imdbUrl"
          onChange={this.handleChange}
        />

        {errors.imdbUrl && (
          <div className="error">
            Please enter a valid url
          </div>
        )}
        <br />
        <label htmlFor="imdbId">
          imdbId
        </label>
        <input
          className={errors.imdbId ? 'invalid' : ''}
          name="imdbId"
          id="imdbId"
          value={imdbId}
          placeholder="imdbId"
          onChange={this.handleChange}
        />
        {errors.imdbId && (
          <div className="error">
            imdbId is required
          </div>
        )}
        <br />
        <button
          type="submit"
          disabled={errors.button && true}
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
