import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
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
    const { onAdd } = this.props;

    event.preventDefault();

    const newMovie = { ...this.state };

    onAdd(newMovie);
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
      <form
        onSubmit={this.handleSubmit}
        className="NewMovie"
      >
        <input
          type="text"
          name="title"
          className="NewMovie__title forms"
          placeholder="write title"
          value={title}
          onChange={event => {
            this.setState({
              title: event.target.value,
            });
          }}
        />
        <input
          type="text"
          name="description"
          className="NewMovie__description"
          placeholder="write description"
          value={description}
          onChange={event => {
            this.setState({
              description: event.target.value,
            });
          }}
        />
        <input
          type="text"
          name="imgUrl"
          className="NewMovie__imgUrl forms"
          placeholder="write imgUrl"
          value={imgUrl}
          onChange={event => {
            this.setState({
              imgUrl: event.target.value,
            });
          }}
        />
        <input
          type="text"
          name="imdbUrl"
          className="NewMovie__imdbUrl forms"
          placeholder="write imdbUrl"
          value={imdbUrl}
          onChange={event => {
            this.setState({
              imdbUrl: event.target.value,
            });
          }}
        />
        <input
          type="text"
          name="imdbId"
          className="NewMovie__imdbId forms"
          placeholder="write imdbId"
          value={imdbId}
          onChange={event => {
            this.setState({
              imdbId: event.target.value,
            });
          }}
        />
        <button
          type="submit"
          className="NewMovie__button"
        >
          Add
        </button>
      </form>
    );
  }
}
