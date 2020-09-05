import React from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends React.PureComponent {
  state = {};

  Add = (event) => {
    event.preventDefault();

    const { title, description, imgUrl, imdbUrl, imdbId } = event.target;

    this.props.onAdd({
      title: title.value,
      description: description.value,
      imgUrl: imgUrl.value,
      imdbUrl: imdbUrl.value,
      imdbId: imdbId.value,
    });

    event.target.reset();
  }

  render() {
    return (
      <form
        onSubmit={this.Add}
      >
        <input
          name="title"
          placeholder="title"
          type="text"
          className="input"
        />
        <textarea
          name="description"
          placeholder="description"
          className="input textarea"
        />
        <input
          name="imgUrl"
          placeholder="url of image"
          type="text"
          className="input"
        />
        <input
          name="imdbUrl"
          placeholder="url of IMDB page"
          type="text"
          className="input"
        />
        <input
          name="imdbId"
          placeholder="IMDB id"
          type="number-"
          className="input"
        />
        <button
          type="submit"
          className="button"
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
