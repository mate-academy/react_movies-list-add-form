import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  createMovie = () => {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return {
      title,
      description,
      imdbUrl,
      imgUrl,
      imdbId,
    };
  }

  clearMovie = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  changeHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const { onAdd } = this.props;

    return (
      <>
        <h1 className="title">
          Add new movie
        </h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onAdd(this.createMovie());
            this.clearMovie();
          }}
        >
          <input
            type="text"
            className="input"
            required
            name="title"
            placeholder="Enter title"
            value={title}
            onChange={this.changeHandler}
          />
          <textarea
            type="text"
            name="description"
            required
            placeholder="Enter description"
            className="input"
            value={description}
            onChange={this.changeHandler}

          />
          <input
            type="text"
            name="imgUrl"
            required
            className="input"
            placeholder="Enter img url"
            value={imgUrl}
            onChange={this.changeHandler}
          />
          <input
            type="text"
            name="imdbUrl"
            required
            className="input"
            placeholder="Enter imdbUrl"
            value={imdbUrl}
            onChange={this.changeHandler}
          />
          <input
            type="text"
            name="imdbId"
            required
            className="input"
            placeholder="Enter imdbId"
            value={imdbId}
            onChange={this.changeHandler}
          />
          <button
            className="button"
            type="submit"
          >
            Add film
          </button>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
