import React from 'react';
import PropTypes from 'prop-types';
import './NewMovie.scss';

export class NewMovie extends React.Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    hasError: false,
  };

  handleChange = (event) => {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value,
      hasError: false,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState(state => ({
      hasError: !state.title && !state.description
        && !state.imgUrl && !state.imdbUrl,
    }));

    const { title, description, imgUrl, imdbUrl } = this.state;

    if (!title && !description && !imgUrl && !imdbUrl) {
      return;
    }

    this.props.onAdd(title, description, imgUrl, imdbUrl);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
    });
  };

  render() {
    const { hasError } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="form"
      >
        <input
          name="title"
          type="text"
          value={this.state.title}
          placeholder="Title"
          onChange={this.handleChange}
        />
        <textarea
          name="description"
          value={this.state.description}
          placeholder="Description"
          onChange={this.handleChange}
        />
        <input
          name="imgUrl"
          type="text"
          value={this.state.imgUrl}
          placeholder="ImgUrl"
          onChange={this.handleChange}
        />
        <input
          name="imdbUrl"
          type="text"
          value={this.state.imdbUrl}
          placeholder="ImdbUrl"
          onChange={this.handleChange}
        />
        {hasError && (
          <div className="error">Fill all fields!</div>
        )}
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
