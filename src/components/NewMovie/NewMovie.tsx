import React, { Component } from 'react';
import './NewMovie.scss';
import classNames from 'classnames';

type Props = {
  onAdd: (arg: Movie) => void,
};
type State = {
  movie: {
    title: string,
    description: string,
    imgUrl: string,
    imdbUrl: string,
    imdbId: string,
  },

  titleIsVisited: boolean,
  imdbUrIsVisited: boolean,
  imdbIdIsVisited: boolean,
  imgUrlIsVisited: boolean,

  titleIsValid: boolean,
  imdbUrIsValid: boolean,
  imdbIdIsValid: boolean,
  imgUrlIsValid: boolean,

  formIsValid: boolean,

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

    titleIsVisited: false,
    imgUrlIsVisited: false,
    imdbUrIsVisited: false,
    imdbIdIsVisited: false,

    titleIsValid: false,
    imgUrlIsValid: false,
    imdbUrIsValid: false,
    imdbIdIsValid: false,

    formIsValid: true,
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { onAdd } = this.props;
    const {
      titleIsValid,
      imgUrlIsValid,
      imdbUrIsValid,
      imdbIdIsValid,
    } = this.state;

    if (titleIsValid && imgUrlIsValid && imdbUrIsValid && imdbIdIsValid) {
      if (this.state.formIsValid === true) {
        onAdd(this.state.movie);

        this.setState({
          movie: {
            title: '',
            description: '',
            imgUrl: '',
            imdbUrl: '',
            imdbId: '',
          },
          titleIsVisited: false,
          imgUrlIsVisited: false,
          imdbUrIsVisited: false,
          imdbIdIsVisited: false,

          titleIsValid: false,
          imgUrlIsValid: false,
          imdbUrIsValid: false,
          imdbIdIsValid: false,

          formIsValid: true,
        });
      }
    } else {
      this.setState(state => ({
        ...state,
        formIsValid: false,
      }));
    }
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    this.setState(state => ({
      movie: {
        ...state.movie,
        [name]: value,
      },
    }));
  };

  handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.movie;

    const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    switch (event.target.name) {
      case 'title': {
        if (title !== '') {
          this.setState(state => ({
            ...state,
            titleIsVisited: true,
            titleIsValid: true,
            formIsValid: true,
          }
          ));
        }

        if (title === '') {
          this.setState(state => ({
            ...state,
            titleIsVisited: true,
            titleIsValid: false,
          }
          ));
        }

        break;
      }

      case 'imgUrl': {
        if (regex.test(imgUrl.toLocaleLowerCase())) {
          this.setState(state => ({
            ...state,
            imgUrlIsVisited: true,
            imgUrlIsValid: true,
            formIsValid: true,
          }
          ));
        }

        if (!regex.test(imgUrl.toLocaleLowerCase())) {
          this.setState(state => ({
            ...state,
            imgUrlIsVisited: true,
            imgUrlIsValid: false,
          }
          ));
        }

        break;
      }

      case 'imdbUrl': {
        if (regex.test(imdbUrl.toLocaleLowerCase())) {
          this.setState(state => ({
            ...state,
            imdbUrIsVisited: true,
            imdbUrIsValid: true,
            formIsValid: true,
          }
          ));
        }

        if (!regex.test(imdbUrl.toLocaleLowerCase())) {
          this.setState(state => ({
            ...state,
            imdbUrIsVisited: true,
            imdbUrIsValid: false,
          }
          ));
        }

        break;
      }

      case 'imdbId': {
        if (imdbId !== '') {
          this.setState(state => ({
            ...state,
            imdbIdIsVisited: true,
            imdbIdIsValid: true,
            formIsValid: true,
          }
          ));
        }

        if (imdbId === '') {
          this.setState(state => ({
            ...state,
            imdbIdIsVisited: true,
            imdbIdIsValid: false,
          }
          ));
        }

        break;
      }

      default: {
        break;
      }
    }
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.movie;

    const {
      titleIsVisited,
      imgUrlIsVisited,
      imdbUrIsVisited,
      imdbIdIsVisited,
      titleIsValid,
      imgUrlIsValid,
      imdbUrIsValid,
      imdbIdIsValid,
      formIsValid,
    } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
      >
        <h2 className="form-title">Enter the details of the new movie</h2>
        <input
          className={classNames('form-input', { 'form-input--error': (titleIsVisited && !titleIsValid) })}
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        {((titleIsVisited && !titleIsValid)) && <p className="form-input__error-message">Enter data in the field above</p>}

        <input
          className="form-input"
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={this.handleChange}
        />

        <input
          className={classNames('form-input', { 'form-input--error': (imgUrlIsVisited && !imgUrlIsValid) })}
          type="text"
          name="imgUrl"
          placeholder="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        {((imgUrlIsVisited && !imgUrlIsValid)) && <p className="form-input__error-message">Enter data in the field above</p>}

        <input
          className={classNames('form-input', { 'form-input--error': (imdbUrIsVisited && !imdbUrIsValid) })}
          type="text"
          name="imdbUrl"
          placeholder="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        {((imdbUrIsVisited && !imdbUrIsValid)) && <p className="form-input__error-message">Enter data in the field above</p>}

        <input
          className={classNames('form-input', { 'form-input--error': (imdbIdIsVisited && !imdbIdIsValid) })}
          type="text"
          name="imdbId"
          placeholder="imdbId"
          value={imdbId}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        {((imdbIdIsVisited && !imdbIdIsValid)) && <p className="form-input__error-message">Enter data in the field above</p>}

        <button
          className="form-btn"
          type="submit"
          disabled={!formIsValid}
        >
          SUBMIT
        </button>

      </form>
    );
  }
}
