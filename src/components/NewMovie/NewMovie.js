import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    imgUrlEr: false,
    imdbUrlEr: false,
  };

  submitForm = (event) => {
    event.preventDefault();
    const movie = {
      title: this.state.title,
      description: this.state.description,
      imgUrl: this.state.imbdUrl,
      imdbUrl: this.state.imdbUrl,
      imdbId: this.state.imdbId,
    };

    this.props.onAdd(movie);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      imgUrlEr: false,
      imdbUrlEr: false,
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'imgUrl' || name === 'imdbUrl') {
      /* eslint-disable */
      const validator = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
      /* eslint-enable */

      if (validator.test(value)) {
        this.setState({ [name]: value });
        switch (name) {
          case 'imgUrl':
            this.setState({ imgUrlEr: false });
            break;
          case 'imdbUrl':
            this.setState({ imdbUrlEr: false });
            break;
          default:
            this.setState({
              imgUrlEr: false, imdbUrlEr: false,
            });
        }
      } else {
        this.setState({ [name]: value });
        switch (name) {
          case 'imgUrl':
            this.setState({ imgUrlEr: true });
            break;
          case 'imdbUrl':
            this.setState({ imdbUrlEr: true });
            break;
          default:
            this.setState({
              imgUrlEr: true, imdbUrlEr: true,
            });
        }
      }
    } else {
      this.setState({ [name]: value });
    }
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleChange}
          required="true"
        />
        <br />
        <br />
        <textarea
          name="description"
          placeholder="What is the movie about?"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <br />
        <br />
        <input
          type="text"
          name="imgUrl"
          placeholder="add imgUrl"
          value={this.state.imgUrl}
          onChange={this.handleChange}
          required="true"
          className={this.state.imgUrlEr ? 'red' : ''}
        />
        <br />
        <span className={this.state.imgUrlEr ? 'error' : ''} />
        <br />
        <input
          type="text"
          name="imdbUrl"
          placeholder="add imdbUrl"
          value={this.state.imdbUrl}
          onChange={this.handleChange}
          required="true"
          className={this.state.imdbUrlEr ? 'red' : ''}
        />
        <br />
        <span className={this.state.imdbUrlEr ? 'error' : ''} />
        <br />
        <input
          type="text"
          name="imdbId"
          placeholder="add movie imdbId"
          value={this.state.imdbId}
          onChange={this.handleChange}
          required="true"
        />
        <br />
        <button
          type="submit"
          disabled={this.state.imgUrlEr || this.state.imdbUrlEr}
        >
          Add movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
