import React from 'react';

import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

type State = Movie;

export class NewMovie extends React.Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  clearState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  submitFilm = () => {
    this.props.onAdd(this.state);
    this.clearState();
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
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();

          this.submitFilm();
        }}
      >
        <input
          type="text"
          className="form__item"
          placeholder="Enter a title"
          value={title}
          onChange={(event) => {
            this.setState({
              title: event.target.value,
            });
          }}
        />
        <textarea
          rows={15}
          cols={40}
          className="form__item"
          placeholder="Add description of a film"
          value={description}
          onChange={(event) => {
            this.setState({
              description: event.target.value,
            });
          }}
        />
        <input
          type="url"
          className="form__item"
          placeholder="Enter an image link"
          value={imgUrl}
          onChange={(event) => {
            this.setState({
              imgUrl: event.target.value,
            });
          }}
        />
        <input
          type="url"
          className="form__item"
          placeholder="Enter an IMDB link"
          value={imdbUrl}
          onChange={(event) => {
            this.setState({
              imdbUrl: event.target.value,
            });
          }}
        />
        <input
          type="text"
          className="form__item"
          placeholder="Enter an IMDB id"
          value={imdbId}
          onChange={(event) => {
            this.setState({
              imdbId: event.target.value,
            });
          }}
        />

        <button type="submit" className="form__item">
          Add
        </button>
      </form>
    );
  }
}
