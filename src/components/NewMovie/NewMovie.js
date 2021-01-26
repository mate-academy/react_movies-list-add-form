import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './NewMovie.scss';

// eslint-disable-next-line max-len
const validator = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component {
  state = {
    values: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    errors: {
      title: false,
      description: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'imgUrl' || name === 'imdbUrl') {
      if (validator.test(value)) {
        this.setState(state => ({
          values: {
            ...state.values,
            [name]: value.trim(),
          },
          errors: {
            ...state.errors,
            [name]: false,
          },
        }));
      } else {
        this.setState(state => ({
          values: {
            ...state.values,
          },
          errors: {
            ...state.errors,
            [name]: true,
          },
        }));
      }
    } else {
      this.setState(state => ({
        values: {
          ...state.values,
          [name]: value.trim(),
        },
        errors: {
          ...state.errors,
          [name]: false,
        },
      }));
    }
  }

  handleSubmit = (event) => {
    const { title, description, imdbId, imdbUrl, imgUrl } = this.state.values;

    event.preventDefault();

    if (!title || !imdbId || !imdbUrl || !imgUrl) {
      this.setState(state => ({
        errors: {
          title: !state.values.title,
          imgUrl: !state.values.imgUrl,
          imdbUrl: !state.values.imdbUrl,
          imdbId: !state.values.imdbId,
        },
      }));
    } else {
      this.props.onAdd(title, imdbId, imdbUrl, imgUrl, description);
      this.setState({
        values: {
          title: '',
          description: '',
          imgUrl: '',
          imdbUrl: '',
          imdbId: '',
        },
      });
    }
  }

  render() {
    const { values, errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Add new movie form:</h1>
        {errors.title && <p>Please enter the title!</p>}
        <input
          className={classNames('input', { 'is-danger': errors.title })}
          type="text"
          name="title"
          placeholder="title"
          value={values.title}
          onChange={this.handleChange}
        />
        <br />
        {errors.imdbId && <p>Please enter the imdbId!</p>}
        <input
          className={classNames('input', { 'is-danger': errors.imdbId })}
          type="text"
          name="imdbId"
          placeholder="imdbId"
          value={values.imdbId}
          onChange={this.handleChange}
        />
        <br />
        {errors.imdbUrl && <p>Please enter the imdbUrl!</p>}
        <input
          className={classNames('input', { 'is-danger': errors.imdbUrl })}
          type="text"
          name="imdbUrl"
          placeholder="imdbUrl"
          value={values.imdbUrl}
          onChange={this.handleChange}
        />
        <br />
        {errors.imgUrl && <p>Please enter imgUrl!</p>}
        <input
          className={classNames('input', { 'is-danger': errors.imgUrl })}
          type="text"
          name="imgUrl"
          placeholder="imgUrl"
          value={values.imgUrl}
          onChange={this.handleChange}
        />
        <br />
        <textarea
          className="textarea"
          name="description"
          placeholder="Description"
          value={values.description}
          onChange={this.handleChange}
        />
        <br />
        <button
          className="button is-light"
          type="submit"
        >
          New movie!
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
