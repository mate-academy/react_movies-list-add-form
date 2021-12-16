import React, { Component } from 'react';

import { Movie } from '../../types/Movie';

type Props = {
  addMovie: (movie: Movie) => void,
};
type State = {
  title?: string,
  description?: string,
  imgUrl?: string,
  imdbUrl?: string,
  imdbId?: string,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleCHange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  clearForm = () => {
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
      <form
        className="sidebar__form"
        onSubmit={(event) => {
          event.preventDefault();
          this.clearForm();
          this.props.addMovie({
            title: this.state.title || '',
            description: this.state.description || '',
            imgUrl: this.state.imgUrl || '',
            imdbUrl: this.state.imdbUrl || '',
            imdbId: this.state.imdbId || '',
          });
        }}
      >
        Title
        {' '}
        <input
          required
          type="text"
          placeholder="enter title"
          name="title"
          value={this.state.title}
          onChange={this.handleCHange}
        />
        imgUrl
        {' '}
        <input
          required
          type="text"
          placeholder="enter img url"
          name="imgUrl"
          value={this.state.imgUrl}
          onChange={this.handleCHange}
        />
        imdbUrl
        {' '}
        <input
          required
          type="text"
          placeholder="enter imdb url"
          name="imdbUrl"
          value={this.state.imdbUrl}
          onChange={this.handleCHange}
        />
        imdbId
        {' '}
        <input
          required
          type="text"
          placeholder="enter imdbId"
          name="imdbId"
          value={this.state.imdbId}
          onChange={this.handleCHange}
        />
        Description
        {' '}
        <textarea
          name="description"
          value={this.state.description}
          onChange={(event) => {
            this.setState({ description: event.target.value });
          }}
        />
        <button type="submit">
          AddMovie
        </button>
      </form>
    );
  }
}
