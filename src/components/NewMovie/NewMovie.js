import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  addData = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  submit = (event) => {
    event.preventDefault();

    this.props.addMovie(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    return (
      <form
        className="form"
        onSubmit={this.submit}
      >
        <div className="title">
          Add a new movie here:
        </div>

        <div>
          Name:
        </div>
        <input
          className="input"
          type="text"
          name="title"
          value={this.state.title}
          placeholder="type a title here"
          onChange={this.addData}
        />

        <div>
          Description:
        </div>
        <input
          className="input"
          type="text"
          name="description"
          value={this.state.description}
          placeholder="type a description here"
          onChange={this.addData}
        />

        <div>
          Type imgUrl:
        </div>
        <input
          className="input"
          type="text"
          name="imgUrl"
          value={this.state.imgUrl}
          placeholder="type a imgUrl here"
          onChange={this.addData}
        />

        <div>
          Type imdbUrl:
        </div>
        <input
          className="input"
          type="text"
          name="imdbUrl"
          value={this.state.imdbUrl}
          placeholder="type a imdbUrl here"
          onChange={this.addData}
        />

        <div>
          Type imdbId:
        </div>
        <input
          className="input"
          type="text"
          name="imdbId"
          value={this.state.imdbId}
          placeholder="type a imdbId here"
          onChange={this.addData}
        />

        <button
          type="submit"
          className="submit"
        >
          ADD
        </button>

      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
