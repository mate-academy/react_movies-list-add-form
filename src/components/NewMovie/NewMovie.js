import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from './Input';

function isValidUrl(url) {
  // eslint-disable-next-line max-len
  const validUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  return validUrl.test(url);
}

export class NewMovie extends Component {
  state = {
    inputValue: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    error: {
      title: false,
      description: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },
    disabledSubmit: false,
  };

  controlHandle = (event) => {
    const { name, value } = event.target;
    const { title, imgUrl, imdbUrl, imdbId } = this.state.inputValue;

    if (
      !title
      || !isValidUrl(imgUrl)
      || !isValidUrl(imdbUrl)
      || !imdbId
    ) {
      this.setState({ disabledSubmit: true });
    }

    switch (name) {
      case 'imgUrl':
      case 'imdbUrl':
        this.setState(prevState => ({
          error: {
            ...prevState.error,
            [name]: !isValidUrl(value),
          },
        }));
        break;

      case 'title':
      case 'imdbId':
        this.setState(prevState => ({
          error: {
            ...prevState.error,
            [name]: value === '',
          },
        }));
        break;

      default:
        break;
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onAdd(this.state.inputValue);

    this.setState({
      inputValue: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    });
  }

  onChangedInput = (event) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      inputValue: {
        ...prevState.inputValue,
        [name]: value,
      },
      disabledSubmit: false,
      error: {
        ...prevState.error,
        [name]: false,
      },
    }));
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="form"
      >
        <Input
          inputValue={this.state.inputValue}
          inputError={this.state.error}
          controlHandle={this.controlHandle}
          onChangedInput={this.onChangedInput}
        />

        <button
          type="submit"
          disabled={this.state.disabledSubmit}
          className="form__button"
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
