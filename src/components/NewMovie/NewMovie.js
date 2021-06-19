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

  handleSubmit = () => {
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
    return (
      <form>
        <input
          name="title"
          type="text"
          placeholder="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <br />
        <input
          name="description"
          type="text"
          placeholder="description"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <br />
        <input
          name="mgUrl"
          type="text"
          placeholder="imgUrl"
          value={this.state.imgUrl}
          onChange={this.handleChange}
        />
        <br />
        <input
          name="imdbUrl"
          type="text"
          placeholder="imdbUrl"
          value={this.state.imdbUrl}
          onChange={this.handleChange}
        />
        <br />
        <input
          name="imdbId"
          type="text"
          placeholder="imdbId"
          value={this.state.imdbId}
          onChange={this.handleChange}
        />
        <br />
        <button
          type="button"
          onClick={this.handleSubmit}
        >
          add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
