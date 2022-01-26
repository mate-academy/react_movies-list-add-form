import { Component } from 'react';

type Props = {
  addMovie: (movie: Movie) => void,
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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  handleSubmit = (event: React.FormEvent) => {
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
    const {
      title, description, imgUrl, imdbUrl, imdbId,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <p>Title</p>
        <input
          type="text"
          value={title}
          name="title"
          onChange={this.handleChange}
        />
        <p>Description</p>
        <input
          type="text"
          value={description}
          name="description"
          onChange={this.handleChange}
        />
        <p>imgUrl</p>
        <input
          type="text"
          value={imgUrl}
          name="imgUrl"
          onChange={this.handleChange}
        />
        <p>imdbUrl</p>
        <input
          type="text"
          value={imdbUrl}
          name="imdbUrl"
          onChange={this.handleChange}
        />
        <p>imdbId</p>
        <input
          type="text"
          value={imdbId}
          name="imdbId"
          onChange={this.handleChange}
        />
        <button type="submit">Add Movie</button>
      </form>
    );
  }
}
