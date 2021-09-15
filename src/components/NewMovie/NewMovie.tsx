import React, { Component } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

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

  clearState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({ [name]: value } as Pick<State, keyof State>);
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie = { ...this.state };

    this.props.addMovie(newMovie);

    this.clearState();
  };

  render() {
    return (
      <>
        <h3 className="display-6">
          Add new movie
        </h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="title"
              className="form-control mb-2"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleChange}
              required
            />

            <input
              type="text"
              name="description"
              className="form-control mb-2"
              placeholder="Description"
              value={this.state.description}
              onChange={this.handleChange}
              required
            />

            <input
              type="text"
              name="imgUrl"
              className="form-control mb-2"
              placeholder="Image Url"
              value={this.state.imgUrl}
              onChange={this.handleChange}
              required
            />

            <input
              type="text"
              name="imdbUrl"
              className="form-control mb-2"
              placeholder="IMDB Url"
              value={this.state.imdbUrl}
              onChange={this.handleChange}
              required
            />

            <input
              type="text"
              name="imdbId"
              className="form-control mb-2"
              placeholder="IMDB Id"
              value={this.state.imdbId}
              onChange={this.handleChange}
              required
            />

            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Add
            </button>
          </div>
        </form>
      </>
    );
  }
}
