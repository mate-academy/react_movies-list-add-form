import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '../TextField/TextField';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    error: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  };

  handleChange = (event) => {
    const regExp = /^\s/;
    const { name, value } = event.target;

    this.setState(prevState => ({
      [name]: value.replace(regExp, ''),
      error: {
        ...prevState.isValid,
        [name]: false,
      },
    }));
  }

  clearInputs = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    this.setState((prevState) => {
      const obj = {
        title: false,
        description: false,
        imgUrl: false,
        imdbUrl: false,
        imdbId: false,
      };

      if (title === '') {
        obj.title = true;
      }

      if (description === '') {
        obj.description = true;
      }

      if (imgUrl === '' || !pattern.test(imgUrl)) {
        obj.imgUrl = true;
      }

      if (imdbUrl === '' || !pattern.test(imdbUrl)) {
        obj.imdbUrl = true;
      }

      if (imdbId === '') {
        obj.imdbId = true;
      }

      return {
        error: {
          title: obj.title,
          description: obj.description,
          imgUrl: obj.imgUrl,
          imdbUrl: obj.imdbUrl,
          imdbId: obj.imdbId,
        },
      };
    });

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (
      !(title === ''
       || description === ''
       || (imgUrl === '' || !pattern.test(imgUrl))
       || (imdbUrl === '' || !pattern.test(imdbUrl))
       || imdbId === '')
    ) {
      this.props.addMovie(movie);
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
      error,
    } = this.state;

    return (
      <form name="field" onSubmit={this.handleSubmit}>
        <TextField
          name="title"
          value={title}
          label="Movie title"
          placeholder="Enter the movie title"
          onChange={this.handleChange}
          error={error.title}
        />
        <TextField
          name="description"
          value={description}
          label="Movie description"
          placeholder="Enter the movie description"
          onChange={this.handleChange}
        />
        <TextField
          name="imgUrl"
          value={imgUrl}
          label="Movie imgUrl"
          placeholder="Enter the movie imgUrl"
          onChange={this.handleChange}
          error={error.imgUrl}
        />
        <TextField
          name="imdbUrl"
          value={imdbUrl}
          label="Movie imdbUrl"
          placeholder="Enter the movie imdbUrl"
          onChange={this.handleChange}
          error={error.imdbUrl}
        />
        <TextField
          name="imdbId"
          value={imdbId}
          label="Movie imdbId"
          placeholder="Enter the movie imdbId"
          onChange={this.handleChange}
          error={error.imdbId}
        />
        <button type="submit" className="button is-link">
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
