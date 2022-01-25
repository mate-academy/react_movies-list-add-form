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
      <>
        <h1>Please enter all the data</h1>
        <form className="new-movie__form" onSubmit={this.handleSubmit}>
          {keys.map((key: string) => {
            const prettyName = key.replace(key[0], key[0].toUpperCase());

            return (
              <label htmlFor={key} key={key + 1}>
                {`${prettyName}: `}
                <input
                  name={key}
                  type="text"
                  key={key}
                  id={key}
                  value={this.state[key as keyof Movie]}
                  onChange={this.setInfo}
                />
              </label>
            );
          })}
          <button type="submit">Add new movie</button>
        </form>
      </>
    );
  }
}
