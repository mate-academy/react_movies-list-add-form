import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class MovieItem extends Component {
  state = {
    error: false,
  };

  handleBlurInput = () => {
    if (this.props.name === 'description') {
      return;
    }

    if (this.props.name === 'imgUrl' || this.props.name === 'imdbUrl') {
      if (!this.props.value.match(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/)) {
        this.setState({
          error: true,
        });
      }
    }

    if (!this.props.value) {
      this.setState({
        error: true,
      });
    }
  }

  handleChangeInput = (e) => {
    const { name, value } = e.target;

    this.setState({
      error: false,
    });
    this.props.handleChangeInput(name, value);
  }

  render() {
    const { name, value } = this.props;
    const { error } = this.state;

    return (
      <label className="form-item">
        <input
          name={name}
          value={value}
          placeholder={name}
          className={this.state.error ? 'error' : ''}
          onChange={this.handleChangeInput}
          onBlur={this.handleBlurInput}
          type="text"
        />
        {error ? (
          <div>
            Please enter the correct value for
            {name}
          </div>
        ) : null}
      </label>
    );
  }
}

MovieItem.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChangeInput: PropTypes.func.isRequired,
};

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isDisabled: true,
  };

  handleChangeInput = (name, value) => {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.addMovie({
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  handleChangeForm = () => {
    if (this.state.title
        && this.state.imgUrl
        && this.state.imdbUrl
        && this.state.imdbId) {
      this.setState({
        isDisabled: false,
      });
    }
  }

  render() {
    return (
      <form onChange={this.handleChangeForm} onSubmit={this.handleSubmit}>
        <MovieItem
          name="title"
          value={this.state.title}
          handleChangeInput={this.handleChangeInput}
        />
        <MovieItem
          name="description"
          value={this.state.description}
          handleChangeInput={this.handleChangeInput}
        />
        <MovieItem
          name="imgUrl"
          value={this.state.imgUrl}
          handleChangeInput={this.handleChangeInput}
        />
        <MovieItem
          name="imdbUrl"
          value={this.state.imdbUrl}
          handleChangeInput={this.handleChangeInput}
        />
        <MovieItem
          name="imdbId"
          value={this.state.imdbId}
          handleChangeInput={this.handleChangeInput}
        />
        <button
          disabled={this.state.isDisabled}
          type="submit"
          className="btn"
        >
          Add New Movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
