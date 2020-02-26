import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from './Input';
import moviesFromServer from '../../api/movies.json';

export class NewMovie extends Component {
  state = {
    movies: moviesFromServer,
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    errors: {
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },
  };

  handleChange = (event) => {
    const regExp = /^\s/;
    const title = event.target.value.replace(regExp, '');

    this.setState({
      [event.target.name]: title,
    });
  }

  clearInputs = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      errors: {
        title: false,
        imgUrl: false,
        imdbUrl: false,
        imdbId: false,
      },
    });
  }

  onAdd = (event) => {
    event.preventDefault();
    const {
      movies,
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const newMovie = {
      movies,
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    // eslint-disable-next-line max-len
    const pattern = new RegExp(`^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)((?:\\/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@.\\w_]*)#?(?:[.!/\\\\\\w]*))?)$`);

    this.setState((prevState) => {
      const validation = {
        title: false,
        imgUrl: false,
        imdbUrl: false,
        imdbId: false,
      };

      if (title === '') {
        validation.title = true;
      }

      if (imgUrl === '' || !pattern.test(imgUrl)) {
        validation.imgUrl = true;
      }

      if (imdbUrl === '' || !pattern.test(imdbUrl)) {
        validation.imdbUrl = true;
      }

      if (imdbId === '') {
        validation.imdbId = true;
      }

      return {
        errors: {
          ...validation,
        },
      };
    });

    if (title && (pattern.test(imgUrl))
      && (pattern.test(imdbUrl)) && imdbId) {
      this.props.addMovie(newMovie);
      this.clearInputs();
    }
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      errors,
    } = this.state;

    return (
      <form onSubmit={this.onAdd}>
        <Input
          id="title"
          value={title}
          placeholder="Enter Movie title"
          name="title"
          onChange={this.handleChange}
          errors={errors.title}
        />
        <Input
          id="description"
          value={description}
          placeholder="Enter description"
          name="description"
          onChange={this.handleChange}
        />
        <Input
          id="imgUrl"
          value={imgUrl}
          placeholder="Enter imgUrl"
          name="imgUrl"
          onChange={this.handleChange}
          errors={errors.imgUrl}
        />
        <Input
          id="imdbUrl"
          value={imdbUrl}
          placeholder="Enter imdbUrl"
          name="imdbUrl"
          onChange={this.handleChange}
          errors={errors.imdbUrl}
        />
        <Input
          id="imdbId"
          value={imdbId}
          placeholder="Enter imdbId"
          name="imdbId"
          onChange={this.handleChange}
          errors={errors.imdbId}
        />
        <div className="control">
          <button
            type="submit"
            className="button is-link"
          >
            Add Movie
          </button>
        </div>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
