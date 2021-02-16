import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';

const movieCardFields = [
  'title', 'description', 'imgUrl', 'imdbUrl', 'imdbId',
];

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
    isFormValid: true,
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

    if (title.length && imgUrl.length && imdbUrl.length && imdbId.length) {
      return true;
    }

    return false;
  }

  isAllInputsValid = () => {
    const { title, imgUrl, imdbUrl, imdbId } = this.state.isErrorIn;

    if (!title && !imgUrl && !imdbUrl && !imdbId) {
      return true;
    }

    return false;
  }

  isFormValid = () => {
    if (this.isAllInputsValid() && this.isAllInputsFilled()) {
      this.setState({ isFormValid: true });

      return true;
    }

    this.setState({ isFormValid: false });

    return false;
  }

  showErrors =() => {
    if (this.state.isFormValid) {
      const fields = movieCardFields.filter(field => field !== 'description');

      fields.forEach((field) => {
        if (!this.state[field].length && !this.state.isErrorIn[field]) {
          this.setState(state => ({
            ...state,
            isErrorIn: {
              ...state.isErrorIn,
              [field]: true,
            },
          }));
        }
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { onAdd } = this.props;

    if (this.isFormValid()) {
      onAdd(this.createNewMovieCard());
      this.resetState();
    } else {
      this.showErrors();
    }
  }

  createNewMovieCard = () => {
    return {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imgUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    };
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
      isFormValid: true,
    });
  }

  render() {
    return (
      <form>
        {movieCardFields.map((field) => {
          return (
            <div key={field}>
              <label>
                <input
                  name={field}
                  value={this.state[field]}
                  placeholder={field}
                  className={this.state.isErrorIn[field] ? 'error' : null}
                  onChange={(event) => {
                    this.setInputToState(event);
                  }}
                  onBlur={(event) => {
                    this.isCurrentInputValid(event);
                  }}
                />
              </label>
              <p hidden={!this.state.isErrorIn[field]}>
                {`Please enter correct ${field}`}
              </p>
            </div>
          );
        })}
        <button
          type="submit"
          className={!this.isAllInputsValid() ? 'disabled' : null}
          disabled={!this.isAllInputsValid()}
          onClick={(event) => {
            this.handleSubmit(event);
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
