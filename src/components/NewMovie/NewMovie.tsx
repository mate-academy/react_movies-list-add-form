import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onSubmit: (movie: Movie) => void;
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

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as Pick<State, keyof State>);
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.onSubmit({ ...this.state });
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
        className="Form"
        onSubmit={this.handleSubmit}
      >
        <input
          className="form-control"
          placeholder="Title"
          value={title}
          type="text"
          name="title"
          onChange={this.handleInput}
        />
        <input
          className="form-control"
          placeholder="Description"
          value={description}
          type="text"
          name="description"
          onChange={this.handleInput}
        />
        <input
          className="form-control"
          placeholder="imgUrl"
          value={imgUrl}
          type="text"
          name="imgUrl"
          onChange={this.handleInput}
        />
        <input
          className="form-control"
          placeholder="imdbUrl"
          value={imdbUrl}
          type="text"
          name="imdbUrl"
          onChange={this.handleInput}
        />
        <input
          className="form-control"
          placeholder="imdbId"
          value={imdbId}
          type="text"
          name="imdbId"
          onChange={this.handleInput}
        />
        <button
          className="btn btn-primary"
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  }
}
