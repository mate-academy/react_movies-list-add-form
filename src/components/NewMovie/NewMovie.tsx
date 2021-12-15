/* eslint-disable jsx-a11y/label-has-associated-control */
import { Component } from 'react';

import './NewMovie.scss';

type Props = {
  onAdd: (newFilm: Movie) => void;
};
type State = {
  newFilm: Movie;
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
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name } = event.target;
    let { value } = event.target;

    if (name === 'imgUrl' || name === 'imdbUrl') {
      value = value.replace(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/g, '');
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

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.newFilm;

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
            style={{ borderColor: title ? 'green' : 'red' }}
            type="text"
            name="title"
            placeholder="Title of the movie"
            onChange={this.onChange}
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
            style={{ borderColor: imgUrl ? 'green' : 'red' }}
            value={imgUrl}
            name="imgUrl"
            type="text"
            placeholder="https://..."
            onChange={this.onChange}
          />
        </label>

        <label>
          *Film URL adress:
          <input
            className="form__input"
            style={{ borderColor: imdbUrl ? 'green' : 'red' }}
            value={imdbUrl}
            name="imdbUrl"
            type="text"
            placeholder="https://..."
            onChange={this.onChange}
          />
        </label>

        <label>
          *Film id:
          <input
            className="form__input"
            style={{ borderColor: imdbId ? 'green' : 'red' }}
            value={imdbId}
            name="imdbId"
            type="text"
            placeholder="Enter a new ID"
            onChange={this.onChange}
          />
        </label>

        <button
          className="button"
          type="submit"
          disabled={!(title && imgUrl && imdbUrl && imdbId)}
        >
          Add film
        </button>
      </form>
    );
  }
}
