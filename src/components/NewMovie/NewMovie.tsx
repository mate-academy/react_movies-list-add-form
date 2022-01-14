import { Component } from 'react';
import { Field } from '../Field';
import './NewMovie.scss';

type Props = {
  onAdd: (newMovie: Movie) => void,
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  onChangeTitle = (value: string): void => {
    this.setState({ title: value });
  };

  onBlurTitle = (value: string) => {
    this.setState({
      title: this.getValidString(value),
    });
  };

  onChangeDescription = (value: string): void => {
    this.setState({ description: value });
  };

  onBlurDescription = (value: string) => {
    this.setState({
      description: this.getValidString(value),
    });
  };

  onChangeImgUrl = (value: string): void => {
    this.setState({ imgUrl: value });
  };

  onBlurImgUrl = (value: string) => {
    this.setState({ imgUrl: this.getValidUrl(value.trim()) === true ? value.trim() : '' });
  };

  onChangeImdbUrl = (value: string): void => {
    this.setState({ imdbUrl: value });
  };

  onBlurImdbUrl = (value: string) => {
    this.setState({ imdbUrl: this.getValidUrl(value.trim()) === true ? value.trim() : '' });
  };

  onChangeImdbId = (value: string): void => {
    this.setState({ imdbId: value });
  };

  onBlurImdbId = (value: string) => {
    this.setState({
      imdbId: this.getValidString(value),
    });
  };

  getValidString = (value: string) => {
    const valueChanged = value.replace(/[^a-zа-яё0-9\s]/gi, '').split('  ').join(' ');

    return valueChanged === ' ' ? '' : valueChanged.trim();
  };

  getValidUrl = (str: string): boolean => {
    const regExp = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

    return regExp.test(str);
  };

  render() {
    const { onAdd } = this.props;
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    const {
      onBlurDescription,
      onBlurTitle,
      onChangeTitle,
      onChangeDescription,
      onChangeImgUrl,
      onBlurImgUrl,
      onChangeImdbUrl,
      onBlurImdbUrl,
      onChangeImdbId,
      onBlurImdbId,
    } = this;

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (Object.values(this.state).some((el: string) => el === '')) {
            return;
          }

          onAdd({
            title,
            description,
            imgUrl,
            imdbUrl,
            imdbId,
          });

          this.setState({
            title: '',
            description: '',
            imgUrl: '',
            imdbUrl: '',
            imdbId: '',
          });
        }}
        className="form"
      >
        <Field
          field={title}
          name="title"
          onChange={onChangeTitle}
          onBlur={onBlurTitle}
        />
        <Field
          field={description}
          name="description"
          onChange={onChangeDescription}
          onBlur={onBlurDescription}
        />
        <Field
          field={imgUrl}
          name="imgUrl"
          onChange={onChangeImgUrl}
          onBlur={onBlurImgUrl}
        />
        <Field
          field={imdbUrl}
          name="imdbUrl"
          onChange={onChangeImdbUrl}
          onBlur={onBlurImdbUrl}
        />
        <Field
          field={imdbId}
          name="imdbId"
          onChange={onChangeImdbId}
          onBlur={onBlurImdbId}
        />
        <button type="submit" className="form__button">Add new movie</button>
      </form>
    );
  }
}
