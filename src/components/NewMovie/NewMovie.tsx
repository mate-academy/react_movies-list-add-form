import { Component } from 'react';
import './NewMovie.scss';

type Props = { addMovie: (movie: Movie) => void };

type State = {
  movie: Movie,
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

  handleChange = (event: { target: { name: string; value: string; }; }) => {
    this.setState((state) => ({
      movie: {
        ...state.movie,
        [event.target.name]: event.target.value,
      },
    }));
  };

  handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (!this.state.movie) {
      return;
    }

    this.props.addMovie(this.state.movie);
    this.setState({
      movie: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.movie;

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <input
          required
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={this.handleChange}
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          value={description}
          onChange={this.handleChange}
        />
        <input
          required
          type="text"
          placeholder="ImgUrl"
          name="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
        />
        <input
          required
          type="text"
          placeholder="ImdbUrl"
          name="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
        />
        <input
          required
          type="text"
          placeholder="ImdbId"
          name="imdbId"
          value={imdbId}
          onChange={this.handleChange}
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}
