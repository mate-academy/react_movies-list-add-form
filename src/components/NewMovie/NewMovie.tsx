import { Component } from 'react';
import classNames from 'classnames';

import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void;
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  errors: Errors,
};

type Errors = {
  title: boolean,
  description: boolean,
  imgUrl: boolean,
  imdbUrl: boolean,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    errors: {
      title: false,
      description: false,
      imgUrl: false,
      imdbUrl: false,
    },
  };

  getImdbId = (imdbLink: string) => {
    const lastSlashIndex: number = imdbLink.lastIndexOf('/');

    return imdbLink.slice(lastSlashIndex + 1);
  };

  onAdd = (event: any) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    if (!title || !description || !imgUrl || !imdbUrl) {
      this.setState((state => ({
        ...state,
        errors: {
          title: !state.title,
          description: !state.description,
          imgUrl: !state.imgUrl,
          imdbUrl: !state.imdbUrl,
        },
      })));

      return;
    }

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.addMovie(newMovie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      errors: {
        title: false,
        description: false,
        imgUrl: false,
        imdbUrl: false,
      },
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
    } = this.state.errors;

    return (
      <form className="form">
        <input
          type="text"
          placeholder="Write title here"
          className={classNames({ 'form__error-field': title })}
          value={this.state.title}
          onChange={(event) => {
            this.setState(state => ({
              title: event.target.value,
              errors: {
                ...state.errors,
                title: false,
              },
            }));
          }}
        />
        {title && <span className="form__error-text">Enter title please</span>}
        <textarea
          placeholder="Write describe here"
          className={classNames({ 'form__error-field': description })}
          value={this.state.description}
          onChange={(event) => {
            this.setState(state => ({
              description: event.target.value,
              errors: {
                ...state.errors,
                description: false,
              },
            }));
          }}
        />
        {description && <span className="form__error-text">Enter description please</span>}
        <input
          placeholder="Insert image link here"
          className={classNames({ 'form__error-field': imgUrl })}
          value={this.state.imgUrl}
          onChange={(event) => {
            this.setState(state => ({
              imgUrl: event.target.value,
              errors: {
                ...state.errors,
                imgUrl: false,
              },
            }));
          }}
        />
        {imgUrl && <span className="form__error-text">insert image please</span>}
        <input
          placeholder="Insert imdb link here"
          className={classNames({ 'form__error-field': imdbUrl })}
          value={this.state.imdbUrl}
          onChange={(event) => {
            this.setState(state => ({
              imdbUrl: event.target.value,
              imdbId: this.getImdbId(event.target.value),
              errors: {
                ...state.errors,
                imdbUrl: false,
              },
            }));
          }}
        />
        {imdbUrl && <span className="form__error-text">insert imdb link please</span>}
        <button
          type="submit"
          onClick={(event) => this.onAdd(event)}
        >
          Add movie
        </button>
      </form>
    );
  }
}
