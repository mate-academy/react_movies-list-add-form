import 'bulma';
import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const { onAdd } = this.props;

    if (
      title
    && description
    && imgUrl
    && imdbUrl
    && imdbId
    ) {
      onAdd({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });

      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <form onSubmit={this.handleSubmit}>
          <input
            className="input input is-normal"
            type="text"
            name="title"
            placeholder="Enter the title"
            value={this.state.title}
            onChange={this.handleInputChange}
            required
          />

          <textarea
            className="input textarea is-info"
            name="description"
            placeholder="Enter the description"
            value={this.state.description}
            onChange={this.handleInputChange}
            required
          />

          <input
            className="input input is-normal"
            type="text"
            name="imgUrl"
            placeholder="Place imgUrl here"
            value={this.state.imgUrl}
            onChange={this.handleInputChange}
            required
          />

          <input
            className="input input is-normal"
            type="text"
            name="imdbUrl"
            placeholder="Place imdbUrl here"
            value={this.state.imdbUrl}
            onChange={this.handleInputChange}
            required
          />

          <input
            className="input input is-normal"
            type="text"
            name="imdbId"
            placeholder="Enter imdbId"
            value={this.state.imdbId}
            onChange={this.handleInputChange}
            required
          />

          <button
            type="submit"
            className="button is-link is-outlined"
          >
            Save
          </button>
        </form>
      </div>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
