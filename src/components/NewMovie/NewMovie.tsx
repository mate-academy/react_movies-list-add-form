/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import { Component } from 'react';
import './NewMovie.scss';

type Props = {
  onAdd: (movie: Movie) => void,
  validId: (id: string) => boolean,
};
type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
  titleError: string,
  descriptionError: string,
  imgUrlError: string,
  imdbUrlError: string,
  imdbIdError: string,
};

export class NewMovie extends Component<Props, State> {
  state: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    titleError: '',
    descriptionError: '',
    imgUrlError: '',
    imdbUrlError: '',
    imdbIdError: '',
  };

  validUrl = (url: string) => {
    return /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/
      .test(url);
  };

  add = () => {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    } = this.state;
    let flag = true;

    if (title.length === 0) {
      this.setState({ titleError: 'Title is Empty' });
      flag = false;
    }

    if (description.length === 0) {
      this.setState({ descriptionError: 'Description is Empty' });
      flag = false;
    }

    if (!this.validUrl(imgUrl)) {
      this.setState({ imgUrlError: 'Icorrect Url' });
      flag = false;
    }

    if (!this.validUrl(imdbUrl)) {
      this.setState({ imdbUrlError: 'Icorrect Url' });
      flag = false;
    }

    if (this.props.validId(imdbId)) {
      this.setState({ imdbIdError: 'Id exist' });
      flag = false;
    }

    if (flag) {
      this.props.onAdd({
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
    }
  };

  render() {
    const {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      titleError,
      descriptionError,
      imgUrlError,
      imdbUrlError,
      imdbIdError,
    } = this.state;

    return (
      <form
        className="NewMovie"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <table className="NewMovie__table">
          <caption>Add Form</caption>
          <tbody>
            <tr>
              <td>
                <label htmlFor="title">
                  Title
                </label>
              </td>
              <td>
                <input
                  id="title"
                  type="text"
                  value={title}
                  placeholder="Title"
                  className={classNames({ NewMovie__borderError: titleError !== '' })}
                  onChange={(event) => {
                    this.setState({
                      title: event.target.value,
                      titleError: '',
                    });
                  }}
                />
              </td>
              <td className="NewMovie__error">
                {titleError}
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="Description">
                  Description
                </label>
              </td>
              <td>
                <textarea
                  id="Description"
                  placeholder="Description"
                  value={description}
                  className={classNames({ NewMovie__borderError: descriptionError !== '' })}
                  onChange={(event) => this.setState({
                    description: event.target.value,
                    descriptionError: '',
                  })}
                />
              </td>
              <td className="NewMovie__error">
                {descriptionError}
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="imgUrl">
                  Image Url
                </label>
              </td>
              <td>
                <input
                  id="imgUrl"
                  type="text"
                  value={imgUrl}
                  placeholder="imgUrl"
                  className={classNames({ NewMovie__borderError: imgUrlError !== '' })}
                  onChange={(event) => this.setState({
                    imgUrl: event.target.value,
                    imgUrlError: '',
                  })}
                />
              </td>
              <td className="NewMovie__error">
                {imgUrlError}
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="imdbUrl">
                  IMDb Url
                </label>
              </td>
              <td>
                <input
                  id="imdbUrl"
                  type="text"
                  value={imdbUrl}
                  placeholder="imdbUrl"
                  className={classNames({ NewMovie__borderError: imdbUrlError !== '' })}
                  onChange={(event) => this.setState({
                    imdbUrl: event.target.value,
                    imdbUrlError: '',
                  })}
                />
              </td>
              <td className="NewMovie__error">
                {imdbUrlError}
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="imdbId">
                  imdbId
                </label>
              </td>
              <td>
                <input
                  type="text"
                  value={imdbId}
                  placeholder="imdbId"
                  className={classNames({ NewMovie__borderError: imdbIdError !== '' })}
                  onChange={(event) => this.setState({
                    imdbId: event.target.value,
                    imdbIdError: '',
                  })}
                />
              </td>
              <td className="NewMovie__error">
                {imdbIdError}
              </td>
            </tr>
          </tbody>
        </table>
        <button
          type="submit"
          onClick={this.add}
        >
          Add
        </button>
      </form>
    );
  }
}
