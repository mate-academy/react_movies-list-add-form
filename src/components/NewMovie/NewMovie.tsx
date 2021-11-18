import { Component } from 'react';
import classNames from 'classnames';
import { ChangesEvent, SubmitEvent, HtmlPropsForMovieForm } from '../../types/types';
import './NewMovie.scss';
import { FormField } from './FormField/FormField';

type MovieErrors = RequireAtLeastOne<FormFieldErrors<Movie>, 'imgUrl' | 'imdbUrl'>;

type Props = {
  onAdd: (movie: Movie) => void;
};

type State = {
  movie: Movie;
  errors: MovieErrors;
};

export class NewMovie extends Component<Props, State> {
  initialMovie: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  initialErrors: MovieErrors = {
    imgUrl: false,
    imdbUrl: false,
  };

  state: State = {
    movie: { ...this.initialMovie },
    errors: { ...this.initialErrors },
  };

  hasErrors = (): boolean => {
    return Object.values(this.state.errors).some(value => value);
  };

  isAllCompleted = (): boolean => {
    return Object.values(this.state.movie).every(text => text.length);
  };

  changeHandler = (e: ChangesEvent): void => {
    const { name, value } = e.target;

    if (Object.keys(this.state.errors).includes(name)) {
      this.checkError(name, value);
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

  sumbitHandler = (e: SubmitEvent): void => {
    e.preventDefault();
    const { onAdd } = this.props;

    onAdd(this.state.movie);

    this.setState({
      movie: { ...this.initialMovie },
    });
  };

  checkError = (name: string, value: string) => {
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

  getFieldProps = (
    field: keyof Movie,
    isFieldRequired: boolean,
  ) => {
    return (extraClass?: (string | null)): HtmlPropsForMovieForm => {
      return {
        name: field,
        class: classNames(
          extraClass,
          'form__field',
          { 'form__field--invalid': this.state.errors[field] },
        ),
        value: this.state.movie[field],
        required: isFieldRequired,
        placeholder: `Please, enter ${field}`,
        onChange: this.changeHandler,
      };
    };
  };

  render() {
    const requiredFields: boolean[] = [true, true, true, true, false];

    return (
      <form
        className="form"
        onSubmit={this.sumbitHandler}
      >
        {
          (Object.keys(this.state.movie) as Array<keyof Movie>).map((field, i) => {
            const fieldProps = this.getFieldProps(field, requiredFields[i]);

            return (
              <FormField
                fieldProps={fieldProps}
                hasFieldError={this.state.errors[field] || false}
              />
            );
          })
        }

        <button
          className="form__submit"
          disabled={this.hasErrors() || !this.isAllCompleted()}
          type="submit"
        >
          Add movie
        </button>
      </form>
    );
  }
}
