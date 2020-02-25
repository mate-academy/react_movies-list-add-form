import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '../TextField/TextField';
import { UrlRegExp } from '../Constants/UrlRegExp';
import { InputsFromServer } from './InputsFromServer';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    titleError: '',
    imgUrlError: '',
    imdbUrlError: '',
  };

  handleChange = (event) => {
    const { target: { name, value } } = event;

    this.setState({
      [name]: value.trimStart(),
      titleError: '',
      imgUrlError: '',
      imdbUrlError: '',
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    if (title === '') {
      this.setState({
        titleError: 'Title is required',
      });

      return;
    }

    if (!UrlRegExp.test(imgUrl)) {
      this.setState({
        imgUrlError: 'Enter valid imgUrl',
      });

      return;
    }

    if (!UrlRegExp.test(imdbUrl)) {
      this.setState({
        imdbUrlError: 'Enter valid imdbgUrl',
      });

      return;
    }

    this.props.onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    this.resetState();
  }

  resetState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      titleError: '',
      imgUrlError: '',
      imdbUrlError: '',
    });
  }

  checkOnBlur = ({ target: { name } }) => {
    if (name === 'title') {
      if (this.state.title === '') {
        this.setState({
          titleError: 'enter valid title',
        });
      }
    }

    if (name === 'imgUrl') {
      if (!UrlRegExp.test(this.state.imgUrl)) {
        this.setState({
          imgUrlError: 'Enter valid imgUrl',
        });
      }
    }

    if (name === 'imdbUrl') {
      if (!UrlRegExp.test(this.state.imdbUrl)) {
        this.setState({
          imdbUrlError: 'Enter valid imdbUrl',
        });
      }
    }
  }

  checkAllValidation = () => {
    const {
      title,
      imgUrl,
      imdbUrl,
    } = this.state;

    if (title !== ''
      && UrlRegExp.test(imgUrl)
      && UrlRegExp.test(imdbUrl)) {
      return false;
    }

    return true;
  }

  render() {
    return (
      <form name="newMovie" onSubmit={this.handleSubmit}>
        {InputsFromServer.map(input => (
          <TextField
            key={input.name}
            onBlur={this.checkOnBlur}
            name={input.name}
            label={input.label}
            placeholder={input.placeholder}
            value={this.state[input.name]}
            onChange={this.handleChange}
            error={this.state[input.error]}
          />
        ))}

        <button
          type="submit"
          className="button is-link"
          disabled={this.checkAllValidation()}
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
