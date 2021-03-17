import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';
import { Input } from '../Input';

// eslint-disable-next-line
const verifier = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    disabledSubmit: false,
    isError: {
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },
  };

  controlHandle = () => {
    const { title, imgUrl, imdbUrl, imdbId } = this.state;

    if (
      !title
      || !verifier.test(imgUrl)
      || !verifier.test(imdbUrl)
      || !imdbId
    ) {
      this.setState(prevState => ({
        disabledSubmit: true,
        isError: {
          title: !prevState.title,
          imgUrl: !verifier.test(prevState.imgUrl),
          imdbUrl: !verifier.test(prevState.imdbUrl),
          imdbId: !prevState.imdbId,
        },
      }));
    }
  }

  submitHandle = (event) => {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    event.preventDefault();
    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.onAdd(newMovie);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  changeHandle =(event) => {
    const { value, name } = event.target;

    this.setState(prevState => ({
      [name]: value,
      disabledSubmit: false,
      isError: {
        ...prevState.isError,
        [name]: false,
      },
    }));
  }

  render() {
    const { title, imgUrl, imdbUrl, imdbId } = this.state.isError;

    return (
      <form onSubmit={this.submitHandle} onBlur={this.controlHandle}>
        <h1 className="form__header">Add new movie</h1>

        <Input
          labelText="Add title"
          name="title"
          changeHandle={this.changeHandle}
          title={title}
          textOnError="Title should not be empty"
          value={this.state.title}
        />

        <Input
          labelText="Add description"
          name="description"
          changeHandle={this.changeHandle}
          value={this.state.description}
        />

        <Input
          labelText="Add imgUrl"
          name="imgUrl"
          value={this.state.imgUrl}
          changeHandle={this.changeHandle}
          title={imgUrl}
          textOnError="Please check the correctness of the imgUrl"
        />

        <Input
          labelText="Add imdbUrl"
          name="imdbUrl"
          value={this.state.imdbUrl}
          changeHandle={this.changeHandle}
          title={imdbUrl}
          textOnError="Please check the correctness of the imdbUrl"
        />

        <Input
          labelText="Add imdbId"
          name="imdbId"
          value={this.state.imdbId}
          changeHandle={this.changeHandle}
          title={imdbId}
          textOnError="imdbId should not be empty"
        />

        <button
          className="form__button"
          type="submit"
          disabled={this.state.disabledSubmit}
        >
          Add movie
        </button>

      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
