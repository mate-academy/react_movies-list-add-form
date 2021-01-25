import React from 'react';
import PropTypes from 'prop-types';

import './NewMovie.scss';

export class NewMovie extends React.Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    errors: [],
    isValied: true,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // if (!this.controlsValuesOnBlur()) {
    // }
    this.props.onAdd(this.state);

    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  // controlsValuesOnBlur = () => {
  //   const {
  //     title,
  //     imgUrl,
  //     imdbUrl,
  //     imdbId,
  //     errors,
  //   } = this.state;

  //   let {
  //     isValied,
  //   } = this.state;

  //   if (!title) {
  //     isValied = !isValied;
  //     errors.push('Please, input the title');
  //   }

  //   // eslint-disable-next-line
  //   if (!/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A
  //   -Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[
  //   +~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/.test(imgUrl)) {
  //     isValied = false;
  //     errors.push('Please, input the valid imgUrl');
  //   }

  //   // eslint-disable-next-line
  //   if (!/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+
  // |(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-
  //  +=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/.test(imdbUrl)) {
  //     isValied = false;
  //     errors.push('Please, input the valid imdbUrl');
  //   }

  //   if (!imdbId) {
  //     isValied = false;
  //     errors.push('Please, input the imdbId');
  //   }

  //   this.setState({
  //     errors,
  //   });

  //   return isValied;
  // }

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
      <form onSubmit={this.handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Enter a title"
          value={title}
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Enter a description"
          value={description}
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="imgUrl"
          placeholder="Enter a imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="imdbUrl"
          placeholder="Enter a imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
        />

        <input
          type="text"
          name="imdbId"
          placeholder="Enter a imdbId"
          value={imdbId}
          onChange={this.handleChange}
        />

        <ol className="errors">
          {errors.map(error => (
            <li>{error}</li>
          ))}
        </ol>

        <button
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
