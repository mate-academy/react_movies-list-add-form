import React, { Component } from 'react';
import PropTypes from 'prop-types';

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach((val) => {
    val === '' && (valid = false);
  });

  return valid;
};

export class NewMovie extends Component {
  static propTypes = {
    addMovie: PropTypes.func.isRequired,
  }

  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    formErrors: {
      title: '',
      imgUrl: '',
      imdbId: '',
      imdbUrl: '',
      isEmpty: false,
    },

  };

  handleInput = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    if (formValid(this.state)) {
      this.props.addMovie({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });

      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
    } else {
      this.setState(prevState => ({
        formErrors: {
          ...prevState.formErrors,
          isEmpty: true,
        },
      }));
    }
  }

  handleFocus = (e) => {
    const { name } = e.target;
    const { formErrors } = this.state;

    this.setState(prevState => ({
      formErrors: {
        ...prevState.formErrors,
        isEmpty: false,
      },
    }));

    if (formErrors[name].length > 0) {
      this.setState(prevState => ({
        formErrors: {
          ...prevState.formErrors,
          [name]: '',
        },
      }));
    }
  }

  handleBlur = (e) => {
    const { value, name } = e.target;

    if (name === 'title'
      || name === 'imdbUrl'
      || name === 'imdbId') {
      if (value.length < 3) {
        this.setState(prevState => ({
          formErrors: {
            ...prevState.formErrors,
            [name]: 'minimum 3 characaters required',
          },
        }));
      }
    }

    if (name === 'imgUrl') {
      /* eslint-disable-next-line */
      if (!value.match(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/)) {
        this.setState(prevState => ({
          formErrors: {
            ...prevState.formErrors,
            [name]: 'not valid URL',
          },
        }));
      }
    }
  }

  render() {
    const { title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      formErrors } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        {formErrors.isEmpty
        && (<span className="errorText">Some required fields are empty</span>)}
        <label>
          Title:
          <input
            className={formErrors.title.length > 0 ? 'input error' : 'input'}
            type="text"
            name="title"
            value={title}
            onChange={this.handleInput}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
          />
          {formErrors.title.length > 0 && (
            <span className="errorText">{formErrors.title}</span>
          )}
        </label>
        <label>
           Description:
          <input
            className="input"
            type="text"
            name="description"
            value={description}
            onChange={this.handleInput}
          />
        </label>
        <label>
          Image URL:
          <input
            className={formErrors.imgUrl.length > 0 ? 'input error' : 'input'}
            type="text"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleInput}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
          />
          {formErrors.imgUrl.length > 0 && (
            <span className="errorText">{formErrors.imgUrl}</span>
          )}
        </label>
        <label>
          Imdb URL:
          <input
            className={formErrors.imdbUrl.length > 0 ? 'input error' : 'input'}
            type="text"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleInput}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
          />
          {formErrors.imdbUrl.length > 0 && (
            <span className="errorText">{formErrors.imdbUrl}</span>
          )}
        </label>
        <label>
          Imdb Id:
          <input
            className={formErrors.imdbId.length > 0 ? 'input error' : 'input'}
            type="text"
            name="imdbId"
            value={imdbId}
            onChange={this.handleInput}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
          />
          {formErrors.imdbId.length > 0 && (
            <span className="errorText">{formErrors.imdbId}</span>
          )}
        </label>
        <button className="button" type="submit">Add Movie</button>
      </form>
    );
  }
}
