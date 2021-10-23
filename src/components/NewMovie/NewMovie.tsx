import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void;
};
type MovieState = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

export class NewMovie extends Component<Props, MovieState> {
  state: MovieState = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;

    this.setState({

      [name]: value,
    } as Pick<MovieState, keyof MovieState>);
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const propItems = Object.keys(this.state);

    event.preventDefault();
    if ([...propItems].every((prop) => prop !== '')) {
      const newMovie: Movie = { ...this.state };

      this.props.addMovie(newMovie);
    }

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
      <form onSubmit={this.handleSubmit}>
        <div>
          <h2>Input title:</h2>
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Input title"
            onChange={this.handleChange}
            pattern="[A-Za-z]{1,25}"
            required
          />
        </div>
        <div>
          <h2>Input description:</h2>
          <textarea
            name="description"
            value={description}
            placeholder="Input description"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <h2>Input imgUrl:</h2>
          <input
            name="imgUrl"
            value={imgUrl}
            placeholder="Input imgUrl"
            onChange={this.handleChange}
            required
          />
        </div>
        <div>
          <h2>Input imdbUrl:</h2>
          <input
            name="imdbUrl"
            value={imdbUrl}
            placeholder="Input imdbUrl"
            onChange={this.handleChange}
            required
          />
        </div>
        <div>
          <h2>Input imdbId:</h2>
          <input
            name="imdbId"
            value={imdbId}
            placeholder="Input imdbId"
            onChange={this.handleChange}
            required
          />
        </div>
        <input
          className="button"
          type="submit"
          value="Add New Movie"
        />
      </form>
    );
  }
}
