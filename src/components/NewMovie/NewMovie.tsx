/* eslint-disable max-len */
import { Component } from 'react';
import './NewMovie.scss';

type OnAdd = (movie: Movie) => void;

type Props = {
  onAdd: OnAdd,
};
type State = {
  newMovie: {
    title: string,
    description: string,
    imgUrl: string,
    imdbUrl: string,
    imdbId: string,
  },
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

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    this.setState((state) => ({
      newMovie: {
        ...state.newMovie,
        [name]: value,
      },
    }));
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.newMovie;

    return (
      <form
        className="newMovie__form"
        onSubmit={(event) => {
          event.preventDefault();
          const movie: Movie = {
            title,
            description,
            imgUrl,
            imdbUrl,
            imdbId,
          };

          this.props.onAdd(movie);
        }}
      >
        <input
          className="input"
          type="text"
          name="title"
          value={title}
          placeholder="Enter title"
          onChange={this.handleChange}
        />
        <textarea
          className="newMovie__form--description input"
          name="description"
          value={description}
          placeholder="Enter description"
          onChange={this.handleChange}
        />
        <input
          className="input"
          type="text"
          name="imgUrl"
          placeholder="Enter URL for image"
          value={imgUrl}
          onChange={this.handleChange}
        />
        <input
          className="input"
          type="text"
          name="imdbUrl"
          placeholder="Enter URL for IMDB"
          value={imdbUrl}
          onChange={this.handleChange}
        />
        <input
          className="input"
          type="text"
          name="imdbId"
          placeholder="Enter IMBD Id"
          value={imdbId}
          onChange={this.handleChange}
        />
        <button type="submit">
          Submit
        </button>
      </form>
    );
  }
}
