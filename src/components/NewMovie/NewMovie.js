import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    newMovie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },

    invalid: {
      title: true,
      imgUrl: true,
      imdbUrl: true,
      imdbId: true,
    },

    changed: {
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState(state => ({
      newMovie: {
        ...state.newMovie,
        [name]: value,
      },
      changed: {
        ...state.changed,
        [name]: true,
      },
    }));
  };

  validation = (event) => {
    const { name } = event.target;
    const patternValue = /\w/;

    /* eslint-disable */
    const patternUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    /* eslint-disable */

    if (name === 'imgUrl' || name === 'imdbUrl') {
      if (!patternUrl.test(this.state.newMovie[name])) {
        this.setState(state => ({
          invalid: {
            ...state.invalid,
            [name]: false,
          },
        }));
      } else {
        this.setState(state => ({
          invalid: {
            ...state.invalid,
            [name]: true,
          },
        }));
      }
    } else if (!patternValue.test(this.state.newMovie[name])) {
      this.setState(state => ({
        invalid: {
          ...state.invalid,
          [name]: false,
        },
      }));
    } else {
      this.setState(state => ({
        invalid: {
          ...state.invalid,
          [name]: true,
        },
      }));
    }
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state.newMovie;
    const { onAdd } = this.props;

    return (
      <form
        className="page__creater"
        action="#"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();

          const validationsOfMovie = Object.values(this.state.invalid);
          const changesOfDates = Object.values(this.state.changed);

          if (validationsOfMovie.includes(false) || changesOfDates.includes(false)) {
            return;
          }

          onAdd(this.state.newMovie);
          this.setState({
            newMovie: {
              title: '',
              description: '',
              imgUrl: '',
              imdbUrl: '',
              imdbId: '',
            },

            invalid: {
              title: true,
              imgUrl: true,
              imdbUrl: true,
              imdbId: true,
            },

            changed: {
              title: false,
              imgUrl: false,
              imdbUrl: false,
              imdbId: false,
            },
          });
        }}
      >
        <div>
          <p className={!this.state.invalid.title ? 'incorrect' : 'correct'}>invalid value</p>
          <label className="page__item">
            {' '}
            Title:
            <input
              className={!this.state.invalid.title ? 'page__item--input invalid' : 'page__item--input'}
              type="text"
              name="title"
              placeholder="tape a title"
              value={title}

              onChange={this.handleChange}

              onBlur={this.validation}
            />
          </label>
        </div>

        <br />

        <div>
          <label className="page__item">
            {' '}
            Description:
            <input
              className="page__item--input"
              type="text"
              name="description"
              placeholder="tape a description"
              value={description}
              onChange={this.handleChange}
            />
          </label>

        </div>

        <div>
          <p className={!this.state.invalid.imgUrl ? 'incorrect' : 'correct'}>invalid value</p>
          <label className="page__item">
            {' '}
            imgUrl:
            <input
              className={!this.state.invalid.imgUrl ? 'page__item--input invalid' : 'page__item--input'}
              type="text"
              name="imgUrl"
              placeholder="https://..."
              value={imgUrl}

              onChange={this.handleChange}

              onBlur={this.validation}
            />
          </label>
        </div>

        <div>
          <p className={!this.state.invalid.imdbUrl ? 'incorrect' : 'correct'}>invalid value</p>
          <label className="page__item">
            {' '}
            imdbUrl:
            <input
              className={!this.state.invalid.imdbUrl ? 'page__item--input invalid' : 'page__item--input'}
              type="text"
              name="imdbUrl"
              placeholder="https://..."
              value={imdbUrl}
              onChange={this.handleChange}

              onBlur={this.validation}
            />
          </label>
        </div>

        <div>
          <p className={!this.state.invalid.imdbId ? 'incorrect' : 'correct'}>invalid value</p>
          <label className="page__item">
            {' '}
            imdbId:
            <input
              className={!this.state.invalid.imdbId ? 'page__item--input invalid' : 'page__item--input'}
              type="text"
              name="imdbId"
              placeholder="tape a imdbId"
              value={imdbId}
              onChange={this.handleChange}

              onBlur={this.validation}
            />
          </label>
        </div>

        <br />

        <button
          type="submit"
          className="page__button"
          disabled={Object.values(this.state.changed).includes(false)}
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
