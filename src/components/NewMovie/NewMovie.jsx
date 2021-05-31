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
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit =(event) => {
    event.preventDefault();
  }

  render() {
    const {
      title, description,
      imgUrl, imdbUrl, imdbId,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          value={title}
          onChange={this.handleChange}
        />

        <textarea
          name="description"
          value={description}
          placeholder="Enter description"
          onChange={this.handleChange}
        />

        <input
          type="text"
          value={imgUrl}
          name="imgUrl"
          placeholder="Enter image link"
          onChange={this.handleChange}
        />

        <input
          type="text"
          value={imdbUrl}
          name="imdbUrl"
          placeholder="Enter rating link"
          onChange={this.handleChange}
        />

        <input
          type="text"
          value={imdbId}
          name="imdbId"
          placeholder="Enter film id"
          onChange={this.handleChange}
        />

        <button
          type="submit"
          onClick={() => {
            this.props.onAdd({
              title,
              description,
              imdbId,
              imdbUrl,
              imgUrl,
            });

            this.setState({
              title: '',
              description: '',
              imdbId: '',
              imdbUrl: '',
              imgUrl: '',
            });
          }
        }
        >
          Add new film
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
