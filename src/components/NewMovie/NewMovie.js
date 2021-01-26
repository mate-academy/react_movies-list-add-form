import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    movie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    errors: {
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },
    isDisabled: true,
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, imgUrl, imdbUrl, imdbId } = this.state.movie;

    const validation = this.linkValidation;

    const validImgUrl = validation(imgUrl);
    const validImdbUrl = validation(imdbUrl);

    if (!title || !validImgUrl || !validImdbUrl || !imdbId) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          title: !title,
          imgUrl: !validImgUrl,
          imdbUrl: !validImdbUrl,
          imdbId: !imdbId,
        },
      }));

      return;
    }

    this.props.addMovie(this.state.movie);

    this.setState({
      movie: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
      isDisabled: true,
    });
  }

  settingInfo = (event) => {
    const { name, value } = event.target;

    this.setState(state => ({
      movie: {
        ...state.movie,
        [name]: value.replace(/\s{2,}/g, ' '),
      },
      errors: {
        ...state.errors,
        [name]: false,
      },
      isDisabled: false,
    }));
  }

  linkValidation = (link) => {
    // eslint-disable-next-line
    return link.match(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);
  };

  render() {
    const { movie, errors, isDisabled } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h2 className="form__heading">Add new film to collection:</h2>
        <br />
        <div className="form__field">
          <div className="field__element element">
            <label htmlFor="inputTitle" className="text__input">
              Title:
            </label>

            <input
              type="text"
              name="title"
              value={movie.title}
              onChange={this.settingInfo}
              className={classNames('element__input',
                { 'element__input--invalid': errors.title })
              }
              id="inputTitle"
              placeholder="Type title here"
            />

            {errors.title
              // eslint-disable-next-line
              && <span className="element__alert">Please fill this section</span>}
          </div>

          <div className="field__element element">
            <label htmlFor="inputDescription" className="text__input">
              Description:
            </label>

            <textarea
              type="text"
              name="description"
              value={movie.description}
              onChange={this.settingInfo}
              className="element__input"
              id="inputDescription"
              placeholder="Type description here"
            />
          </div>

          <div className="field__element element">
            <label htmlFor="inputImgUrl" className="text__input">
              Image url:
            </label>

            <input
              type="text"
              name="imgUrl"
              value={movie.imgUrl}
              onChange={this.settingInfo}
              className={classNames('element__input',
                { 'element__input--invalid': errors.imgUrl })
              }
              id="inputImgUrl"
              placeholder="Type image url here"
            />

            {errors.imgUrl
              // eslint-disable-next-line
              && <span className="element__alert">Please correctly fill this section</span>}
          </div>

          <div className="field__element element">
            <label htmlFor="inputImdbUrl" className="text__input">
              IMDb url:
            </label>

            <input
              type="text"
              name="imdbUrl"
              value={movie.imdbUrl}
              onChange={this.settingInfo}
              id="inputImdbUrl"
              className={classNames('element__input',
                { 'element__input--invalid': errors.imdbUrl })
              }
              placeholder="Type IMDb url here"
            />

            {errors.imdbUrl
              // eslint-disable-next-line
              && <span className="element__alert">Please correctly fill this section</span>}
          </div>

          <div className="field__element element">
            <label htmlFor="inputImdbId" className="text__input">
              IMDb ID:
            </label>

            <input
              type="text"
              name="imdbId"
              value={movie.imdbId}
              onChange={this.settingInfo}
              className={classNames('element__input',
                { 'element__input--invalid': errors.imdbId })
              }
              id="inputImdbId"
              placeholder="Type IMDb ID here"
            />

            {errors.imdbId
              // eslint-disable-next-line
              && <span className="element__alert">Please fill this section</span>}
          </div>

          <button
            type="submit"
            className="button"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
