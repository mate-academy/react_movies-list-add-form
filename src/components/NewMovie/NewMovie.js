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
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    } = this.state;

    return (
      <div>
        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();
            this.props.onAdd({
              title,
              description,
              imgUrl,
              imdbUrl,
              imdbId,
            });
            this.setState({
              title: '',
              description: '',
              imgUrl: '',
              imdbUrl: '',
              imdbId: '',
            });
          }}
        >
          <h2 className="head"><strong>Add movies to list here</strong></h2>
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="form__input"
            value={this.state.title}
            onChange={this.handleChange}
            required
          />
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            className="form__input form__textarea"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="imgUrl"
            placeholder="ImgUrl"
            className="form__input"
            value={this.state.imgUrl}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="imdbUrl"
            placeholder="ImdbUrl"
            className="form__input"
            value={this.state.imdbUrl}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="imdbId"
            placeholder="ImdbId"
            className="form__input"
            value={this.state.imdbId}
            onChange={this.handleChange}
            required
          />
          <button
            type="submit"
            className="button"
          >
            <strong>Add movie</strong>
          </button>
        </form>
      </div>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
