import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
};

type State = {
  newMovie: Movie,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    newMovie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  };

  handleChange = (value: string, property: string) => {
    this.setState((state) => ({
      newMovie: {
        ...state.newMovie,
        [property]: value,
      },
    }));
  };

  araseForm = () => {
    this.setState((state) => ({
      newMovie: {
        ...state.newMovie,
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    }));
  };

  render() {
    const { onAdd } = this.props;
    const { newMovie } = this.state;

    return (
      <div className="container">
        <h1>Add a new movie</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onAdd(this.state.newMovie);
            this.araseForm();
          }}
          className="form"
        >
          <input
            type="text"
            name="title"
            value={newMovie.title}
            onChange={(event) => (
              this.handleChange(event.target.value, 'title')
            )}
            placeholder="Enter a title"
            required
          />

          <input
            type="text"
            name="description"
            value={newMovie.description}
            onChange={(event) => (
              this.handleChange(event.target.value, 'description')
            )}
            placeholder="Enter a description"
          />

          <input
            type="text"
            name="imgUrl"
            value={newMovie.imgUrl}
            pattern="/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/"
            onChange={(event) => (
              this.handleChange(event.target.value, 'imgUrl')
            )}
            placeholder="Enter a link for the poster"
            required
          />

          <input
            type="text"
            name="imdbUrl"
            value={newMovie.imdbUrl}
            pattern="/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/"
            onChange={(event) => (
              this.handleChange(event.target.value, 'imdbUrl')
            )}
            placeholder="Enter a link to the IMDB"
            required
          />

          <input
            type="text"
            name="imdbId"
            value={newMovie.imdbId}
            onChange={(event) => (
              this.handleChange(event.target.value, 'imdbId')
            )}
            placeholder="Enter an id of a movie"
            required
          />
          <button type="submit">
            Add
          </button>
        </form>
      </div>

    );
  }
}
