import React, { Component } from 'react';

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
    const { value, name } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.addMovie(this.state);
    this.clearState();
  };

  clearState = () => {
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
        onSubmit={this.handleSubmit}
        className="d-grid gap-3"
      >
        <span>
          <p className="fw-bold">Title</p>
          <input
            placeholder="Add title"
            type="text"
            name="title"
            value={title}
            onChange={this.handleChange}
            className="form-control"
            required
          />
        </span>
        <span>
          <p className="fw-bold">Description</p>
          <input
            placeholder="Add description"
            type="text"
            name="description"
            value={description}
            onChange={this.handleChange}
            className="form-control"
            required
          />
        </span>
        <span>
          <p className="fw-bold">ImgUrl</p>
          <input
            placeholder="Add images url"
            type="text"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            className="form-control"
            required
          />
        </span>
        <span>
          <p className="fw-bold">ImdbUrl</p>
          <input
            placeholder="Add IMDB url"
            type="text"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            className="form-control"
            required
          />
        </span>
        <span>
          <p className="fw-bold">ImdbId</p>
          <input
            placeholder="Add IMDB id"
            type="text"
            name="imdbId"
            value={imdbId}
            onChange={this.handleChange}
            className="form-control"
            required
          />
          <br />
          <button
            type="submit"
            className="btn btn-warning fw-bold"
          >
            Add Movie
          </button>
        </span>
      </form>
    );
  }
}
