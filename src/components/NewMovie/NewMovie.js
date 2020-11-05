import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input';
import './NewMovie.scss';

const movie = [
  'title',
  'description',
  'imgUrl',
  'imdbUrl',
  'imdbId',
];

const initialState = movie.reduce((acc, value) => {
  return {
    ...acc,
    [value]: '',
  };
}, {});

export class NewMovie extends Component {
  state = initialState;

  handlerChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  onAdd = (event) => {
    event.preventDefault();
    const { addMovie } = this.props;

    this.setState(prevState => addMovie(prevState));
    this.setState({
      ...initialState,
    });
  }

  render() {
    return (
      <form className="form" onSubmit={this.onAdd}>
        {
          movie.map(name => (
            <Input
              key={name}
              handlerChange={this.handlerChange}
              name={name}
              value={this.state[name]}
            />
          ))
        }
        <button type="submit" className="form__button">
          Add new movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
