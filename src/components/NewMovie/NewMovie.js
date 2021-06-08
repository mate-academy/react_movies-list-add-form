import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';
import { Input } from '../input';

const initialState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

function transformText(text) {
  return text.slice(0, 1).toUpperCase() + text.slice(1);
}

export class NewMovie extends Component {
  state = {
    ...initialState,
  };

  onAdd = ({ target }) => {
    this.setState({
      [target.name]: transformText(target.value),
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { addMovie } = this.props;

    addMovie(this.state);

    this.setState({ ...initialState });
  }

  render() {
    return (
      <form
        className="new-movie__form"
        onSubmit={this.handleSubmit}
      >
        {Object.entries(this.state).map(element => (
          <Input
            title={element[0]}
            value={element[1]}
            onAdd={this.onAdd}
            transformText={transformText}
          />
        ))}

        <button
          type="submit"
          className="new-movie__button"
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
