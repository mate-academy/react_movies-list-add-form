import { Component } from 'react';

import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void;
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

  getImdbId = (imdbLink: string) => {
    const lastSlashIndex: number = imdbLink.lastIndexOf('/');

    return imdbLink.slice(lastSlashIndex + 1);
  };

  onAdd = (event: any) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.addMovie(newMovie);
  };

  render() {
    return (
      <form className="form">
        <input
          type="text"
          placeholder="Write title here"
          onChange={(event) => {
            this.setState({ title: event.target.value });
          }}
        />
        <textarea
          placeholder="Write describe here"
          onChange={(event) => {
            this.setState({ description: event.target.value });
          }}
        />
        <textarea
          placeholder="Insert image link here"
          onChange={(event) => {
            this.setState({ imgUrl: event.target.value });
          }}
        />
        <textarea
          placeholder="Insert imdb link here"
          onChange={(event) => {
            this.setState({
              imgUrl: event.target.value,
              imdbId: this.getImdbId(event.target.value),
            });
          }}
        />
        <button
          type="submit"
          onClick={(event) => this.onAdd(event)}
        >
          Add movie
        </button>
      </form>
    );
  }
}
