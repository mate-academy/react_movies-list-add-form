import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  changeHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  onSubmitHandler = (event) => {
    event.preventDefault();

    this.props.addMovie(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    return (
      <form
        method="GET"
        onSubmit={this.onSubmitHandler}
      >
        <h2>Add a new movie</h2>
        <label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.changeHandler}
            required
          />
        </label>
        <label>
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.changeHandler}
            required
          />
        </label>
        <label>
          <input
            type="url"
            name="imgUrl"
            placeholder="ImgUrl"
            value={this.state.imgUrl}
            onChange={this.changeHandler}
            required
          />
        </label>
        <label>
          <input
            type="url"
            name="imdbUrl"
            placeholder="ImdbUrl"
            value={this.state.imdbUrl}
            onChange={this.changeHandler}
            required
          />
        </label>
        <label>
          <input
            type="text"
            name="imdbId"
            placeholder="ImdbId"
            value={this.state.imdbId}
            onChange={this.changeHandler}
            required
          />
        </label>
        <button type="submit">Add</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
