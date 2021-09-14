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

type Event = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  titleHandleChange = (event: Event) => {
    this.setState({ title: event.target.value });
  };

  descriptionHandleChange = (event: Event) => {
    this.setState({ description: event.target.value });
  };

  imgUrlHandleChange = (event: Event) => {
    this.setState({ imgUrl: event.target.value });
  };

  imdbUrlHandleChange = (event: Event) => {
    this.setState({ imdbUrl: event.target.value });
  };

  imdbIdHandleChange = (event: Event) => {
    this.setState({ imdbId: event.target.value });
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
    const {
      title,
      description,
      imdbUrl,
      imgUrl,
      imdbId,
    } = this.state;

    const newMovie = {
      title,
      description,
      imdbUrl,
      imgUrl,
      imdbId,
    };

    this.props.addMovie(newMovie);
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
            id="title"
            type="text"
            required
            value={title}
            onChange={this.titleHandleChange}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="w-75"
            placeholder="Description"
            name="description"
            value={description}
            onChange={this.descriptionHandleChange}
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
            onChange={this.imgUrlHandleChange}
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
            onChange={this.imdbUrlHandleChange}
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
            onChange={this.imdbIdHandleChange}
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
