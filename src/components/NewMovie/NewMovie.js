import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputCreator } from './InputCreator';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    submitDisabled: true,
  };

  handleChange = (event) => {
    const { id, value } = event.target;

    this.setState({
      [id]: value,
    });
  }

  formClear = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      submitDisabled: true,
    });
  }

  render() {
    const {
      title, description, imgUrl, imdbUrl, imdbId, submitDisabled,
    } = this.state;

    return (
      <form
        name="newMovie"
        onSubmit={(event) => {
          event.preventDefault();
          this.props.onAdd(
            title, description, imgUrl, imdbUrl, imdbId, submitDisabled,
          );
          this.formClear();
        }}
      >
        <InputCreator name="title" handleChange={this.handleChange} />
        <InputCreator name="description" handleChange={this.handleChange} />
        <InputCreator name="imgUrl" handleChange={this.handleChange} />
        <InputCreator name="imdbUrl" handleChange={this.handleChange} />
        <InputCreator name="imdbId" handleChange={this.handleChange} />
        <button type="submit" className="submitButton">Add movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
