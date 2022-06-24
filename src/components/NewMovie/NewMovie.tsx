import { Component } from 'react';

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
            name="imgUrl"
            id="imgUrl"
            className="input"
            value={imgUrl}
            required
            onChange={this.changeHandler}
          />
        </label>
        <label htmlFor="imdbUrl">
          ImdbUrl:
          <input
            type="text"
            name="imdbUrl"
            id="imdbUrl"
            className="input"
            value={imdbUrl}
            required
            onChange={this.changeHandler}
          />
        </label>
        <label htmlFor="imdbId">
          ImdbId:
          <input
            type="text"
            name="imdbId"
            id="imdbId"
            className="input"
            value={imdbId}
            required
            onChange={this.changeHandler}
          />
        </label>
        <label htmlFor="description">
          Description:
          <input
            type="text"
            name="description"
            id="description"
            className="input"
            value={description}
            required
            onChange={this.changeHandler}
          />
        </label>
        <button
          type="submit"
          className="button"
        >
          Add New Movie
        </button>
      </form>
    );
  }
}
