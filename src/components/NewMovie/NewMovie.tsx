import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void;
};
type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  titleIsValid: boolean;
  descriptionIsValid: boolean;
  imgIsValid: boolean;
  imdbLinkIsValid: boolean;
  imdbIdIsValid: boolean;
};

const URL_REGEX = new RegExp([
  /(?:(?:(https?|ftp):)?\/\/)/,
  /(?:([^:\n\r]+):([^@\n\r]+)@)?/,
  /(?:(?:www\.)?([^/\n\r]+))/,
  /(\/[^?\n\r]+)?/,
  /(\?[^#\n\r]*)?/,
  /(#?[^\n\r]*)?/,
].map(
  (r) => {
    return r.source;
  },
).join(''));

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    titleIsValid: true,
    descriptionIsValid: true,
    imgIsValid: true,
    imdbLinkIsValid: true,
    imdbIdIsValid: true,
  };

  validateTitle = () => {
    if (this.state.title.length === 0 || this.state.title.trim() === '') {
      this.setState({
        titleIsValid: false,
      });
    }
  };

  validateDescription = () => {
    if (this.state.description.length === 0
      || this.state.description.trim() === '') {
      this.setState({
        descriptionIsValid: false,
      });
    }
  };

  validateImageUrl = () => {
    if (URL_REGEX.test(this.state.imgUrl) === false) {
      this.setState({
        imgIsValid: false,
      });
    }
  };

  validateImdbUrl = () => {
    if (URL_REGEX.test(this.state.imdbUrl) === false) {
      this.setState({
        imdbLinkIsValid: false,
      });
    }
  };

  validateImdbIdl = () => {
    if (this.state.imdbId.length === 0
      || this.state.imdbId.trim() === '') {
      this.setState({
        imdbIdIsValid: false,
      });
    }
  };

  submitHandler = (event:React.SyntheticEvent<EventTarget>) => {
    event.preventDefault();
    this.validateTitle();
    this.validateDescription();
    this.validateImageUrl();
    this.validateImdbIdl();
    this.validateImdbUrl();
    setTimeout(() => {
      if (this.state.titleIsValid && this.state.descriptionIsValid
        && this.state.imgIsValid && this.state.imdbLinkIsValid
        && this.state.imdbIdIsValid) {
        this.props.onAdd({
          title: this.state.title,
          description: this.state.description,
          imgUrl: this.state.imgUrl,
          imdbUrl: this.state.imdbUrl,
          imdbId: this.state.imdbId,

        });

        this.setState({
          title: '',
          description: '',
          imgUrl: '',
          imdbUrl: '',
          imdbId: '',
        });
      }
    }, 0);
  };

  render() {
    return (
      <form className="form">
        <label>
          Title
          <input
            type="text"
            name="title"
            value={this.state.title}
            onBlur={this.validateTitle}
            onChange={(event) => {
              this.setState({
                title: event.target.value,
                titleIsValid: true,
              });
            }}
            className={!this.state.titleIsValid ? 'invalid' : ''}
          />
        </label>
        <div className="error">
          {!this.state.titleIsValid ? 'This field must not be empty' : ''}
        </div>
        <label>
          Description
          <input
            type="text"
            name="description"
            onBlur={this.validateDescription}
            value={this.state.description}
            onChange={(event) => {
              this.setState({
                description: event.target.value,
                descriptionIsValid: true,
              });
            }}
            className={!this.state.descriptionIsValid ? 'invalid' : ''}
          />
        </label>
        <div className="error">
          {!this.state.descriptionIsValid ? 'This field must not be empty' : ''}
        </div>
        <label>
          Image link
          <input
            type="text"
            name="imgUrl"
            onBlur={this.validateImageUrl}
            value={this.state.imgUrl}
            onChange={(event) => {
              this.setState({
                imgUrl: event.target.value,
                imgIsValid: true,
              });
            }}
            className={!this.state.imgIsValid ? 'invalid' : ''}
          />
        </label>
        <div className="error">
          {!this.state.imgIsValid ? 'Please enter the valid URL' : ''}
        </div>
        <label>
          IMDB link
          <input
            type="text"
            name="imdbUrl"
            onBlur={this.validateImdbUrl}
            value={this.state.imdbUrl}
            onChange={(event) => {
              this.setState({
                imdbUrl: event.target.value,
                imdbLinkIsValid: true,
              });
            }}
            className={!this.state.imdbLinkIsValid ? 'invalid' : ''}
          />
          <div className="error">
            {!this.state.imdbLinkIsValid ? 'Please enter the valid URL' : ''}
          </div>
        </label>
        <label>
          IMDB ID
          <input
            type="text"
            name="imdbId"
            value={this.state.imdbId}
            onChange={(event) => {
              this.setState({
                imdbId: event.target.value,
                imdbIdIsValid: true,
              });
            }}
            className={!this.state.imdbIdIsValid ? 'invalid' : ''}
          />
        </label>
        <div className="error">
          {!this.state.imdbIdIsValid ? 'This field must not be empty' : ''}
        </div>
        <button
          type="submit"
          className={
            !(this.state.titleIsValid && this.state.descriptionIsValid
              && this.state.imgIsValid && this.state.imdbLinkIsValid
              && this.state.imdbIdIsValid)
              ? 'disable' : ''
          }
          onClick={this.submitHandler}
        >
          Submit
        </button>
      </form>
    );
  }
}
