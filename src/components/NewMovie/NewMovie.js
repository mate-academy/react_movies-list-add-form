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
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            className="inputStyle"
            type="text"
            placeholder="Title"
            value={this.state.title}
            required
            onChange={(event) => {
              this.setState({ title: event.target.value });
            }}
          />
          <input
            className="inputStyle"
            type="text"
            placeholder="Description"
            value={this.state.description}
            required
            onChange={(event) => {
              this.setState({ description: event.target.value });
            }}
          />
          <input
            className="inputStyle"
            type="text"
            placeholder="ImgUrl"
            value={this.state.imgUrl}
            required
            onChange={(event) => {
              this.setState({ imgUrl: event.target.value });
            }}
          />
          <input
            className="inputStyle"
            type="text"
            placeholder="ImdbUrl"
            value={this.state.imdbUrl}
            required
            onChange={(event) => {
              this.setState({ imdbUrl: event.target.value });
            }}
          />
          <input
            className="inputStyle"
            type="text"
            placeholder="ImdbId"
            value={this.state.imdbId}
            required
            onChange={(event) => {
              this.setState({ imdbId: event.target.value });
            }}
          />
          <div>
            <button
              className="buttonStyle"
              type="submit"
            >
              Add Movie
            </button>
          </div>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
