import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

type State = {
  newMovie: Movie;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    newMovie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  };

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    this.setState(state => ({
      newMovie: {
        ...state.newMovie,
        [name]: value,
      },
    }));
  };

  clearForm = () => {
    this.setState({
      newMovie: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.onAdd(this.state.newMovie);
    this.clearForm();
  };

  render() {
    const {
      title, description, imgUrl, imdbUrl, imdbId,
    } = this.state.newMovie;

    return (
      <form onSubmit={this.handleSubmit} className="form">
        <div>
          <label htmlFor="title" className="form__item">
            Title
            <input
              required
              type="text"
              name="title"
              id="title"
              placeholder="Enter movie title"
              value={title}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <div>
          <label htmlFor="description" className="form__item">
            Description
            <textarea
              required
              name="description"
              id="description"
              value={description}
              rows={5}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <div>
          <label htmlFor="imgUrl" className="form__item">
            imgUrl
            <input
              required
              type="text"
              name="imgUrl"
              id="imgUrl"
              value={imgUrl}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <div>
          <label htmlFor="imdbUrl" className="form__item">
            imdbUrl
            <input
              required
              type="text"
              name="imdbUrl"
              id="imdbUrl"
              value={imdbUrl}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <div>
          <label htmlFor="imdbId" className="form__item">
            imdbId
            <input
              required
              type="text"
              name="imdbId"
              id="imdbId"
              value={imdbId}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <button type="submit" className="form__btn">
          Add a new movie
        </button>
      </form>
    );
  }
}
