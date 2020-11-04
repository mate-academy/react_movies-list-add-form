import React, { Component } from 'react';
import './App.scss';
import { MoviesList } from './components/MoviesList';
import moviesFromServer from './api/movies.json';

export class App extends Component {
  state = {
    movies: moviesFromServer,
    title: '',
    description: '',
    imgUrl: '',
    imdbId: '',
    imdbUrl: '',
    formControls: {
      title: {
        value: '',
        inputType: 'input',
        type: 'text',
        label: 'Title',
        errorMessage: 'Enter correct title',
        valid: false,
        touched: false,
        required: true,
      },
      description: {
        value: '',
        inputType: 'textArea',
        type: 'text',
        label: 'Description',
        errorMessage: 'Enter correct description',
        touched: false,
        valid: false,
        required: true,
      },
      imgUrl: {
        value: '',
        inputType: 'input',
        type: 'url',
        label: 'ImgUrl',
        errorMessage: 'Enter correct URL',
        touched: false,
        valid: false,
        required: true,
      },
      imdbUrl: {
        value: '',
        inputType: 'input',
        type: 'url',
        label: 'ImdbUrl',
        errorMessage: 'Enter correct Url',
        touched: false,
        valid: false,
        required: true,
      },
      imdbId: {
        value: '',
        inputType: 'input',
        type: 'url',
        label: 'ImdbId',
        errorMessage: 'Enter correct Url',
        touched: false,
        valid: false,
        required: true,
      },
    },
  };

  addMovie = (title, description, imgUrl, imdbUrl, imdbId) => {
    // put your code here
    this.setState((state) => {
      const newMovie = {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };

      return {
        // eslint-disable-next-line
        movies: [...this.state.movies, newMovie],
      };
    });
  };

  validURL = (url) => {
    const pattern = new RegExp('^(https?:\\/\\/)?'
      + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'
      + '((\\d{1,3}\\.){3}\\d{1,3}))'
      + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'
      + '(\\?[;&a-z\\d%_.~+=-]*)?'
      + '(\\#[-a-z\\d_]*)?$', 'i');

    return !!pattern.test(url);
  }

  validText = (text) => {
    let valid = false;

    if (text.trim().length > 0 && text.trim().length < 240) {
      valid = true;
    }

    return valid;
  }

  validateControl = (value, required, touched, type) => {
    let isValid = true;

    if (type === 'url') {
      isValid = this.validURL(value);
    }

    if (type === 'text') {
      isValid = this.validText(value);
    }

    return isValid;
  }

  validForm = (state) => {
    return (Object.entries(state).some(entry => entry[1].valid === false));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.addMovie(
      this.state.title,
      this.state.description,
      this.state.imgUrl,
      this.state.imdbUrl,
      this.state.imdbId,
    );
  }

  onBlurHandler = (controlName) => {
    // eslint-disable-next-line
    const formControlCopy = { ...this.state.formControls };
    const control = { ...formControlCopy[controlName] };

    control.touched = true;
    formControlCopy[controlName] = control;
    control.valid = this.validateControl(
      control.value,
      control.required,
      control.touched,
      control.type,
    );
    this.setState({
      formControls: formControlCopy,
    });
  };

  onChangeHandler = (event, controlName) => {
    // eslint-disable-next-line
    const formControlCopy = { ...this.state.formControls };
    const control = { ...formControlCopy[controlName] };

    control.value = event.target.value;
    formControlCopy[controlName] = control;
    this.setState({
      [controlName]: event.target.value,
      formControls: formControlCopy,
    });
  }

  renderInputs = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <div className="field">
          <label>{control.label}</label>
          {
            control.inputType === 'input'
              ? (
                <input
                  key={controlName}
                  type={control.type}
                  value={control.value}
                  valid={control.valid}
                  touched={control.touched}
                  errorMessage={control.errorMessage}
                  onChange={event => this.onChangeHandler(event, controlName)}
                  onBlur={event => this.onBlurHandler(controlName)}
                />
              )
              : (
                <textarea
                  key={controlName}
                  type={control.type}
                  value={control.value}
                  valid={control.valid}
                  touched={control.touched}
                  errorMessage={control.errorMessage}
                  onChange={event => this.onChangeHandler(event, controlName)}
                  onBlur={event => this.onBlurHandler(controlName)}
                />
              )
          }
          {
            control.valid && control.touched
              ? null
              : <span>{control.errorMessage}</span>
          }
        </div>
      );
    });
  }

  render() {
    const { movies } = this.state;

    this.renderInputs();

    return (
      <div className="page">
        <div className="page-content">
          <MoviesList movies={movies} />
        </div>
        <div className="sidebar">
          <form className="ui form" onSubmit={this.handleSubmit}>
            {this.renderInputs()}
            <button
              className="ui button"
              type="submit"
              disabled={
                this.validForm(this.state.formControls)
                && 'disabled'
              }
            >
              Add Movie
            </button>
          </form>
        </div>
      </div>
    );
  }
}
