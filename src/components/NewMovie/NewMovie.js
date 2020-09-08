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
    error: false,
  };

  handleChange = ({ name, value }) => this.setState({
    [name]: value,
    error: false,
  });

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, imdbId } = this.state;

    if (!title.trim() || !imdbId.trim()) {
      this.setState({ error: true });

      return;
    }

    this.props.onAdd(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      error: false,
    });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId, error } = this.state;

    return (
      <form
        className="NewMovie"
        onSubmit={this.handleSubmit}
      >
        <h2 className="NewMovie__header">
          Add new movie
        </h2>

        <label>
          <h3>
            Movie title:
          </h3>

          <input
            className="NewMovie__input"
            type="text"
            name="title"
            value={title}
            onChange={(event => this.handleChange(event.target))}
            required
          />
        </label>

        <label>
          <h3>
            Movie description:
          </h3>

          <textarea
            className="NewMovie__textarea"
            name="description"
            value={description}
            onChange={(event => this.handleChange(event.target))}
          />
        </label>

        <label>
          <h3>
            Link to movie poster:
          </h3>

          <input
            className="NewMovie__input"
            type="url"
            name="imgUrl"
            value={imgUrl}
            onChange={(event => this.handleChange(event.target))}
            required
          />
        </label>

        <label>
          <h3>
            Link to IMDB page of the movie:
          </h3>

          <input
            className="NewMovie__input"
            type="url"
            name="imdbUrl"
            value={imdbUrl}
            onChange={(event => this.handleChange(event.target))}
            required
          />
        </label>

        <label>
          <h3>
            Movie&apos;s IMDB id:
          </h3>

          <input
            className="NewMovie__input"
            type="text"
            name="imdbId"
            value={imdbId}
            onChange={(event => this.handleChange(event.target))}
            required
          />
        </label>

        <button
          className="NewMovie__submit"
          type="submit"
          disabled={error}
        >
          Add
        </button>

        {error && <p className="error">Please fill in the blank fields</p>}

      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
