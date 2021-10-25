import { Component } from 'react';

type Props = {
  addMovie: (movie: Movie) => void;
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

  addMovie = (name: string, value: string) => {
    this.setState({
      [name]: value,
    } as Pick<State, keyof State>);
  };

  hangleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
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
    return (
      <form
        onSubmit={this.hangleFormSubmit}
      >
        {Object.entries(this.state).map(([key, value]) => (
          <input
            type="text"
            key={key}
            placeholder={key}
            className="AddMovie__input"
            value={value}
            required
            onChange={event => this.addMovie(key, event.target.value)}
          />
        ))}
        <br />
        <button
          type="submit"
          className="AddMovie__button"
        >
          Add movie
        </button>
      </form>
    );
  }
}
