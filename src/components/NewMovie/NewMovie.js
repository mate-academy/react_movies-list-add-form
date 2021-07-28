import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputText } from '../Input';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    imgUrlValidate: false,
    imdbUrlValidate: false,
    titleBlur: false,
    imgUrlBlur: false,
    imdbUrlBlur: false,
    imdbIdBlur: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  onSubmit = (event) => {
    event.preventDefault();

    const { title, description, imgUrl, imdbUrl, imdbId }
      = this.state;
    const { addMovie } = this.props;

    addMovie({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      imgUrlValidate: false,
      imdbUrlValidate: false,
      titleBlur: false,
      imgUrlBlur: false,
      imdbUrlBlur: false,
      imdbIdBlur: false,
    });
  }

  onBlur = (event) => {
    const { name, value } = event.target;

    this.setState({ [`${name}Blur`]: true });

    if (name === 'imgUrl' || name === 'imdbUrl') {
      // eslint-disable-next-line
      const regexp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

      if (regexp.test(value)) {
        this.setState({ [`${name}Validate`]: true });
      } else {
        this.setState({ [`${name}Validate`]: false });
      }
    }
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      imgUrlValidate,
      imdbUrlValidate,
      titleBlur,
      imgUrlBlur,
      imdbUrlBlur,
      imdbIdBlur,
    } = this.state;

    const buttonActive
      = !!title && !!imdbId && imgUrlValidate && imdbUrlValidate;

    return (
      <form onSubmit={event => this.onSubmit(event)}>
        <InputText
          name="title"
          value={title}
          change={this.handleChange}
          required
          onBlur={this.onBlur}
          blured={titleBlur}
        />
        <InputText
          name="description"
          value={description}
          change={this.handleChange}
          onBlur={this.onBlur}
        />
        <InputText
          name="imgUrl"
          value={imgUrl}
          change={this.handleChange}
          required
          validate
          valid={imgUrlValidate}
          onBlur={this.onBlur}
          blured={imgUrlBlur}
        />
        <InputText
          name="imdbUrl"
          value={imdbUrl}
          change={this.handleChange}
          required
          validate
          valid={imdbUrlValidate}
          onBlur={this.onBlur}
          blured={imdbUrlBlur}
        />
        <InputText
          name="imdbId"
          value={imdbId}
          change={this.handleChange}
          required
          onBlur={this.onBlur}
          blured={imdbIdBlur}
        />
        <button
          type="submit"
          className="btn btn-primary btn-lg"
          disabled={buttonActive === false ? 'disabled' : false}
          style={buttonActive === false ? { backgroundColor: 'grey' } : {}}
        >
          Submit
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
