import React, { Component } from 'react';

type Props = {
  addMovie: (movie: Movie) => void;
};

const emptyForm = (): Movie => ({
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
});

export class NewMovie extends Component<Props, {}> {
  state: Movie = emptyForm();

  setFormValue = (key: string, value: string) => {
    this.setState({
      [key]: value,
    } as Pick<Movie, keyof Movie>);
  };

  addNewMovie = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.addMovie(this.state);
    this.setState(emptyForm());
  };

  render() {
    return (
      <form onSubmit={this.addNewMovie}>
        {Object.entries(this.state).map(([key, value]) => (
          <input
            type="text"
            key={key}
            placeholder={key}
            value={value}
            onChange={e => this.setFormValue(key, e.target.value)}
            style={{ display: 'block' }}
            required
          />
        ))}
        <button type="submit">
          Add Movie
        </button>
      </form>
    );
  }
}
