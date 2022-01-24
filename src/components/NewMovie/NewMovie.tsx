import { Component } from 'react';
import './NewMovie.scss';

interface AddMovie {
  (
    title: string,
    description: string,
    imgUrl: string,
    imdbUrl: string,
    imdbId: string,
  ): void
}

type Props = {
  onAdd: AddMovie
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  validationPassed: string[],
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    validationPassed: [],
  };

  handleInput = (event: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = event.currentTarget;

    this.setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  clearTheForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  isValidUrl = (imgUrl: string) => {
    // eslint-disable-next-line
    const reg = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    return reg.test(imgUrl);
  };

  validateInput = (event: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = event.currentTarget;

    if (!value) {
      this.setState(prevState => ({
        validationPassed: [
          ...prevState.validationPassed,
          name,
        ],
      }));
    }

    if (value) {
      this.setState(prevState => ({
        validationPassed: prevState.validationPassed.filter(item => item !== name),
      }));
    }

    if (name === 'imgUrl' || name === 'imdbUrl') {
      if (!this.isValidUrl(value)) {
        this.setState(prevState => ({
          validationPassed: [
            ...prevState.validationPassed,
            name,
          ],
        }));
      }
    }

    this.showError(name);
  };

  setStyle = (name: string) => (
    this.state.validationPassed.includes(name)
      ? { borderColor: 'red' }
      : { borderColor: 'rgb(118, 118, 118)' }
  );

  showError = (name: string) => (
    this.state.validationPassed.includes(name)
      ? { display: 'flex' }
      : { display: 'none' }
  );

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;

    return (
      <form
        className="NewMovie__form"
        onSubmit={(event) => {
          event.preventDefault();
          this.props.onAdd(
            title,
            description,
            imgUrl,
            imdbUrl,
            imdbId,
          );
          this.clearTheForm();
        }}
      >
        <h2 className="NewMovie__form-title">
          Add new movie
        </h2>
        <div className="NewMovie__input-container">
          <div className="NewMovie__input-title">
            Title:
          </div>
          <input
            style={this.setStyle('title')}
            type="text"
            name="title"
            value={title}
            onChange={this.handleInput}
            onBlur={this.validateInput}
          />
          <div
            className="error"
            style={this.showError('title')}
          >
            Fill the field!
          </div>
        </div>
        <div className="NewMovie__input-container">
          <div className="NewMovie__input-title">
            Description:
          </div>
          <input
            style={this.setStyle('description')}
            type="text"
            name="description"
            value={description}
            onChange={this.handleInput}
            onBlur={this.validateInput}
          />
          <div
            className="error"
            style={this.showError('description')}
          >
            Fill the field!
          </div>
        </div>
        <div className="NewMovie__input-container">
          <div className="NewMovie__input-title">
            ImgUrl:
          </div>
          <input
            style={this.setStyle('imgUrl')}
            type="text"
            name="imgUrl"
            value={imgUrl}
            onChange={this.handleInput}
            onBlur={this.validateInput}
          />
          <div
            className="error"
            style={this.showError('imgUrl')}
          >
            Fill the field!
          </div>
        </div>
        <div className="NewMovie__input-container">
          <div className="NewMovie__input-title">
            ImdbUrl:
          </div>
          <input
            style={this.setStyle('imdbUrl')}
            type="text"
            name="imdbUrl"
            value={imdbUrl}
            onChange={this.handleInput}
            onBlur={this.validateInput}
          />
          <div
            className="error"
            style={this.showError('imdbUrl')}
          >
            Fill the field!
          </div>
        </div>
        <div className="NewMovie__input-container">
          <div className="NewMovie__input-title">
            ImdbId:
          </div>
          <input
            style={this.setStyle('imdbId')}
            type="text"
            name="imdbId"
            value={imdbId}
            onChange={this.handleInput}
            onBlur={this.validateInput}
          />
          <div
            className="error"
            style={this.showError('imdbId')}
          >
            Fill the field!
          </div>
        </div>
        <button
          type="submit"
          disabled={this.state.validationPassed.length > 0}
        >
          SUBMIT
        </button>
      </form>
    );
  }
}
