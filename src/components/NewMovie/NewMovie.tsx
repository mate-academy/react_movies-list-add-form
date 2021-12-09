import {
  ChangeEventHandler,
  Component,
  FormEventHandler,
} from 'react';
import classNames from 'classnames';
import { AddMovie } from '../../types/AddMovie';
import './NewMovie.scss';

type Props = {
  onAdd: AddMovie;
};

interface StateKeyObj {
  value: string;
  visited?: boolean;
  error?: string;
}

type State = {
  title: StateKeyObj;
  description: StateKeyObj;
  imgUrl: StateKeyObj;
  imdbUrl: StateKeyObj;
  imdbId: StateKeyObj;
};

export class NewMovie extends Component<Props> {
  state: State = {
    title: {
      value: '',
      visited: false,
      error: '',
    },
    description: {
      value: '',
    },
    imgUrl: {
      value: '',
      visited: false,
      error: '',
    },
    imdbUrl: {
      value: '',
      visited: false,
      error: '',
    },
    imdbId: {
      value: '',
      visited: false,
      error: '',
    },
  };

  changeHandler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target;

    this.setState((state: State) => {
      return {
        [name]: {
          ...state[name as keyof State] as unknown as Pick<State, keyof State>,
          value,
        },
      };
    });
  };

  submitHandler: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const newMovie = {
      title: title.value,
      description: description.value,
      imgUrl: imgUrl.value,
      imdbUrl: imdbUrl.value,
      imdbId: imdbId.value,
    };

    this.props.onAdd(newMovie);

    this.setState({
      title: {
        value: '',
        visited: false,
        error: '',
      },
      description: {
        value: '',
      },
      imgUrl: {
        value: '',
        visited: false,
        error: '',
      },
      imdbUrl: {
        value: '',
        visited: false,
        error: '',
      },
      imdbId: {
        value: '',
        visited: false,
        error: '',
      },
    });
  };

  blurHandler: FormEventHandler<HTMLInputElement> = (e) => {
    const { name, value, type } = e.currentTarget;
    const validation = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    let errorMessage = '';

    if (!value.trim()) {
      errorMessage = `Please enter ${name}`;
    }

    if (type === 'url' && !validation.test(value.trim()) && !!value.trim()) {
      errorMessage = 'Please enter correct URL address';
    }

    this.setState((state: State) => {
      return {
        [name]: {
          ...state[name as keyof State] as unknown as Pick<State, keyof State>,
          visited: true,
          error: errorMessage,
        },
      };
    });
  };

  render() {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const titleValid = title.visited && !title.error;
    const imgUrlValid = imgUrl.visited && !imgUrl.error;
    const imdbUrlValid = imdbUrl.visited && !imdbUrl.error;
    const imdbIdlValid = imdbId.visited && !imdbId.error;
    const formValid = titleValid && imgUrlValid && imdbUrlValid && imdbIdlValid;

    return (
      <form
        className="add-movie-form"
        onSubmit={this.submitHandler}
        noValidate
      >
        <h2 className="add-movie-form__title">Add movie form</h2>

        {Object.entries(this.state).map(([key, valueObj]) => {
          const isImgUrl = key === 'imgUrl';
          const isImdbUrl = key === 'imdbUrl';
          const {
            value,
            visited,
            error,
          } = valueObj;

          return (
            <>
              <p
                key={key}
                className="add-movie-form__field-title"
              >
                {`Movie ${key}`}
              </p>

              {key !== 'description' ? (
                <>
                  {(visited && error) && (
                    <span
                      className="add-movie-form__error-message"
                      key={`${key}ErrorMessage`}
                    >
                      {error}
                    </span>
                  )}
                  <input
                    key={`${key}Input`}
                    type={(isImgUrl || isImdbUrl) ? 'url' : 'text'}
                    name={key}
                    value={value}
                    placeholder={`Enter movie ${key}`}
                    className={classNames('add-movie-form__field', { 'add-movie-form__field--error': visited && error })}
                    onChange={this.changeHandler}
                    onBlur={this.blurHandler}
                  />
                </>
              ) : (
                <textarea
                  key={`${key}TextArea`}
                  name={key}
                  value={value}
                  placeholder={`Enter movie ${key}`}
                  onChange={this.changeHandler}
                >
                  {value}
                </textarea>
              )}
            </>
          );
        })}

        <button
          type="submit"
          disabled={!formValid}
        >
          Add movie
        </button>
      </form>
    );
  }
}
