import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input';
import { validURL } from '../../test/test';

import './NewMovie.scss';

const movieFieldsRequired = ['imgUrl', 'imdbUrl', 'imdbId', 'title'];

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

    if (value) {
      switch (name) {
        case 'imgUrl':
        case 'imdbUrl':
          this.setState(prevState => ({
            hasWarning: {
              ...prevState.hasWarning,
              [name]: !validURL(value),
            },
          }));
          break;
        default:
      }

      return;
    }

    this.setState(prevState => ({
      hasWarning: {
        ...prevState.hasWarning,
        [name]: true,
      },
    }));
  }

  handleDisabled = () => {
    const { imgUrl, imdbUrl } = this.state.hasWarning;

    const hasError = Object.values(this.state.necessaryFields).some(
      field => !field,
    );

    if (!hasError && !imdbUrl && !imgUrl) {
      return false;
    }

    return true;
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
