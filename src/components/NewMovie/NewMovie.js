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

  onSubmit = (event) => {
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

    const { handleChange, onSubmit } = this;

    return (
      <>
        <div className="display-5 sidebar__title">
          Add a movie:
        </div>
        <form
          onSubmit={onSubmit}
        >
          <div>
            <input
              name="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={handleChange}
              required
            />
            <textarea
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
              type="text"
              placeholder="imgUrl"
              value={imgUrl}
              name="imgUrl"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="imdbUrl"
              value={imdbUrl}
              name="imdbUrl"
              onChange={handleChange}
              required
            />
            <input
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
