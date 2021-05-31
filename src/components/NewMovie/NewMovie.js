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
    this.setState({ [event.target.name]: event.target.value });
  };

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
  };

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form
        className="MovieForm"
        onSubmit={this.handleSubmit}
      >
        <input
          name="title"
          type="text"
          placeholder="title"
          value={title}
          onChange={this.handleChange}
        />
        {' '}
        <input
          name="description"
          type="text"
          placeholder="description"
          value={description}
          onChange={this.handleChange}
        />
        {' '}
        <input
          name="imgUrl"
          type="text"
          placeholder="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
        />
        {' '}
        <input
          name="imdbUrl"
          type="text"
          placeholder="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
        />
        {' '}
        <input
          name="imdbId"
          type="text"
          placeholder="imdbId"
          value={imdbId}
          onChange={this.handleChange}
        />
        {' '}

        <button type="submit">SUBMIT</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
