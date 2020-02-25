import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewMovie.scss';

const pattern = new RegExp(`^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?`
    + `[A-Za-z0-9.-]+|(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)((?:\\/`
    + `[+~%/.\\w-_]*)?\\??(?:[-+=&;%@.\\w_]*)#?(?:[.!/\\\\\\w]*))?)$`, 'gim');

export class NewMovie extends Component {
  state = {
    validation: {
      titleIsValid: true,
      imgUrlIsValid: true,
      imdbUrlIsValid: true,
      imdbIdIsValid: true,
    },
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  onSubmit = (event) => {
    event.preventDefault();

    if (!this.state.title.trim()
      || !this.state.imdbId.trim()
      || !this.state.imgUrl.trim().match(pattern)
      || !this.state.imdbUrl.trim().match(pattern)
    ) {
      return;
    }

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    this.props.onAdd({
      title: title.trim(),
      description: description.trim(),
      imgUrl,
      imdbUrl,
      imdbId: imdbId.trim(),
    });

    this.setState({
      validation: {
        titleIsValid: true,
        imgUrlIsValid: true,
        imdbUrlIsValid: true,
        imdbIdIsValid: true,
      },
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  inputChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  }

  inputBlur = (event) => {
    const { name } = event.target;

    this.setState(prevState => ({
      validation: {
        ...prevState.validation,
        [`${name}IsValid`]: prevState[name].trim(),
      },
    }));
  }

  inputFilteredBlur = (event) => {
    const { name } = event.target;

    this.setState(prevState => ({
      validation: {
        ...prevState.validation,
        [`${name}IsValid`]: prevState[name].trim().match(pattern),
      },
    }));
  }

  render() {
    const { title,
      description,
      imgUrl,
      imdbUrl,
      imdbId } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <div className="fieldWraper">
          <label
            className={this.state.validation.titleIsValid ? '' : 'error'}
          >
            Movie title:
            <input
              type="text"
              placeholder="title"
              value={title}
              size="40"
              name="title"
              onChange={this.inputChange}
              className={this.state.validation.titleIsValid
                ? ''
                : 'error-border'
              }
              onBlur={this.inputBlur}
            />
          </label>
        </div>
        <div className="fieldWraper">
          <label>
            Description movie:
            <textarea
              name="description"
              imdbId
              placeholder="Description movie"
              rows="10"
              cols="40"
              onChange={this.inputChange}
              value={description}
            />
          </label>
        </div>
        <div className="fieldWraper">
          <label
            className={this.state.validation.imgUrlIsValid ? '' : 'error'}
          >
            ImgUrl:
            <textarea
              name="imgUrl"
              placeholder="ImgUrl movie"
              rows="4"
              cols="40"
              onChange={this.inputChange}
              onBlur={this.inputFilteredBlur}
              value={imgUrl}
              className={this.state.validation.imgUrlIsValid
                ? ''
                : 'error-border'
              }
            />
          </label>
        </div>
        <div className="fieldWraper">
          <label
            className={this.state.validation.imdbUrlIsValid ? '' : 'error'}
          >
            ImdbUrl:
            <textarea
              name="imdbUrl"
              placeholder="ImdbUrl movie"
              rows="2"
              cols="40"
              onChange={this.inputChange}
              onBlur={this.inputFilteredBlur}
              value={imdbUrl}
              className={this.state.validation.imdbUrlIsValid
                ? ''
                : 'error-border'
              }
            />
          </label>
        </div>
        <div className="fieldWraper">
          <label
            className={this.state.validation.imdbIdIsValid ? '' : 'error'}
          >
            ImdbId:
            <input
              name="imdbId"
              type="text"
              placeholder="ImdbId movie"
              value={imdbId}
              size="40"
              onChange={this.inputChange}
              onBlur={this.inputBlur}
              className={this.state.validation.imdbIdIsValid
                ? ''
                : 'error-border'
              }
            />
          </label>
        </div>
        <button
          type="submit"
          /*          disabled={!(this.state.validation.titleIsValid
            && this.state.validation.imgUrlIsValid
            && this.state.validation.imdbUrlIsValid
            && this.state.validation.imdbIdIsValid)} */
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
