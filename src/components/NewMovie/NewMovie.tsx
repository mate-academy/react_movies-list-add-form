/* eslint-disable jsx-a11y/label-has-associated-control */
import { Component } from 'react';

import './NewMovie.scss';

type Validation = {
  imgUrl: boolean;
  imdbUrl: boolean;
};

type Props = {
  onAdd: (newFilm: Movie) => void;
};
type State = {
  newFilm: Movie;
  isValid: Validation;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    newFilm: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    isValid: {
      imgUrl: false,
      imdbUrl: false,
    },
  };

  urlValidation = (link: string) => {
    const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    return regex.test(link);
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    if (value.trim() === '' && value.length !== 0) {
      return;
    }

    this.setState(state => ({
      newFilm: {
        ...state.newFilm,
        [name]: value,
      },
    }));
  };

  clearForm = () => {
    this.setState({
      newFilm: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    });
  };

  onBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'imgUrl':
      case 'imdbUrl':
        this.setState(state => ({
          isValid: {
            ...state.isValid,
            [name]: this.urlValidation(value),
          },
        }));
        break;
      default:
        break;
    }
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.newFilm;
    const { isValid } = this.state;

    return (
      <form onSubmit={(event) => {
        event.preventDefault();

        this.props.onAdd(this.state.newFilm);
        this.clearForm();
      }}
      >
        <p className="form__helper">* - required field</p>
        <label>
          *Title:
          <input
            className="form__input"
            value={title}
            type="text"
            name="title"
            placeholder="Title of the movie"
            onChange={this.onChange}
            style={{ borderColor: (title.length > 0) ? '' : 'red' }}
          />
        </label>

        <label>
          Description:
          <textarea
            className="form__textarea"
            cols={40}
            rows={5}
            value={description}
            name="description"
            placeholder="Description of the movie"
            onChange={this.onChange}
          />
        </label>

        <label>
          *Image URL adress:
          <input
            className="form__input"
            value={imgUrl}
            name="imgUrl"
            type="text"
            placeholder="https://..."
            onChange={this.onChange}
            onBlur={this.onBlur}
            style={{ borderColor: (!isValid.imgUrl) ? 'red' : '' }}
          />
        </label>
        {!isValid.imgUrl && (
          <p className="form__input--invalid">Value is invalid</p>
        )}

        <label>
          *Film URL adress:
          <input
            className="form__input"
            value={imdbUrl}
            name="imdbUrl"
            type="text"
            placeholder="https://..."
            onChange={this.onChange}
            onBlur={this.onBlur}
            style={{ borderColor: (!isValid.imdbUrl) ? 'red' : '' }}
          />
        </label>
        {!isValid.imdbUrl && (
          <p className="form__input--invalid">Value is invalid</p>
        )}

        <label>
          *Film id:
          <input
            className="form__input"
            value={imdbId}
            name="imdbId"
            type="text"
            placeholder="Enter a new ID"
            onChange={this.onChange}
            style={{ borderColor: (imdbId.length === 0) ? 'red' : '' }}
          />
        </label>

        <button
          className="button"
          type="submit"
          disabled={
            !(title && isValid.imgUrl && isValid.imdbUrl && imdbId)
          }
        >
          Add film
        </button>
      </form>
    );
  }
}
