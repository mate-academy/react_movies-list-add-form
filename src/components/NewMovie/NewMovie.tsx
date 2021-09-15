import { Component } from 'react';

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

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const {
      title, description, imgUrl, imdbId, imdbUrl,
    } = this.state;

    const { addMovie } = this.props;

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    addMovie(newMovie);
    this.clearState();
  };

  addTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value });
  };

  addDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ description: event.target.value });
  };

  addImgUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ imgUrl: event.target.value });
  };

  addImdUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ imdbUrl: event.target.value });
  };

  addImdbId = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ imdbId: event.target.value });
  };

  clearState() {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const {
      title, description, imgUrl, imdbId, imdbUrl,
    } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          placeholder="Enter you title"
          value={title}
          onChange={this.addTitle}
        />

        <input
          type="text"
          placeholder="Enter you description"
          value={description}
          onChange={this.addDescription}
        />

        <input
          type="text"
          placeholder="Enter you imgUrl"
          value={imgUrl}
          onChange={this.addImgUrl}
        />

        <input
          type="text"
          placeholder="Enter you imdUrl"
          value={imdbUrl}
          onChange={this.addImdUrl}
        />

        <input
          type="text"
          placeholder="Enter you imdbld"
          value={imdbId}
          onChange={this.addImdbId}
        />

        <button type="submit">add</button>
      </form>
    );
  }
}
