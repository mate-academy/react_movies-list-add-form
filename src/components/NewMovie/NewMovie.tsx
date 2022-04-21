import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void
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

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.reset();
    const film = {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    };

    this.props.onAdd(film);
  };

  reset = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
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
        <label htmlFor="description">
          Description:
          <textarea
            name="description"
            id="description"
            className="input"
            value={this.state.description}
            onChange={(event => {
              this.setState({ description: event.target.value });
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
        <button type="submit" className="button">
          Save
        </button>
      </form>
    );
  }
}
