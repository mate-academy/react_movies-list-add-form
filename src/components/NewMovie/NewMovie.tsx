import React, { FormEvent } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie(movie: Movie): void;
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

  handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.addMovie(newMovie);
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
      imdbId,
      imdbUrl,
      imgUrl,
    } = this.state;

    return (
      <form
        onSubmit={this.handleFormSubmit}
        className="form"
      >
        <input
          required
          type="text"
          placeholder="Enter text"
          value={title}
          onChange={event => this.setState({ title: event.target.value })}
        />
        <textarea
          className="textarea"
          required
          placeholder="Enter description"
          value={description}
          onChange={event => this.setState({ description: event.target.value })}
        />
        <input
          required
          type="url"
          placeholder="Enter imdbUrl"
          value={imdbUrl}
          onChange={event => this.setState({ imdbUrl: event.target.value })}
        />
        <input
          required
          type="url"
          placeholder="Enter imgUrl"
          value={imgUrl}
          onChange={event => this.setState({ imgUrl: event.target.value })}
        />
        <input
          required
          type="text"
          placeholder="Enter IMDbId"
          value={imdbId}
          onChange={event => this.setState({ imdbId: event.target.value })}
        />
        <button
          type="submit"
        >
          Add movie
        </button>
      </form>
    );
  }
}
