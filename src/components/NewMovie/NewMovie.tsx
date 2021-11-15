import './NewMovie.scss';

import { Component } from 'react';

interface Props {
  onAdd: (movie: Movie) => void
}

interface State {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
}

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    this.setState({ [name]: value } as Pick<State, keyof State>);
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
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
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <div className="mb-4">
          <label className="form__label" htmlFor="title">
            Title:
            <br />

            <input
              className="mt-2 form-control"
              type="text"
              placeholder="Enter movie title"
              name="title"
              value={title}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="form__label" htmlFor="description">
            Description
            <br />

            <textarea
              className="form-control"
              name="description"
              placeholder="Enter movie description"
              rows={5}
              value={description}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="form__label" htmlFor="imgUrl">
            Image url:
            <br />

            <input
              className="mt-2 form-control"
              type="text"
              placeholder="Enter movie cover-img url"
              name="imgUrl"
              value={imgUrl}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="form__label" htmlFor="imdbUrl">
            Imdb url:
            <br />

            <input
              className="mt-2 form-control"
              type="text"
              placeholder="Enter imdb url"
              name="imdbUrl"
              value={imdbUrl}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="form__label" htmlFor="imdbId">
            Imdb id:
            <br />

            <input
              className="mt-2 form-control"
              type="text"
              placeholder="Enter imdb id"
              name="imdbId"
              value={imdbId}
              onChange={this.handleChange}
            />
          </label>
        </div>

        <button
          className="btn btn-outline-success btn-lg"
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  }
}
