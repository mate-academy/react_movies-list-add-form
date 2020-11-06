import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from './Input';
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
        <Input name="title" handleChange={this.handleChange} />
        <Input name="description" handleChange={this.handleChange} />
        <Input name="imgUrl" handleChange={this.handleChange} />
        <Input name="imdbUrl" handleChange={this.handleChange} />
        <Input name="imdbId" handleChange={this.handleChange} />
        <button type="submit" className="submitButton">Add movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
