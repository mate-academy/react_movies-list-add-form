import React, { Component } from 'react';

import './NewMovie.scss';

type Props = {
  onMovieCreate: (
    title: string,
    description: string,
    imgUrl: string,
    imdbUrl: string,
    imdbId: string
  ) => void
};
type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value });
  };

  handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ description: event.target.value });
  };

  handleImgUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ imgUrl: event.target.value });
  };

  handleImdbUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ imdbUrl: event.target.value });
  };

  handleImdbId = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ imdbId: event.target.value });
  };

  render() {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const {
            title,
            description,
            imgUrl,
            imdbUrl,
            imdbId,
          } = this.state;

          this.props.onMovieCreate(title, description, imgUrl, imdbUrl, imdbId);

          this.setState({
            title: '',
            description: '',
            imgUrl: '',
            imdbUrl: '',
            imdbId: '',
          });
        }}
        className="add-movie"
      >
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={this.state.title}
          onChange={this.handleTitle}
          className="add-movie__input"
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={this.state.description}
          onChange={this.handleDescription}
          className="add-movie__input"
        />
        <input
          type="text"
          placeholder="ImgUrl"
          name="imgUrl"
          value={this.state.imgUrl}
          onChange={this.handleImgUrl}
          className="add-movie__input"
        />
        <input
          type="text"
          placeholder="ImdbUrl"
          name="imdbUrl"
          value={this.state.imdbUrl}
          onChange={this.handleImdbUrl}
          className="add-movie__input"
        />
        <input
          type="text"
          placeholder="ImdbId"
          name="imdbId"
          value={this.state.imdbId}
          onChange={this.handleImdbId}
          className="add-movie__input"
        />
        <button
          type="submit"
          className="add-movie__submit"
        >
          Add a new movie
        </button>
      </form>
    );
  }
}
