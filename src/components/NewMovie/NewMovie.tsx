/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import classNames from 'classnames';

import { Movie } from '../../types/Movie';

import './NewMovie.scss';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

type State = {
  newMovie: Movie;
  hasTitle: boolean;
  hasImgUrl: boolean;
  hasImdbUrl: boolean;
  hasImdbId: boolean;
};

export class NewMovie extends React.Component<Props, State> {
  state: State = {
    newMovie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    hasTitle: true,
    hasImgUrl: true,
    hasImdbUrl: true,
    hasImdbId: true,
  };

  handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    this.setState((state) => {
      return {
        newMovie: {
          ...state.newMovie,
          [name]: value,
        },
      };
    });
  };

  validateInput = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name } = event.target;
    const validation = `has${name[0].toUpperCase() + name.slice(1)}`;

    const isValid = (fieldValue: string) => {
      const regexUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

      if (
        (name === 'imgUrl' || name === 'imdbUrl')
        && !regexUrl.test(fieldValue)
      ) {
        return false;
      }

      return fieldValue !== '';
    };

    this.setState((state) => {
      return {
        [validation]: isValid(state.newMovie[name as keyof Movie]),
      } as Pick<State, 'hasTitle' | 'hasImgUrl' | 'hasImdbId' | 'hasImdbUrl'>;
    });
  };

  clearForm = () => {
    this.setState({
      newMovie: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    });
  };

  isDataValid = () => {
    return (
      this.state.newMovie.title
      && this.state.newMovie.imgUrl
      && this.state.newMovie.imdbUrl
      && this.state.newMovie.imdbId
    );
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { onAdd } = this.props;
    const { newMovie } = this.state;

    onAdd(newMovie);
    this.clearForm();
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.newMovie;

    const {
      hasTitle,
      hasImgUrl,
      hasImdbUrl,
      hasImdbId,
    } = this.state;

    return (
      <form className="NewMovie" onSubmit={this.handleSubmit}>
        <div className="NewMovie__fields">
          <div className="NewMovie__input-wrapper">
            <label htmlFor="movieTitle" className="NewMovie__field-label">
              Title:
            </label>

            <input
              type="text"
              name="title"
              value={title}
              id="movieTitle"
              placeholder="Enter movie title"
              className={classNames('NewMovie__field', {
                'NewMovie__field--error': !hasTitle,
              })}
              onChange={this.handleChange}
              onBlur={this.validateInput}
            />

            {!hasTitle && <p>Please, provide title</p>}
          </div>

          <div className="NewMovie__input-wrapper">
            <textarea
              name="description"
              value={description}
              id="description"
              placeholder="Movie description..."
              rows={4}
              className="NewMovie__field NewMovie__field--description"
              onChange={this.handleChange}
            />
          </div>

          <div className="NewMovie__input-wrapper">
            <label htmlFor="imgUrl" className="NewMovie__field-label">
              imgUrl:
            </label>

            <input
              type="text"
              name="imgUrl"
              value={imgUrl}
              id="imgUrl"
              placeholder="Enter image url"
              className={classNames('NewMovie__field', {
                'NewMovie__field--error': !hasImgUrl,
              })}
              onChange={this.handleChange}
              onBlur={this.validateInput}
            />

            {!hasImgUrl && <p>Please, provide correct image url</p>}
          </div>

          <div className="NewMovie__input-wrapper">
            <label htmlFor="imdbUrl" className="NewMovie__field-label">
              imdbUrl:
            </label>

            <input
              type="text"
              name="imdbUrl"
              value={imdbUrl}
              id="imdbUrl"
              placeholder="Enter imdb url"
              className={classNames('NewMovie__field', {
                'NewMovie__field--error': !hasImdbUrl,
              })}
              onChange={this.handleChange}
              onBlur={this.validateInput}
            />

            {!hasImdbUrl && <p>Please, provide correct imdb url</p>}
          </div>

          <div className="NewMovie__input-wrapper">
            <label htmlFor="imdbUrl" className="NewMovie__field-label">
              imdbId:
            </label>

            <input
              type="text"
              name="imdbId"
              value={imdbId}
              id="imdbId"
              placeholder="Enter imdb id"
              className={classNames('NewMovie__field', {
                'NewMovie__field--error': !hasImdbId,
              })}
              onChange={this.handleChange}
              onBlur={this.validateInput}
            />

            {!hasImdbId && <p>Please, provide imdb id</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={!this.isDataValid()}
          className="NewMovie__button"
        >
          Add movie
        </button>
      </form>
    );
  }
}
