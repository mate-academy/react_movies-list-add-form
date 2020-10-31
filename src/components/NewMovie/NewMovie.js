import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FormInput } from '../FormInput';
import { NewMovieProps } from '../../props/NewMovieProps';

// eslint-disable-next-line max-len
const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component {
  state = {
    values: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    controlers: {
      isValidTitle: true,
      isValidImgUrl: true,
      isValidImdbUrl: true,
      isValidImdbId: true,
    },
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState(state => ({
      values: {
        ...state.values,
        [name]: value,
      },
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.addMovie(this.state.values);

    this.setState({
      values: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    });
  }

  handleBlur = (event) => {
    const { name, value } = event.target;
    const { controlers } = this.state;
    const controler = `isValid${name[0].toUpperCase()}${name.slice(1)}`;
    const isControler = Object
      .prototype
      .hasOwnProperty
      .call(controlers, controler);

    if (!isControler) {
      return;
    }

    this.setState(state => ({
      controlers: {
        ...state.controlers,
        [controler]: controler.includes('Url')
          ? regex.test(value) && !!value
          : !!value,
      },
    }));
  }

  hasFailedControlers = () => {
    return Object.values(this.state.controlers).some(value => !value);
  }

  render() {
    const {
      controlers: {
        isValidTitle,
        isValidImgUrl,
        isValidImdbUrl,
        isValidImdbId,
      },
      values: {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      },
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h3 className="form-group row">Add film</h3>
        <FormInput
          name="title"
          value={title}
          handleChange={this.handleChange}
          handleBlur={this.handleBlur}
          isValid={isValidTitle}
        />
        <FormInput
          name="description"
          value={description}
          handleChange={this.handleChange}
          handleBlur={this.handleBlur}
        />
        <FormInput
          name="imgUrl"
          value={imgUrl}
          handleChange={this.handleChange}
          handleBlur={this.handleBlur}
          isValid={isValidImgUrl}
        />
        <FormInput
          name="imdbUrl"
          value={imdbUrl}
          handleChange={this.handleChange}
          handleBlur={this.handleBlur}
          isValid={isValidImdbUrl}
        />
        <FormInput
          name="imdbId"
          value={imdbId}
          handleChange={this.handleChange}
          handleBlur={this.handleBlur}
          isValid={isValidImdbId}
        />

        <button
          type="submit"
          className="btn btn-primary form-group row"
          disabled={
            !imdbId
            || !imdbUrl
            || !imgUrl
            || !title
            || this.hasFailedControlers()
          }
        >
          Add film
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = NewMovieProps;
