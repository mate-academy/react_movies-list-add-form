import React, { Component } from 'react';
import './NewMovie.scss';

const imgLinkValidationRegEx = /https?:\/\/(www\.)?([\dA-zЁ-я]+-?[\dA-zЁ-я]+)+\.([A-zЁ-я]{2,3})(\.[A-zЁ-я]{2})?\/[&(?)\-(_)(=)\dA-zЁ-я/]+(\.jpg|\.jpeg|\.png)$/;
const linkValidationRegEx = /https?:\/\/(www\.)?([\dA-zЁ-я]+-?[\dA-zЁ-я]+)+\.([A-zЁ-я]{2,3})(\.[A-zЁ-я]{2})?\/[&(?)\-(_)(=)\dA-zЁ-я/]+$/;

type Props = {
  addMovie: (movie: Movie) => void,
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  activeInputs: string[],
  isUrlValid: boolean,
  isImgUrlValid: boolean,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    activeInputs: [],
    isUrlValid: true,
    isImgUrlValid: true,
  };

  changeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      title: value,
    });
  };

  changeDescriptionHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;

    this.setState({
      description: String(value),
    });
  };

  changeimgUrlHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (imgLinkValidationRegEx.test(value)) {
      this.setState({
        isImgUrlValid: true,
      });
    } else {
      this.setState({
        isImgUrlValid: false,
      });
    }

    this.setState({
      imgUrl: value,
    });
  };

  changeimdbUrlHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (linkValidationRegEx.test(value)) {
      this.setState({
        isUrlValid: true,
      });
    } else {
      this.setState({
        isUrlValid: false,
      });
    }

    this.setState({
      imdbUrl: value,
    });
  };

  selectInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const { activeInputs } = this.state;

    if ((name === 'imgUrl') && !imgLinkValidationRegEx.test(value)) {
      this.setState({ isImgUrlValid: false });
    }

    if ((name === 'imdbUrl') && !linkValidationRegEx.test(value)) {
      this.setState({ isUrlValid: false });
    }

    if (!activeInputs.includes(name)) {
      this.setState(prevState => ({
        activeInputs: [...prevState.activeInputs, name],
      }));
    }
  };

  changeimdbIdHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      imdbId: value,
    });
  };

  imgUrlOnBlur = () => {
    if (!this.state.isImgUrlValid) {
      this.setState({
        imgUrl: '',
      });
    }
  };

  urlOnBlur = () => {
    if (!this.state.isUrlValid) {
      this.setState({
        imdbUrl: '',
      });
    }
  };

  onSubmitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.addMovie(this.state);
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      activeInputs,
      isUrlValid,
      isImgUrlValid,
    } = this.state;

    return (
      <form onSubmit={this.onSubmitHandler}>
        <p>Title</p>
        <input
          type="text"
          name="title"
          value={title}
          onChange={this.changeTitleHandler}
          required
        />
        <p>Description</p>
        <textarea
          className="description"
          name="description"
          id="description"
          value={description}
          onChange={this.changeDescriptionHandler}
        />
        <p>imgUrl</p>
        <input
          type="text"
          name="imgUrl"
          value={imgUrl}
          onFocus={this.selectInputHandler}
          onChange={this.changeimgUrlHandler}
          onBlur={this.imgUrlOnBlur}
        />
        {(!isImgUrlValid && activeInputs.includes('imgUrl')) && (
          <span>Invalid url!</span>
        )}
        <p>imdbUrl</p>
        <input
          type="text"
          name="imdbUrl"
          value={imdbUrl}
          onFocus={this.selectInputHandler}
          onChange={this.changeimdbUrlHandler}
          onBlur={this.urlOnBlur}
        />
        {(!isUrlValid && activeInputs.includes('imdbUrl')) && (
          <span>Invalid url!</span>
        )}
        <p>imdbId</p>
        <input
          type="text"
          name="imdbId"
          value={imdbId}
          onChange={this.changeimdbIdHandler}
          required
        />
        <div>
          <button
            disabled={!(isImgUrlValid && isUrlValid && title.length && imdbId.length)}
            type="submit"
          >
            Add movie
          </button>
        </div>
      </form>
    );
  }
}
