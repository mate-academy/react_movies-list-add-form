import React, { Component } from 'react';
import './NewMovie.scss';
import PropTypes from 'prop-types';

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
    const validation = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/);

    event.preventDefault();
    if (this.state.title.split('').length === 0) {
      this.setState({ inputErrorTitle: true });
    } else if (this.state.description.split('').length === 0) {
      this.setState({ inputErrorDescription: true });
    } else if (!validation.test(this.state.imgUrl)) {
      this.setState({ inputErrorImgUrl: true });
    } else if (!validation.test(this.state.imdbUrl)) {
      this.setState({ inputErrorImdbUrl: true });
    } else if (this.state.imdbId.split('').length === 0) {
      this.setState({ inputErrorImdbId: true });
    } else {
      this.props.addMovie({
        title: this.state.title,
        description: this.state.description,
        imgUrl: this.state.imdbUrl,
        imdbUrl: this.state.imdbUrl,
        imdbId: this.state.imdbId,
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
  }

  onTitleChange = (event) => {
    if (this.state.title.split('').length > 0) {
      this.setState({ inputErrorTitle: false });
    }

    this.setState({
      title: event.target.value,
    });
  }

  onDescriptionChange = (event) => {
    if (this.state.description.split('').length > 0) {
      this.setState({ inputErrorDescription: false });
    }

    this.setState({
      description: event.target.value,
    });
  }

  onImgUrlChange = (event) => {
    if (this.state.imgUrl.split('').length > 0) {
      this.setState({ inputErrorImgUrl: false });
    }

    this.setState({
      imgUrl: event.target.value,
    });
  }

  onImdbUrlChange = (event) => {
    if (this.state.imdbUrl.split('').length > 0) {
      this.setState({ inputErrorImdbUrl: false });
    }

    this.setState({
      imdbUrl: event.target.value,
    });
  }

  onImdbIdChange = (event) => {
    if (this.state.imdbId.split('').length > 0) {
      this.setState({ inputErrorImdbId: false });
    }

    this.setState({
      imdbId: event.target.value,
    });
  }

  buttonSwitch = () => {
    if (this.state.imdbId.split('').length > 0
        && this.state.title.split('').length > 0
        && this.state.description.split('').length > 0
        && this.state.imgUrl.split('').length > 0
        && this.state.imdbUrl.split('').length > 0) {
      this.setState({ activeButton: false });
    }
  }

  render() {
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    return (
      <form onSubmit={this.handleSubmit} onChange={this.buttonSwitch}>
        <label htmlFor="inputTitle">Title:&nbsp;</label>
        {this.state.inputErrorTitle && (<span className="inputError">Please, enter the title!</span>)}
        <input id="inputTitle" className={`input ${this.state.inputErrorTitle && 'active'}`} value={title} onChange={this.onTitleChange} />
        <label htmlFor="inputDescription">Description:&nbsp;</label>
        {this.state.inputErrorDescription && (<span className="inputError">Please, enter the description!</span>)}
        <input id="inputDescription" className={`input ${this.state.inputErrorDescription && 'active'}`} value={description} onChange={this.onDescriptionChange} />
        <label htmlFor="imgUrl">ImgUrl:&nbsp;</label>
        {this.state.inputErrorImgUrl && (<span className="inputError">Please, enter correct ImgUrl!</span>)}
        <input id="imgUrl" className={`input ${this.state.inputErrorImgUrl && 'active'}`} value={imgUrl} onChange={this.onImgUrlChange} />
        <label htmlFor="imdbUrl">ImdbUrl:&nbsp;</label>
        {this.state.inputErrorImdbUrl && (<span className="inputError">Please, enter correct ImgUrl!</span>)}
        <input id="imdbUrl" className={`input ${this.state.inputErrorImdbUrl && 'active'}`} value={imdbUrl} onChange={this.onImdbUrlChange} />
        <label htmlFor="idbId">ImdbId:&nbsp;</label>
        {this.state.inputErrorImdbId && (<span className="inputError">Please, enter the ImgUrl!</span>)}
        <input id="idbId" className={`input ${this.state.inputErrorImdbId && 'active'}`} value={imdbId} onChange={this.onImdbIdChange} />
        <button disabled={this.state.activeButton} type="submit" className="button">ADD</button>
      </form>
    );
  }
}

NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};
