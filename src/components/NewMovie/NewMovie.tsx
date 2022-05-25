import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAddMovie: (movie: Movie) => void,
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  titleError: string,
  imgUrlError: string,
  imdbUrlError: string,
  imdbIdError: string,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    titleError: '',
    imgUrlError: '',
    imdbUrlError: '',
    imdbIdError: '',
  };

  isValidForm = () => {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    this.setState((state) => ({
      title: state.title.trim(),
      description: state.description.trim(),
      imgUrl: state.imgUrl.trim(),
      imdbUrl: state.imdbUrl.trim(),
      imdbId: state.imdbId.trim(),
    }));

    if (!title.trim()) {
      this.setState({ titleError: '*please input title' });
    }

    if (!imgUrl.trim()) {
      this.setState({ imgUrlError: '*please input img url' });
    }

    if (!imdbUrl.trim()) {
      this.setState({ imdbUrlError: '*please input imdb url' });
    }

    if (!imdbId.trim()) {
      this.setState({ imdbIdError: '*please input title' });
    }
  };

  handleSubmitForm = () => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    if (title.trim() && imdbUrl.trim() && imgUrl.trim() && imdbId.trim) {
      this.props.onAddMovie({
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
        imdbUrlError: '',
        imdbIdError: '',
        imgUrlError: '',
        titleError: '',
      });
    }
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      imdbUrlError,
      imdbIdError,
      imgUrlError,
      titleError,
    } = this.state;

    return (
      <form
        className="movies__form-add"
        onSubmit={(event) => {
          event.preventDefault();
          this.isValidForm();
          this.handleSubmitForm();
        }}
      >
        <label className="label" htmlFor="title">
          Title:
          <input
            type="text"
            name="title"
            id="title"
            className="input"
            placeholder="Write title..."
            autoComplete="off"
            required
            value={title}
            onChange={(event) => this.setState({
              title: event.target.value,
            })}
          />

          {titleError && (
            <span className="has-text-danger">{titleError}</span>
          )}
        </label>

        <label className="label" htmlFor="description">
          Description:
          <textarea
            name="description"
            id="description"
            className="textarea has-fixed-size"
            placeholder="Write description..."
            value={description}
            onChange={(event) => this.setState({
              description: event.target.value,
            })}
          />
        </label>

        <label className="label" htmlFor="imgUrl">
          Img url:
          <input
            type="text"
            name="imgUrl"
            id="imgUrl"
            className="input"
            placeholder="Write img url..."
            autoComplete="off"
            required
            value={imgUrl}
            onChange={(event) => this.setState({
              imgUrl: event.target.value,
            })}
          />

          {imgUrlError && (
            <span className="has-text-danger">{imgUrlError}</span>
          )}
        </label>

        <label className="label" htmlFor="imdbUrl">
          Imd url:
          <input
            type="text"
            name="imdbUrl"
            id="imdbUrl"
            className="input"
            placeholder="Write imd url..."
            autoComplete="off"
            required
            value={imdbUrl}
            onChange={(event) => this.setState({
              imdbUrl: event.target.value,
            })}
          />

          {imdbUrlError && (
            <span className="has-text-danger">{imdbUrlError}</span>
          )}
        </label>

        <label className="label" htmlFor="imdbId">
          Imdb Id:
          <input
            type="text"
            name="imdbId"
            id="imdbId"
            className="input"
            placeholder="Write imdb Id..."
            autoComplete="off"
            required
            value={imdbId}
            onChange={(event) => this.setState({
              imdbId: event.target.value,
            })}
          />

          {imdbIdError && (
            <span className="has-text-danger">{imdbIdError}</span>
          )}
        </label>

        <button
          type="submit"
          className="button is-fullwidth is-rounded is-success"
        >
          Submit
        </button>
      </form>
    );
  }
}
