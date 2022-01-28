/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';

type Props = {
  addMovie: (movie: Movie) => void;
};

type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  isTitleValid: boolean;
  isImgUrlValid: boolean;
  isImdbUrlValid: boolean;
  isImdbIdValid: boolean;
  isFormValid: boolean;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isTitleValid: false,
    isImgUrlValid: false,
    isImdbUrlValid: false,
    isImdbIdValid: false,
    isFormValid: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
      [this.getValidInput(name)]: false,
    }));
  };

  handleSumbit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (this.formValidation()) {
      const newMovie = this.createMovie();

      this.props.addMovie(newMovie);
      this.clearState();
    }
  };

  getValidInput = (name: string) => {
    const correctName = name[0].toUpperCase() + name.slice(1);

    return `is${correctName}Valid`;
  };

  createMovie = () => {
    return {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imdbUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    };
  };

  formValidation = () => {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      this.setState({
        isTitleValid: !title,
        isImgUrlValid: !imgUrl,
        isImdbUrlValid: !imdbUrl,
        isImdbIdValid: !imdbId,
      });

      return false;
    }

    return true;
  };

  clearState = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      isTitleValid: false,
      isImgUrlValid: false,
      isImdbUrlValid: false,
      isImdbIdValid: false,
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      isTitleValid,
      isImgUrlValid,
      isImdbUrlValid,
      isImdbIdValid,
    } = this.state;

    return (
      <form>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="title"
              placeholder="Text input"
              value={title}
              onChange={this.handleChange}
            />
          </div>
          {isTitleValid
          && <p className="help is-danger">Please fill out the field</p>}
        </div>

        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea
              className="textarea"
              name="description"
              placeholder="Textarea"
              value={description}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">imgUrl</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="imgUrl"
              placeholder="Text input"
              value={imgUrl}
              onChange={this.handleChange}
            />
          </div>
          {isImgUrlValid
          && <p className="help is-danger">Please fill out the field</p>}
        </div>

        <div className="field">
          <label className="label">imdbUrl</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="imdbUrl"
              placeholder="Text input"
              value={imdbUrl}
              onChange={this.handleChange}
            />
          </div>
          {isImdbUrlValid
          && <p className="help is-danger">Please fill out the field</p>}
        </div>

        <div className="field">
          <label className="label">imdbId</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="imdbId"
              placeholder="Text input"
              value={imdbId}
              onChange={this.handleChange}
            />
          </div>
          {isImdbIdValid
          && <p className="help is-danger">Please fill out the field</p>}
        </div>

        <div className="control">
          <button
            type="submit"
            className="button is-link"
            onClick={this.handleSumbit}
          >
            Add movie
          </button>
        </div>
      </form>
    );
  }
}
