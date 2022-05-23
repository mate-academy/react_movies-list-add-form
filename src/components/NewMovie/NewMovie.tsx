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
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
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
      <form
        className="movies__form-add"
        onSubmit={(event) => {
          event.preventDefault();
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
          });
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
