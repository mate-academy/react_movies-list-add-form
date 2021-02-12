import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isErrorIn: {
      title: false,
      description: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    },
  };

  setInputToState = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  }

  isUrlValid = (url) => {
    // eslint-disable-next-line max-len
    const urlValidity = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

    return urlValidity.test(url);
  }

  isCurrentInputValid = ({ target }) => {
    const { name } = target;

    switch (name) {
      case 'description': break;

      case 'title':
      case 'imdbId':
        this.setState(state => ({
          ...state,
          isErrorIn: {
            ...state.isErrorIn,
            [name]: state[name].trim().length === 0,
          },
        }));
        break;

      case 'imgUrl':
      case 'imdbUrl':
        this.setState(state => ({
          ...state,
          isErrorIn: {
            ...state.isErrorIn,
            [name]: !this.isUrlValid(state[name]),
          },
        }));
        break;

      default: break;
    }
  }

  isAllInputsFilled = () => {
    const { title, imgUrl, imdbUrl, imdbId } = this.state;

    if (title && imgUrl && imdbUrl && imdbId) {
      return true;
    }

    return false;
  }

  checkAllInputsValidity = () => {
    const { title, imgUrl, imdbUrl, imdbId } = this.state.isErrorIn;

    if (!title && !imgUrl && !imdbUrl && !imdbId && this.isAllInputsFilled()) {
      return true;
    }

    return false;
  }

  createNewMovieCard = () => {
    const movieCard = {};

    movieCard.title = this.state.title;
    movieCard.description = this.state.description;
    movieCard.imgUrl = this.state.imgUrl;
    movieCard.imdbUrl = this.state.imdbUrl;
    movieCard.imdbId = this.state.imdbId;

    return movieCard;
  }

  resetState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      isErrorIn: {
        title: false,
        description: false,
        imgUrl: false,
        imdbUrl: false,
        imdbId: false,
      },
    });
  }

  render() {
    const movieCardKeys = [
      'title', 'description', 'imgUrl', 'imdbUrl', 'imdbId',
    ];

    const { onAdd } = this.props;

    return (
      <form>
        {movieCardKeys.map((key) => {
          return (
            <>
              <label key={key}>
                <input
                  name={key}
                  value={this.state[key]}
                  placeholder={key}
                  className={this.state.isErrorIn[key] ? 'error' : null}
                  onChange={event => this.setInputToState(event)}
                  onBlur={event => this.isCurrentInputValid(event)}
                />
              </label>
              <p hidden={!this.state.isErrorIn[key]}>
                {`Please enter correct ${key}`}
              </p>
            </>
          );
        })}
        <button
          type="button"
          className={!this.checkAllInputsValidity() ? 'disabled' : null}
          disabled={!this.checkAllInputsValidity()}
          onClick={() => {
            onAdd(this.createNewMovieCard());
            this.resetState();
          }}
        >
          Add Movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
