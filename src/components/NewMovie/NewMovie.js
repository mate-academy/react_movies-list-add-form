import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../Form/TextInput';
import TextArea from '../Form/TextArea';

const defaultMovieProps = {
  title: {
    value: '',
    input: '',
    type: 'text',
    fieldLabel: 'Title',
    isValid: false,
    showError: false,
  },
  description: {
    value: '',
    input: '',
    type: 'textarea',
    fieldLabel: 'Description',
    isValid: false,
    showError: false,
  },
  imgUrl: {
    value: '',
    input: '',
    type: 'url',
    fieldLabel: 'Image URL',
    isValid: false,
    showError: false,
  },
  imdbUrl: {
    value: '',
    input: '',
    type: 'url',
    fieldLabel: 'IMDB URL',
    isValid: false,
    showError: false,
  },
  imdbId: {
    value: '',
    input: '',
    type: 'text',
    fieldLabel: 'IMDB ID',
    isValid: false,
    showError: false,
  },
};

export class NewMovie extends Component {
  state = {
    ...defaultMovieProps,
  };

  textsOfErrors = {
    default: 'Please fill in the field correctly.',
    url: 'Please enter a valid URL',
  }

  componentDidMount() {
    this.reset();
  }

  reset = () => {
    this.setState(() => ({
      ...defaultMovieProps,
    }));
  }

  checkValid = (field, value = '', type) => {
    if (type === 'text' || type === 'textarea') {
      this.setMovieProp(field, 'isValid', !!value.trim());
    }

    if (type === 'url') {
      // eslint-disable-next-line max-len
      const urlPattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
      const isValid = urlPattern.test(value);

      this.setMovieProp(field, 'isValid', isValid);
    }
  };

  setMovieProp = (field, prop, value) => {
    this.setState(state => ({
      ...state,
      [field]: {
        ...state[field],
        [prop]: value,
      },
    }));
  }

  onAdd = (e) => {
    e.preventDefault();

    const isAllValid = Object.values(this.state).every(prop => prop.isValid);

    if (!isAllValid) {
      return;
    }

    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;
    const preparedMovie = {
      title: title.value,
      description: description.value,
      imgUrl: imgUrl.value,
      imdbUrl: imdbUrl.value,
      imdbId: imdbId.value,
    };

    this.reset();
    this.props.addMovie(preparedMovie);
  };

  handleFieldBlur = ({ target }) => {
    const { id, value } = target;
    const { type } = this.state[id];

    this.checkValid(id, value, type);
    this.setMovieProp(id, 'value', value.trim());
    this.setMovieProp(id, 'showError', true);
  }

  handleFieldChange = ({ target }) => {
    const { id, value } = target;
    const { type } = this.state[id];

    this.checkValid(id, value.trim(), type);
    this.setMovieProp(id, 'input', value);
  }

  render() {
    return (
      <form onSubmit={this.onAdd} className="form">
        {Object.entries(this.state).map((field) => {
          const [fieldName, fieldData] = field;

          if (fieldData.type === 'textarea') {
            return (
              <TextArea
                key={fieldName}
                fieldName={fieldName}
                fieldData={fieldData}
                textsOfErrors={this.textsOfErrors}
                handleFieldBlur={this.handleFieldBlur}
                handleFieldChange={this.handleFieldChange}
              />
            );
          }

          return (
            <TextInput
              key={fieldName}
              fieldName={fieldName}
              fieldData={fieldData}
              textsOfErrors={this.textsOfErrors}
              handleFieldBlur={this.handleFieldBlur}
              handleFieldChange={this.handleFieldChange}
            />
          );
        })}

        <button type="submit" className="form__button">Submit</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
