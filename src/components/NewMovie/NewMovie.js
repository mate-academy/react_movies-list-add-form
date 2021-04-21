import React from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends React.Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

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
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            value={title}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            type="text"
            id="description"
            value={description}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label htmlFor="imgUrl">ImgUrl</label>
          <input
            name="imgUrl"
            type="text"
            id="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label htmlFor="imdbUrl">ImdbUrl</label>
          <input
            name="imdbUrl"
            type="text"
            id="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <label htmlFor="imdbId">ImdbId</label>
          <input
            name="imdbId"
            type="text"
            id="imdbId"
            value={imdbId}
            onChange={this.handleChange}
          />
        </div>

        <button type="submit">Add film</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
