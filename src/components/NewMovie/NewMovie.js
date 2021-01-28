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

  changeHandler = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  }

  submitHandler = (event) => {
    event.preventDefault();

    this.props.onAdd(this.state);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form
        name="newMovie"
        onSubmit={this.submitHandler}
      >

        <label
          htmlFor="title"
        >
          Movie title
        </label>

        <input
          type="text"
          required
          name="title"
          id="title"
          value={title}
          onChange={this.changeHandler}
          placeholder="Title"
        />

        <label
          htmlFor="description"
        >
          Movie description
        </label>

        <textarea
          name="description"
          id="description"
          value={description}
          onChange={this.changeHandler}
          placeholder="Description"
        />

        <label
          htmlFor="imgUrl"
        >
          Image url
        </label>

        <input
          type="text"
          required
          name="imgUrl"
          id="imgUrl"
          value={imgUrl}
          onChange={this.changeHandler}
          placeholder="Image url"
        />

        <label
          htmlFor="imdbUrl"
        >
          IMDb url
        </label>

        <input
          type="text"
          required
          name="imdbUrl"
          id="imdbUrl"
          value={imdbUrl}
          onChange={this.changeHandler}
          placeholder="IMDb url"
        />

        <label
          htmlFor="imdbId"
        >
          IMDb id
        </label>

        <input
          type="text"
          required
          name="imdbId"
          id="imdbId"
          value={imdbId}
          onChange={this.changeHandler}
          placeholder="IMDb id"
        />

        <button type="submit">Add movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
