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
    errors: {
      titleError: {
        empty: 'er',
      },
      imgUrlError: {
        empty: 'gf',
        wrongFormat: '',
      },
      imdbIdError: {
        empty: '',
        wrongFormat: '',
      },
    },
    validation: false,
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const movie = this.state;

    this.props.onAdd(movie);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  validateField = (event) => {
    const field = event.target.name;

    if (event.target.value.length === 0) {
      this.setState(prevState => ({
        ...prevState,
        errors: { [field.concat('Error')]: { empty: 'is required' } },
      }));
    }
  }

  hangleField = (event) => {
    const field = event.target.name;

    this.setState({ [field]: event.target.value });
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="form"
      >
        <fieldset>
          <legend>New film informanition:</legend>
          <div className="field">
            <label htmlFor="title">Title:&nbsp;</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={this.hangleField}
            />
          </div>
          <div className="field">
            <label htmlFor="description">Description:&nbsp;</label>
            <textarea
              id="description"
              name="description"
              className="description"
              value={description}
              onChange={this.hangleField}
            />
          </div>
          <div className="field">
            <label htmlFor="imgUrl">imgUrl:&nbsp;</label>
            <input
              type="text"
              id="imgUrl"
              name="imgUrl"
              value={imgUrl}
              onChange={this.hangleField}
              onBlur={this.validateField.bind(this)}
            />
          </div>
          <div className="field">
            <label htmlFor="imdbUrl">imdbUrl:&nbsp;</label>
            <input
              type="text"
              id="imdbUrl"
              name="imdbUrl"
              value={imdbUrl}
              onChange={this.hangleField}
            />
          </div>
          <div className="field">
            <label htmlFor="imdbId">imdbId:&nbsp;</label>
            <input
              type="text"
              id="imdbId"
              name="imdbId"
              value={imdbId}
              onChange={this.hangleField}
            />
          </div>
        </fieldset>
        <button
          type="submit"
          className=""
        >
          Add a film
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
