import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    onAdd: this.props.addMovie,
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  onChange(e) {
    this.setState(({
      [e.target.id]: e.target.value,
    }));
  }

  start(e) {
    e.preventDefault();
    this.state.onAdd(
      {
        title: this.state.title,
        description: this.state.description,
        imgUrl: this.state.imgUrl,
        imdbUrl: this.state.imdbUrl,
        imdbId: this.state.imdbId,
      },
    );

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    e.target.reset();
  }

  render() {
    return (
      <form onSubmit={this.start.bind(this)}>
        <label htmlFor="title">title</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={this.onChange.bind(this)}
          required
        />
        <br />
        <label htmlFor="description">description</label>
        <input
          type="text"
          id="description"
          name="description"
          onChange={this.onChange.bind(this)}
        />
        <br />
        <label htmlFor="imgUrl">imgUrl</label>
        <input
          type="text"
          id="imgUrl"
          name="imgUrl"
          onChange={this.onChange.bind(this)}
          required
        />
        <br />
        <label htmlFor="imdbUrl">imdbUrl</label>
        <input
          type="text"
          id="imdbUrl"
          name="imdbUrl"
          onChange={this.onChange.bind(this)}
          required
        />
        <br />
        <label htmlFor="imdbId">imdbId</label>
        <input
          type="text"
          id="imdbId"
          name="imdbId"
          onChange={this.onChange.bind(this)}
          required
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
