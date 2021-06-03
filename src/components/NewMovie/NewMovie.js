import React from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends React.Component {
  state = {
    newMovie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },

  };

  handleChange = (event) => {
    const { target } = event;
    const { value, name } = target;

    this.setState(({
      newMovie: {
        [name]: value,
      },
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onAdd(this.state.newMovie);

    this.setState({
      newMovie: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    });
  };

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state.newMovie;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="form"
      >
        <input
          name="title"
          type="text"
          value={title}
          placeholder="Title"
          onChange={this.handleChange}
          required
        />
        <textarea
          name="description"
          value={description}
          placeholder="Description"
          onChange={this.handleChange}
          required
        />
        <input
          name="imgUrl"
          type="text"
          value={imgUrl}
          placeholder="ImgUrl"
          onChange={this.handleChange}
          required
        />
        <input
          name="imdbId"
          type="text"
          value={imdbId}
          placeholder="ImdbId"
          onChange={this.handleChange}
          required
        />
        <input
          name="imdbUrl"
          type="text"
          value={imdbUrl}
          placeholder="ImdbUrl"
          onChange={this.handleChange}
          required
        />
        <button
          type="submit"
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
