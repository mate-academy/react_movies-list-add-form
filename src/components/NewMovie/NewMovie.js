import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

const formFieldsApi = [
  {
    title: 'title',
    description: 'Title',
    value: '',
  },
  {
    title: 'description',
    description: 'description',
    value: '',
  },
  {
    title: 'imgUrl',
    description: 'imgUrl',
    value: '',
  },
  {
    title: 'imdbUrl',
    description: 'imdbUrl',
    value: '',
  },
  {
    title: 'imdbId',
    description: 'imdbId',
    value: '',
  },
];

export class NewMovie extends Component {
  state = {
    formFields: formFieldsApi,
    newMovie: {},
    addMovie: this.props.addMovie,
  };

  updateNewMovie = (event, index, title) => {
    const myEvent = { ...event };

    this.setState(prevState => (
      {
        newMovie: {
          ...prevState.newMovie,
          [title]: myEvent.target.value,
        },
        formFields: (
          this.updateFormFieldsValue(prevState.formFields, myEvent, index)
        ),
      }
    ));
  };

  updateFormFieldsValue = (prev, myEvent, index) => {
    const newFormField = [...prev];

    newFormField[index].value = myEvent.target.value;

    return newFormField;
  };

  SendMovie = () => {
    this.state.addMovie(this.state.newMovie);
    this.setState(prevState => (
      /* eslint-disable no-param-reassign */
      {
        newMovie: {},
        formFields: prevState.formFields.map((obj) => {
          obj.value = '';

          return obj;
        }),
      }
      /* eslint-enable no-param-reassign */
    ));
  };

  render() {
    const { formFields } = this.state;

    return (
      <form>
        {
          formFields.map((field, index) => (
            <div className="movie-form-wrapper" key={field.title}>
              <label htmlFor={field.title}>{field.description}</label>
              <input
                type="text"
                className={`movie-form-${field.title} movie-form-item`}
                id={field.title}
                value={formFields[index].value}
                onChange={event => (
                  this.updateNewMovie(event, index, field.title)
                )}
              />
            </div>
          ))
        }

        <button type="button" onClick={this.SendMovie}>Add new movie</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
