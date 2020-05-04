import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    isValid_title: true,
    description: '',
    isValid_description: true,
    imgUrl: '',
    isValid_imgUrl: true,
    imdbUrl: '',
    isValid_imdbUrl: true,
    imdbId: '',
    isValid_imdbId: true,

  };

  fields = [
    'title',
    'description',
    'imgUrl',
    'imdbUrl',
    'imdbId',
  ]

  inputValidation = (name, value) => {
    switch (name) {
      case 'imdbId':
      case 'title':
      case 'description':
        return value.trim() !== '';
      case 'imgUrl':
      case 'imdbUrl':
        // eslint-disable-next-line
          return /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/.test(value);
      default: return true;
    }
  }

  handleFieldChange = (event) => {
    this.setState({
      [event.target.name]:
        event.target.value,
      [`isValid_${event.target.name}`]:
        this.inputValidation(event.target.name, event.target.value),

    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.title === '') {
      this.setState({
        isValid_title: false,
      });

      return;
    }

    if (this.state.description === '') {
      this.setState({
        isValid_description: false,
      });

      return;
    }

    if (this.state.imgUrl === '') {
      this.setState({
        isValid_imgUrl: false,
      });

      return;
    }

    if (this.state.imdbUrl === '') {
      this.setState({
        isValid_imdbUrl: false,
      });

      return;
    }

    if (this.state.imdbId === '') {
      this.setState({
        isValid_imdbId: false,
      });

      return;
    }

    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    this.props.addMovie({
      title, description, imgUrl, imdbUrl, imdbId,
    });

    this.setState({
      title: '',
      isValid_title: true,
      description: '',
      isValid_description: true,
      imgUrl: '',
      isValid_imgUrl: true,
      imdbUrl: '',
      isValid_imdbUrl: true,
      imdbId: '',
      isValid_imdbId: true,
    });
  }

  render() {
    return (
      <form className="new-movie" onSubmit={this.handleFormSubmit}>
        <fieldset>
          {this.fields.map(field => (
            <Fragment key={field}>
              <label htmlFor={field}>
                {`${field[0].toUpperCase() + field.slice(1)}  `}
                <br />
                <input
                  onFocus={this.handleFieldChange}
                  style={{
                    outline: 'none',
                    border: `1px solid ${(
                      this.state[`isValid_${field}`])
                      ? 'black' : 'red'}`,
                  }}
                  key={field}
                  type="text"
                  name={field}
                  value={this.state[field]}
                  onChange={this.handleFieldChange}
                />
              </label>
              <p
                className={`new-movie__error${(this.state[`isValid_${field}`])
                  ? '' : ' new-movie__error--visible'}`}

              >
                Not valid data
              </p>
            </Fragment>
          ))}

        </fieldset>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

export default NewMovie;
