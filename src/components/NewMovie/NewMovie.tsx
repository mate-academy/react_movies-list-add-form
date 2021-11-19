import { ChangeEvent, Component, FormEvent } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
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

  handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      title, description, imgUrl, imdbUrl, imdbId,
    } = this.state;

    this.props.onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

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
      title, description, imgUrl, imdbUrl, imdbId,
    } = this.state;

    const areInputsValid = !!title && !!imgUrl && !!imdbUrl && !!imdbId;

    return (
      <form
        className="newMovieForm"
        onSubmit={this.handleSubmit}
      >
        <label
          htmlFor="title"
          className="newMovieForm__label"
        >
          Movie title*
          <input
            type="text"
            className="newMovieForm__input"
            value={title}
            id="title"
            name="title"
            placeholder="Title"
            onChange={this.handleChange}
            required
          />
        </label>

        <label
          htmlFor="description"
          className="newMovieForm__label"
        >
          Movie description
          <textarea
            className="newMovieForm__input newMovieForm__input--textarea"
            value={description}
            id="description"
            name="description"
            placeholder="Description"
            onChange={this.handleChange}
          />
        </label>

        <label htmlFor="imgUrl" className="newMovieForm__label">
          Movie imgUrl*
          <input
            type="text"
            className="newMovieForm__input"
            value={imgUrl}
            id="imgUrl"
            name="imgUrl"
            placeholder="ImgUrl"
            onChange={this.handleChange}
            required
          />
        </label>

        <label htmlFor="imdbUrl" className="newMovieForm__label">
          Movie imdbUrl*
          <input
            type="text"
            className="newMovieForm__input"
            value={imdbUrl}
            id="imdbUrl"
            name="imdbUrl"
            placeholder="ImdbUrl"
            onChange={this.handleChange}
            required
          />
        </label>

        <label htmlFor="imdbId" className="newMovieForm__label">
          Movie imdbId*
          <input
            type="text"
            className="newMovieForm__input"
            value={imdbId}
            id="imdbId"
            name="imdbId"
            placeholder="ImdbId"
            onChange={this.handleChange}
            required
          />
        </label>

        <button
          type="submit"
          className="newMovieForm__button"
          disabled={!areInputsValid}
        >
          Add movie
        </button>
      </form>
    );
  }
}
