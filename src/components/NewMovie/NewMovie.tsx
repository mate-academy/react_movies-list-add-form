import { Component } from 'react';
import './NewMovie.scss';

type OnAdd = (movie: Movie) => void;

type Props = {
  onAdd: OnAdd,
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

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  addMovieForm = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.onAdd(this.state);

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
      <form onSubmit={this.addMovieForm}>
        <input
          className="input"
          type="text"
          name="title"
          value={title}
          placeholder="Enter title"
          onChange={this.handleChange}
          required
        />
        <textarea
          className="input"
          name="description"
          value={description}
          placeholder="Enter description"
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          className="input"
          name="imgUrl"
          placeholder="Enter URL for image"
          value={imgUrl}
          onChange={this.handleChange}
          required
        />
        <input
          className="input"
          type="text"
          name="imdbUrl"
          placeholder="Enter URL for IMDB"
          value={imdbUrl}
          onChange={this.handleChange}
          required
        />
        <input
          className="input"
          name="imdbId"
          type="text"
          placeholder="Enter IMBD Id"
          value={imdbId}
          onChange={this.handleChange}
          required
        />
        <button type="submit" className="button">
          Add
        </button>
      </form>
    );
  }
}
