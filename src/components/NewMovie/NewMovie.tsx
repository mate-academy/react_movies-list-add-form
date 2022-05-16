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
    this.clear();

    const movie = {
      title: this.state.title,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
      description: this.state.description,
    };

    this.props.onAdd(movie);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <label htmlFor="title">
          Title:
          <input
            type="text"
            name="title"
            id="title"
            className="input"
            value={this.state.title}
            required
            onChange={(event => {
              this.setState({ title: event.target.value });
            })}
          />
        </label>
        <label htmlFor="imgUrl">
          ImgUrl:
          <input
            type="text"
            className="input"
            name="imgUrl"
            id="imgUrl"
            value={this.state.imgUrl}
            required
            onChange={(event => {
              this.setState({ imgUrl: event.target.value });
            })}
          />
        </label>
        <label htmlFor="imdbUrl">
          ImdbUrl:
          <input
            type="text"
            className="input"
            name="imdbUrl"
            id="imdbUrl"
            value={this.state.imdbUrl}
            required
            onChange={(event => {
              this.setState({ imdbUrl: event.target.value });
            })}
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
            value={this.state.imdbId}
            onChange={(event => {
              this.setState({ imdbId: event.target.value });
            })}
          />
        </label>
        <label htmlFor="description">
          Description:
          <textarea
            name="description"
            id="description"
            className="textarea"
            value={this.state.description}
            onChange={(event => {
              this.setState({ description: event.target.value });
            })}
          />
        </label>
        <button type="submit" className="button">
          Add Movie
        </button>
      </form>
    );
  }
}
