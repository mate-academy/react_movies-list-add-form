import React from 'react';

import './NewMovie.scss';

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

export class NewMovie extends React.Component<Props, State> {
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

    this.props.onAdd({ ...this.state });

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
      <>
        <h1 className="title">
          Add a new movie to the list
        </h1>
        <form
          className="form"
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={this.handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={description}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="imgUrl"
            placeholder="ImgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="imdbUrl"
            placeholder="ImdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            required
          />

          <input
            type="text"
            name="imdbId"
            placeholder="ImdbId"
            value={imdbId}
            onChange={this.handleChange}
            required
          />
          <button
            type="submit"
          >
            Add
          </button>
        </form>
      </>
    );
  }
}
