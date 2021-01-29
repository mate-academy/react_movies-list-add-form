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
  };

  clearForm() {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
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

  render() {
    const { onAdd } = this.props;
    const { title, description, imgUrl, imdbUrl, imdbId,
      inputTitle, inputImdbId } = this.state;

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
            className="form__input"
            onChange={(e) => {
              this.setState({
                imgUrl: e.target.value,
              });
            }}
            onBlur={(e) => {
              this.validateInput(e);
            }}
          />
        </label>

        <label className="form__label">
          <input
            type="text"
            placeholder="IMDB url"
            value={imdbUrl}
            name="inputImdbUrl"
            data-valid="correctDataBaseUrl"
            className="form__input"
            onChange={(e) => {
              this.setState({
                imdbUrl: e.target.value,
              });
            }}
            onBlur={(e) => {
              this.validateInput(e);
            }}
          />
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
              this.validateInput(e);
            }}
          />
          {inputImdbId
            && <p className="form__error">Please, enter the IMBD id</p>}
        </label>

        <button
          className="form__button"
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
