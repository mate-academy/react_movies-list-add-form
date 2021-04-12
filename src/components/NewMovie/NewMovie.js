import React from 'react';
import PropTypes from 'prop-types';

import './NewMovie.scss';

export class NewMovie extends React.Component {
  state = {
    textValue: '',
    descriptionValue: '',
    imgUrlValue: '',
    imdbUrlValue: '',
    imdbIdValue: '',
    imgUrlBorder: 'solid gray 1px',
    imdbUrlBorder: 'solid gray 1px',
    visibleError1: true,
    visibleError2: true,
  };

  validateUrl = (url) => {
    // eslint-disable-next-line
    const reg = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    return reg.test(url);
  }

  validationImgUrl = (value) => {
    if (!this.validateUrl(value)) {
      this.setState({
        imgUrlBorder: 'solid red 1px',
        visibleError1: false,
      });
    } else {
      this.setState({
        imgUrlBorder: 'solid gray 1px',
        visibleError1: true,
      });
    }
  }

  validationImdbUrl = (value) => {
    if (!this.validateUrl(value)) {
      this.setState({
        imdbUrlBorder: 'solid red 1px',
        visibleError2: false,
      });
    } else {
      this.setState({
        imdbUrlBorder: 'solid gray 1px',
        visibleError2: true,
      });
    }
  }

  render() {
    const { textValue, descriptionValue,
      imgUrlValue, imdbUrlValue, imdbIdValue,
      imgUrlBorder, imdbUrlBorder, visibleError1, visibleError2 } = this.state;
    const { submit } = this.props;

    return (
      <>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            submit(this.state);
            this.setState({
              textValue: '',
              descriptionValue: '',
              imgUrlValue: '',
              imdbUrlValue: '',
              imdbIdValue: '',
              disabledButton: '',
            });
          }}
        >
          <label htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={textValue}
            onChange={e => (
              this.setState({ textValue: e.target.value })
            )}
            required
          />
          <label htmlFor="description">
            Description
          </label>
          <input
            type="text"
            id="description"
            placeholder="Description"
            value={descriptionValue}
            onChange={e => (
              this.setState({ descriptionValue: e.target.value })
            )}
          />
          <label htmlFor="imgUrl">
            ImgUrl
          </label>
          <input
            type="text"
            id="imgUrl"
            style={{ border: imgUrlBorder }}
            placeholder="ImgUrl"
            value={imgUrlValue}
            onChange={(e) => {
              this.setState({ imgUrlValue: e.target.value });
              this.validationImgUrl(e.target.value);
            }}
            required
          />
          <div
            className="alert alert-danger"
            role="alert"
            hidden={visibleError1}
          >
            ^^^Error. Check it ^^^
          </div>
          <label htmlFor="imdbUrl">
            ImdbUrl
          </label>
          <input
            type="text"
            id="imdbUrl"
            style={{ border: imdbUrlBorder }}
            placeholder="ImdbUrl"
            value={imdbUrlValue}
            onChange={(e) => {
              this.setState({ imdbUrlValue: e.target.value });
              this.validationImdbUrl(e.target.value);
            }}
            required
          />
          <div
            className="alert alert-danger"
            role="alert"
            hidden={visibleError2}
          >
            ^^^Error. Check it ^^^
          </div>
          <label htmlFor="imdbId">
            ImdbId
          </label>
          <input
            type="text"
            id="imdbId"
            placeholder="ImdbId"
            value={imdbIdValue}
            onChange={e => (
              this.setState({ imdbIdValue: e.target.value })
            )}
            required
          />
          <input
            type="submit"
            value="Submit"
            disabled={((imgUrlBorder === 'solid gray 1px'
            && imdbUrlBorder === 'solid gray 1px')
              ? ''
              : 'disabled'
            )}
          />
        </form>
      </>
    );
  }
}

NewMovie.propTypes = {
  submit: PropTypes.func.isRequired,
};
