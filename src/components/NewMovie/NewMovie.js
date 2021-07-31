import React, { Component } from 'react';
import propTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  submitMovie = (event) => {
    event.preventDefault();
    this.props.onAdd(this.state);

    this.setState(state => ({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    }));
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form
        onSubmit={this.submitMovie}
        className="form"
      >
        <div>
          <strong>
            Title:
          </strong>
          {' '}
          <input
            name="title"
            value={title}
            placeholder="Title"
            onChange={this.handleChange}
            className="form-control"
          />
        </div>
        <div>
          <strong>
            Describe:
          </strong>
          {' '}
          <input
            name="description"
            value={description}
            placeholder="Description"
            onChange={this.handleChange}
            className="form-control"
          />
        </div>
        <div>
          <strong>
            ImgUrl:
          </strong>
          {' '}
          <input
            name="imgUrl"
            value={imgUrl}
            placeholder="https://"
            onChange={this.handleChange}
            className="form-control"
          />
        </div>
        <div>
          <strong>
            ImdbUrl:
          </strong>
          {' '}
          <input
            name="imdbUrl"
            value={imdbUrl}
            placeholder="https://"
            onChange={this.handleChange}
            className="form-control"
          />
        </div>
        <div>
          <strong>
            ImdbId:
          </strong>
          {' '}
          <input
            name="imdbId"
            value={imdbId}
            placeholder="unique ID"
            onChange={this.handleChange}
            className="form-control"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Add Movie
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  onAdd: propTypes.func.isRequired,
};
