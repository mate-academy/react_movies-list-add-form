import React, { ChangeEvent, FormEvent } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void,
};

type State = {
  count: number,
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
};

export class NewMovie extends React.Component<Props, State> {
  state = {
    count: 0,
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  changeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  newMovie = () => {
    return {
      title: this.state.title.trim(),
      description: this.state.description.trim(),
      imgUrl: this.state.imgUrl.trim(),
      imdbUrl: this.state.imdbUrl.trim(),
      imdbId: this.state.imdbId.trim(),
    };
  };

  onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onAdd(this.newMovie());

    this.setState(state => ({
      count: state.count + 1,
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    }));
  };

  render(): React.ReactNode {
    const {
      count,
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form
        className="NewMovie"
        key={count}
        onSubmit={this.onSubmit}
      >
        <h2 className="title">Add a movie</h2>

        <TextField
          name="title"
          label="Title"
          value={title}
          required
          onChange={this.changeValue}
        />

        <TextField
          name="description"
          label="Description"
          value={description}
          onChange={this.changeValue}
        />

        <TextField
          name="imgUrl"
          label="Image URL"
          value={imgUrl}
          required
          onChange={this.changeValue}
        />

        <TextField
          name="imdbUrl"
          label="Imdb URL"
          value={imdbUrl}
          required
          onChange={this.changeValue}
        />

        <TextField
          name="imdbId"
          label="Imdb ID"
          value={imdbId}
          required
          onChange={this.changeValue}
        />

        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              data-cy="submit-button"
              className="button is-link"
              disabled={(
                !title.trim().length
                || !imgUrl.trim().length
                || !imdbUrl.trim().length
                || !imdbId.trim().length
              )}
            >
              Add
            </button>
          </div>
        </div>
      </form>
    );
  }
}
