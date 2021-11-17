/* eslint-disable quote-props */
import { ChangeEvent, Component, FormEvent } from 'react';
import classNames from 'classnames';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};

type Errors = {
  title?: boolean;
  description?: boolean;
  imgUrl: boolean;
  imdbUrl: boolean;
  imdbId?: boolean;
};

type ChangesEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
type SubmitEvent = FormEvent<HTMLFormElement>;

type State = {
  movie: Movie;
  errors: Errors;
};

export class NewMovie extends Component<Props, State> {
  initialMovie: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  initialErrors: Errors = {
    imgUrl: false,
    imdbUrl: false,
  };

  state: State = {
    movie: { ...this.initialMovie },
    errors: { ...this.initialErrors },
  };

  changeHandler = (e: ChangesEvent) => {
    const { name, value } = e.target;

    if (Object.keys(this.state.errors).includes(name)) {
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

  sumbitHandler = (e: SubmitEvent) => {
    e.preventDefault();
    const { onAdd } = this.props;

    onAdd(this.state.movie);

    this.setState({
      movie: { ...this.initialMovie },
    });
  };

  errorChecker = (name: string, value: string) => {
    const sitePattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    const tempError: boolean = value.length ? !value.match(sitePattern) : false;

    this.setState((prevState) => {
      return {
        errors: {
          ...prevState.errors,
          [name]: tempError,
        },
      };
    });
  };

  render() {
    const requiredFields = [true, true, true, true, false];
    const hasErrors = Object.values(this.state.errors).some(value => value);
    const isAllCompleted = Object.values(this.state.movie).every(text => text.length);

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
              <span className="form__title">{field}</span>

              {field === 'description' ? (
                <textarea
                  name={field}
                  className={classNames(
                    'form__field',
                    'form__field--textarea',
                    {
                      'form__field--invalid': this.state.errors[field],
                    },
                  )}
                  value={fieldValue}
                  required={requiredFields[i]}
                  onChange={this.changeHandler}
                  placeholder={`Please, enter ${field}`}
                />
              ) : (
                <input
                  name={field}
                  className={classNames({
                    'form__field': true,
                    'form__field--invalid': this.state.errors[field],
                  })}
                  type="text"
                  value={fieldValue}
                  required={requiredFields[i]}
                  onChange={this.changeHandler}
                  placeholder={`Please, enter ${field}`}
                />
              )}

              {this.state.errors[field] && (
                <span className="form__warning">Incorrect URL</span>
              )}
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
