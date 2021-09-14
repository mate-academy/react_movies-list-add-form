import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(() => ({
      [name]: value,
    } as State));
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    this.props.addMovie({ ...this.state });
    this.formClear();
  };

  formClear = () => {
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
      imdbId,
      imdbUrl,
      imgUrl,
    } = this.state;

    return (
      <form className="d-flex flex-column" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={this.handleChange}
          className="mb-2 py-2 px-2 border rounded"
          placeholder="Title"
        />
        <input
          type="text"
          name="description"
          value={description}
          onChange={this.handleChange}
          className="mb-2 py-2 px-2 border rounded"
          placeholder="Description"
        />
        <input
          type="text"
          name="imdbId"
          value={imdbId}
          onChange={this.handleChange}
          className="mb-2 py-2 px-2 border rounded"
          placeholder="ImdbId"
        />
        <input
          type="text"
          name="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
          className="mb-2 py-2 px-2 border rounded"
          placeholder="ImgUrl"
        />
        <input
          type="text"
          name="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
          className="mb-2 py-2 px-2 border rounded"
          placeholder="ImdbUrl"
        />
        <button
          type="submit"
          className="btn-primary border rounded py-2"
        >
          Submit
        </button>
      </form>
    );
  }
}
