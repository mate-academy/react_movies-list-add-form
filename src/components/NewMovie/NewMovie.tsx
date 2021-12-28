import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void,
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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  render() {
    const { addMovie } = this.props;
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form
        className="new-movie"
        onSubmit={(event) => {
          event.preventDefault();
          addMovie({
            title,
            description,
            imgUrl,
            imdbUrl,
            imdbId,
          });
          this.setState({
            title: '',
            description: '',
            imgUrl: '',
            imdbUrl: '',
            imdbId: '',
          });
        }}
      >
        <input
          type="text"
          placeholder="title"
          name="title"
          value={title}
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          placeholder="description"
          name="description"
          value={description}
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          placeholder="imgUrl"
          name="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          placeholder="imdbUrl"
          name="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          placeholder="imdbId"
          name="imdbId"
          value={imdbId}
          onChange={this.handleChange}
          required
        />
        <button
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}
