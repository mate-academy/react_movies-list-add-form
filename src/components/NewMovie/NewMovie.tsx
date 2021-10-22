import { Component } from 'react';

import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const {
      name,
      value,
    } = event.currentTarget;

    this.setState({ [name]: value } as Pick<Movie, keyof Movie>);
  };

  handleSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    const { onAdd } = this.props;

    onAdd(this.state);
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
    const { handleChange, handleSubmit } = this;

    return (
      <form onSubmit={handleSubmit} className="new-movie">
        <input
          className="new-movie__item"
          type="text"
          name="title"
          value={title}
          placeholder="title"
          onChange={handleChange}
          required
        />
        <input
          className="new-movie__item"
          type="text"
          name="description"
          value={description}
          placeholder="description"
          onChange={handleChange}
        />
        <input
          className="new-movie__item"
          type="text"
          name="imgUrl"
          value={imgUrl}
          placeholder="imgUrl"
          onChange={handleChange}
          required
        />
        <input
          className="new-movie__item"
          type="text"
          name="imdbUrl"
          value={imdbUrl}
          placeholder="imdbUrl"
          onChange={handleChange}
          required
        />
        <input
          className="new-movie__item"
          type="text"
          name="imdbId"
          value={imdbId}
          placeholder="imdbId"
          onChange={handleChange}
          required
        />
        <button type="submit">
          Add
        </button>
      </form>
    );
  }
}
