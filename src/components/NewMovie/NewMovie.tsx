import React, { Component } from 'react';

type Props = {
  onAdd: (movie: Movie) => void;
};

type State = Movie;

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  clearState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    this.props.onAdd(this.state);
    this.clearState();
  };

  render() {
    const {
      title,
      description,
      imdbUrl,
      imgUrl,
      imdbId,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <p>Title</p>
        <input
          type="text"
          name="title"
          value={title}
          onChange={this.handleChange}
          required
        />
        <p>Description</p>
        <input
          type="text"
          value={description}
          name="description"
          onChange={this.handleChange}
          required
        />
        <p>imgUrl</p>
        <input
          type="text"
          value={imgUrl}
          name="imgUrl"
          onChange={this.handleChange}
          required
        />
        <p>imdbUrl</p>
        <input
          type="text"
          value={imdbUrl}
          name="imdbUrl"
          onChange={this.handleChange}
          required
        />
        <p>imdbId</p>
        <input
          type="text"
          value={imdbId}
          name="imdbId"
          onChange={this.handleChange}
          required
        />
        <br />
        <button type="submit">Add movie</button>
      </form>
    );
  }
}
