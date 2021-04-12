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

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.addMovie({
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const { title,
      description,
      imgUrl,
      imdbUrl,
      imdbId } = this.state;

    return (
      <div className="form">
        <h1 className="display-4">Add Movie</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(event) => {
              this.setState({
                title: event.target.value,
              });
            }}
            required
          />
          <input
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(event) => {
              this.setState({
                description: event.target.value,
              });
            }}
          />
          <input
            className="form-control"
            placeholder="imgUrl"
            value={imgUrl}
            onChange={(event) => {
              this.setState({
                imgUrl: event.target.value,
              });
            }}
            required
          />
          <input
            className="form-control"
            placeholder="imdbUrl"
            value={imdbUrl}
            onChange={(event) => {
              this.setState({
                imdbUrl: event.target.value,
              });
            }}
            required
          />
          <input
            className="form-control"
            placeholder="imdbId"
            value={imdbId}
            onChange={(event) => {
              this.setState({
                imdbId: event.target.value,
              });
            }}
            required
          />
          <button className="btn btn-success" type="submit">Add movie</button>
        </form>
      </div>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
