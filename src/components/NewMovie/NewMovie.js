import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';

export class NewMovie extends Component {
  state = {
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    description: '',
  };

  // я не зміг з'ясувати як перенести regex
  // eslint-disable-next-line max-len
  onlyUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

  render() {
    const { title, imgUrl, imdbUrl, imdbId, description } = this.state;

    const isImdbUrlValid = imdbUrl.match(this.onlyUrl) || imdbUrl === '';
    const isImgUrlValid = imgUrl.match(this.onlyUrl) || imgUrl === '';

    return (
      <>
        <h1 className="addFilmTitle">
          Add film form
        </h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();

            if (!imgUrl.match(this.onlyUrl) || !imdbUrl.match(this.onlyUrl)) {
              return;
            }

            this.setState(() => ({
              title: '',
              imgUrl: '',
              imdbUrl: '',
              imdbId: '',
              description: '',
            }));

            this.props.addMovie(
              {
                title,
                description,
                imgUrl,
                imdbUrl,
                imdbId,
              },
            );
          }}
        >
          <ul>
            <li>
              <label>
                Title*:
                <input
                  value={title}
                  className="addInfoBar"
                  id="Title"
                  placeholder="Title*"
                  onChange={event => this.setState({
                    title: event.target.value,
                  })}
                  required
                />
              </label>
            </li>
            <li>
              <label>
                Image url*:
                <input
                  value={imgUrl}
                  className={`addInfoBar ${!isImgUrlValid ? 'invalid' : ''
                  }`}
                  placeholder="Image url*"
                  onChange={event => this.setState({
                    imgUrl: event.target.value,
                  })}
                  required
                />
              </label>
              <text className="err">
                {!isImgUrlValid ? 'this is invalid url' : ''}
              </text>
            </li>
            <li>
              <label>
                imdbUrl*:
                <input
                  value={imdbUrl}
                  className={`addInfoBar ${!isImdbUrlValid ? 'invalid' : ''}`}
                  placeholder="imdbUrl*"
                  onChange={event => this.setState({
                    imdbUrl: event.target.value,
                  })}
                  required
                />
                <text className="err">
                  {!isImdbUrlValid ? 'this is invalid url' : ''}
                </text>
              </label>
            </li>
            <li>
              <label>
                imdbId*:
                <input
                  value={imdbId}
                  className="addInfoBar"
                  placeholder="imdbId*"
                  onChange={event => this.setState({
                    imdbId: event.target.value,
                  })}
                  required
                />
              </label>
            </li>
            <li>
              <label>
                Description:
                <textarea
                  value={description}
                  className="addInfoBar description"
                  placeholder="Description"
                  onChange={event => this.setState({
                    description: event.target.value,
                  })}
                />
              </label>
            </li>
          </ul>
          <button
            disabled={
              !imdbUrl.match(this.onlyUrl)
              || !imgUrl.match(this.onlyUrl)
              || title === ''
              || imdbId === ''
            }
            type="submit"
            className="submitButton"
          >
            Submit
          </button>
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
