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

  render() {
    const { addMovie } = this.props;

    return (
      <>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addMovie(this.state);
            this.setState({
              title: '',
              description: '',
              imgUrl: '',
              imdbUrl: '',
              imdbId: '',
            });
          }}
        >

          <input
            type="text"
            value={this.state.title}
            onChange={(e) => {
              this.setState({
                title: e.target.value,
              });
            }}
            placeholder="enter please title"
          />
          <input
            type="text"
            value={this.state.description}
            onChange={(e) => {
              this.setState({
                description: e.target.value,
              });
            }}
            placeholder="enter please description"
          />
          <input
            type="text"
            value={this.state.imgUrl}
            onChange={(e) => {
              this.setState({
                imgUrl: e.target.value,
              });
            }}
            placeholder="enter please url for image"
          />
          <input
            type="text"
            value={this.state.imdbUrl}
            onChange={(e) => {
              this.setState({
                imdbUrl: e.target.value,
              });
            }}
            placeholder="enter please Url from imdb"
          />
          <input
            type="text"
            value={this.state.imdbId}
            onChange={(e) => {
              this.setState({
                imdbId: e.target.value,
              });
            }}
            placeholder="enter please imdb id"
          />
          <input type="submit" />
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
