import React, { Component } from 'react';
import './NewMovie.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    movie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    errors: {
      title: [],
      description: [],
      imgUrl: [],
      imdbUrl: [],
      imdbId: [],
    },
  };

  handleChange = (e) => {
    const { value, name } = e.target;

    this.setState(state => ({
      movie: {
        ...state.movie,
        [name]: value,
      },
    }));
  }

  validate = (name, value) => {
    // eslint-disable-next-line max-len
    const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    const errors = {
      title: [],
      description: [],
      imgUrl: [],
      imdbUrl: [],
      imdbId: [],
    };

    if (!value) {
      errors[name].push(`Enter ${name} please!`);
    }

    if (!regex.test(value) && value
      && (name === 'imdbUrl' || name === 'imgUrl')) {
      errors[name].push(`* ${name} is not valid!`);
    }

    this.setState(state => ({
      ...state,
      errors,
    }));
  }

  handleOnBluer = (e) => {
    const { value, name } = e.target;

    this.validate(name, value);
  }

  hasErrors = () => {
    const { errors, movie } = this.state;
    let valid;

    if (Object.values(errors).some(arr => arr.length > 0)
        || Object.values(movie).some(arr => arr !== '')) {
      valid = true;
    }

    if (Object.values(movie).every(arr => arr !== '')) {
      valid = false;
    }

    return valid;
  }

  handleSubmit = (e) => {
    const { addMovie } = this.props;
    const { movie } = this.state;

    e.preventDefault();
    if (Object.values(movie).every(arr => arr === '')) {
      return;
    }

    addMovie(this.state.movie);
    this.setState({
      movie: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    });
  }

  render() {
    const { movie, errors } = this.state;

    return (
      <form className="NewMovie" onSubmit={this.handleSubmit}>
        {Object.keys(movie).map(item => (
          <div key={item}>
            <input
              type="text"
              name={item}
              placeholder={item}
              value={movie[item]}
              className={classNames('input', {
                invalid: errors[item][0],
              })}
              onChange={this.handleChange}
              onBlur={this.handleOnBluer}
            />
            <span>{errors[item]}</span>
          </div>
        ))}
        <button type="submit" disabled={this.hasErrors()}>Add movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
