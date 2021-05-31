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
  };

  changeHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onAdd(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <h2>Add a new movie</h2>
        <input
          name="title"
          type="text"
          value={title}
          placeholder="Title"
          onChange={this.changeHandler}
        />
        <textarea
          name="description"
          value={description}
          placeholder="Description"
          onChange={this.changeHandler}
        />
        <input
          name="imgUrl"
          type="url"
          value={imgUrl}
          placeholder="ImgUrl"
          onChange={this.changeHandler}
        />
        <input
          name="imdbUrl"
          type="url"
          value={imdbUrl}
          placeholder="ImdbUrl"
          onChange={this.changeHandler}
        />
        <input
          name="imdbId"
          type="text"
          value={imdbId}
          placeholder="ImdbId"
          onChange={this.changeHandler}
        />
        <button
          type="submit"
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
