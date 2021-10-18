import React, { Component } from 'react';

type Props = {
  addMovie: (movie: Movie) => void;
};

const newForm = (): Movie => ({
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
});

export class NewMovie extends Component<Props, {}> {
  state: Movie = newForm();

  addValueToForm = (key: string, value: string) => {
    this.setState({
      [key]: value,
    } as Pick<Movie, keyof Movie>);
  };

  onAdd = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.addMovie(this.state);
    this.setState(newForm());
  };

  render() {
    return (
      <form onSubmit={this.onAdd}>
        <div className="form-group">
          {Object.entries(this.state).map(([key, value]) => (
            <input
              type="text"
              className="form-control"
              key={key}
              placeholder={key}
              value={value}
              onChange={e => this.addValueToForm(key, e.target.value)}
              required
            />
          ))}
        </div>

        <button type="submit" className="btn btn-primary">
          Add Movie
        </button>
      </form>
    );
  }
}
