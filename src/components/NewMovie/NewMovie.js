import React from 'react';
import PropTypes from 'prop-types';

const fields = [
  'title',
  'description',
  'imgUrl',
  'imdbUrl',
  'imdbId',
];

const cardFields = fields.reduce((acc, name) => {
  return {
    ...acc,
    [name]: '',
  };
}, {});

export class NewMovie extends React.Component {
  state = {
    newMovieFields: cardFields,
  }

  handleChange = ({ target }) => {
    this.setState(prevState => ({
      newMovieFields: {
        ...prevState.newMovieFields,
        [target.name]: target.value,
      },
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const movie = { ...this.state.newMovieFields };

    this.props.onAdd(movie);

    this.setState({
      newMovieFields: cardFields,
    });
  }

  setDefaultForm = () => {
    this.setState({
      newMovieFields: cardFields,
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.newMovieFields;

    return (
      <form
        className="ui form"
        onSubmit={this.handleSubmit}
        name="newMovie"
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={this.handleChange}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={this.handleChange}
          required
        />

        <label htmlFor="imgUrl">ImgUrl</label>
        <input
          type="text"
          name="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
          required
        />

        <label htmlFor="imdbUrl">ImdbUrl</label>
        <input
          type="text"
          name="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
          required
        />

        <label htmlFor="imdbId">ImdbId</label>
        <input
          type="text"
          name="imdbId"
          value={imdbId}
          onChange={this.handleChange}
          required
        />

        <button
          className="ui green button"
          type="submit"

        >
          Add movie
        </button>

        <button
          className="ui grey button"
          type="button"
          onClick={this.setDefaultForm}
        >
          Clear form
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
