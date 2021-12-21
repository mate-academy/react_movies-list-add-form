/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
import { Component } from 'react';

type Props = {
  addMovie (
    title: string,
    description: string,
    imdbId: string,
    imdbUrl: string,
    imgUrl: string,
  ): void;
};

type State = {
  title?: string,
  description?: string,
  imgUrl?: string,
  imdbUrl?: string,
  imdbId?: string,
  imdbUrlErr?: boolean,
  imgUrlErr?: boolean,
  titleErr?: boolean,
  descriptionErr?: boolean,
  imdbIdErr?: boolean,
};

const regexUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    imdbUrlErr: false,
    imgUrlErr: false,
    titleErr: false,
    descriptionErr: false,
    imdbIdErr: false,
  };

  handleCHange = (
    event: React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  clearForm = () => {
    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
    } = this.state;

    if (title && description && imdbId && imdbUrl && imgUrl) {
      this.props.addMovie(title, description, imdbId, imdbUrl, imgUrl);
    }

    this.clearForm();

    return true;
  };

  validator = (
    event: React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    if (name === 'imdbUrl' || name === 'imgUrl') {
      value.search(regexUrl) === 0
        ? this.setState({ [`${name}Err`]: false })
        : this.setState({ [`${name}Err`]: true });
    }

    if (name === 'title' || name === 'description' || name === 'imdbId') {
      value.length === value.trim().length
        ? this.setState({ [`${name}Err`]: false })
        : this.setState({ [`${name}Err`]: true });
    }
  };

  render() {
    const {
      title,
      description,
      imdbId,
      imdbUrl,
      imgUrl,
      imdbUrlErr,
      imgUrlErr,
      titleErr,
      descriptionErr,
      imdbIdErr,
    } = this.state;

    return (
      <form
        className="NewMovie"
        onSubmit={this.handleSubmit}
      >
        <div>
          title
          {titleErr && (
            <div className="error-label">
              remove extra spaces
            </div>
          )}
        </div>
        <input
          required
          className={titleErr ? 'input error' : 'input'}
          name="title"
          placeholder="title"
          value={title}
          onChange={this.handleCHange}
          onBlur={this.validator}
        />

        <div>
          description
          {descriptionErr && (
            <div className="error-label">
              remove extra spaces
            </div>
          )}
        </div>
        <textarea
          required
          name="description"
          placeholder="description"
          value={description}
          onChange={this.handleCHange}
          className={descriptionErr ? 'input error' : 'input'}
          onBlur={this.validator}
        />

        <div>
          imgUrl
          {imgUrlErr && (
            <div className="error-label">
              Invalid link
            </div>
          )}
        </div>
        <input
          required
          name="imgUrl"
          placeholder="imgUrl"
          value={imgUrl}
          onChange={this.handleCHange}
          className={imgUrlErr ? 'input error' : 'input'}
          onBlur={this.validator}
        />

        <div>
          imdbUrl
          {imdbUrlErr && (
            <div className="error-label">
              Invalid link
            </div>
          )}
        </div>
        <input
          required
          name="imdbUrl"
          placeholder="imdbUrl"
          value={imdbUrl}
          onChange={this.handleCHange}
          className={imdbUrlErr ? 'input error' : 'input'}
          onBlur={this.validator}
        />

        <div>
          imdbId
          {imdbIdErr && (
            <div className="error-label">
              remove extra spaces
            </div>
          )}
        </div>

        <input
          required
          name="imdbId"
          placeholder="imdbId"
          value={imdbId}
          onChange={this.handleCHange}
          className={imdbIdErr ? 'input error' : 'input'}
          onBlur={this.validator}
        />

        <button
          type="submit"
          disabled={imdbUrlErr || imgUrlErr || titleErr || descriptionErr || imdbIdErr}
          className="button"
        >
          Add movie
        </button>
      </form>
    );
  }
}
