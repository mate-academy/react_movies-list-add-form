import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputField } from '../InputField';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

type Validate = {
  titleValid: boolean;
  imgUrlValid: boolean;
  imdbIdValid: boolean;
  imdbUrlValid: boolean;
};

type State = Movie & Validate;

const defaultState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
  titleValid: true,
  imgUrlValid: true,
  imdbIdValid: true,
  imdbUrlValid: true,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    ...defaultState,
  };

  handleChange = (event: InputAndTextareaEvent) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      [`${name}Valid`]: true,
    } as Pick<State, keyof State>);
  };

  validate = (values: string[]) => {
    return values.every(item => item);
  };

  onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const {
      title, description, imgUrl, imdbId, imdbUrl,
    } = this.state;
    const movieRequiredData = {
      title, imgUrl, imdbUrl, imdbId,
    };

    if (!this.validate(Object.values(movieRequiredData))) {
      this.setState({
        titleValid: !!title,
        imgUrlValid: !!imgUrl,
        imdbIdValid: !!imdbId,
        imdbUrlValid: !!imdbUrl,
      });

      return;
    }

    this.props.onAdd({ ...movieRequiredData, description });
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
      titleValid,
      imgUrlValid,
      imdbIdValid,
      imdbUrlValid,
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
            valid={titleValid}
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
            valid={imgUrlValid}
            handleChange={this.handleChange}
          />
          <InputField
            name="imdbId"
            value={imdbId}
            valid={imdbIdValid}
            handleChange={this.handleChange}
          />
          <InputField
            name="imdbUrl"
            value={imdbUrl}
            valid={imdbUrlValid}
            handleChange={this.handleChange}
          />
          <button
            type="submit"
            className="btn btn-primary"
          >
            Add
          </button>
        </form>
      </>
    );
  }
}
