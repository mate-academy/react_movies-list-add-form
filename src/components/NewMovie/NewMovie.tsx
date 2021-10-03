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

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    this.props.addMovie({ ...this.state });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as Pick<State, keyof State>);
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
      <form onSubmit={this.handleSubmit}>
        <input
          name="title"
          value={title}
          className="input form-control"
          placeholder="Title"
          onChange={this.handleChange}
        />
        <input
          name="description"
          value={description}
          className="input form-control"
          placeholder="Description"
          onChange={this.handleChange}
        />
        <input
          name="imgUrl"
          value={imgUrl}
          className="input form-control"
          placeholder="imgUrl"
          onChange={this.handleChange}
        />
        <input
          name="imdbUrl"
          value={imdbUrl}
          className="input form-control"
          placeholder="imdbUrl"
          onChange={this.handleChange}
        />
        <input
          name="imdbId"
          value={imdbId}
          className="input form-control"
          placeholder="imdbId"
          onChange={this.handleChange}
        />
        <button
          type="submit"
          className="btn btn-outline-info w-100"
        >
          Submit
        </button>
      </form>
    );
  }
}
