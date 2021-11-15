import React, { Component } from 'react';

import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
};

export class NewMovie extends Component<Props> {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      title, description, imgUrl, imdbUrl, imdbId,
    } = this.state;

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
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label
          className="NewMovie__label"
          htmlFor="title"
        >
          Movie title:
          <br />
          <div className="NewMovie__container">
            <input
              type="text"
              className="NewMovie__input"
              id="title"
              name="title"
              placeholder="Movie title"
              value={this.state.title}
              onChange={this.handleInputChange}
            />
          </div>
        </label>

        <label
          className="NewMovie__label"
          htmlFor="description"
        >
          Movie description:
          <br />
          <div className="NewMovie__container">
            <textarea
              id="description"
              className="NewMovie__input NewMovie__input--decription"
              name="description"
              placeholder="Movie description"
              value={this.state.description}
              onChange={this.handleInputChange}
            />
          </div>
        </label>

        <label
          className="NewMovie__label"
          htmlFor="imgUrl"
        >
          Movie imgUrl:
          <br />
          <div className="NewMovie__container">
            <input
              type="text"
              className="NewMovie__input"
              id="imgUrl"
              name="imgUrl"
              placeholder="Movie imgUrl"
              value={this.state.imgUrl}
              onChange={this.handleInputChange}
            />
          </div>
        </label>

        <label
          className="NewMovie__label"
          htmlFor="imdbUrl"
        >
          Movie imdbUrl:
          <br />
          <div className="NewMovie__container">
            <input
              type="text"
              className="NewMovie__input"
              id="imdbUrl"
              name="imdbUrl"
              placeholder="Movie imdbUrl"
              value={this.state.imdbUrl}
              onChange={this.handleInputChange}
            />
          </div>
        </label>

        <label
          className="NewMovie__label"
          htmlFor="imdbId"
        >
          Movie imdbId:
          <br />
          <div className="NewMovie__container">
            <input
              type="text"
              className="NewMovie__input"
              id="imdbId"
              name="imdbId"
              placeholder="Movie imdbId"
              value={this.state.imdbId}
              onChange={this.handleInputChange}
            />
          </div>
        </label>

        <button
          type="submit"
          className="NewMovie__button"
        >
          Add movie
        </button>
      </form>
    );
  }
}
