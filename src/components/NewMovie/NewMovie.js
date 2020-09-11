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

    this.setState({
      [name]: value.trim(),
    });
  }

  handleSubmit = (event) => {
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
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          name="title"
          className="textFiels"
          value={title}
          placeholder="Enter the title"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="description"
          className="textFiels"
          value={description}
          placeholder="Enter description"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imgUrl"
          className="textFiels"
          value={imgUrl}
          placeholder="Enter movie image link"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imdbUrl"
          className="textFiels"
          value={imdbUrl}
          placeholder="Enter IMBD link"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imdbId"
          className="textFiels"
          value={imdbId}
          placeholder="Enter IMBD ID"
          onChange={this.handleChange}
        />
        <button
          type="submit"
          className="addButton"
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
