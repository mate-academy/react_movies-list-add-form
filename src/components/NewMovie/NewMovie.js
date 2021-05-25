import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input/Input';
import './NewMovie.scss';
import { urlRegexp } from './regexpUrl';

export class NewMovie extends Component {
  state = {
    title: {
      value: '', isError: true, isErrorVisible: false, isRequired: true,
    },
    description: {
      value: '', isError: false, isErrorVisible: false, isRequired: false,
    },
    imgUrl: {
      value: '', isError: true, isErrorVisible: false, isRequired: true,
    },
    imdbUrl: {
      value: '', isError: true, isErrorVisible: false, isRequired: true,
    },
    imdbId: {
      value: '', isError: true, isErrorVisible: false, isRequired: true,
    },
  };

  componentDidMount() {
    this.initialState = this.state;
  }

  allFieldGood = () => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return [title, description, imgUrl, imdbUrl, imdbId].some(movie => (
      movie.isError
    ));
  };

  changeHandler = (event) => {
    const { name, value } = event.target;
    let isError = false;

    switch (name) {
      case 'imgUrl':
      case 'imdbUrl':
        isError = !urlRegexp.test(value);
        break;
      case 'imdbId':
        isError = this.props.idList.includes(value);
        break;
      default:
    }

    if (value.length === 0 && this.state[name].isRequired) {
      isError = true;
    }

    this.setState(state => ({
      [name]: {
        ...state[name],
        value,
        isError,
      },
    }));
  };

  focusOutHandler = (event) => {
    const { name } = event.target;

    this.setState(state => ({
      [name]: {
        ...state[name],
        isErrorVisible: true,
      },
    }));
  };

  submitHandler = (event) => {
    const { onAdd } = this.props;
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    event.preventDefault();
    this.setState(this.initialState);

    onAdd(new Movie(
      title.value,
      description.value,
      imgUrl.value,
      imdbUrl.value,
      imdbId.value,
    ));
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form onSubmit={event => this.submitHandler(event)}>
        <Input
          value={title.value}
          name="title"
          placeholder="Title"
          isError={title.isErrorVisible && title.isError}
          onChange={this.changeHandler}
          onFocus={this.focusOutHandler}
          errorMes="this field is required"
        />
        <Input
          value={description.value}
          name="description"
          placeholder="Description"
          isError={description.isErrorVisible && description.isError}
          onChange={this.changeHandler}
          onFocus={this.focusOutHandler}
          errorMes="this field is required"
        />
        <Input
          value={imgUrl.value}
          name="imgUrl"
          placeholder="ImgUrl"
          isError={imgUrl.isErrorVisible && imgUrl.isError}
          onChange={this.changeHandler}
          onFocus={this.focusOutHandler}
          errorMes="this field is required and must place URL"
        />
        <Input
          value={imdbUrl.value}
          name="imdbUrl"
          placeholder="imdbUrl"
          isError={imdbUrl.isErrorVisible && imdbUrl.isError}
          onChange={this.changeHandler}
          onFocus={this.focusOutHandler}
          errorMes="this field is required and must place URL"
        />
        <Input
          value={imdbId.value}
          name="imdbId"
          placeholder="imdbId"
          isError={imdbId.isErrorVisible && imdbId.isError}
          onChange={this.changeHandler}
          onFocus={this.focusOutHandler}
          errorMes="this field is required and must be unique"
        />
        <button
          type="submit"
          className="btn"
          disabled={this.allFieldGood()}
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  idList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAdd: PropTypes.func.isRequired,
};

class Movie {
  constructor(title, description, imgUrl, imdbUrl, imdbId) {
    this.title = title;
    this.description = description;
    this.imgUrl = imgUrl;
    this.imdbUrl = imdbUrl;
    this.imdbId = imdbId;
  }
}
