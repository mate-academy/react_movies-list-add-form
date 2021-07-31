import React from 'react';
import PropTypes from 'prop-types';

export class NewMovie extends React.PureComponent {
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

  submitMovieAdd = (event) => {
    event.preventDefault();
    const { title, description, imdbId, imdbUrl, imgUrl } = this.state;
    const newMovie = {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    };

    const { onAdd } = this.props;

    onAdd(newMovie);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',

    });
  };

  render() {
    const { title, description, imdbId, imdbUrl, imgUrl } = this.state;
    const { handleChange, submitMovieAdd } = this;

    return (
      <>
        <div className="display-5 sidebar__title">
          Add a movie:
        </div>
        <form
          onSubmit={submitMovieAdd}
        >
          <div
            className="sidebar__form"
          >
            <input
              className="mb-3 "
              name="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={handleChange}
              required
            />
            <textarea
              className="mb-3"
              type="text"
              placeholder=" Description"
              name="description"
              value={description}
              onChange={handleChange}
              cols="40"
              rows="5"
              required
            />
            <input
              className="mb-3"
              type="text"
              placeholder="imgUrl"
              value={imgUrl}
              name="imgUrl"
              onChange={handleChange}
              required
            />
            <input
              className="mb-3"
              type="text"
              placeholder="imdbUrl"
              value={imdbUrl}
              name="imdbUrl"
              onChange={handleChange}
              required
            />
            <input
              className="mb-3"
              type="text"
              placeholder="imdbId"
              value={imdbId}
              name="imdbId"
              onChange={handleChange}
              required
            />
            <div form__submit>
              <button
                type="submit"
                className="btn btn-secondary btn-lg"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
