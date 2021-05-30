import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewMovie.scss';
// eslint-disable-next-line
const re = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    requiredMessages: {
      titleMessage: false,
      imgUrlMessage: false,
      imdbUrlMessage: false,
      imdbIdMessage: false,
      imgUrlMatchMessage: false,
      imdbUrlMatchMessage: false,
    },
  };

  filmForge = (event) => {
    event.preventDefault();
    if (Object.values(this.state.requiredMessages).every(element => !element)
      && Object.values(this.state).every(element => element)
    ) {
      this.setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
      this.props.addMovie(this.state);
      event.target.reset();
    }
  }

  inputTitleHandler = (event) => {
    event.preventDefault();
    this.setState({ title: event.target.value });
    this.setState(state => ({
      requiredMessages: {
        ...state.requiredMessages,
        titleMessage: !state.title,
      },
    }));
  }

  inputDescriptionHandler = (event) => {
    event.preventDefault();
    this.setState({
      description: event.target.value,
    });
  }

  inputImgUrlHandler = (event) => {
    event.preventDefault();
    event.persist();
    this.setState({
      imgUrl: event.target.value,
    });
    this.setState(state => ({
      requiredMessages: {
        ...state.requiredMessages,
        imgUrlMessage: !state.imgUrl,
        imgUrlMatchMessage: !event.target.value.match(re),
      },
    }));
  }

  inputImdbUrlHandler = (event) => {
    event.preventDefault();
    event.persist();
    this.setState({
      imdbUrl: event.target.value,
    });
    this.setState(state => ({
      requiredMessages: {
        ...state.requiredMessages,
        imdbUrlMessage: !state.imdbUrl,
        imdbUrlMatchMessage: !event.target.value.match(re),
      },
    }));
  }

  inputImdbIdHandler = (event) => {
    event.preventDefault();
    this.setState({ imdbId: event.target.value });
    this.setState(state => ({
      requiredMessages: {
        ...state.requiredMessages,
        imdbIdMessage: !state.imdbId,
      },
    }));
  }

  render() {
    const {
      titleMessage,
      imgUrlMessage,
      imdbUrlMessage,
      imdbIdMessage,
    } = this.state.requiredMessages;

    return (
      <form onSubmit={this.filmForge} className="AddMovieForm">
        <label htmlFor="" className="FormLabel">
          <span>Movie title</span>
          <input
            className={`FormInput ${titleMessage}`}
            type="text"
            onChange={this.inputTitleHandler}
          />
          {titleMessage && <p className="ErrorMessage">Please enter title</p>}
        </label>

        <textarea
          name="description"
          id=""
          cols="30"
          rows="10"
          onChange={this.inputDescriptionHandler}
        />

        <label htmlFor="" className="FormLabel">
          <span>imgUrl</span>
          <input
            className={`FormInput ${imgUrlMessage}
              ${this.state.requiredMessages.imgUrlMatchMessage}`}
            type="text"
            onChange={this.inputImgUrlHandler}
          />
          {imgUrlMessage
            && (
            <p className="ErrorMessage">
              Please enter image URL
            </p>
            )
          }
          {this.state.requiredMessages.imgUrlMatchMessage
            && (
            <p className="ErrorMessage">
              Please enter correct URL
            </p>
            )
          }
        </label>

        <label htmlFor="" className="FormLabel">
          <span>imdbUrl</span>
          <input
            className={`FormInput ${imdbUrlMessage}
              ${this.state.requiredMessages.imdbUrlMatchMessage}`}
            type="text"
            onChange={this.inputImdbUrlHandler}
          />
          {imdbUrlMessage
            && (
            <p className="ErrorMessage">
              Please enter imbd URL
            </p>
            )
          }
          {this.state.requiredMessages.imdbUrlMatchMessage
            && (
            <p className="ErrorMessage">
              Please enter correct URL
            </p>
            )
          }
        </label>

        <label htmlFor="" className="FormLabel">
          <span>imdbId</span>
          <input
            className={`FormInput ${imdbIdMessage}`}
            type="text"
            onChange={this.inputImdbIdHandler}
          />
          {imdbIdMessage
            && (
            <p className="ErrorMessage">
              Please enter ID
            </p>
            )
          }
        </label>

        {Object.values(this.state.requiredMessages).every(element => !element)
          && Object.values(this.state).every(element => element)
          && <button type="submit">Add Movie</button>
        }
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
