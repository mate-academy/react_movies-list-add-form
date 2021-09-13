import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputField } from '../InputField';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

type State = Movie;

const defaultState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    ...defaultState,
  };

  handleChange = (event: InputAndTextareaEvent) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as Pick<State, keyof State>);
  };

  onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    this.props.onAdd({ ...this.state });
    this.setState({
      ...defaultState,
    });
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbId,
      imdbUrl,
    } = this.state;

    return (
      <>
        <h2>Film data</h2>
        <form
          action=""
          className="row g-3"
          onSubmit={this.onSubmit}
        >
          <InputField
            name="title"
            value={title}
            handleChange={this.handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            className="form-control"
            value={description}
            onChange={this.handleChange}
            autoComplete="off"
          />
          <InputField
            name="imgUrl"
            value={imgUrl}
            handleChange={this.handleChange}
          />
          <InputField
            name="imdbId"
            value={imdbId}
            handleChange={this.handleChange}
          />
          <InputField
            name="imdbUrl"
            value={imdbUrl}
            handleChange={this.handleChange}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!title || !imgUrl || !imdbId || !imdbUrl}
          >
            Add
          </button>
        </form>
      </>
    );
  }
}
