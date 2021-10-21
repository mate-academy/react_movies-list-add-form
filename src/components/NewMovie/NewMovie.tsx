import React, { Component } from 'react';
import './NewMovie.scss';
import { TextInput } from '../TextInput';
import { TextAreaInput } from '../TextAreaInput';

type Props = {
  onAdd: (movie: Movie) => void,
};
type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  errors: {
    title: boolean,
    description: boolean,
    imgUrl: boolean,
    imdbUrl: boolean,
    imdbId: boolean,
  },
};
type InputEvents = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;
enum FieldNames {
  title = 'title',
  description = 'description',
  imgUrl = 'imgUrl',
  imdbUrl = 'imdbUrl',
  imdbId = 'imdbId',
}

const IMAGE_URL = 'https://via.placeholder.com/600x1000';
const IMDB_URL = 'https://www.imdb.com/';

const defaultState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
  errors: {
    title: false,
    description: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  },
};

export class NewMovie extends Component<Props, State> {
  state: State = defaultState;

  handleInputChange = (event: InputEvents) => {
    const { name, value } = event.target;

    this.setState(state => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  setSpecialValue = (field: string, value: string) => {
    this.setState(state => ({
      ...state,
      [field]: value,
      errors: {
        ...state.errors,
        [field]: false,
      },
    }));
  };

  validateTextInput = (event: InputEvents) => {
    const { name, value } = event.target;
    const valueWithoutSpaces = value.replace(/\s/g, '');

    this.setState(state => {
      return {
        ...state,
        errors: {
          ...state.errors,
          [name]: valueWithoutSpaces === '',
        },
      };
    });
  };

  validateLink = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const valueIsNotLink = !value.match(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

    this.setState(state => {
      return {
        ...state,
        errors: {
          ...state.errors,
          [name]: valueIsNotLink,
        },
      };
    });
  };

  isFormComplete = () => {
    const fields = Object.values(this.state).filter(value => typeof value === 'string');
    const hasEmptyFields = fields.some(field => field === '');
    const hasErrors = Object.values(this.state.errors).some(error => error);

    return hasEmptyFields || hasErrors;
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      errors,
    } = this.state;

    return (
      <form className="form">
        <TextInput
          fieldName={FieldNames.title}
          fieldId="title-input"
          fieldValue={title}
          labelText="Title"
          onInputChange={this.handleInputChange}
          validateField={this.validateTextInput}
          onSetSpecialValue={this.setSpecialValue}
          error={errors.title}
          isLink={false}
        />

        <TextAreaInput
          fieldName={FieldNames.description}
          fieldId="description-input"
          fieldValue={description}
          labelText="Description"
          onInputChange={this.handleInputChange}
          validateField={this.validateTextInput}
          error={errors.description}
        />

        <TextInput
          fieldName={FieldNames.imgUrl}
          fieldId="img-url-input"
          fieldValue={imgUrl}
          labelText="Image URL"
          onInputChange={this.handleInputChange}
          validateField={this.validateLink}
          onSetSpecialValue={this.setSpecialValue}
          error={errors.imgUrl}
          specialValue={IMAGE_URL}
          isLink
        />

        <TextInput
          fieldName={FieldNames.imdbUrl}
          fieldId="imdb-url-input"
          fieldValue={imdbUrl}
          labelText="IMDB URL"
          onInputChange={this.handleInputChange}
          validateField={this.validateLink}
          onSetSpecialValue={this.setSpecialValue}
          error={errors.imdbUrl}
          specialValue={IMDB_URL}
          isLink
        />

        <TextInput
          fieldName={FieldNames.imdbId}
          fieldId="imdb-id-input"
          fieldValue={imdbId}
          labelText="IMDB ID"
          onInputChange={this.handleInputChange}
          validateField={this.validateTextInput}
          onSetSpecialValue={this.setSpecialValue}
          error={errors.imdbId}
          isLink={false}
        />

        <button
          type="button"
          onClick={() => {
            this.props.onAdd({
              title,
              description,
              imgUrl,
              imdbUrl,
              imdbId,
            });
            this.setState(defaultState);
          }}
          disabled={this.isFormComplete()}
        >
          ADD
        </button>
      </form>
    );
  }
}
