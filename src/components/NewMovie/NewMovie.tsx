// import { title } from 'process';
import React, { Component } from 'react';

type Props = {
  onAdd: (movie: Movie) => void,
};

type State = {
  movie: Movie,
};
const movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    movie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  };

  setValue = (event:React.ChangeEvent<HTMLInputElement>) => {
    this.setState(state => ({
      movie: { ...state.movie, [event.target.name]: event.target.value },
    }));
  };

  render() {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          this.props.onAdd(this.state.movie);
          this.setState({ movie: { ...movie } });
        }}
      >
        <input
          type="text"
          name="title"
          placeholder="title"
          value={this.state.movie.title}
          onChange={this.setValue}
          required
        />
        <input
          type="text"
          name="description"
          value={this.state.movie.description}
          placeholder="description"
          onChange={this.setValue}
          required
        />
        <input
          type="text"
          name="imgUrl"
          value={this.state.movie.imgUrl}
          placeholder="imgUrl"
          onChange={this.setValue}
          required
        />
        <input
          type="text"
          name="imdbUrl"
          value={this.state.movie.imdbUrl}
          placeholder="imgUrl"
          onChange={this.setValue}
          required
        />
        <input
          type="text"
          name="imdbId"
          value={this.state.movie.imdbId}
          placeholder="imdbId"
          onChange={this.setValue}
          required
        />

        <button type="submit">Submit</button>
      </form>
    );
  }
}
