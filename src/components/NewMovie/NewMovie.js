import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    inputTitle: false,
    inputImdbId: false,
    correctImageUrl: false,
    correctDataBaseUrl: false,
    disabledButton: true,
  };

  clearForm() {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      disabledButton: true,
    });
  }

  validateInput(e) {
    const { name } = e.target;

    if (e.target.value.length < 3) {
      this.setState({
        [name]: true,
      });
    } else {
      this.setState({
        [name]: false,
      });
    }
  }

  checkFormCorrect() {
    const { title, imgUrl, imdbUrl, imdbId, inputTitle,
      correctImageUrl, correctDataBaseUrl, inputImdbId } = this.state;

    const noEmptyInputs = title.length > 0 && imgUrl.length > 0
    && imdbUrl.length > 0 && imdbId.length > 0;

    const noErrorMessages = !inputTitle && !correctImageUrl
    && !correctDataBaseUrl && !inputImdbId;

    if (noErrorMessages && noEmptyInputs) {
      this.setState({
        disabledButton: false,
      });
    } else {
      this.setState({
        disabledButton: true,
      });
    }
  }

  checkUrlCorrect(e) {
    const { valid } = e.target.dataset;

    // eslint-disable-next-line
    if (/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/.test(e.target.value)) {
      this.setState({
        [valid]: false,
      });
    } else {
      this.setState({
        [valid]: true,
      });
    }
  }

  render() {
    const { onAdd } = this.props;
    const { title, description, imgUrl, imdbUrl, imdbId,
      inputTitle, inputImdbId,
      disabledButton, correctImageUrl, correctDataBaseUrl } = this.state;

    return (
      <form
        method="POST"
        action="/api/Movies"
        className="form"
        onSubmit={(e) => {
          const movie = {
            title,
            description,
            imgUrl,
            imdbUrl,
            imdbId,
          };

          onAdd(e, movie);
          this.clearForm();
        }}
      >
        <label className="form__label">
          <input
            type="text"
            placeholder="Title"
            name="inputTitle"
            value={title}
            className={classNames('form__input', {
              'form__input--error': inputTitle,
            })}
            onChange={(e) => {
              this.setState({
                title: e.target.value,
              });
            }}
            onBlur={(e) => {
              this.checkFormCorrect();
              this.validateInput(e);
            }}
          />
          {inputTitle
          && <p className="form__error">Please, enter the title</p>}
        </label>

        <label className="form__label">
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={description}
            className="form__input"
            onChange={(e) => {
              this.setState({
                description: e.target.value,
              });
            }}
          />
        </label>

        <label className="form__label">
          <input
            type="text"
            placeholder="image url"
            name="inputImgUrl"
            data-valid="correctImageUrl"
            value={imgUrl}
            className={classNames('form__input', {
              'form__input--error': correctImageUrl,
            })}
            onChange={(e) => {
              this.setState({
                imgUrl: e.target.value,
              });
            }}
            onBlur={(e) => {
              this.checkFormCorrect();
              this.validateInput(e);
              this.checkUrlCorrect(e);
            }}
          />
          {correctImageUrl
          && <p className="form__error">URL should be correct</p>}

        </label>

        <label className="form__label">
          <input
            type="text"
            placeholder="IMDB url"
            value={imdbUrl}
            name="inputImdbUrl"
            data-valid="correctDataBaseUrl"
            className={classNames('form__input', {
              'form__input--error': correctDataBaseUrl,
            })}
            onChange={(e) => {
              this.setState({
                imdbUrl: e.target.value,
              });
            }}
            onBlur={(e) => {
              this.checkFormCorrect();
              this.validateInput(e);
              this.checkUrlCorrect(e);
            }}
          />
          {correctDataBaseUrl
          && <p className="form__error">URL should be correct</p>}

        </label>

        <label className="form__label">
          <input
            type="text"
            placeholder="IMDB id"
            value={imdbId}
            name="inputImdbId"
            className={classNames('form__input', {
              'form__input--error': inputImdbId,
            })}
            onChange={(e) => {
              this.setState({
                imdbId: e.target.value,
              });
            }}
            onBlur={(e) => {
              this.checkFormCorrect();
              this.validateInput(e);
            }}
          />
          {inputImdbId
            && <p className="form__error">Please, enter the IMBD id</p>}
        </label>

        <button
          className="form__button"
          disabled={disabledButton}
          type="submit"
        >
          Add new movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
