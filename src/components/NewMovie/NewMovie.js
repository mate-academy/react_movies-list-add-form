import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const validation = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);
const validationTitle = new RegExp(/\w/);

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    inputErrorTitle: false,
    inputErrorDescription: false,
    inputErrorImgUrl: false,
    inputErrorImdbUrl: false,
    inputErrorImdbId: false,
    activeButton: true,
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, description, imdbId, imdbUrl, imgUrl } = this.state;

      this.props.addMovie({
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
        activeButton: true,
      });
  }

  onBlur = ({target}) => {
    const { title, description, imdbId, imdbUrl, imgUrl } = this.state;

    if (target.id === 'inputTitle') {
      if (title.trim().length === 0 && !validationTitle.test(title)) {
        this.setState({ inputErrorTitle: true });
      } else {
        this.setState({ inputErrorTitle: false });
      }
    }

    if (target.id === 'inputDescription') {
      if (description.trim().length === 0) {
        this.setState({ inputErrorDescription: true });
      } else {
        this.setState({ inputErrorDescription: false });
      }
    }

    if (target.id === 'imgUrl') {
      if (!validation.test(imgUrl)) {
        this.setState({ inputErrorImgUrl: true });
      } else {
        this.setState({ inputErrorImgUrl: false });
      }
    }

    if (target.id === 'imdbUrl') {
      if (!validation.test(imdbUrl)) {
        this.setState({ inputErrorImdbUrl: true });
      } else {
        this.setState({ inputErrorImdbUrl: false });
      }
    }

    if (target.id === 'idbId') {
      if (imdbId.trim().length === 0) {
        this.setState({ inputErrorImdbId: true });
      } else {
        this.setState({ inputErrorImdbId: false });
      }
    }
  }


  onTitleChange = (event) => {
    if (this.state.title.length > 0) {
      this.setState({ inputErrorTitle: false });
    }

    this.setState({
      title: event.target.value,
    });
  }

  onDescriptionChange = (event) => {
    if (this.state.description.length > 0) {
      this.setState({ inputErrorDescription: false });
    }

    this.setState({
      description: event.target.value,
    });
  }

  onImgUrlChange = (event) => {
    if (this.state.imgUrl.length > 0) {
      this.setState({ inputErrorImgUrl: false });
    }

    this.setState({
      imgUrl: event.target.value,
    });
  }

  onImdbUrlChange = (event) => {
    if (this.state.imdbUrl.length > 0) {
      this.setState({ inputErrorImdbUrl: false });
    }

    this.setState({
      imdbUrl: event.target.value,
    });
  }

  onImdbIdChange = (event) => {
    if (this.state.imdbId.length > 0) {
      this.setState({ inputErrorImdbId: false });
    }

    this.setState({
      imdbId: event.target.value,
    });
  }

  buttonSwitch = () => {
    const { title, description, imdbId, imdbUrl, imgUrl } = this.state;

    if (imdbId.trim().length > 0
        && title.trim().length > 0
        && description.trim().length > 0
        && imgUrl.length > 0
        && imdbUrl.length > 0) {
      this.setState({ activeButton: false });
    }
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form onSubmit={this.handleSubmit} onChange={this.buttonSwitch}>

        <label htmlFor="inputTitle">Title:&nbsp;</label>
        {this.state.inputErrorTitle
        && (<span className="inputError">Please, enter the title!</span>)}

        <input
          id="inputTitle"
          onBlur={this.onBlur}
          className={classNames('input', {active: this.state.inputErrorTitle})}
          value={title}
          onChange={this.onTitleChange}
        />

        <label htmlFor="inputDescription">Description:&nbsp;</label>
        {this.state.inputErrorDescription
        && (<span className="inputError">Please, enter the description!</span>)}

        <input
          id="inputDescription"
          onBlur={this.onBlur}
          className={classNames('input', {active: this.state.inputErrorDescription})}
          value={description}
          onChange={this.onDescriptionChange}
        />

        <label htmlFor="imgUrl">ImgUrl:&nbsp;</label>
        {this.state.inputErrorImgUrl
        && (<span className="inputError">Please, enter correct ImgUrl!</span>)}

        <input
          id="imgUrl"
          onBlur={this.onBlur}
          className={classNames('input', {active: this.state.inputErrorImgUrl})}
          value={imgUrl}
          onChange={this.onImgUrlChange}
        />

        <label htmlFor="imdbUrl">ImdbUrl:&nbsp;</label>
        {this.state.inputErrorImdbUrl
        && (<span className="inputError">Please, enter correct ImgUrl!</span>)}

        <input
          id="imdbUrl"
          onBlur={this.onBlur}
          className={classNames('input', {active: this.state.inputErrorImdbUrl})}
          value={imdbUrl}
          onChange={this.onImdbUrlChange}
        />

        <label htmlFor="idbId">ImdbId:&nbsp;</label>
        {this.state.inputErrorImdbId
        && (<span className="inputError">Please, enter the IdbId!</span>)}

        <input
          id="idbId"
          onBlur={this.onBlur}
          className={classNames('input', {active: this.state.inputErrorImdbId})}
          value={imdbId}
          onChange={this.onImdbIdChange}
        />

        <button
          disabled={this.state.activeButton}
          type="submit"
          className="button"
        >
          ADD
        </button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
