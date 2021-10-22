import React, { Component } from 'react';

type Props = {
  onAdd: (movie: Movie) => void;
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

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
    } as Pick<State, keyof State>);
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    this.props.onAdd(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <div>
        <h1>Put the form here</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={this.handleChange}
          />
          <textarea
            name="description"
            placeholder="description"
            value={description}
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="imgUrl"
            value={imgUrl}
            name="imgUrl"
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="imdbUrl"
            value={imdbUrl}
            name="imdbUrl"
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="imdbId"
            value={imdbId}
            name="imdbId"
            onChange={this.handleChange}
          />
          <button
            type="submit"
            className="success button large"
          >
            Add Movie
          </button>
        </form>
      </div>
    );
  }
}
