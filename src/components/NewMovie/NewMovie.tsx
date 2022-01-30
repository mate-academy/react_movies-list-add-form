import React, { Component } from 'react';
import classNames from 'classnames/bind';

type Props = {
  onAdd: (movie: Movie) => void;
};
type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  hasimgUrlError: boolean,
  hasimdbUrlError: boolean,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    hasimgUrlError: false,
    hasimdbUrlError: false,
  };

  handlerOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (name === 'imgUrl' || name === 'imdbUrl') {
      this.setState((state) => ({
        [`has${[name]}Error`]: regex.test(value),
        ...state,
        [name]: value,
      }));

      // eslint-disable-next-line no-console
      console.log(`${!regex.test(value)} ffsd`);
      // eslint-disable-next-line no-console
      console.log([`has${[name]}Error`]);
    }

    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
  };

  handlerFormSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.onAdd(movie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      hasimgUrlError: false,
      hasimdbUrlError: false,
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      hasimgUrlError,
      hasimdbUrlError,
    } = this.state;

    // eslint-disable-next-line no-console
    console.log(hasimgUrlError);

    return (
      <form onSubmit={this.handlerFormSubmit}>
        <label htmlFor="title">
          Title&nbsp;
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={this.handlerOnChange}
            required
            className="input"
          />
        </label>
        <label htmlFor="description">
          Description&nbsp;
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={this.handlerOnChange}
            className="input"
          />
        </label>
        <label htmlFor="imgUrl">
          ImgUrl&nbsp;
          <input
            type="text"
            name="imgUrl"
            id="imgUrl"
            value={imgUrl}
            onChange={this.handlerOnChange}
            className={
              classNames('input',
                { 'is-danger': hasimgUrlError })
            }
            required
          />
        </label>
        <label htmlFor="imdbUrl">
          ImdbUrl&nbsp;
          <input
            type="text"
            name="imdbUrl"
            id="imdbUrl"
            value={imdbUrl}
            onChange={this.handlerOnChange}
            className={
              classNames('input',
                { 'is-danger': hasimdbUrlError })
            }
            required
          />
        </label>
        <label htmlFor="imdbId">
          ImdbId&nbsp;
          <input
            type="text"
            name="imdbId"
            id="imdbId"
            value={imdbId}
            onChange={this.handlerOnChange}
            className="input"
            required
          />
        </label>
        <button type="submit">
          Add Movie
        </button>
      </form>
    );
  }
}
