import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as Pick<State, keyof State>);
  };

  reset = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    const { onAdd } = this.props;
    const newMovie = { ...this.state };

    event.preventDefault();

    onAdd(newMovie);
    this.reset();
  };

  render() {
    const {
      title, description, imdbId, imdbUrl, imgUrl,
    } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="d-flex flex-column gap-2"
      >
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Enter movie title"
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          name="description"
          value={description}
          placeholder="Enter movie description"
          onChange={this.handleChange}
          required
        />
        <input
          type="url"
          pattern="/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/"
          name="imgUrl"
          value={imgUrl}
          placeholder="Enter movie image"
          onChange={this.handleChange}
          required
        />
        <input
          type="url"
          pattern="/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/"
          name="imdbUrl"
          value={imdbUrl}
          placeholder="Enter IMDB image"
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          name="imdbId"
          value={imdbId}
          placeholder="Enter IMDB id"
          onChange={this.handleChange}
          required
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!title || !imgUrl || !imdbUrl || !imdbId}
        >
          Add movie
        </button>
      </form>
    );
  }
}
