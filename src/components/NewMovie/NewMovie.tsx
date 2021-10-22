/* eslint-disable max-len */
import React from 'react';
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

export class NewMovie extends React.PureComponent<Props, State> {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  onAddMovie = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (!title
      || !imgUrl
      || !imdbUrl
      || !imdbId
    ) {
      return;
    }

    this.props.addMovie(newMovie);
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
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form onSubmit={this.onAddMovie}>
        <div className="form">
          <h2 className="form__title">Title:</h2>
          <input
            className="form__put"
            type="text"
            value={title}
            onChange={event => {
              this.setState({
                title: event.target.value,
              });
            }}
          />
          <h2 className="form__title">Description:</h2>
          <textarea
            className="form__area"
            value={description}
            onChange={event => {
              this.setState({
                description: event.target.value,
              });
            }}
          />
          <h2 className="form__title">ImgUrl:</h2>
          <input
            className="form__put"
            type="text"
            value={imgUrl}
            onChange={event => {
              this.setState({
                imgUrl: event.target.value,
              });
            }}
          />
          <h2 className="form__title">ImdbUrl</h2>
          <input
            className="form__put"
            type="text"
            value={imdbUrl}
            onChange={event => {
              this.setState({
                imdbUrl: event.target.value,
              });
            }}
          />
          <h2 className="form__title">ImdbId</h2>
          <input
            className="form__put"
            type="text"
            value={imdbId}
            onChange={event => {
              this.setState({
                imdbId: event.target.value,
              });
            }}
          />

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
