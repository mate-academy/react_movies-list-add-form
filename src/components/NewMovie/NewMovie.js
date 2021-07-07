import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input';
import { initialState, movie } from '../../constatnts';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    ...initialState,
    titleError: '',
    imgUrlError: '',
    imdbUrlError: '',
    imdbIdError: '',
  }

  handlerChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  validate = () => {
    let titleError = '';
    let imgUrlError = '';
    let imdbUrlError = '';
    let imdbIdError = '';

    if (!this.state.title) {
      titleError = 'Please enter title...';
    }

    if (!this.state.imgUrl) {
      imgUrlError = 'Please enter imgUrl...';
    }

    if (!this.state.imdbUrl) {
      imdbUrlError = 'Please enter imdbUrl...';
    }

    if (!this.state.imdbId) {
      imdbIdError = 'Please enter imbdId...';
    }

    if (titleError || imgUrlError || imdbUrlError || imdbIdError) {
      this.setState({
        titleError,
        imgUrlError,
        imdbUrlError,
        imdbIdError,
      });

      return false;
    }

    return true;
  }

  onAdd = (event) => {
    event.preventDefault();
    const { addMovie } = this.props;
    const isValid = this.validate();

    if (isValid) {
      this.setState(prevState => addMovie(prevState));
      this.setState({
        ...initialState,
        titleError: '',
        imgUrlError: '',
        imdbUrlError: '',
        imdbIdError: '',
      });
    }
  }

  render() {
    const {
      titleError,
      imgUrlError,
      imdbUrlError,
      imdbIdError,
    } = this.state;

    return (
      <form className="form" onSubmit={this.onAdd}>
        {
          movie.map(name => (
            <Input
              key={name}
              handlerChange={this.handlerChange}
              name={name}
              value={this.state[name]}
              titleError={titleError}
              imgUrlError={imgUrlError}
              imdbUrlError={imdbUrlError}
              imdbIdError={imdbIdError}
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
