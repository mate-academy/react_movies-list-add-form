import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie(movie: Movie): void;
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

  handlerChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  clearForm = () => (this.setState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  }));

  render() {
    const { addMovie } = this.props;
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addMovie({ ...this.state });
          this.clearForm();
        }}
      >
        <div>
          <p>Title</p>
          <input
            type="text"
            name="title"
            value={title}
            onChange={this.handlerChange}
            required
          />
        </div>

        <div>
          <p>Imagine link</p>
          <input
            type="text"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handlerChange}
            required
          />
        </div>

        <div>
          <p>IMBD link</p>
          <input
            type="text"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handlerChange}
            required
          />
        </div>

        <div>
          <p>IMBD id</p>
          <input
            type="text"
            name="imdbId"
            value={imdbId}
            onChange={this.handlerChange}
            required
          />
        </div>

        <div>
          <p>Description</p>
          <textarea
            name="description"
            value={description}
            onChange={this.handlerChange}
            rows={8}
            cols={40}
            required
            className="form__textarea"
          />
        </div>

        <button
          type="submit"
        >
          Add movie
        </button>
      </form>
    );
  }
}
