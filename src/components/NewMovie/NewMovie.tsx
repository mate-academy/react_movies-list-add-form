import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void;
};
type State = Movie;

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({ [name]: value } as Pick<State, keyof State>);
  };

  handleSubmit = (event: React.FormEvent) => {
    const { addMovie } = this.props;

    event.preventDefault();
    addMovie({ ...this.state });
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
      <form
        className="control"
        onSubmit={this.handleSubmit}
      >
        <input
          className="input is-info"
          placeholder="Title"
          value={title}
          type="text"
          name="title"
          onChange={this.handleChange}
        />
        <input
          className="input is-info"
          placeholder="Description"
          value={description}
          type="text"
          name="description"
          onChange={this.handleChange}
        />
        <input
          className="input is-info"
          placeholder="ImgUrl"
          value={imgUrl}
          type="text"
          name="imgUrl"
          onChange={this.handleChange}
        />
        <input
          className="input is-info"
          placeholder="ImdbUrl"
          value={imdbUrl}
          type="text"
          name="imdbUrl"
          onChange={this.handleChange}
        />
        <input
          className="input is-info"
          placeholder="ImdbId"
          value={imdbId}
          type="text"
          name="imdbId"
          onChange={this.handleChange}
        />
        <button
          className="button is-primary"
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  }
}
