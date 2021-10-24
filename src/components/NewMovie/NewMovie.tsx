import React, { Component } from 'react';

type Props = {
  addMovie: (movie: Movie) => void;
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

  resetForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.addMovie({ ...this.state });
    this.resetForm();
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
      <form>
        Put the form here
        <div>
          <input
            type="text"
            placeholder="title"
            name="title"
            value={title}
            required
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="description"
            name="description"
            value={description}
            required
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input
            type="url"
            placeholder="imgUrl"
            name="imgUrl"
            value={imgUrl}
            required
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input
            type="url"
            placeholder="imdbUrl"
            name="imdbUrl"
            value={imdbUrl}
            required
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input
            type="url"
            placeholder="imdbId"
            name="imdbId"
            value={imdbId}
            required
            onChange={this.handleChange}
          />
        </div>
        <button type="submit">
          Add new movie
        </button>
      </form>
    );
  }
}
