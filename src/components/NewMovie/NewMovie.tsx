import React, { ChangeEvent, FormEvent } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void,
};

type State = {
  count: number,
  titleValue: string,
  descriptionValue: string,
  imgUrlValue: string,
  imdbUrlValue: string,
  imdbIdValue: string,
};

export class NewMovie extends React.Component<Props, State> {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  state = {
    count: 0,
    titleValue: '',
    descriptionValue: '',
    imgUrlValue: '',
    imdbUrlValue: '',
    imdbIdValue: '',
  };

  chanheTitleValue = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ titleValue: event.target.value });
  };

  chanheDescriptionValue = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ descriptionValue: event.target.value });
  };

  chanheImgUrlValue = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ imgUrlValue: event.target.value });
  };

  chanheImdbUrlValue = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ imdbUrlValue: event.target.value });
  };

  chanheImdbIdValue = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ imdbIdValue: event.target.value });
  };

  newMovie = () => {
    return {
      title: this.state.titleValue,
      description: this.state.descriptionValue,
      imgUrl: this.state.imgUrlValue,
      imdbUrl: this.state.imdbUrlValue,
      imdbId: this.state.imdbIdValue,
    };
  };

  onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onAdd(this.newMovie());

    this.setState(state => ({
      count: state.count + 1,
      titleValue: '',
      descriptionValue: '',
      imgUrlValue: '',
      imdbUrlValue: '',
      imdbIdValue: '',
    }));
  };

  buttonAvailability = () => {
    const {
      titleValue,
      imgUrlValue,
      imdbUrlValue,
      imdbIdValue,
    } = this.state;

    return (titleValue === ''
    || imgUrlValue === ''
    || imdbUrlValue === ''
    || imdbIdValue === '');
  };

  render(): React.ReactNode {
    const {
      count,
      titleValue,
      descriptionValue,
      imgUrlValue,
      imdbUrlValue,
      imdbIdValue,
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
          value={titleValue}
          required
          onChange={this.chanheTitleValue}
        />

        <TextField
          name="description"
          label="Description"
          value={descriptionValue}
          onChange={this.chanheDescriptionValue}
        />

        <TextField
          name="imgUrl"
          label="Image URL"
          value={imgUrlValue}
          required
          onChange={this.chanheImgUrlValue}
        />

        <TextField
          name="imdbUrl"
          label="Imdb URL"
          value={imdbUrlValue}
          required
          onChange={this.chanheImdbUrlValue}
        />

        <TextField
          name="imdbId"
          label="Imdb ID"
          value={imdbIdValue}
          required
          onChange={this.chanheImdbIdValue}
        />

        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              data-cy="submit-button"
              className="button is-link"
              disabled={(
                titleValue === ''
                || imgUrlValue === ''
                || imdbUrlValue === ''
                || imdbIdValue === ''
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
