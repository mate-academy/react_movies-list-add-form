import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void
};

type State = {
  title: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  description: string,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    description: '',
  };

  clear = () => {
    this.setState({
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      description: '',
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const movie = {
      ...this.state,
    };

    this.props.onAdd(movie);
    this.clear();
  };

  changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  render() {
    const {
      title, imgUrl, imdbUrl, imdbId, description,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="form">
        <label htmlFor="title">
          Title:
          <input
            type="text"
            name="title"
            id="title"
            className="input"
            value={title}
            required
            onChange={this.changeHandler}
          />
        </label>
        <label htmlFor="imgUrl">
          ImgUrl:
          <input
            type="text"
            className="input"
            name="imgUrl"
            id="imgUrl"
            value={imgUrl}
            required
            onChange={this.changeHandler}
          />
        </label>
        <label htmlFor="imdbUrl">
          ImdbUrl:
          <input
            type="text"
            className="input"
            name="imdbUrl"
            id="imdbUrl"
            value={imdbUrl}
            required
            onChange={this.changeHandler}
          />
        </label>
        <label htmlFor="imdbId">
          ImdbId:
          <input
            type="text"
            className="input"
            name="imdbId"
            id="imdbId"
            required
            value={imdbId}
            onChange={this.changeHandler}
          />
        </label>
        <label htmlFor="description">
          Description:
          <input
            name="description"
            id="description"
            className="input"
            value={description}
            onChange={this.changeHandler}
          />
        </label>
        <button type="submit" className="button">
          Add Movie
        </button>
      </form>
    );
  }
}
