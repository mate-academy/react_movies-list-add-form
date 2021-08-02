import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbld: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onAdd(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbld: '',
    });
  }

  render() {
    return (

      <form onSubmit={this.handleSubmit} className="form">
        <input
          className="input"
          placeholder="title"
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          required
        />
        <input
          className="input"
          placeholder="description"
          type="text"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
          required
        />
        <input
          className="input"
          placeholder="imgUrl"
          type="text"
          name="imgUrl"
          value={this.state.imgUrl}
          onChange={this.handleChange}
          required
        />
        <input
          className="input"
          placeholder="imdbUrl"
          type="text"
          name="imdbUrl"
          value={this.state.imdbUrl}
          onChange={this.handleChange}
          required
        />
        <input
          className="input"
          placeholder="imdbld"
          type="text"
          name="imdbld"
          value={this.state.imdbld}
          onChange={this.handleChange}
          required
        />
        <button
          className="button"
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  }
}
NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
