/* eslint-disable react/no-unused-state */
import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
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

  render() {
    return (
      <form
        onSubmit={(event) => event.preventDefault}
        className="form"
      >
        <div className="form__fields">
          <input
            name="title"
            placeholder="title"
            type="text"
            className="form__fields--field"
          />
          <input
            name="description"
            placeholder="description"
            type="text"
            className="form__fields--field"
          />
          <input
            name="imgUrl"
            placeholder="imgUrl"
            type="text"
            className="form__fields--field"
          />
          <input
            name="imdbUrl"
            placeholder="imdbUrl"
            type="text"
            className="form__fields--field"
          />
          <input
            name="imdbId"
            placeholder="imdbId"
            type="text"
            className="form__fields--field"
          />
        </div>
      </form>
    );
  }
}
