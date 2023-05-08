/* eslint-disable max-len */
import { Component } from 'react';
import classNames from 'classnames';

import './NewMovie.scss';

type Props = {
  onAdd:(newMovie: Movie) => void,
};

type State = {
  newMovie: Movie,
  title: boolean,
  description: boolean,
  imgUrl: boolean,
  imdbUrl: boolean,
  imdbId: boolean,
  formValid: boolean,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    newMovie: {
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    },

    title: false,
    description: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
    formValid: true,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState((state) => ({
      newMovie: {
        ...state.newMovie,
        [event.target.name]: event.target.value,
      },
    }));
  };

  handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      title, description, imgUrl, imdbUrl, imdbId,
    } = this.state.newMovie;

    switch (event.target.name) {
      case 'title':
        this.setState({ title: title === '' });
        break;
      case 'description':
        this.setState({ description: description === '' });
        break;
      case 'imgUrl':
        this.setState({ imgUrl: imgUrl === imgUrl.replace(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/, '') });
        break;
      case 'imdbUrl':
        this.setState({ imdbUrl: imdbUrl === imdbUrl.replace(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/, '') });
        break;
      case 'imdbId':
        this.setState({ imdbId: imdbId === '' });
        break;
      default:
        break;
    }

    this.setState((state) => ({
      formValid: !(Object.values(state.newMovie).every(value => value !== '') && Object.values(state).splice(1, 5).every(value => value === false)),
    }));
  };

  handlerFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'title':
        this.setState({ title: false });
        break;
      case 'description':
        this.setState({ description: false });
        break;
      case 'imgUrl':
        this.setState({ imgUrl: false });
        break;
      case 'imdbUrl':
        this.setState({ imdbUrl: false });
        break;
      case 'imdbId':
        this.setState({ imdbId: false });
        break;
      default:
        break;
    }
  };

  clearForm = () => {
    this.setState({
      newMovie: {
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      },
      formValid: true,
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    this.props.onAdd(this.state.newMovie);
    this.clearForm();
  };

  render() {
    const {
      title, description, imgUrl, imdbUrl, imdbId,
    } = this.state.newMovie;

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h1 className="form__title">Add new movie</h1>

        {this.state.title && <div className="error">required field</div> }
        <input
          type="text"
          name="title"
          className={classNames('form__item', { invalid: this.state.title })}
          placeholder="Title"
          value={title}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onFocus={this.handlerFocus}
        />

        {this.state.description && <div className="error">required field</div> }
        <input
          type="text"
          name="description"
          className={classNames('form__item', { invalid: this.state.description })}
          placeholder="Description"
          value={description}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onFocus={this.handlerFocus}
        />

        {this.state.imgUrl && <div className="error">required field - enter url</div> }
        <input
          type="text"
          name="imgUrl"
          className={classNames('form__item', { invalid: this.state.imgUrl })}
          placeholder="imgUrl"
          value={imgUrl}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onFocus={this.handlerFocus}
        />

        {this.state.imdbUrl && <div className="error">required field - enter url</div> }
        <input
          type="text"
          name="imdbUrl"
          className={classNames('form__item', { invalid: this.state.imdbUrl })}
          placeholder="imdbUrl"
          value={imdbUrl}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onFocus={this.handlerFocus}
        />

        {this.state.imdbId && <div className="error">required field</div> }
        <input
          type="text"
          name="imdbId"
          className={classNames('form__item', { invalid: this.state.imdbId })}
          placeholder="imdbId"
          value={imdbId}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onFocus={this.handlerFocus}
        />

        <button type="submit" disabled={this.state.formValid} className="form__button">Add movie</button>
      </form>
    );
  }
}
