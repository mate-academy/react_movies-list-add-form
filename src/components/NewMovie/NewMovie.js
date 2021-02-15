/* eslint-disable max-len */
import React, { Component } from 'react';
import uuid from 'uuid-random';
import { NewMovieTypes } from './NewMovieTypes';

import './NewMovie.scss';

const INITIAL_STATE = {
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
  uniqueImdbId: true,
};
const REGEXP_TITLE = /[^\w0-9 ]+/g;
const REGEXP_DESCRIPTION = /[^A-Za-z0-9 \n,'"-.]+/g;
const REGEXP_IMDBID = /^tt([0-9]{6,}\b)+/g;
const REGEXP_URL = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

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
    uniqueImdbId: true,
  };

  checkUniqueImdbId = () => {
    const { listImdbId } = this.props;

    this.setState(({ movie }) => ({
      uniqueImdbId: !listImdbId.includes(movie.imdbId),
    }));
  }

  validate = (regexp, event) => {
    const { name, value } = event.target;
    const errors = {
      title: [],
      description: [],
      imgUrl: [],
      imdbUrl: [],
      imdbId: [],
    };

    if (value === '') {
      errors[name].push(`Please enter ${name}`);
    }

    const test = (name === 'title' || name === 'description')
      ? !value.match(regexp) : regexp.test(value);

    if (!test && value !== '') {
      errors[name].push('Special characters are not allowed');
    }

    this.setState(state => ({
      errors: {
        ...state.errors,
        [name]: [...errors[name]],
      },
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onAdd(this.state.movie);
    this.setState(INITIAL_STATE);
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(({ movie }) => ({
      movie: {
        ...movie,
        [name]: value,
      },
    }));
  }

  unlockSubmit = () => {
    const { errors, movie } = this.state;

    return Object.values(errors).some(error => error.length > 0)
      || Object.values(movie).some(value => value === '');
  }

  handleOnBluer = (event, key) => {
    switch (event.target.name) {
      case 'title':
        this.validate(REGEXP_TITLE, event);
        break;
      case 'description':
        this.validate(REGEXP_DESCRIPTION, event);
        break;
      case 'imgUrl':
      case 'imdbUrl':
        this.validate(REGEXP_URL, event);
        break;
      case 'imdbId':
        this.validate(REGEXP_IMDBID, event);
        break;
      default:
        break;
    }

    if (key === 'imdbId') {
      this.checkUniqueImdbId();
    }
  }

  render() {
    const {
      movie,
      errors,
      uniqueImdbId,
    } = this.state;

    return (
      <form>
        {Object.keys(movie).map(key => (
          <div
            className="container"
            key={uuid()}
          >
            <label>
              {key.toUpperCase()}
              <input
                type="text"
                className={errors[key].length > 0 ? 'error-input' : ''}
                name={key}
                value={movie[key]}
                placeholder={key.toUpperCase()}
                onBlur={event => this.handleOnBluer(event, key)}
                onChange={this.handleChange}
              />
            </label>
            {key === 'imdbId'
              ? (
                <div className="example">
                  [Exp.: tt95430396016]
                </div>
              )
              : null
            }
            <div className="error-message">
              { errors[key] }
              {(!uniqueImdbId && key === 'imdbId') && 'This ImdbId also exist. Please enter new ImdbId'}
            </div>
          </div>
        ))}

        <input
          type="submit"
          value="Add Movie"
          disabled={this.unlockSubmit()}
          onClick={this.handleSubmit}
        />
      </form>
    );
  }
}

NewMovie.propTypes = NewMovieTypes;
