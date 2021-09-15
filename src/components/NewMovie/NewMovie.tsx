import { Component } from 'react';

type Props = {
  onAddMovie: (movie: Movie) => void;
};

type State = Movie;

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as Pick<State, keyof State>);
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.onAddMovie(this.state);
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
      <form className="form-group" onSubmit={this.handleSubmit}>
        <div className="d-flex flex-column justify-content-center gap-2 mb-3">
          <label className="form-label" htmlFor="exampleInputText">
            Title
            <input
              type="text"
              name="title"
              className="form-control"
              id="exampleInputText"
              required
              value={title}
              onChange={this.handleChange}
            />
          </label>
          <label className="form-label" htmlFor="exampleInputText">
            Description
            <input
              type="text"
              name="description"
              className="form-control"
              id="exampleInputText"
              required
              value={description}
              onChange={this.handleChange}
            />
          </label>
          <label className="form-label" htmlFor="exampleInputText">
            ImgUrl
            <input
              type="text"
              name="imgUrl"
              className="form-control"
              id="exampleInputText"
              required
              value={imgUrl}
              onChange={this.handleChange}
            />
          </label>
          <label className="form-label" htmlFor="exampleInputText">
            ImdbUrl
            <input
              type="text"
              name="imdbUrl"
              className="form-control"
              id="exampleInputText"
              required
              value={imdbUrl}
              onChange={this.handleChange}
            />
          </label>
          <label className="form-label" htmlFor="exampleInputText">
            ImdbId
            <input
              type="text"
              name="imdbId"
              className="form-control"
              id="exampleInputText"
              required
              value={imdbId}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Add movie</button>
      </form>
    );
  }
}
