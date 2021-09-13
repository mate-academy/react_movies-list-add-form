import { Component } from 'react';
import './NewMovie.scss';

interface Props {
  addMov: (newMov: State) => void;
  movies: Movie[];
}

interface State {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  addMovie = (state: any) => {
    const newMov = { ...state };

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    return newMov;
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    const key: keyof State = name as keyof State;

    this.setState({ [key]: value } as any);
  };

  handleSubmit = (event: any) => {
    event.preventDefault();

    const movie = this.addMovie(this.state);

    if (!this.props.movies.find(m => m.imdbId === movie.imdbId)) {
      this.props.addMov(this.addMovie(this.state));
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <h2 className="form__title">Title</h2>
        <input
          type="text"
          name="title"
          value={this.state.title}
          placeholder="Enter the title"
          onChange={this.handleChange}
          required
        />
        <h2 className="form__title">Description</h2>
        <textarea
          name="description"
          value={this.state.description}
          placeholder="Enter the description"
          onChange={this.handleChange}
          className="form__textarea"
        />
        <h2 className="form__title">Img Url</h2>
        <input
          type="text"
          name="imgUrl"
          value={this.state.imgUrl}
          placeholder="Enter the img url"
          onChange={this.handleChange}
          required
        />
        <h2 className="form__title">Imdb Url</h2>
        <input
          type="text"
          name="imdbUrl"
          value={this.state.imdbUrl}
          placeholder="Enter the title imdb url"
          onChange={this.handleChange}
          required
        />
        <h2 className="form__title">Imdb Id</h2>
        <input
          type="text"
          name="imdbId"
          value={this.state.imdbId}
          placeholder="Enter the imdb id"
          onChange={this.handleChange}
          required
        />
        <br />
        <button type="submit" className="form__button">Add</button>
      </form>
    );
  }
}
