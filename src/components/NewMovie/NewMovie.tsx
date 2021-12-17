/* eslint-disable no-console */
import React from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};
type State = {
  newMovie: Movie;
};

export class NewMovie extends React.Component<Props, State> {
  state: State = {
    newMovie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },
  };

  handleChange = (
    event:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    this.setState(st => ({
      newMovie: {
        ...st.newMovie,
        [name]: value,
      },
    }));
  };

  onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.onAdd(this.state.newMovie);

    this.setState({
      newMovie: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
    });
  };

  render() {
    console.log(this.state);
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state.newMovie;

    return (
      <form onSubmit={this.onSubmit} className="sidebar__form Form">
        <label htmlFor="form-title" className="Form__label">
          Film title:
          <input
            className="Form__input Form__title"
            type="text"
            name="title"
            id="form-title"
            value={title}
            onChange={this.handleChange}
            placeholder="type title here..."
            required
          />
        </label>
        <label htmlFor="form-description" className="Form__label">
          Film description:
          <textarea
            className="Form__input Form__description"
            name="description"
            id="form-description"
            value={description}
            onChange={this.handleChange}
            rows={4}
            placeholder="type description here..."
            required
          />
        </label>
        <label htmlFor="form-imgUrl" className="Form__label">
          Link for film poster:
          <input
            className="Form__input Form__imgUrl"
            type="text"
            name="imgUrl"
            id="form-imgUrl"
            value={imgUrl}
            onChange={this.handleChange}
            placeholder="type imgUrl here..."
            required
          />
        </label>
        <label htmlFor="form-imdbUrl" className="Form__label">
          Link to the IMDb:
          <input
            className="Form__input Form__imdbUrl"
            type="text"
            name="imdbUrl"
            id="form-imdbUrl"
            value={imdbUrl}
            onChange={this.handleChange}
            placeholder="type imdbUrl here..."
            required
          />
        </label>
        <label htmlFor="form-imdbId" className="Form__label">
          Films id on the IMDb:
          <input
            className="Form__input Form__imdbId"
            type="text"
            name="imdbId"
            id="form-imdbId"
            value={imdbId}
            onChange={this.handleChange}
            placeholder="type imdbId here..."
            required
          />
        </label>

        <button className="Form__btn" type="submit">Add film</button>
      </form>
    );
  }
}
