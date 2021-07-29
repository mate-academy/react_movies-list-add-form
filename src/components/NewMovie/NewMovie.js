import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

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
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <label>
            <p>Title</p>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <p>Description</p>
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <p>imgUrl</p>
            <input
              type="text"
              name="imgUrl"
              value={this.state.imgUrl}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <p>imdbUrl</p>
            <input
              type="text"
              name="imdbUrl"
              value={this.state.imdbUrl}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <p>imdbId</p>
            <input
              type="text"
              name="imdbId"
              value={this.state.imdbId}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
