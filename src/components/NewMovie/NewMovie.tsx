import { Component } from 'react';

type Props = {
  addMovie:(movie: Movie) => void;
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

  submitHandler = () => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    if (title === ''
    || description === ''
    || imgUrl === ''
    || imdbUrl === ''
    || imdbId === ''
    ) {
      return;
    }

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.addMovie(movie);

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
      <form
        className="movieAddForm"
        onSubmit={(event) => {
          event.preventDefault();
          this.submitHandler();
        }}
      >
        <input
          type="text"
          value={this.state.title}
          placeholder="Enter the title please"
          onChange={(event) => {
            this.setState({ title: event.target.value });
          }}
        />
        <input
          type="text"
          value={this.state.description}
          placeholder="Description goes here"
          onChange={(event) => {
            this.setState({ description: event.target.value });
          }}
        />
        <input
          type="text"
          value={this.state.imgUrl}
          placeholder="We need to add image link here"
          onChange={(event) => {
            this.setState({ imgUrl: event.target.value });
          }}
        />
        <input
          type="text"
          value={this.state.imdbUrl}
          placeholder="Please add imdb link here"
          onChange={(event) => {
            this.setState({ imdbUrl: event.target.value });
          }}
        />
        <input
          type="text"
          value={this.state.imdbId}
          placeholder="Imdb ID place here"
          onChange={(event) => {
            this.setState({ imdbId: event.target.value });
          }}
        />
        <button
          type="submit"
        >
          Add movie
        </button>
      </form>
    );
  }
}
