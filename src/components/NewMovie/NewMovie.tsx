/* eslint-disable max-len */
import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void;
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
};

// const rightLink = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
// console.log(rightLink);

export class NewMovie extends Component<Props, State> {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  onAddMovie = (event: React.FormEvent) => {
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

  addValue = (key: string, value: string) => {
    this.setState({
      [key]: value,
    } as Pick<Movie, keyof Movie>);
  };

  render() {
    return (
      <form onSubmit={this.onAddMovie}>
        <div className="form">
          {Object.entries(this.state).map(([key, value]) => (
            <>
              <p className="form__title">
                {key}
                {': '}
              </p>
              {(key !== 'description')
                ? (
                  <input
                    className="form__put"
                    type="text"
                    name={key}
                    key={key}
                    value={value}
                    onChange={event => {
                      // console.log(event.target);
                      // Try to do Advanced level of task
                      if (event.target.name === 'imgUrl'
                      || event.target.name === 'imdbUrl') {
                        // console.log('imgUrl or imdbUrl');
                        // if (!event.target.value.match(rightLink)) {
                        //   // console.log('Alert!');
                        // }
                        this.addValue(key, event.target.value);
                      } else {
                        this.addValue(key, event.target.value);
                      }
                    }}
                    required
                  />
                )
                : (
                  <textarea
                    className="form__area"
                    key={key}
                    value={value}
                    onChange={event => this.addValue(key, event.target.value)}
                    required
                  />
                )}
            </>
          ))}

          <button
            type="submit"
            className="form__button"
          >
            Add
          </button>
        </div>
      </form>
    );
  }
}
