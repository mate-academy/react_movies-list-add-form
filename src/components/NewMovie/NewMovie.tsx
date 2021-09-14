import React from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (value: Movie) => void;
};

type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

export class NewMovie extends React.Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.addMovie(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const key: keyof State = name as keyof State;

    this.setState({
      [key]: value,
    } as Pick<State, keyof State>);
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
      <form onSubmit={this.handleSubmit} className="d-flex flex-column justify-content-between">
        <input
          type="text"
          name="title"
          required
          placeholder="Title"
          value={title}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="description"
          required
          placeholder="Description"
          value={description}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imgUrl"
          required
          placeholder="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imdbId"
          required
          placeholder="imdbId"
          value={imdbId}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imdbUrl"
          required
          placeholder="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
        />
        <button
          type="submit"
          className="btn btn-primary d-block"
        >
          Submit
        </button>
      </form>
    );
  }
}
