/* eslint-disable max-len */
import React from 'react';
import './NewMovie.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

type Props = {
  addMovie: (movie: Movie) => void;
};

type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

export class NewMovie extends React.Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.addMovie(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form className="NewMovie" onSubmit={this.handleSubmitForm}>
        <p className="NewMovie__title">Create new movie 🎬</p>
        <section className="NewMovie__section">
          <Form.Control
            type="text"
            name="title"
            value={title}
            className="NewMovie__input"
            placeholder="Title"
            pattern="[A-Za-z0-9]+"
            onChange={this.handleInputChange}
            required
          />
        </section>

        <section className="NewMovie__section">
          <Form.Control
            type="text"
            name="description"
            value={description}
            className="NewMovie__input"
            placeholder="Description"
            pattern="[A-Za-z0-9]+"
            onChange={this.handleInputChange}
            required
          />
        </section>

        <section className="NewMovie__section">
          <Form.Control
            type="url"
            name="imgUrl"
            value={imgUrl}
            className="NewMovie__input"
            placeholder="imgUrl"
            pattern="https?://.+"
            onChange={this.handleInputChange}
            required
          />
        </section>

        <section className="NewMovie__section">
          <Form.Control
            type="url"
            name="imdbUrl"
            value={imdbUrl}
            className="NewMovie__input"
            placeholder="imdbUrl"
            pattern="https?://.+"
            onChange={this.handleInputChange}
            required
          />
        </section>

        <section className="NewMovie__section">
          <Form.Control
            type="text"
            name="imdbId"
            value={imdbId}
            className="NewMovie__input"
            placeholder="imdbId"
            onChange={this.handleInputChange}
            pattern="[A-Za-z0-9]+"
            required
          />
        </section>

        <Button
          variant="outline-secondary"
          type="submit"
          className="NewMovie__button"
        >
          Add
        </Button>
      </form>
    );
  }
}
