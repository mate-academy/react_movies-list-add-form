import { Component } from 'react';

type Props = {
  addMovie: (movie: Movie) => void;
};

type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
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
    this.setState((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  getNewMovie = () => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    return newMovie;
  };

  clearState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.addMovie(this.getNewMovie());
    this.clearState();
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
      <form onSubmit={this.handleSubmitForm}>
        <section className="block">
          <input
            type="text"
            name="title"
            value={title}
            className="input is-small"
            placeholder="Title"
            onChange={this.handleInputChange}
          />
        </section>

        <section className="block">
          <input
            type="text"
            name="description"
            value={description}
            className="input is-small"
            placeholder="Description"
            onChange={this.handleInputChange}
          />
        </section>

        <section className="block">
          <input
            type="text"
            name="imgUrl"
            value={imgUrl}
            className="input is-small"
            placeholder="imgUrl"
            onChange={this.handleInputChange}
          />
        </section>

        <section className="block">
          <input
            type="text"
            name="imdbUrl"
            value={imdbUrl}
            className="input is-small"
            placeholder="imdbUrl"
            onChange={this.handleInputChange}
          />
        </section>

        <section className="block">
          <input
            type="text"
            name="imdbId"
            value={imdbId}
            className="input is-small"
            placeholder="imdbId"
            onChange={this.handleInputChange}
          />
        </section>

        <button
          type="submit"
          className="button is-info is-small"
        >
          Add
        </button>
      </form>
    );
  }
}
