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
        <p className="mb-4">Add new movie</p>
        <form
          onSubmit={this.handleSubmit}
          className="d-flex flex-column gap-2"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="imgUrl"
            placeholder="ImgUrl"
            value={this.state.imgUrl}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="imdbUrl"
            placeholder="ImdbUrl"
            value={this.state.imdbUrl}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="imdbId"
            placeholder="ImdbId"
            value={this.state.imdbId}
            onChange={this.handleChange}
            required
          />
          <button
            type="submit"
            className="btn btn-dark"
          >
            Add
          </button>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
