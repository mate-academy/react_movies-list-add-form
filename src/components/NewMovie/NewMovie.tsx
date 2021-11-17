/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable quote-props */
import { ChangeEvent, Component, FormEvent } from 'react';
import classNames from 'classnames';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

type State = {
  movie: Movie;
  errors: Errors;
};

type Errors = {
  [key in keyof Pick<Movie, 'imgUrl' | 'imdbUrl'>]: boolean
};

export class NewMovie extends Component<Props, State> {
  initialMovie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  state: State = {
    movie: { ...this.initialMovie },
    errors: {
      imgUrl: false,
      imdbUrl: false,
    },
  };

  changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const { errors } = this.state;

    if (Object.keys(errors).includes(name)) {
      this.errorChecker(name, value);
    }

    this.setState((prevState) => {
      return {
        movie: {
          ...prevState.movie,
          [name]: value,
        },
      };
    });
  };

  sumbitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { onAdd } = this.props;

    onAdd(this.state.movie);

    this.setState({
      movie: { ...this.initialMovie },
    });
  };

  errorChecker = (name: string, value: string) => {
    const sitePattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    const tempError = value.length && !value.match(sitePattern);

    this.setState((prevState) => {
      return {
        errors: {
          ...prevState.errors,
          [name]: tempError,
        },
      };
    });
  };

  formatLabel = (label: string) => {
    const capitalizeFirstLetter = label.slice(0, 1).toUpperCase();
    const restWord = label.slice(1);

    return `${capitalizeFirstLetter}${restWord}:`;
  };

  render() {
    const requiredFields = [true, true, true, true, false];
    const hasErrors = this.state.errors.imgUrl || this.state.errors.imdbUrl;
    const isAllCompleted = Object.values(this.state.movie).every(text => text.length);
    const isInvalidCheck = (field: keyof Movie) => {
      if (Object.keys(this.state.errors).includes(field)) {
        return this.state.errors[field as keyof Errors];
      }

      return false;
    };

    return (
      <form
        className="form"
        onSubmit={this.sumbitHandler}
      >
        {(Object.keys(this.state.movie) as Array<keyof Movie>).map((field, i) => {
          const fieldValue = this.state.movie[field];

          return (
            <label
              className="form__item"
              htmlFor={field}
            >
              {this.formatLabel(field)}
              <input
                name={field}
                className={classNames({
                  'form__field': true,
                  'form__field--invalid': isInvalidCheck(field),
                })}
                type="text"
                value={fieldValue}
                required={requiredFields[i]}
                onChange={this.changeHandler}
              />
            </label>
          );
        })}
        <button
          className="form__submit"
          disabled={hasErrors || !isAllCompleted}
          type="submit"
        >
          Add movie
        </button>
      </form>
    );
  }
}
