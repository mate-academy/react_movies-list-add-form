import { Component } from 'react';

type Props = {
  onAdd: (movie: Movie) => void;
};

type State = {
  title: string;
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

  handleSubmit = (event: React.FormEvent) => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    event.preventDefault();

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.onAdd(newMovie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    this.setState({ [name]: value } as Pick<State, keyof State>);
  };

  render() {
    return (
      <form action="" onSubmit={this.handleSubmit}>

        <div className="mb-3">
          <input
            name="title"
            type="text"
            onChange={this.handleChange}
            value={this.state.title}
            id="title"
            placeholder="Enter title"
            className="form-control form-control--bot"
          />

          <input
            name="description"
            type="text"
            onChange={this.handleChange}
            value={this.state.description}
            id="description"
            placeholder="Enter description"
            className="form-control form-control--bot"
          />

          <input
            name="imgUrl"
            type="text"
            onChange={this.handleChange}
            value={this.state.imgUrl}
            id="imgUrl"
            placeholder="Enter imgUrl"
            className="form-control form-control--bot"
          />

          <input
            name="imdbUrl"
            type="text"
            onChange={this.handleChange}
            value={this.state.imdbUrl}
            id="imdbUrl"
            placeholder="Enter imbdUrl"
            className="form-control form-control--bot"
          />

          <input
            name="imdbId"
            type="text"
            onChange={this.handleChange}
            value={this.state.imdbId}
            id="imdbId"
            placeholder="Enter imbdId"
            className="form-control form-control--bot"
          />
        </div>

        <button type="submit" className="btn btn-outline-primary">
          Add new movie
        </button>

      </form>
    );
  }
}
