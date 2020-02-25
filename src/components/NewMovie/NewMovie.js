import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';
import { NewField } from '../NewField';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isValid: {
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { addMovie } = this.props;
    const {
      title, description, imgUrl, imdbUrl, imdbId,
    } = this.state;
    const movie = {
      title, description, imgUrl, imdbUrl, imdbId,
    };
    // eslint-disable-next-line max-len
    const pattern = new RegExp(`^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)((?:\\/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@.\\w_]*)#?(?:[.!/\\\\\\w]*))?)$`);

    this.setState((prevState) => {
      const obj = {
        title: false,
        imgUrl: false,
        imdbUrl: false,
        imdbId: false,
      };

      if (title === '') {
        obj.title = true;
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
        isValid: {
          title: obj.title,
          imgUrl: obj.imgUrl,
          imdbUrl: obj.imdbUrl,
          imdbId: obj.imdbId,
        },
      };
    });

    if (
      !(title === ''
        || (imgUrl === '' || !pattern.test(imgUrl))
        || (imdbUrl === '' || !pattern.test(imdbUrl))
        || imdbId === '')
    ) {
      addMovie(movie);
      this.clearInputs();
    }
  };

  handleInput = ({ target }) => {
    const { name, value } = target;

    this.setState(prevState => ({
      [name]: value.replace(/\s/g, ''),
      isValid: {
        ...prevState.isValid,
        [name]: false,
      },
    }));
  };

  clearInputs = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      isValid,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <NewField
          name="title"
          value={title}
          onChange={this.handleInput}
          isValid={isValid.title}
        />

        <NewField
          name="description"
          value={description}
          onChange={this.handleInput}
        />

        <NewField
          name="imgUrl"
          value={imgUrl}
          onChange={this.handleInput}
          isValid={isValid.imgUrl}
        />

        <NewField
          name="imdbUrl"
          value={imdbUrl}
          onChange={this.handleInput}
          isValid={isValid.imdbUrl}
        />

        <NewField
          name="imdbId"
          value={imdbId}
          onChange={this.handleInput}
          isValid={isValid.imdbId}
        />

        <button type="submit" className="button is-primary">Add</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
