import React, { Component } from 'react';
import './NewMovie.scss';

type Props = {
  addMove:(state: Movie) => void,
};

type State = {
  movie:Movie,
  validationState: {
    title: boolean,
    description: boolean,
    imgUrl: boolean,
    imdbId: boolean,
  }
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    movie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
    validationState: {
      title: false,
      description: false,
      imgUrl: false,
      imdbId: false,
    },
  };

  addMove = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  validationInput = () => {
    const {
      title, description, imgUrl, imdbId,
    } = this.state.movie;

    if (title.length === 0) {
      this.setState(prevState => (
        { validationState: { ...prevState.validationState, title: true } }
      ));
    } else {
      this.setState(prevState => (
        { validationState: { ...prevState.validationState, title: false } }
      ));
    }

    if (description.length === 0) {
      this.setState(prevState => (
        { validationState: { ...prevState.validationState, description: true } }
      ));
    } else {
      this.setState(prevState => (
        { validationState: { ...prevState.validationState, description: false } }
      ));
    }

    if (imgUrl.length === 0) {
      this.setState(prevState => (
        { validationState: { ...prevState.validationState, imgUrl: true } }
      ));
    } else {
      this.setState(prevState => (
        { validationState: { ...prevState.validationState, imgUrl: false } }
      ));
    }

    if (imdbId.length === 0) {
      this.setState(prevState => (
        { validationState: { ...prevState.validationState, imdbId: true } }
      ));
    } else {
      this.setState(prevState => (
        { validationState: { ...prevState.validationState, imdbId: false } }
      ));
    }
  };

  addValueToState = (value:string, name:string) => {
    this.validationInput();
    this.setState(state => (
      { movie: { ...state.movie, [name]: value } }
    ));
  };

  validation = (state:Movie) => {
    const {
      title, description, imgUrl, imdbId,
    } = this.state.movie;

    this.validationInput();

    if (
      title.length > 0
      && description.length > 0
      && imgUrl.length > 0
      && imdbId.length > 0
    ) {
      this.props.addMove(state);
    }
  };

  render() {
    const {
      title, description, imgUrl, imdbId,
    } = this.state.validationState;

    return (
      <form className="form">
        <label
          htmlFor="title"
          className={title ? 'error error_title' : ''}
        >
          Title
          <input
            id="title"
            type="text"
            onChange={(event) => {
              this.addValueToState(event.target.value, event.target.id);
            }}
            onBlur={() => {
              this.validation(this.state.movie);
            }}
          />
        </label>

        <label
          htmlFor="description"
          className={description ? 'error error_description' : ''}
        >
          Description
          <input
            id="description"
            type="text"
            onChange={(event) => {
              this.addValueToState(event.target.value, event.target.id);
            }}
          />
        </label>

        <label
          htmlFor="imgUrl"
          className={imgUrl ? 'error error_imgUrl' : ''}
        >
          imgUrl
          <input
            id="imgUrl"
            type="text"
            onChange={(event) => {
              this.addValueToState(event.target.value, event.target.id);
            }}
          />
        </label>

        <label
          htmlFor="imdbId"
          className={imdbId ? 'error error_imdbId' : ''}
        >
          ImdbId
          <input
            id="imdbId"
            type="text"
            onChange={(event) => {
              this.addValueToState(event.target.value, event.target.id);
            }}
          />
        </label>
        <button
          onClick={() => {
            this.validation(this.state.movie);
          }}
          type="button"
        >
          Add movie
        </button>
      </form>
    );
  }
}
