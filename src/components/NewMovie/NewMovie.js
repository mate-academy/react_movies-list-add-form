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

  addInfo = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  onAdd = (event) => {
    const { addMovie } = this.props;

    addMovie(event, this.state);
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form action="submit">
        <div>
          <label className="add-movie-label">
            Add title
            <input
              className="ui input add-movie-input"
              type="text"
              value={title}
              onChange={this.addInfo}
              name="title"
            />
          </label>
        </div>

        <div>
          <label className="add-movie-label">
            Add description
            <input
              className="ui input add-movie-input"
              type="text"
              value={description}
              onChange={this.addInfo}
              name="description"
            />
          </label>
        </div>

        <div>
          <label className="add-movie-label">
            Add imgUrl
            <input
              className="ui input add-movie-input"
              type="text"
              value={imgUrl}
              onChange={this.addInfo}
              name="imgUrl"
            />
          </label>
        </div>

        <div>
          <label className="add-movie-label">
            Add imdbUrl
            <input
              className="ui input add-movie-input"
              type="text"
              value={imdbUrl}
              onChange={this.addInfo}
              name="imdbUrl"
            />
          </label>
        </div>

        <div>
          <label className="add-movie-label">
            Add imdbId
            <input
              className="ui input add-movie-input"
              type="text"
              value={imdbId}
              onChange={this.addInfo}
              name="imdbId"
            />
          </label>
        </div>

        <div>
          <button
            className="ui button add-movie-button"
            type="submit"
            onClick={this.onAdd}
          >
            Add movie
          </button>
        </div>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
