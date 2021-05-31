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

    const movie = this.state;

    if (Object.values(this.state).some(el => el === '')) {
      return;
    }

    this.props.onAdd(movie);

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
      <form onSubmit={this.handleSubmit}>
        <div>
          <p>Title</p>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={(event) => {
              this.setState({
                title: event.target.value,
              });
            }}
          />
        </div>
        <div>
          <p>Description</p>
          <textarea
            type="text"
            name="description"
            value={this.state.description}
            onChange={(event) => {
              this.setState({
                description: event.target.value,
              });
            }}
          />
        </div>
        <div>
          <p>imgUrl</p>
          <input
            type="text"
            name="imgUrl"
            value={this.state.imgUrl}
            onChange={(event) => {
              this.setState({
                imgUrl: event.target.value,
              });
            }}
          />
        </div>
        <div>
          <p>imdbUrl</p>
          <input
            type="text"
            name="imdbUrl"
            value={this.state.imdbUrl}
            onChange={(event) => {
              this.setState({
                imdbUrl: event.target.value,
              });
            }}
          />
        </div>
        <div>
          <p>imdbId</p>
          <input
            type="text"
            name="imdbId"
            value={this.state.imdbId}
            onChange={(event) => {
              this.setState({
                imdbId: event.target.value,
              });
            }}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
