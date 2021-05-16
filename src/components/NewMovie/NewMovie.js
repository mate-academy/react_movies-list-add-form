import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  static propTypes = {
    addMovie: PropTypes.func.isRequired,
  };

  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    indbId: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { title, description, imgUrl, imdbUrl, indbId } = this.state;

    this.props.addMovie(title, description, imgUrl, imdbUrl, indbId);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      indbId: '',
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imgUrl"
          placeholder="ImgUrl"
          value={this.state.imgUrl}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imdbUrl"
          placeholder="ImdbUrl"
          value={this.state.imdbUrl}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="indbId"
          placeholder="IndbId"
          value={this.state.indbId}
          onChange={this.handleChange}
        />
        <button
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}
