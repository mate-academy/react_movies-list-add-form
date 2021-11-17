import { Component } from 'react';

type Props = {
  onAdd: (newMovie: Movie) => void,
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
};

type Event = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  inputHandler = (event: Event) => {
    const { name, value } = event.target;

    this.setState((prevState) => (
      {
        ...prevState,
        [name]: value,
      }
    ));
  };

  render() {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();

          this.props.onAdd(this.state);

          this.setState({
            title: '',
            description: '',
            imgUrl: '',
            imdbUrl: '',
            imdbId: '',
          });
        }}
      >
        <p>You can add new movie here</p>

        <div>
          <label htmlFor="new-movie-title">
            <span>Enter title: </span>
            <input
              id="new-movie-title"
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.inputHandler}
            />
          </label>
        </div>

        <div>
          <span>Add description here: </span>
          <textarea
            id="new-movie-description"
            name="description"
            value={this.state.description}
            onChange={this.inputHandler}
          />
        </div>

        <div>
          <label htmlFor="new-movie-imgUrl">
            <span>Add link to movie poster: </span>
            <input
              id="new-movie-imgUrl"
              type="text"
              name="imgUrl"
              value={this.state.imgUrl}
              onChange={this.inputHandler}
            />
          </label>
        </div>

        <div>
          <label htmlFor="new-movie-imdbUrl">
            <span>Add link to movie on IMDB: </span>
            <input
              id="new-movie-imdbUrl"
              type="text"
              name="imdbUrl"
              value={this.state.imdbUrl}
              onChange={this.inputHandler}
            />
          </label>
        </div>

        <div>
          <label htmlFor="new-movie-imdbId">
            <span>Enter movie ID from IMDB: </span>
            <input
              id="new-movie-imdbId"
              type="text"
              name="imdbId"
              value={this.state.imdbId}
              onChange={this.inputHandler}
            />
          </label>
        </div>

        <button type="submit">
          Add movie
        </button>
      </form>
    );
  }
}
