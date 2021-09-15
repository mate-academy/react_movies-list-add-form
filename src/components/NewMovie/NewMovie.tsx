import React, { FormEvent } from 'react';
import classNames from 'classnames';
import './NewMovie.scss';

type Props = {
  addNewMovie: (movie: Movie) => void;
};

type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  titleCheck: boolean;
  imgUrlCheck: boolean;
  imdbUrlCheck: boolean;
  imdbIdCheck: boolean;
};

export class NewMovie extends React.Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    titleCheck: false,
    imgUrlCheck: false,
    imdbUrlCheck: false,
    imdbIdCheck: false,
  };

  handleChange = (event: EventsForm) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      [`${name}Check`]: false,
    } as Pick<State, keyof State>);
  };

  newMovieChecker = (newMovie: Movie) => {
    const checkedArr = Object.entries(newMovie);

    return checkedArr.some(item => (item[0] !== 'description') && (item[1] === ''));
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (this.newMovieChecker(newMovie)) {
      this.setState({
        titleCheck: !title,
        imgUrlCheck: !imgUrl,
        imdbUrlCheck: !imdbUrl,
        imdbIdCheck: !imdbId,
      });

      return;
    }

    this.props.addNewMovie(newMovie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      titleCheck: false,
      imgUrlCheck: false,
      imdbUrlCheck: false,
      imdbIdCheck: false,
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      titleCheck,
      imgUrlCheck,
      imdbUrlCheck,
      imdbIdCheck,
    } = this.state;

    return (
      <form
        className="Form"
        onSubmit={this.handleSubmit}
      >
        <input
          type="text"
          name="title"
          placeholder="Enter the title"
          className={classNames('Form__input', { 'Form__input-error': titleCheck })}
          value={title}
          onChange={this.handleChange}
        />
        <div className="Form__message">
          {titleCheck && (
            <p>
              *this field is required
            </p>
          )}
        </div>
        <textarea
          name="description"
          placeholder="Description"
          value={description}
          className="Form__textarea"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="imgUrl"
          placeholder="Enter the link of image"
          className={classNames('Form__input', { 'Form__input-error': imgUrlCheck })}
          value={imgUrl}
          onChange={this.handleChange}
        />
        <div className="Form__message">
          {imgUrlCheck && (
            <p>
              *this field is required
            </p>
          )}
        </div>
        <input
          type="text"
          name="imdbUrl"
          placeholder="Enter the link of IMDB"
          className={classNames('Form__input', { 'Form__input-error': imdbUrlCheck })}
          value={imdbUrl}
          onChange={this.handleChange}
        />
        <div className="Form__message">
          {imdbUrlCheck && (
            <p>
              *this field is required
            </p>
          )}
        </div>
        <input
          type="text"
          name="imdbId"
          placeholder="Enter the IMDB Id"
          className={classNames('Form__input', { 'Form__input-error': imdbIdCheck })}
          value={imdbId}
          onChange={this.handleChange}
        />
        <div className="Form__message">
          {imdbIdCheck && (
            <p>
              *this field is required
            </p>
          )}
        </div>
        <button
          type="submit"
          className="Form__button"
          disabled={titleCheck || imgUrlCheck || imdbUrlCheck || imdbIdCheck}
        >
          Add movie
        </button>
      </form>
    );
  }
}
