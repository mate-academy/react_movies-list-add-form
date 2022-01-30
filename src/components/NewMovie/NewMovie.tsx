import React, { Component } from 'react';
import classNames from 'classnames';

import './NewMovie.scss';

type Props = {
  addMovie: (movie: Movie) => void;
};

type State = {
  title: string;
  messageTitle: string;
  description: string;
  imgUrl: string;
  messageImgUrl: string;
  imdbUrl: string;
  messageImdbUrl: string;
  imdbId: string;
  messageImdbId: string;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    messageTitle: '',
    description: '',
    imgUrl: '',
    messageImgUrl: '',
    imdbUrl: '',
    messageImdbUrl: '',
    imdbId: '',
    messageImdbId: '',
  };

  handleFormItemChange = (event: React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  handleOnBlurtTitle() {
    let messageTitle = '';

    if (!this.state.title) {
      messageTitle = 'Title required';
    }

    this.setState({
      messageTitle,
    });
  }

  handleOnBlurtImgUrl() {
    let messageImgUrl = '';

    if (!this.checkUrl(this.state.imgUrl)) {
      messageImgUrl = 'ImgUrl isn\'t valid';
    }

    if (!this.state.imgUrl) {
      messageImgUrl = 'ImgUrl required';
    }

    this.setState({
      messageImgUrl,
    });
  }

  handleOnBlurtImdbUrl() {
    let messageImdbUrl = '';

    if (!this.checkUrl(this.state.imdbUrl)) {
      messageImdbUrl = 'ImdbUrl isn\'t valid';
    }

    if (!this.state.imdbUrl) {
      messageImdbUrl = 'ImdbUrl required';
    }

    this.setState({
      messageImdbUrl,
    });
  }

  handleOnBlurtImdbId() {
    let messageImdbId = '';

    if (!this.state.imdbId) {
      messageImdbId = 'ImdbId required';
    }

    this.setState({
      messageImdbId,
    });
  }

  checkUrl = (url: string) => {
    const regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;

    return regex.test(url);
  };

  clearForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  onSubmitNewMovieForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const movie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    this.props.addMovie(movie);
    this.clearForm();
  };

  render() {
    const {
      title,
      messageTitle,
      description,
      imgUrl,
      messageImgUrl,
      imdbUrl,
      messageImdbUrl,
      imdbId,
      messageImdbId,
    } = this.state;

    const isFormValid = title && imgUrl && imdbUrl && imdbId && !messageTitle
      && !messageImgUrl && !messageImdbUrl && !messageImdbId;

    return (
      <form className="form" onSubmit={this.onSubmitNewMovieForm}>
        <div className="form__item">
          <label htmlFor="title-input">
            New movie title&nbsp;
            <input
              className={classNames('', { 'input-error': messageTitle })}
              name="title"
              type="text"
              id="title-input"
              placeholder="Enter title of movie here"
              value={title}
              onChange={this.handleFormItemChange}
              onBlur={this.handleOnBlurtTitle.bind(this)}
            />
            {messageTitle && (
              <div className="message-error">
                {messageTitle}
              </div>
            )}
          </label>
        </div>

        <div className="form__item">
          <label htmlFor="description-input">
            Description of new movie&nbsp;
            <textarea
              name="description"
              id="description-input"
              placeholder="Enter description of movie here"
              value={description}
              onChange={this.handleFormItemChange}
            />
          </label>
        </div>

        <div className="form__item">
          <label htmlFor="imgUrl-input">
            Link for avatar of movie&nbsp;
            <input
              className={classNames('', { 'input-error': messageImgUrl })}
              name="imgUrl"
              type="text"
              id="imgUrl-input"
              placeholder="Put link for avatar here"
              value={imgUrl}
              onChange={this.handleFormItemChange}
              onBlur={this.handleOnBlurtImgUrl.bind(this)}
            />
            {messageImgUrl && (
              <div className="message-error">
                {messageImgUrl}
              </div>
            )}
          </label>
        </div>

        <div className="form__item">
          <label htmlFor="imdbUrl-input">
            Link for movie from IMDb&nbsp;
            <input
              className={classNames('', { 'input-error': messageImdbUrl })}
              name="imdbUrl"
              type="text"
              id="imdbUrl-input"
              placeholder="Put link of movie from IMDb here"
              value={imdbUrl}
              onChange={this.handleFormItemChange}
              onBlur={this.handleOnBlurtImdbUrl.bind(this)}
            />
            {messageImdbUrl && (
              <div className="message-error">
                {messageImdbUrl}
              </div>
            )}
          </label>
        </div>

        <div className="form__item">
          <label htmlFor="imdbId-input">
            ID from Internet Movie Database&nbsp;
            <input
              className={classNames('', { 'input-error': messageImdbId })}
              name="imdbId"
              type="text"
              id="imdbId-input"
              placeholder="Enter id of movie from IMDb here"
              value={imdbId}
              onChange={this.handleFormItemChange}
              onBlur={this.handleOnBlurtImdbId.bind(this)}
            />
            {messageImdbId && (
              <div className="message-error">
                {messageImdbId}
              </div>
            )}
          </label>
        </div>

        <button
          className="form__item"
          type="submit"
          disabled={!isFormValid}
        >
          Add new movie
        </button>
      </form>
    );
  }
}
