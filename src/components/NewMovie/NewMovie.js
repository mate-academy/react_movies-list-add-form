import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';
import classNames from 'classnames/bind';

const startValues = {
  title: {
    value: '',
    isValid: null,
    name: 'title',
  },
  description: {
    value: '',
    isValid: true,
    name: 'description',
  },
  imgUrl: {
    value: '',
    isValid: null,
    name: 'imgUrl',
  },
  imdbUrl: {
    value: '',
    isValid: null,
    name: 'imdbUrl',
  },
  imdbId: {
    value: '',
    isValid: null,
    name: 'imdbId',
  },
};

export class NewMovie extends Component {
  state = {
    formValues: { ...startValues },
    sendCheck: false,
  };

  updateValue = (event) => {
    const { target } = event;

    this.changeState(target.id, 'value', target.value);
  };

  changeState = (propertie1, propertie2, value) => {
    this.setState(prevState => ({
      formValues: {
        ...prevState.formValues,
        [propertie1]: {
          ...prevState.formValues[propertie1],
          [propertie2]: value,
        },
      },
      sendCheck: false,
    }));
  };

  validationForm = (event) => {
    const { target } = event;

    if (
      (target.id === 'title' || target.id === 'imdbId')
      && target.value.length < 1
    ) {
      this.changeState(target.id, 'isValid', false);

      return false;
    }

    if (target.id === 'imgUrl' || target.id === 'imdbUrl') {
      // eslint-disable-next-line max-len
      const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

      if (!pattern.test(target.value)) {
        this.changeState(target.id, 'isValid', false);

        return false;
      }
    }

    this.changeState(target.id, 'isValid', true);

    return true;
  };

  SendMovie = (event) => {
    const acceptSend = Object.values(this.state.formValues)
      .every(value => value.isValid === true);

    this.setState({
      sendCheck: true,
    });

    if (acceptSend) {
      const sendMovie = Object.entries(this.state.formValues)
        .reduce((acc, current) => {
          return {
            ...acc,
            [current[0]]: current[1].value,
          };
        }, {});

      this.props.addMovie(sendMovie);
      this.setState({
        formValues: startValues,
        sendCheck: false,
      });
    }
  };

  render() {
    const { formValues, sendCheck } = this.state;

    return (
      <form>

        <div className="movie-form-wrapper">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className={
              classNames(
                'movie-form-item',
                'movie-form-title',
                { isValid: formValues.title.isValid === false },
              )
            }
            id="title"
            value={formValues.title.value}
            onChange={this.updateValue}
            onBlur={this.validationForm}
          />
        </div>

        <div className="movie-form-wrapper">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            className={
              classNames(
                'movie-form-item',
                'movie-form-description',
                { isValid: formValues.description.isValid === false },
              )
            }
            id="description"
            value={formValues.description.value}
            onChange={this.updateValue}
            onBlur={this.validationForm}
          />
        </div>

        <div className="movie-form-wrapper">
          <label htmlFor="imgUrl">imgUrl</label>
          <input
            type="text"
            className={
              classNames(
                'movie-form-item',
                'movie-form-imgUrl',
                { isValid: formValues.imgUrl.isValid === false },
              )
            }
            id="imgUrl"
            value={formValues.imgUrl.value}
            onChange={this.updateValue}
            onBlur={this.validationForm}
          />
        </div>

        <div className="movie-form-wrapper">
          <label htmlFor="imdbUrl">imdbUrl</label>
          <input
            type="text"
            className={
              classNames(
                'movie-form-item',
                'movie-form-imdbUrl',
                { isValid: formValues.imdbUrl.isValid === false },
              )
            }
            id="imdbUrl"
            value={formValues.imdbUrl.value}
            onChange={this.updateValue}
            onBlur={this.validationForm}
          />
        </div>

        <div className="movie-form-wrapper">
          <label htmlFor="imdbId">imdbId</label>
          <input
            type="text"
            className={
              classNames(
                'movie-form-item',
                'movie-form-imdbId',
                { isValid: formValues.imdbId.isValid === false },
              )
            }
            id="imdbId"
            value={formValues.imdbId.value}
            onChange={this.updateValue}
            onBlur={this.validationForm}
          />
        </div>

        <button
          className="add-new-movie-btn"
          type="button"
          onClick={this.SendMovie}
        >
          Add new movie
        </button>

        {
          sendCheck
            ? (
              Object.values(formValues)
                .filter(formItem => (
                  formItem.isValid === false || formItem.isValid === null
                ))
                .map(item => (
                  <p key={item.name} className="error-form-submit">
                    {item.name}
                    {' is inValid'}
                  </p>
                ))
            )
            : null
        }
      </form>

    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
