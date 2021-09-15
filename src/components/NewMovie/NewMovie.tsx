import React, { Component } from 'react';

type Props = {
  add: (movie: Movie) => void;
};

type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as Pick<State, keyof State>);
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.add(this.state);
  };

  render() {
    const {
      title,
      description,
      imdbUrl,
      imdbId,
      imgUrl,
    } = this.state;

    return (
      <>
        <h1>Add New Movie</h1>
        <form
          className="form"
          onSubmit={this.handleSubmit}
        >
          <input
            className="input"
            type="text"
            name="title"
            placeholder="Enter the title"
            value={title}
            onChange={this.handleChange}
            required
          />
          <input
            className="input"
            type="text"
            name="description"
            placeholder="Enter Description"
            value={description}
            onChange={this.handleChange}
            required
          />
          <input
            className="input"
            type="text"
            name="imgUrl"
            placeholder="Enter link for the poster"
            value={imgUrl}
            onChange={this.handleChange}
            required
          />
          <input
            className="input"
            type="text"
            name="imdbUrl"
            placeholder="Enter link to the IMDB"
            value={imdbUrl}
            onChange={this.handleChange}
            required
          />
          <input
            className="input"
            type="text"
            name="imdbId"
            placeholder="Enter id of the film on IMDB"
            value={imdbId}
            onChange={this.handleChange}
            required
          />
          <button
            className="button"
            type="submit"
          >
            Add New Film
          </button>
        </form>
      </>
    );
  }
}
