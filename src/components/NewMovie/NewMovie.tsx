import React, { Component } from 'react';
import classNames from 'classnames';
import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void,
};

type State = {
  title?: string,
  description?: string,
  imgUrl?: string,
  imdbUrl?: string,
  imdbId?: string,
  showErrorTitle?: boolean,
  showErrorImgUrl?: boolean,
  showErrorImdbUrl?: boolean,
  showErrorImdbId?: boolean,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    showErrorTitle: false,
    showErrorImgUrl: false,
    showErrorImdbUrl: false,
    showErrorImdbId: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;

    // eslint-disable-next-line no-console
    console.log(name, value.length, value);

    const nameErrorFlag = `showError${name[0].toUpperCase() + name.slice(1)}`;
    const showErrorFlag = !value.length;

    this.setState({
      [name]: value,
      [nameErrorFlag]: showErrorFlag,
    });
  };

  handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    if (!title) {
      this.setState({ showErrorTitle: true });
    }

    if (!imgUrl) {
      this.setState({ showErrorImgUrl: true });
    }

    if (!imdbUrl) {
      this.setState({ showErrorImdbUrl: true });
    }

    if (!imdbId) {
      this.setState({ showErrorImdbId: true });
    }

    if (!title || !description || !imgUrl || !imdbUrl || !imdbId) {
      return;
    }

    this.props.addMovie(this.state);

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
      showErrorTitle,
      showErrorImgUrl,
      showErrorImdbUrl,
      showErrorImdbId,
    } = this.state;

    return (
      <div>
        <form
          className="form "
          onSubmit={this.handleSubmit}
        >
          <div className="form__item">
            <h1 className="error">{showErrorTitle && 'title is not correct'}</h1>
            <input
              className={classNames(
                'form__input',
                'card',
                (showErrorTitle && 'form__input--error'),
              )}
              name="title"
              type="text"
              placeholder="Please input title"
              value={title}
              onChange={(event) => this.handleChange(event)}
            />
          </div>
          <div className="form__item">
            <textarea
              className="form__input form__input--description card"
              name="description"
              placeholder="Please input description"
              value={description}
              onChange={this.handleChange}
            />
          </div>
          <div className="form__item">
            <h1 className="error">{showErrorImgUrl && 'ImgUrl is not correct'}</h1>
            <input
              className={classNames(
                'form__input',
                'card',
                (showErrorTitle && 'form__input--error'),
              )}
              name="imgUrl"
              type="text"
              placeholder="Please input imgUrl"
              value={imgUrl}
              onChange={this.handleChange}
            />
          </div>
          <div className="form__item">
            <h1 className="error">{showErrorImdbUrl && 'imdbUrl is not correct'}</h1>
            <input
              className={classNames(
                'form__input',
                'card',
                (showErrorTitle && 'form__input--error'),
              )}
              name="imdbUrl"
              type="text"
              placeholder="Please input imdbUrl"
              value={imdbUrl}
              onChange={this.handleChange}
            />
          </div>
          <div className="form__item">
            <h1 className="error">{showErrorImdbId && 'imdbId is not correct'}</h1>
            <input
              className={classNames(
                'form__input',
                'card',
                (showErrorTitle && 'form__input--error'),
              )}
              name="imdbId"
              type="text"
              placeholder="Please input imdbId"
              value={imdbId}
              onChange={this.handleChange}
            />
          </div>
          <button
            className="form__button"
            type="submit"
            disabled={
              showErrorTitle
              || showErrorImgUrl
              || showErrorImdbUrl
              || showErrorImdbId
            }
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}
