import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void,
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

  clearList = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    const { addMovie } = this.props;

    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();

          addMovie(this.state);

          this.clearList();
        }}
      >
        <h3 className="addMovie__title">
          You can add a new movie!
        </h3>
        <p>
          <input
            type="text"
            value={this.state.title}
            placeholder="Title"
            className="addMovie__input"
            required
            onChange={(event) => {
              this.setState({
                title: event.target.value,
              });
            }}
          />
        </p>
        <p>
          <input
            type="text"
            value={this.state.description}
            placeholder="Description"
            className="addMovie__input"
            required
            onChange={(event) => {
              this.setState({
                description: event.target.value,
              });
            }}
          />
        </p>
        <p>
          <input
            type="text"
            value={this.state.imgUrl}
            placeholder="ImgUrl"
            className="addMovie__input"
            required
            onChange={(event) => {
              this.setState({
                imgUrl: event.target.value,
              });
            }}
          />
        </p>
        <p>
          <input
            type="text"
            value={this.state.imdbUrl}
            placeholder="ImdbUrl"
            className="addMovie__input"
            required
            onChange={(event) => {
              this.setState({
                imdbUrl: event.target.value,
              });
            }}
          />
        </p>
        <p>
          <input
            type="text"
            value={this.state.imdbId}
            placeholder="ImdbId"
            className="addMovie__input"
            required
            onChange={(event) => {
              this.setState({
                imdbId: event.target.value,
              });
            }}
          />
        </p>
        <button
          type="submit"
          className="addMovie__button"
        >
          Add new movie
        </button>
      </form>
    );
  }
}
