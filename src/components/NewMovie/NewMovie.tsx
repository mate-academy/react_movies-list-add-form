import { Component } from 'react';
import './NewMovie.scss';

type AddMovie = (movie: Movie) => void;

type Props = {
  addMovie: AddMovie;
};

export class NewMovie extends Component<Props, Movie> {
  state: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  setInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  handleSubmit = (event: React.FormEvent) => {
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

  render() {
    const keys: string[] = Object.keys(this.state);

    return (
      <form className="new-movie__form" onSubmit={this.handleSubmit}>
        {keys.map((key: string) => (
          <label htmlFor={key} key={key + 1}>
            {key}
            <input
              name={key}
              type="text"
              key={key}
              id={key}
              value={this.state[key as keyof Movie]}
              onChange={this.setInfo}
            />
          </label>
        ))}
        <button type="submit">Add new movie</button>
      </form>
    );
  }
}
