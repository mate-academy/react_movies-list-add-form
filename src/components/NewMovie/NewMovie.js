import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Input } from '../Input';
import './NewMovie.scss';

const initialState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export class NewMovie extends Component {
  state = { ...initialState };

  onChange = ({ target }) => {
    this.setState(prevState => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  onSubmit = (event) => {
    event.preventDefault();

    this.props.addMovie(this.state);

    this.setState({ ...initialState });
  }

  render() {
    return (
      <form
        className="form"
        name="addNewMovieForm"
        onSubmit={this.onSubmit}
        method="post"
      >
        <h1 className="heading">Add new movie</h1>
        {Object.entries(this.state).map(([name, value]) => (
          <Input
            name={name}
            value={value}
            onChange={this.onChange}
          />
        ))}

        <button
          className="button"
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: propTypes.func.isRequired,
};
