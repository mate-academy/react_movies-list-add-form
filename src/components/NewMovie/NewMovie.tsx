/* eslint-disable jsx-a11y/label-has-associated-control */
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

type Props = {
  onAdd: (movie: Movie) => void;
};

type State = {
  title: string,
  description: string
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

  resetState = () => {
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

    this.setState({
      [name]: value,
    } as Pick<State, keyof State>);
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie = {
      ...this.state,
    };

    this.props.onAdd(newMovie);
    this.resetState();
  };

  render() {
    const {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="title" className="form-label">
            Title
            <input
              required
              className="form-control"
              id="title"
              name="title"
              value={title}
              type="text"
              onChange={(event) => {
                this.setState({ title: event.target.value });
              }}
            />
          </label>

          <label htmlFor="description" className="form-label">
            Description
            <input
              required
              className="form-control"
              id="description"
              name="description"
              value={description}
              type="text"
              onChange={this.handleChange}
            />
          </label>

          <label htmlFor="imdbId" className="form-label">
            ImdbId
            <input
              required
              className="form-control"
              id="imdbId"
              name="imdbId"
              value={imdbId}
              type="text"
              onChange={this.handleChange}
            />
          </label>

          <label htmlFor="imdbUrl" className="form-label">
            ImdbUrl
            <input
              required
              className="form-control"
              id="imdbUrl"
              name="imdbUrl"
              value={imdbUrl}
              type="text"
              onChange={this.handleChange}
            />
          </label>

          <label htmlFor="imgUrl" className="form-label">
            ImgUrl
            <input
              required
              className="form-control"
              id="imgUrl"
              name="imgUrl"
              value={imgUrl}
              type="text"
              onChange={this.handleChange}
            />
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-success"
        >
          add movie
        </button>
      </form>
    );
  }
}
