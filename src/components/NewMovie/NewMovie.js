import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input';

import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    description: '',
    necessaryFields: {
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      title: '',
    },
    hasWarning: {
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },

  };

  handleChange = (event) => {
    const { value, name } = event.target;

    switch (name) {
      case 'description':
        this.setState({ [name]: value });

        break;

      default:
        this.setState(prevState => ({
          hasWarning: {
            ...prevState.hasWarning,
            [name]: false,
          },
          necessaryFields: {
            ...prevState.necessaryFields,
            [name]: value,
          },
        }));
    }
  }

  handleBlur = (event) => {
    const { value, name } = event.target;

    if (!value) {
      this.setState(prevState => ({
        hasWarning: {
          ...prevState.hasWarning,
          [name]: true,
        },
      }));
    }
  }

  handleDisabled = () => {
    return Object.values(this.state.necessaryFields).some(
      field => !field,
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, imdbUrl, imdbId, imgUrl } = this.state.necessaryFields;
    const { description } = this.state;
    const newFilm = {
      title,
      description,
      imgUrl,
      imdbId,
      imdbUrl,
    };

    const necessaryFields = {
      title: '',
      imdbUrl: '',
      imdbId: '',
      imgUrl: '',
    };

    this.setState({
      necessaryFields,
      description: '',
    });

    this.props.onAdd(newFilm);
  }

  render() {
    const { hasWarning, necessaryFields } = this.state;
    const movieFieldsRequired = Object.keys(necessaryFields);
    const { handleSubmit, handleChange, handleBlur, handleDisabled } = this;

    return (
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="NewMovie__form"
      >
        {movieFieldsRequired.map((field) => {
          return (
            <Input
              key={field}
              value={necessaryFields[field]}
              name={field}
              onChange={handleChange}
              onBlur={handleBlur}
              hasWarning={hasWarning}
            />
          );
        })}

        <textarea
          name="description"
          value={this.state.description}
          onChange={handleChange}
          placeholder="description"
          className="NewMovie__textarea"
        />
        <button
          className="NewMovie__button"
          disabled={handleDisabled()}
          type="submit"
        >
          submit
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
