import React, { Component } from 'react';
import propTypes from 'prop-types';
import { FormInput } from '../FormInput';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  onChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  submit = (event) => {
    event.preventDefault();
    this.props.addMovie(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const keys = Object.keys(this.state);

    return (
      <form onSubmit={this.submit}>
        {keys.map(key => (
          <FormInput
            key={key}
            inputType={key}
            onChange={this.onChange}
          />
        ))}

        <button type="submit">
          Add new movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: propTypes.func.isRequired,
};
