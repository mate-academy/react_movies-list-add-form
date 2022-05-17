import { Component } from 'react';

import './NewMovie.scss';
import { NewMovieForm } from '../NewMovieForm';

import { EmptyErrors, ValidUrlErrors } from '../../types/ErrorTypes';
import { Movie } from '../../types/Movie';

import { urlValidator } from '../../functions/urlValidator';

type Props = {
  onAdd: (movie: Movie) => void
};

type State = Movie & EmptyErrors & ValidUrlErrors & {
  isSubmited: boolean;
  isSubmitDisabled: boolean;
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    isTitleErrorVisible: false,
    isImgUrlErrorVisible: false,
    isImdbUrlErrorVisible: false,
    isImdbIdErrorVisible: false,
    isImgUrlInvalid: false,
    isImdbUrlInvalid: false,
    isSubmited: false,
    isSubmitDisabled: false,
  };

  isInputEmpty = (value: string, inputName: string) => {
    let errorName: string;

    switch (inputName) {
      case 'title':
        errorName = 'isTitleErrorVisible';
        break;

      case 'imgUrl':
        errorName = 'isImgUrlErrorVisible';
        break;

      case 'imdbUrl':
        errorName = 'isImdbUrlErrorVisible';
        break;

      case 'imdbId':
        errorName = 'isImdbIdErrorVisible';
        break;

      default:
        return;
    }

    if (value) {
      this.setState((prevState) => ({
        ...prevState,
        [errorName]: false,
        isSubmitDisabled: false,
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        [errorName]: true,
        isSubmitDisabled: true,
      }));
    }
  };

  isUrlValid = (value: string, inputName: string) => {
    let errorName: keyof ValidUrlErrors;

    switch (inputName) {
      case 'imgUrl':
        errorName = 'isImgUrlInvalid';
        break;

      case 'imdbUrl':
        errorName = 'isImdbUrlInvalid';
        break;

      default:
        return;
    }

    if (urlValidator(value)) {
      this.setState((prevState) => ({
        ...prevState,
        [errorName]: false,
        isSubmitDisabled: false,
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        [errorName]: true,
        isSubmitDisabled: true,
      }));
    }
  };

  handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    this.setState({ isSubmited: true });

    if (!title) {
      this.setState((state) => ({
        ...state,
        isTitleErrorVisible: true,
        isSubmitDisabled: true,
      }));
    }

    if (!imdbId) {
      this.setState((state) => ({
        ...state,
        isImdbIdErrorVisible: true,
        isSubmitDisabled: true,
      }));
    }

    if (!imgUrl) {
      this.setState((state) => ({
        ...state,
        isImgUrlErrorVisible: true,
        isSubmitDisabled: true,
      }));
    }

    if (!imdbUrl) {
      this.setState((state) => ({
        ...state,
        isImdbUrlErrorVisible: true,
        isSubmitDisabled: true,
      }));
    }

    if (imgUrl && !urlValidator(imgUrl)) {
      this.setState((state) => ({
        ...state,
        isImgUrlInvalid: true,
        isSubmitDisabled: true,
      }));
    }

    if (imdbUrl && !urlValidator(imdbUrl)) {
      this.setState((state) => ({
        ...state,
        isImdbUrlInvalid: true,
        isSubmitDisabled: true,
      }));
    }

    if (!title
      || !imgUrl
      || !imdbUrl
      || !imdbId
      || !urlValidator(imgUrl)
      || !urlValidator(imdbUrl)) {
      return;
    }

    const { onAdd } = this.props;

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      isSubmited: false,
    });
  };

  changeInputValue = (value: string, inputName: string) => {
    this.setState((state) => ({
      ...state,
      [inputName]: value,
    }));
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      isTitleErrorVisible,
      isImgUrlErrorVisible,
      isImdbUrlErrorVisible,
      isImdbIdErrorVisible,
      isImdbUrlInvalid,
      isImgUrlInvalid,
      isSubmited,
      isSubmitDisabled,
    } = this.state;

    return (
      <NewMovieForm
        title={title}
        description={description}
        imgUrl={imgUrl}
        imdbUrl={imdbUrl}
        imdbId={imdbId}
        isTitleErrorVisible={isTitleErrorVisible}
        isImgUrlErrorVisible={isImgUrlErrorVisible}
        isImdbUrlErrorVisible={isImdbUrlErrorVisible}
        isImdbIdErrorVisible={isImdbIdErrorVisible}
        isImdbUrlInvalid={isImdbUrlInvalid}
        isImgUrlInvalid={isImgUrlInvalid}
        isSubmited={isSubmited}
        isSubmitDisabled={isSubmitDisabled}
        isInputEmpty={this.isInputEmpty}
        isUrlValid={this.isUrlValid}
        handleSubmit={this.handleSubmit}
        changeInputValue={this.changeInputValue}
      />
    );
  }
}
