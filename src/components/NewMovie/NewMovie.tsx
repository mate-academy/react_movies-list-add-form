import { Component } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void,
};

type State = {
  count: number,
  newMovie: Movie,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    count: 0,
    newMovie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  };

  isButtonDisabled = () => {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.newMovie;

    return !title.length || !imgUrl.length || !imdbUrl.length
    || !imdbId.length;
  };

  hendelSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onAdd(this.state.newMovie);
    this.setState(state => ({
      count: state.count + 1,
      newMovie: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    }));
  };

  render() {
    const { count, newMovie } = this.state;

    return (
      <form
        className="NewMovie"
        key={count}
        onSubmit={this.hendelSubmit}
      >
        <h2 className="title">Add a movie</h2>

        <TextField
          name="title"
          label="Title"
          value={newMovie.title}
          onChange={(newValue) => {
            this.setState(state => ({
              newMovie: {
                ...state.newMovie,
                title: newValue,
              },
            }));
          }}
          required
        />

        <TextField
          name="description"
          label="Description"
          value={newMovie.description}
          onChange={(newValue) => {
            this.setState(state => ({
              newMovie: {
                ...state.newMovie,
                description: newValue,
              },
            }));
          }}
        />

        <TextField
          name="imgUrl"
          label="Image URL"
          value={newMovie.imgUrl}
          onChange={(newValue) => {
            this.setState(state => ({
              newMovie: {
                ...state.newMovie,
                imgUrl: newValue,
              },
            }));
          }}
          required
        />

        <TextField
          name="imdbUrl"
          label="Imdb URL"
          value={newMovie.imdbUrl}
          onChange={(newValue) => {
            this.setState(state => ({
              newMovie: {
                ...state.newMovie,
                imdbUrl: newValue,
              },
            }));
          }}
          required
        />

        <TextField
          name="imdbId"
          label="Imdb ID"
          value={newMovie.imdbId}
          onChange={(newValue) => {
            this.setState(state => ({
              newMovie: {
                ...state.newMovie,
                imdbId: newValue,
              },
            }));
          }}
          required
        />

        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              data-cy="submit-button"
              className="button is-link"
              disabled={this.isButtonDisabled()}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    );
  }
}
