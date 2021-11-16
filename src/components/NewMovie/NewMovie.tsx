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
  imgUrlError: boolean;
  imdbUrlError: boolean;
};

const initialMovie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    movie: { ...initialMovie },
    imgUrlError: false,
    imdbUrlError: false,
  };

  changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'imgUrl' || name === 'imdbUrl') {
      this.errorChecker(name, value);
    }

    this.setState((prevState) => {
      return {
        movie: {
          ...prevState.movie,
          [name]: value,
        } as unknown as Movie,
      };
    });
  };

  sumbitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { onAdd } = this.props;

    onAdd(this.state.movie);

    this.setState({
      movie: { ...initialMovie },
    });
  };

  errorChecker = (name: keyof Movie, value: string) => {
    const sitePattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    const tempError = value.length && !value.match(sitePattern);

    this.setState({
      [`${name}Error`]: tempError,
    } as unknown as Pick<State, keyof State>);
  };

  formatLabel = (label: string) => {
    const capitalizeFirstLetter = label.slice(0, 1).toUpperCase();
    const restWord = label.slice(1);

    return `${capitalizeFirstLetter}${restWord}:`;
  };

  render() {
    const requiredFields = [true, true, true, true, false];
    const hasErrors = this.state.imgUrlError || this.state.imdbUrlError;
    const isInvalidCheck = (tab: keyof Movie) => {
      if (tab === 'imgUrl' || tab === 'imdbUrl') {
        return this.state[`${tab}Error`];
      }

      return false;
    };

    return (
      <form
        className="form"
        onSubmit={this.sumbitHandler}
      >
        {Object.keys(this.state.movie).map((field, i) => {
          const fieldValue = this.state.movie[field as keyof Movie];

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
                  'form__field--invalid': isInvalidCheck(field as keyof Movie),
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
          disabled={hasErrors}
          type="submit"
        >
          Add movie
        </button>
      </form>
    );
  }
}
