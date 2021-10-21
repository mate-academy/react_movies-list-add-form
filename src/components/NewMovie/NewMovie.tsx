import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

type State = Movie;

const emptyForm = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export class NewMovie extends Component<Props, State> {
  state: State = { ...emptyForm };

  render() {
    return (
      <div className="movie-adder">
        <h1 className="movie-adder__title">
          Add new movie &#x1F3A5; &#x1F3AC; &#x1F4FC;
        </h1>
        <form
          className="movie-adder__form"
          onSubmit={(event) => {
            event.preventDefault();
            this.props.onAdd({ ...this.state });
            this.setState({ ...emptyForm });
          }}
        >
          {Object.entries(this.state).map(([key, value]) => {
            return (
              <input
                required
                className="movie-adder__input"
                key={key}
                type="text"
                value={value}
                placeholder={`Enter ${key}`}
                onChange={event => {
                  this.setState({ [key]: event.target.value } as Pick<Movie, keyof Movie>);
                }}
              />
            );
          })}

          <button
            type="submit"
            className="movie-adder__button"
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}
