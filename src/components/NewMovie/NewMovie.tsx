import { Component } from 'react';

type Props = {
  addMovie: (movie: Movie) => void;
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

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as Pick<State, keyof State>);
  };

  resetForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    this.props.addMovie({ ...this.state });
    this.resetForm();
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
      <form
        className="text-center"
        onSubmit={this.handleSubmit}
      >
        <div className="mb-3">
          <input
            className="w-75"
            placeholder="Title"
            name="title"
            type="text"
            required
            value={title}
            onChange={this.handleInput}
          />
        </div>
        <div className="mb-3">
          <input
            className="w-75"
            placeholder="Description"
            name="description"
            type="text"
            value={description}
            onChange={this.handleInput}
          />
        </div>
        <div className="mb-3">
          <input
            className="w-75"
            placeholder="ImgUrl"
            name="imgUrl"
            required
            value={imgUrl}
            type="text"
            onChange={this.handleInput}
          />
        </div>
        <div className="mb-3">
          <input
            className="w-75"
            placeholder="ImdbUrl"
            name="imdbUrl"
            required
            value={imdbUrl}
            type="text"
            onChange={this.handleInput}
          />
        </div>
        <div className="mb-3">
          <input
            className="w-75"
            placeholder="ImdbId"
            name="imdbId"
            required
            value={imdbId}
            type="text"
            onChange={this.handleInput}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Add Movie
        </button>
      </form>
    );
  }
}
