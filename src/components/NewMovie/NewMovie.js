import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input';

export class NewMovie extends Component {
  state = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbld: '',
  };

  validation = (name) => {
    const key = this.state[name];
    // eslint-disable-next-line
    const reg = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

    switch (name) {
      case 'description':
        return key.match('^[a-zA-Z]+$');
      case 'imdbld':
      case 'title':
        return key.match('^[A-Za-z0-9]+$');
      case 'imgUrl':
      case 'imdbUrl':
        return key.match(reg);
      default:
        return true;
    }
  }

  isReadyToSubmit = () => this.validation('title')
  && this.validation('imdbld')
  && this.validation('imdbUrl')
  && this.validation('imgUrl');

  getBorderColor = (name) => {
    if (this.state[name] === '') {
      return { borderColor: 'blue' };
    }

    if (this.validation(name)) {
      return { borderColor: 'green' };
    }

    return { borderColor: 'red' };
  };

  isCorrect = () => Object.entries(this.state)
    .every(item => this.validation(item[0]) || item[1] === '');

  getButtonColor = () => {
    return this.isCorrect()
      ? { backgroundColor: 'blue' }
      : { backgroundColor: 'red' };
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.add(this.state);

    this.setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbld: '',
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        <Input
          tag="input"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          borderColor={this.getBorderColor('title')}
        />
        <Input
          tag="textArea"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
          borderColor={this.getBorderColor('description')}
        />
        <Input
          tag="input"
          name="imgUrl"
          value={this.state.imgUrl}
          onChange={this.handleChange}
          borderColor={this.getBorderColor('imgUrl')}
        />
        <Input
          tag="input"
          name="imdbUrl"
          value={this.state.imdbUrl}
          onChange={this.handleChange}
          borderColor={this.getBorderColor('imdbUrl')}
        />
        <Input
          tag="input"
          name="imdbld"
          value={this.state.imdbld}
          onChange={this.handleChange}
          borderColor={this.getBorderColor('imdbld')}
        />

        {this.isReadyToSubmit()
          ? (
            <button type="submit" className="button">
              Add
            </button>
          )
          : (
            <button
              type="button"
              className="buttonError"
              style={this.getButtonColor()}
            >
              { this.isCorrect()
                ? 'Please enter data'
                : 'Please enter correct data'
              }
            </button>
          )
      }
      </form>
    );
  }
}

NewMovie.propTypes = {
  add: PropTypes.func.isRequired,
};
