import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

const NEW_MOVIE = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export class NewMovie extends Component {
  state = {
    movie: NEW_MOVIE,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(state => ({
      movie: {
        ...state.movie,
        [name]: value,
      },
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { movie } = this.state;

    if (Object.values(movie).every(value => value.trim() !== '')) {
      this.props.onAdd(movie);
    }

    this.setState({ movie: NEW_MOVIE });
  }

  render() {
    const { movie } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        {
          Object.keys(NEW_MOVIE).map((key) => {
            if (key === 'description') {
              return (
                <textarea
                  key={key}
                  type="text"
                  className="form__item"
                  autoComplete="off"
                  placeholder={key}
                  name={key}
                  value={movie[key]}
                  onChange={this.handleChange}
                />
              );
            }

            return (
              <input
                key={key}
                type="text"
                className="form__item"
                autoComplete="off"
                placeholder={key}
                name={key}
                value={movie[key]}
                onChange={this.handleChange}
              />
            );
          })
        }
        <button type="submit" className="form__button">Add movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
