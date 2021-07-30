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

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  clearForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onAdd(this.state);
    this.clearForm();
  }

  render() {
    return (
      <>
        <p>Add new movie</p>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={this.state.title}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="description"
            value={this.state.description}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="imgUrl"
            placeholder="imgUrl"
            value={this.state.imgUrl}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="imdbUrl"
            placeholder="imdbUrl"
            value={this.state.imdbUrl}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="imdbId"
            placeholder="imdbId"
            value={this.state.imdbId}
            onChange={this.handleChange}
            required
          />
          <button type="submit">Add</button>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
