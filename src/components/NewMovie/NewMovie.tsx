import React from 'react';
import './NewMovie.scss';
import classNames from 'classnames';

const REGEX = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

type Props = {
  addMovie:(preparedObject:Movie) => void;
};

type State = {
  movieNameValue:string;
  showNameError:boolean;
  movieDescriptionValue:string;
  imageUrl:string;
  showImageUrlError:boolean;
  showImageValidateUrlError:boolean;
  imdbUrl:string;
  showImdbUrlError:boolean;
  showImdbValidateUrlError:boolean,
  imdbId:string;
  showImdbIdError:boolean;
};

export class NewMovie extends React.Component<Props, State> {
  state: State = {
    movieNameValue: '',
    showNameError: false,
    movieDescriptionValue: '',
    imageUrl: '',
    showImageUrlError: false,
    showImageValidateUrlError: false,
    imdbUrl: '',
    showImdbUrlError: false,
    showImdbValidateUrlError: false,
    imdbId: '',
    showImdbIdError: false,
  };

  validateUrl = (string: string) => {
    return REGEX.test(string);
  };

  formActionHandler = (
    event:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
    actionType:string,
  ) => {
    event.preventDefault();

    switch (actionType) {
      case ('movieNameValue'):
        if (event.target.value === '') {
          this.setState({
            [actionType]: '',
            showNameError: true,
          });
        } else {
          this.setState({
            [actionType]: event.target.value,
            showNameError: false,
          });
        }

        break;
      case ('movieDescriptionValue'):
        this.setState({
          [actionType]: event.target.value,
        });

        break;
      case ('imageUrl'):
        if (event.target.value === '') {
          this.setState({
            [actionType]: '',
            showImageUrlError: true,
            showImageValidateUrlError: false,
          });
        } else {
          this.setState({
            [actionType]: event.target.value,
            showImageUrlError: false,
          });
          if (!this.validateUrl(event.target.value)) {
            this.setState({
              showImageValidateUrlError: true,
            });
          } else {
            this.setState({
              showImageValidateUrlError: false,
            });
          }
        }

        break;
      case ('imdbUrl'):
        if (event.target.value === '') {
          this.setState({
            [actionType]: '',
            showImdbUrlError: true,
          });
        } else {
          this.setState({
            [actionType]: event.target.value,
            showImdbUrlError: false,
          });
          if (!this.validateUrl(event.target.value)) {
            this.setState({
              showImdbValidateUrlError: true,
            });
          } else {
            this.setState({
              showImdbValidateUrlError: false,
            });
          }
        }

        break;
      case ('imdbId'):
        if (event.target.value === '') {
          this.setState({
            [actionType]: '',
            showImdbIdError: true,
          });
        } else {
          this.setState({
            [actionType]: event.target.value,
            showImdbIdError: false,
          });
        }

        break;
      default:
        throw new Error('Wrong type of form event');
    }
  };

  formSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (this.state.movieNameValue === '') {
      this.setState({
        showNameError: true,
      });
    }

    if (this.state.imageUrl === '') {
      this.setState({
        showImageUrlError: true,
      });
    }

    if (this.state.imdbUrl === '') {
      this.setState({
        showImdbUrlError: true,
      });
    }

    if (this.state.imdbId === '') {
      this.setState({
        showImdbIdError: true,
      });
    } else if (!this.state.showImdbValidateUrlError && !this.state.showImageValidateUrlError) {
      const preparedObject = {
        title: this.state.movieNameValue,
        description: this.state.movieDescriptionValue,
        imgUrl: this.state.imageUrl,
        imdbUrl: this.state.imdbUrl,
        imdbId: this.state.imdbId,
      };

      this.props.addMovie(preparedObject);
      this.setState({
        movieNameValue: '',
        movieDescriptionValue: '',
        imageUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.formSubmit}>
        <input
          type="text"
          maxLength={100}
          placeholder="Enter movie tittle *(is required)"
          value={this.state.movieNameValue}
          onChange={event => this.formActionHandler(event, 'movieNameValue')}
          className="formField movieTittleInput"
          onBlur={event => this.formActionHandler(event, 'movieNameValue')}
        />
        <p className={classNames('FieldError', {
          visibleError: this.state.showNameError,
        })}
        >
          Please fill this field
        </p>
        <textarea
          value={this.state.movieDescriptionValue}
          className="formField movieTittleTextarea"
          placeholder="Enter movie description"
          rows={10}
          onChange={event => this.formActionHandler(event, 'movieDescriptionValue')}
        />
        <input
          type="text"
          placeholder="Enter movie image url *(is required)"
          value={this.state.imageUrl}
          onChange={event => this.formActionHandler(event, 'imageUrl')}
          className="formField movieTittleInput"
          onBlur={event => this.formActionHandler(event, 'imageUrl')}
        />
        <p className={classNames('FieldError', {
          visibleError: this.state.showImageUrlError || this.state.showImageValidateUrlError,
        })}
        >
          {this.state.showImageValidateUrlError ? 'Invalid url format' : 'Please fill this field'}
        </p>
        <input
          type="text"
          placeholder="Enter movie imdb url *(is required)"
          value={this.state.imdbUrl}
          onChange={event => this.formActionHandler(event, 'imdbUrl')}
          className="formField movieTittleInput"
          onBlur={event => this.formActionHandler(event, 'imdbUrl')}
        />
        <p className={classNames('FieldError', {
          visibleError: this.state.showImdbUrlError || this.state.showImdbValidateUrlError,
        })}
        >
          {this.state.showImdbValidateUrlError ? 'Invalid url format' : 'Please fill this field'}
        </p>
        <input
          type="text"
          placeholder="Enter movie imdb id *(is required)"
          value={this.state.imdbId}
          onChange={event => this.formActionHandler(event, 'imdbId')}
          className="formField movieTittleInput"
          onBlur={event => this.formActionHandler(event, 'imdbId')}
        />
        <p className={classNames('FieldError', {
          visibleError: this.state.showImdbIdError,
        })}
        >
          Please fill this field
        </p>
        <button
          type="submit"
          className={
            classNames(
              'submitButton',
              {
                BlockButton: this.state.imdbId === ''
                || this.state.imdbUrl === ''
                  || this.state.imageUrl === ''
                  || this.state.movieNameValue === ''
                  || this.state.showImageValidateUrlError
                  || this.state.showImdbValidateUrlError,
              },
            )
          }
        >
          Add new Movie
        </button>
      </form>
    );
  }
}
