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
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addMovie(this.state);
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
      <>
        <b>Add new Movie</b>
        <form onSubmit={this.handleSubmit}>
          <lable>
            <h4>Title</h4>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </lable>
          <lable>
            <h4>Description</h4>
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </lable>
          <lable>
            <h4>ImgUrl</h4>
            <input
              type="text"
              name="imgUrl"
              value={this.state.imgUrl}
              onChange={this.handleChange}
            />
          </lable>
          <lable>
            <h4>ImdbUrl</h4>
            <input
              type="text"
              name="imdbUrl"
              value={this.state.imdbUrl}
              onChange={this.handleChange}
            />
          </lable>
          <lable>
            <h4>ImdbId</h4>
            <input
              type="text"
              name="imdbId"
              value={this.state.imdbId}
              onChange={this.handleChange}
            />
          </lable>
          <br />
          <button type="submit">Add</button>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
