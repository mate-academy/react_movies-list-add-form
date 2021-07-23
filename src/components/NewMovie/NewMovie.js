import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, urlPattern } from '../Input';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    titleValidation: false,
    imgUrlValidation: false,
    imdbUrlValidation: false,
    imdbIdValidation: false,
  };

  changeFormState = (name, value) => {
    if (name === 'description') {
      this.setState({
        [name]: value,
      });
    }

    if (name === 'title' || name === 'imdbId') {
      this.setState({
        [name]: value,
        [`${name}Validation`]: !!value.length,
      });
    } else {
      this.setState({
        [name]: value,
        [`${name}Validation`]: urlPattern.test(value),
      });
    }
  }

  clearState = () => this.setState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    titleValidation: false,
    imgUrlValidation: false,
    imdbUrlValidation: false,
    imdbIdValidation: false,
  });

  makeNewMovie = () => {
    const newMovie = { ...this.state };

    this.clearState();

    return newMovie;
  }

  render() {
    const {
      description,
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <>
        <strong>
          Add new movie
        </strong>
        <form
          className="app__form"
          onSubmit={
            event => this.props.onSubmit(event, this.makeNewMovie())
          }
        >
          <Input
            value={title}
            name="title"
            title="Title"
            onChange={this.changeFormState}
          />

          <label>
            <div>
              Description
            </div>
            <textarea
              value={description}
              name="description"
              className="app__textarea"
              maxLength="300"
              onChange={
              event => this.changeFormState(
                event.target.name,
                event.target.value,
              )
            }
            />
          </label>

          <Input
            value={imgUrl}
            onChange={this.changeFormState}
            name="imgUrl"
            title="ImgUrl"
          />
          <Input
            value={imdbUrl}
            onChange={this.changeFormState}
            name="imdbUrl"
            title="ImdbUrl"
          />
          <Input
            value={imdbId}
            onChange={this.changeFormState}
            name="imdbId"
            title="ImdbId"
          />
          <button
            type="submit"
            disabled={Object.values(this.state).includes(false)}
          >
            Add
          </button>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
