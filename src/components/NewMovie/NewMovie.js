import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input } from '../Input';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    inputs: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    errors: {
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { onAdd } = this.props;
    const { inputs } = this.state;

    onAdd({ inputs });

    this.setState({
      inputs: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
      errors: {
        title: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    });
  }

  validateInput = (event) => {
    const { name, value } = event.target;
    const valueToCheck = value.trim();

    if (!valueToCheck) {
      this.setState((prevState) => {
        const newErrorState = {
          ...prevState.errors,
          [name]: 'empty',
        };

        return { errors: newErrorState };
      });

      return;
    }

    // eslint-disable-next-line max-len
    const urlRegex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if ((name === 'imgUrl' || name === 'imdbUrl') && !value.match(urlRegex)) {
      this.setState((prevState) => {
        const newErrorState = {
          ...prevState.errors,
          [name]: 'invalid',
        };

        return { errors: newErrorState };
      });

      return;
    }

    this.setState((prevState) => {
      const newErrorState = {
        ...prevState.errors,
        [name]: 'valid',
      };

      return {
        errors: newErrorState,
      };
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState((prevState) => {
      const newValue = {
        ...prevState.inputs,
        [name]: value,
      };

      return { inputs: newValue };
    });
  }

  render() {
    const {
      inputs,
      errors,
    } = this.state;

    const isFormInvalid = errors.title !== 'valid' || !inputs.title
      || errors.imgUrl !== 'valid' || !inputs.imgUrl
      || errors.imdbUrl !== 'valid' || !inputs.imdbUrl
      || errors.imdbId !== 'valid' || !inputs.imdbId;

    return (
      <form
        className="NewMovie"
        name="newMovie"
        onSubmit={this.handleSubmit}
      >

        <Input
          inputName="title"
          value={inputs.title}
          onChange={this.handleChange}
          onBlur={this.validateInput}
          error={errors.title}
        />

        <input
          className="NewMovie__input"
          type="text"
          name="description"
          placeholder="description"
          value={inputs.description}
          onChange={this.handleChange}
        />

        <Input
          inputName="imgUrl"
          value={inputs.imgUrl}
          onChange={this.handleChange}
          onBlur={this.validateInput}
          error={errors.imgUrl}
        />

        <Input
          inputName="imdbUrl"
          value={inputs.imdbUrl}
          onChange={this.handleChange}
          onBlur={this.validateInput}
          error={errors.imdbUrl}
        />

        <Input
          inputName="imdbId"
          value={inputs.imdbId}
          onChange={this.handleChange}
          onBlur={this.validateInput}
          error={errors.imdbId}
        />

        <button
          className="NewMovie__submit"
          type="submit"
          disabled={isFormInvalid}
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
