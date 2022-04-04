import classNames from 'classnames';
import React, { PureComponent } from 'react';

interface Props {
  onAdd: (movie: Movie) => void
}

interface State {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  errorTitle: string;
  errorImgUrl: string;
  errorImdbUrl: string;
  errorImdbId: string;
}

export class NewMovie extends PureComponent<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    errorTitle: '',
    errorImgUrl: '',
    errorImdbUrl: '',
    errorImdbId: '',
  };

  changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      errorTitle: '',
    });
  };

  changeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ description: event.target.value });
  };

  changeImgUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imgUrl: event.target.value,
      errorImgUrl: '',
    });
  };

  changeImdbUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imdbUrl: event.target.value,
      errorImdbUrl: '',
    });
  };

  changeImdbId = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      imdbId: event.target.value,
      errorImdbId: '',
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      title, description, imgUrl, imdbUrl, imdbId,
    } = this.state;

    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    if (!title) {
      this.setState({ errorTitle: 'Please, set the correct title' });

      return;
    }

    if (!imgUrl || !pattern.test(imgUrl)) {
      this.setState({ errorImgUrl: 'Please, set the correct image url' });

      return;
    }

    if (!imdbUrl || !pattern.test(imdbUrl)) {
      this.setState({ errorImdbUrl: 'Please, set the correct imdb url' });

      return;
    }

    if (!imdbId) {
      this.setState({ errorImdbId: 'Please, set the correct imdb id' });

      return;
    }

    this.props.onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    this.resetForm();
  };

  resetForm = () => this.setState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  render() {
    const {
      title, description, imgUrl, imdbUrl, imdbId,
      errorTitle, errorImgUrl, errorImdbUrl, errorImdbId,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label htmlFor="title" className="label">
            Title
            <div className="control">
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Set the title"
                className={classNames('input', { 'is-danger': errorTitle })}
                value={title}
                onChange={this.changeTitle}
              />
            </div>
          </label>
          {errorTitle && (<p className="help is-danger">{errorTitle}</p>)}
        </div>

        <div className="field">
          <label htmlFor="description" className="label">
            Description
            <div className="control">
              <textarea
                name="description"
                id="description"
                placeholder="Put the description of the movie"
                className="textarea"
                value={description}
                onChange={this.changeDescription}
              />
            </div>
          </label>
        </div>

        <div className="field">
          <label htmlFor="imgUrl" className="label">
            Image Url
            <div className="control">
              <input
                type="text"
                name="imgUrl"
                id="imgUrl"
                placeholder="Set the image url"
                className={classNames('input', { 'is-danger': errorImgUrl })}
                value={imgUrl}
                onChange={this.changeImgUrl}
              />
            </div>
          </label>
          {errorImgUrl && (<p className="help is-danger">{errorImgUrl}</p>)}
        </div>

        <div className="field">
          <label htmlFor="imdbUrl" className="label">
            Imdb Url
            <div className="control">
              <input
                type="text"
                name="imdbUrl"
                id="imdbUrl"
                placeholder="Set the imdb url"
                className={classNames('input', { 'is-danger': errorImdbUrl })}
                value={imdbUrl}
                onChange={this.changeImdbUrl}
              />
            </div>
          </label>
          {errorImdbUrl && (<p className="help is-danger">{errorImdbUrl}</p>)}
        </div>

        <div className="field">
          <label htmlFor="imdbId" className="label">
            Imdb Id
            <div className="control">
              <input
                type="text"
                name="imdbId"
                id="imdbId"
                placeholder="Set the imdb id"
                className={classNames('input', { 'is-danger': errorImdbId })}
                value={imdbId}
                onChange={this.changeImdbId}
              />
            </div>
          </label>
          {errorImdbId && (<p className="help is-danger">{errorImdbId}</p>)}
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button type="submit" className="button is-link">Add</button>
          </div>
          <div className="control">
            <button
              type="button"
              className="button is-link is-light"
              onClick={this.resetForm}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    );
  }
}
