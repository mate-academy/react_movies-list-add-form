import React from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends React.PureComponent {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  add = (event) => {
    event.preventDefault();

    const { title, description, imgUrl, imdbUrl, imdbId } = event.target;

    this.props.onAdd({
      title: title.value,
      description: description.value,
      imgUrl: imgUrl.value,
      imdbUrl: imdbUrl.value,
      imdbId: imdbId.value,
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  valuesToStateSetter = (event) => {
    this.setState({
      [event.target.name]: event.target.value.trimStart(),
    });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form
        onSubmit={this.Add}
      >
        <input
          name="title"
          placeholder="title"
          type="text"
          className="input"
          value={title}
          onChange={this.valuesToStateSetter}
          required
        />
        <textarea
          name="description"
          placeholder="description"
          className="input textarea"
          value={description}
          onChange={this.valuesToStateSetter}
          required
        />
        <input
          name="imgUrl"
          placeholder="url of image"
          type="text"
          className="input"
          value={imgUrl}
          onChange={this.valuesToStateSetter}
          required
        />
        <input
          name="imdbUrl"
          placeholder="url of IMDB page"
          type="text"
          className="input"
          value={imdbUrl}
          onChange={this.valuesToStateSetter}
          required
        />
        <input
          name="imdbId"
          placeholder="IMDB id"
          type="number-"
          className="input"
          value={imdbId}
          onChange={this.valuesToStateSetter}
          required
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
