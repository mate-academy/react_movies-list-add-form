import { Component } from 'react';
import './NewMovie.scss';

interface Props {
  addMovie: (movie: Movie) => void;
}

export class NewMovie extends Component<Props, Movie> {
  state: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  onAdd = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.addMovie(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    return (
      <>
        <form onSubmit={this.onAdd} className="sidebar__form">

          <label htmlFor="title">
            <p className="input__name">Title</p>
            <input
              className="form-control"
              type="text"
              name="Title"
              id="Title"
              required
              value={this.state.title}
              onChange={(event) => {
                this.setState({ title: event.target.value });
              }}
            />
          </label>

          <label htmlFor="description">
            <p className="input__name">Description</p>
            <input
              className="form-control"
              type="text"
              name="description"
              id="description"
              required
              value={this.state.description}
              onChange={(event) => {
                this.setState({ description: event.target.value });
              }}
            />
          </label>

          <label htmlFor="imgUrl">
            <p className="input__name">ImgUrl</p>
            <input
              className="form-control"
              type="text"
              name="imgUrl"
              id="imgUrl"
              required
              value={this.state.imgUrl}
              onChange={(event) => {
                this.setState({ imgUrl: event.target.value });
              }}
            />
          </label>

          <label htmlFor="imdbUrl">
            <p className="input__name">ImdbUrl</p>
            <input
              className="form-control"
              type="text"
              name="imdbUrl"
              id="imdbUrl"
              required
              value={this.state.imdbUrl}
              onChange={(event) => {
                this.setState({ imdbUrl: event.target.value });
              }}
            />
          </label>

          <label htmlFor="imdbId">
            <p className="input__name">ImdbId</p>
            <input
              className="form-control"
              type="text"
              name="imdbId"
              id="imdbId"
              required
              value={this.state.imdbId}
              onChange={(event) => {
                this.setState({ imdbId: event.target.value });
              }}
            />
          </label>

          <button
            type="submit"
            className="sidebar__button btn btn-outline-warning"
          >
            Add film
          </button>
        </form>
      </>
    );
  }
}
