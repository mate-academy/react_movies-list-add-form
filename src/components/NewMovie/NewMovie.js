import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Inputs } from '../Inputs';

import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    isRequired: {
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      title: '',
    },
    description: '',
    hasWarning: {
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },

  };

  handleChange = (event) => {
    const { value, name } = event.target;

    if (name !== 'description') {
      this.setState(prevState => ({
        hasWarning: {
          ...prevState.hasWarning,
          [name]: false,
        },
        isRequired: {
          ...prevState.isRequired,
          [name]: value,
        },
      }));
    } else {
      this.setState({ [name]: value });
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

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, imdbUrl, imdbId, imgUrl } = this.state.isRequired;
    const { description } = this.state;
    const newFilm = {
      title,
      description,
      imgUrl,
      imdbId,
      imdbUrl,
    };

    const isRequired = {
      title: '',
      imdbUrl: '',
      imdbId: '',
      imgUrl: '',
    };

    this.setState({
      isRequired,
      description: '',
    });

    this.props.onAdd(newFilm);
  }

  render() {
    const { handleSubmit, handleChange, handleBlur } = this;
    const { hasWarning, isRequired } = this.state;
    const isDisabled = Object.values(isRequired).some(
      field => !field,
    );

    return (
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="NewMovie__form"
      >
        <Inputs
          requiredFields={this.state.isRequired}
          hasWarning={hasWarning}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <textarea
          name="description"
          value={this.state.description}
          onChange={handleChange}
          placeholder="description"
          className="NewMovie__textarea"
        />
        <button
          className="NewMovie__button"
          disabled={isDisabled}
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
