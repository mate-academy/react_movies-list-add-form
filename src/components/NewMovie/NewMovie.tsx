import { Component, FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as Pick<State, keyof State>);
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie = { ...this.state };

    this.props.onAdd(newMovie);

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
      imdbUrl,
      imgUrl,
      imdbId,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="mb-3">
        <input
          className="form-control mb-3"
          type="text"
          name="title"
          onChange={this.handleInputChange}
          value={title}
          placeholder="Enter the title"
        />
        <input
          className="form-control mb-3"
          type="text"
          name="description"
          onChange={this.handleInputChange}
          value={description}
          placeholder="Enter the description"
        />
        <input
          className="form-control mb-3"
          type="text"
          name="imgUrl"
          onChange={this.handleInputChange}
          value={imgUrl}
          placeholder="Enter the imgUrl"
        />
        <input
          className="form-control mb-3"
          type="text"
          name="imdbUrl"
          onChange={this.handleInputChange}
          value={imdbUrl}
          placeholder="Enter the imdbUrl"
        />
        <input
          className="form-control mb-3"
          type="text"
          name="imdbId"
          onChange={this.handleInputChange}
          value={imdbId}
          placeholder="Enter the imdbId"
        />

        <button
          type="submit"
          className="btn btn-success mt-3"
          disabled={!title || !imdbUrl || !imgUrl || !imdbId}
        >
          Add new movie
        </button>
      </form>
    );
  }
}
