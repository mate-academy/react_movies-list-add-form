/* eslint-disable jsx-a11y/label-has-associated-control */
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

  resetForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  onAdd = (event: React.FormEvent) => {
    event.preventDefault();
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.addMovie(newMovie);
    this.resetForm();
  };

  handleChangeTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;

    this.setState({
      description: value,
    });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.currentTarget;

    switch (id) {
      case 'title':
        this.setState({
          [id]: value,
        });
        break;
      case 'imgUrl':
        this.setState({
          [id]: value,
        });
        break;
      case 'imdbUrl':
        this.setState({
          [id]: value,
        });
        break;
      case 'imdbId':
        this.setState({
          [id]: value,
        });
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <form
        onSubmit={this.onAdd}
        className="NewMovie"
      >
        <div className="field">
          <label
            htmlFor="title"
            className="label"
          >
            Movie title:
          </label>
          <div className="control">
            <input
              type="text"
              id="title"
              value={this.state.title}
              onChange={this.handleChange}
              placeholder="place movie title"
              required
              className="input"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea
              id="description"
              value={this.state.description}
              onChange={this.handleChangeTextarea}
              placeholder="write description"
              required
              className="textarea"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Image:</label>
          <div className="control">
            <input
              type="text"
              id="imgUrl"
              value={this.state.imgUrl}
              onChange={this.handleChange}
              placeholder="place image link"
              required
              className="input"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">IMDB link:</label>
          <div className="control">
            <input
              type="text"
              id="imdbUrl"
              value={this.state.imdbUrl}
              onChange={this.handleChange}
              placeholder="place imdb link"
              required
              className="input"
            />
          </div>
        </div>

        <div className="field">
          <label className="label">IMDB id:</label>
          <div className="control">
            <input
              type="text"
              id="imdbId"
              value={this.state.imdbId}
              onChange={this.handleChange}
              placeholder="enter imdb id"
              required
              className="input"
            />
          </div>
        </div>

        <div className="control">
          <button
            type="submit"
            className="button is-link"
          >
            Add New Movie
          </button>
        </div>
      </form>
    );
  }
}
