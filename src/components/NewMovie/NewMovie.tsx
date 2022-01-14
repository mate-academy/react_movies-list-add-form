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

  titleIsValid: boolean,
  imdbUrIsValid: boolean,
  imdbIdIsValid: boolean,
  imgUrlIsValid: boolean,

  btnIsDisabled: boolean,

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

    titleIsValid: true,
    imgUrlIsValid: true,
    imdbUrIsValid: true,
    imdbIdIsValid: true,

    btnIsDisabled: false,

  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { onAdd } = this.props;
    const regex = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.movie;

    if (title === '') {
      this.setState(state => ({
        ...state,
        titleIsValid: false,
      }
      ));
    }

    if (!regex.test(imgUrl.toLocaleLowerCase())) {
      this.setState(state => ({
        ...state,
        imgUrlIsValid: false,
      }
      ));
    }

    if (!regex.test(imdbUrl.toLocaleLowerCase())) {
      this.setState(state => ({
        ...state,
        imdbUrIsValid: false,
      }
      ));
    }

    if (imdbId === '') {
      this.setState(state => ({
        ...state,
        imdbIdIsValid: false,
      }
      ));
    }

    const {
      titleIsValid,
      imgUrlIsValid,
      imdbUrIsValid,
      imdbIdIsValid,
    } = this.state;

    if (titleIsValid === true
        && imgUrlIsValid === true
        && imdbUrIsValid === true
        && imdbIdIsValid === true
    ) {
      onAdd(this.state.movie);

      this.setState({
        movie: {
          title: '',
          description: '',
          imgUrl: '',
          imdbUrl: '',
          imdbId: '',
        },

        titleIsValid: true,
        imgUrlIsValid: true,
        imdbUrIsValid: true,
        imdbIdIsValid: true,

        btnIsDisabled: false,

      });
    } else {
      this.setState(state => ({
        ...state,
        btnIsDisabled: true,
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
            titleIsValid: true,
            btnIsDisabled: false,
          }
          ));
        }

        if (title === '') {
          this.setState(state => ({
            ...state,
            titleIsValid: false,
            btnIsDisabled: false,
          }
          ));
        }

        break;
      }

      case 'imgUrl': {
        if (regex.test(imgUrl.toLocaleLowerCase())) {
          this.setState(state => ({
            ...state,
            imgUrlIsValid: true,
            btnIsDisabled: false,
          }
          ));
        }

        if (!regex.test(imgUrl.toLocaleLowerCase())) {
          this.setState(state => ({
            ...state,
            imgUrlIsValid: false,
            btnIsDisabled: false,
          }
          ));
        }

        break;
      }

      case 'imdbUrl': {
        if (regex.test(imdbUrl.toLocaleLowerCase())) {
          this.setState(state => ({
            ...state,
            imdbUrIsValid: true,
            btnIsDisabled: false,
          }
          ));
        }

        if (!regex.test(imdbUrl.toLocaleLowerCase())) {
          this.setState(state => ({
            ...state,
            imdbUrIsValid: false,
            btnIsDisabled: false,
          }
          ));
        }

        break;
      }

      case 'imdbId': {
        if (imdbId !== '') {
          this.setState(state => ({
            ...state,
            imdbIdIsValid: true,
            btnIsDisabled: false,
          }
          ));
        }

        if (imdbId === '') {
          this.setState(state => ({
            ...state,
            imdbIdIsValid: false,
            btnIsDisabled: false,
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
      titleIsValid,
      imgUrlIsValid,
      imdbUrIsValid,
      imdbIdIsValid,
      btnIsDisabled,
    } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
      >
        <h2 className="form-title">Enter the details of the new movie</h2>
        <input
          className={classNames('form-input', { 'form-input--error': (!titleIsValid) })}
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        {(!titleIsValid) && <p className="form-input__error-message">Enter data in the field above</p>}

        <input
          className="form-input"
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={this.handleChange}
        />

        <input
          className={classNames('form-input', { 'form-input--error': (!imgUrlIsValid) })}
          type="text"
          name="imgUrl"
          placeholder="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        {(!imgUrlIsValid) && <p className="form-input__error-message">Enter data in the field above</p>}

        <input
          className={classNames('form-input', { 'form-input--error': (!imdbUrIsValid) })}
          type="text"
          name="imdbUrl"
          placeholder="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        {(!imdbUrIsValid) && <p className="form-input__error-message">Enter data in the field above</p>}

        <input
          className={classNames('form-input', { 'form-input--error': (!imdbIdIsValid) })}
          type="text"
          name="imdbId"
          placeholder="imdbId"
          value={imdbId}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        />
        {(!imdbIdIsValid) && <p className="form-input__error-message">Enter data in the field above</p>}

        <button
          className="form-btn"
          type="submit"
          disabled={btnIsDisabled}
        >
          SUBMIT
        </button>

      </form>
    );
  }
}
