import { Component } from 'react';

type Props = {
  movies: Movie[];
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

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.addMovie({ ...this.state });
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
      <form onSubmit={this.handleSubmit}>
        <input
          value={this.state.title}
          className="input form-control"
          placeholder="Title"
          onChange={(event) => {
            this.setState({
              title: event.target.value,
            });
          }}
        />
        <input
          value={this.state.description}
          className="input form-control"
          placeholder="Description"
          onChange={(event) => {
            this.setState({
              description: event.target.value,
            });
          }}
        />
        <input
          value={this.state.imgUrl}
          className="input form-control"
          placeholder="imgUrl"
          onChange={(event) => {
            this.setState({
              imgUrl: event.target.value,
            });
          }}
        />
        <input
          value={this.state.imdbUrl}
          className="input form-control"
          placeholder="imdbUrl"
          onChange={(event) => {
            this.setState({
              imdbUrl: event.target.value,
            });
          }}
        />
        <input
          value={this.state.imdbId}
          className="input form-control"
          placeholder="imdbId"
          onChange={(event) => {
            this.setState({
              imdbId: event.target.value,
            });
          }}
        />
        <button type="submit" className="btn btn-outline-info w-100">Submit</button>
      </form>
    );
  }
}
