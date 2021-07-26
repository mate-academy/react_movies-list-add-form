import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MovieInput from '../MovieInput/MovieInput';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    wasCliked: false,
  };

  checkingAllInputs = () => {
    if (this.state.title.length
        && this.state.imgUrl
        && this.state.imdbUrl
        && this.state.imdbId) {
      return true;
    }

    return false;
  }

  changeStateValue = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  isButtonDisabled = () => {
    return this.state.wasCliked && !this.checkingAllInputs();
  }

  cleanStateAfterSubmit = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      wasCliked: false,
    });
  }

  submitForm = (event) => {
    event.preventDefault();

    if (!this.checkingAllInputs()) {
      return;
    }

    this.props.addMovie(this.state);
    this.cleanStateAfterSubmit();
  }

  checkInputValidation = (length) => {
    return length === 0 && this.state.wasCliked;
  }

  render() {
    return (
      <form
        method="POST"
        onSubmit={this.submitForm}
        className="form"
      >
        <MovieInput
          inputHasError={this.checkInputValidation(this.state.title.length)}
          name="title"
          value={this.state.title}
          placeholder="Title*"
          changeStateValue={this.changeStateValue}
        />
        {this.checkInputValidation(this.state.title.length)
          && (
            <span>
              Cant be empty
            </span>
          )
            }
        <MovieInput
          name="description"
          value={this.state.description}
          placeholder="Description"
          changeStateValue={this.changeStateValue}
        />
        <MovieInput
          inputHasError={this.checkInputValidation(this.state.imgUrl.length)}
          name="imgUrl"
          value={this.state.imgUrl}
          placeholder="imgUrl*"
          changeStateValue={this.changeStateValue}
        />
        {this.checkInputValidation(this.state.imgUrl.length)
          && (
            <span>
              Cant be empty
            </span>
          )
            }
        <MovieInput
          inputHasError={this.checkInputValidation(this.state.imdbUrl.length)}
          name="imdbUrl"
          value={this.state.imdbUrl}
          placeholder="imdbUrl*"
          changeStateValue={this.changeStateValue}
        />
        {this.checkInputValidation(this.state.imdbUrl.length)
        && (
        <span>
          Cant be empty
        </span>
        )
        }
        <MovieInput
          inputHasError={this.checkInputValidation(this.state.imdbId.length)}
          name="imdbId"
          value={this.state.imdbId}
          placeholder="imdbId*"
          changeStateValue={this.changeStateValue}
        />
        {this.checkInputValidation(this.state.imdbId.length)
          && (
            <span>
              Cant be empty
            </span>
          )
            }
        <button
          className="btn"
          type="submit"
          disabled={this.isButtonDisabled()}
          onClick={() => this.setState({ wasCliked: true })}
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
