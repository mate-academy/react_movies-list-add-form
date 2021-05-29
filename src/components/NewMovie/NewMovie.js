import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: {
      value: '', isError: true,
    },
    imgUrl: {
      value: '', isError: true,
    },
    imdbUrl: {
      value: '', isError: true,
    },
    imdbId: {
      value: '', isError: true,
    },
    description: {
      value: '', isError: true,
    },
  };

  isBtnVisiable = () => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,

    } = this.state;

    return [title, description, imgUrl, imdbUrl, imdbId].some(movie => (
      movie.value === ''
    ));
  };

  handlerEvent = (event) => {
    const { name, value } = event.target;
    // eslint-disable-next-line
    const regExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/ 
    const { listOfId } = this.props;

    if (value.length !== 0) {
      this.setState({
        [name]: {
          value,
          isError: true,
        },
      });
    }

    if (value.length === 0) {
      this.setState({
        [name]: {
          value,
          isError: false,
        },
      });
    }

    if (name === 'imgUrl' || name === 'imdbUrl') {
      this.setState(state => ({
        [name]: {
          ...state[name],
          value,
          isError: regExp.test(value),
        },
      }));
    }

    if (name === 'imdbId' && value !== '') {
      this.setState(state => ({
        [name]: {
          ...state[name],
          value,
          isError: !listOfId.includes(value),
        },
      }));
    }
  }

  handlerSubmit = (event) => {
    const { onSubmit } = this.props;
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,

    } = this.state;

    event.preventDefault();

    onSubmit({
      title: title.value,
      description: description.value,
      imgUrl: imgUrl.value,
      imdbUrl: imdbUrl.value,
      imdbId: imdbId.value,

    });

    this.setState({
      title: {
        value: '', isError: true,
      },
      imgUrl: {
        value: '', isError: true,
      },
      imdbUrl: {
        value: '', isError: true,
      },
      imdbId: {
        value: '', isError: true,
      },
      description: {
        value: '', isError: false,
      },
    });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (

      <form
        onSubmit={this.handlerSubmit}
      >

        <ul className="form">

          <li className="form__li">
            {/* eslint-disable-next-line  */}
            <label className="form__label">
              Title:
              <span className="required">*</span>
            </label>
            <input
              value={title.value}
              type="text"
              name="title"
              className={
                classNames('form__input', { form__required: !title.isError })
              }
              placeholder="Enter a film title"
              onChange={this.handlerEvent}
            />
            {
              !title.isError
                && <span className="form__error">*Enter valid data</span>
            }
          </li>

          <li className="form__li">
            {/* eslint-disable-next-line  */}
            <label className="form__label">
              ImgUrl:
              <span className="required">*</span>
            </label>
            <input
              value={imgUrl.value}
              type="text"
              name="imgUrl"
              className={
                classNames('form__input', { form__required: !imgUrl.isError })
              }
              placeholder="Enter a image url"
              onChange={this.handlerEvent}
            />
            {!imgUrl.isError
              && <span className="form__error">*Enter valid data</span>
            }
          </li>

          <li className="form__li">
            {/* eslint-disable-next-line  */}
            <label className="form__label">
              imdbUrl:
              <span className="required">*</span>
            </label>
            <input
              value={imdbUrl.value}
              type="text"
              name="imdbUrl"
              className={
                classNames('form__input', { form__required: !imdbUrl.isError })
              }
              placeholder="Enter a imdb url"
              onChange={this.handlerEvent}
            />
            {!imdbUrl.isError
              && <span className="form__error">*Enter valid data</span>
            }
          </li>

          <li className="form__li">
            {/* eslint-disable-next-line  */}
            <label className="form__label">
              imdbId:
              <span className="required">*</span>
            </label>
            <input
              value={imdbId.value}
              type="text"
              name="imdbId"
              className={
                classNames('form__input', { form__required: !imdbId.isError })
              }
              placeholder="Enter a imdb Id"
              onChange={this.handlerEvent}
            />
            {!imdbId.isError
              && <span className="form__error">*Enter valid data</span>
              }
          </li>

          <li className="form__li">
            {/* eslint-disable-next-line  */}
            <label className="form__label">
              Description:
            </label>
            <textarea
              value={description.value}
              name="description"
              className="form__input textarea"
              onChange={this.handlerEvent}
            />
          </li>

          <li className="form__li">
            <input
              type="submit"
              className="form__submit"
              value="Submit"
              disabled={this.isBtnVisiable()}
            />
          </li>

        </ul>

      </form>
    );
  }
}

NewMovie.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  listOfId: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
