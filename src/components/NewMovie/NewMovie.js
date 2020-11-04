import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const initialValues = {
  formControls: {
    title: {
      value: '',
      inputType: 'input',
      type: 'text',
      label: 'Title',
      errormessage: 'Enter correct title',
      valid: false,
      touched: false,
      required: true,
    },
    description: {
      value: '',
      inputType: 'textArea',
      type: 'text',
      label: 'Description',
      errormessage: 'Enter correct description',
      touched: false,
      valid: false,
      required: true,
    },
    imgUrl: {
      value: '',
      inputType: 'input',
      type: 'url',
      label: 'ImgUrl',
      errormessage: 'Enter correct URL',
      touched: false,
      valid: false,
      required: true,
    },
    imdbUrl: {
      value: '',
      inputType: 'input',
      type: 'url',
      label: 'ImdbUrl',
      errormessage: 'Enter correct URL',
      touched: false,
      valid: false,
      required: true,
    },
    imdbId: {
      value: '',
      inputType: 'input',
      type: 'number',
      label: 'ImdbId',
      errormessage: 'Enter correct ID',
      touched: false,
      valid: false,
      required: true,
    },
  },
};

class NewMovie extends PureComponent {
  state = {
    ...initialValues,
  }

  validURL = (url) => {
    const pattern = new RegExp('^(https?:\\/\\/)?'
      + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'
      + '((\\d{1,3}\\.){3}\\d{1,3}))'
      + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'
      + '(\\?[;&a-z\\d%_.~+=-]*)?'
      + '(\\#[-a-z\\d_]*)?$', 'i');

    return !!pattern.test(url);
  }

  validText = (text) => {
    let valid = false;

    if (text.trim().length > 0 && text.trim().length < 240) {
      valid = true;
    }

    return valid;
  }

  validControl = (value, required, touched, type) => {
    let isValid = true;

    if (type === 'url') {
      isValid = this.validURL(value);
    }

    if (type === 'text' || type === 'number') {
      isValid = this.validText(value);
    }

    return isValid;
  }

  validForm = (state) => {
    return (Object.entries(state).some(entry => entry[1].valid === false));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line
    this.props.addMovie(
      this.state.title,
      this.state.description,
      this.state.imgUrl,
      this.state.imdbUrl,
      this.state.imdbId,
    );
    this.clearForm();
  }

  clearForm = () => {
    this.setState({
      ...initialValues,
    });
  }

  onBlurHandler = (controlName) => {
    // eslint-disable-next-line
    const formControlCopy = { ...this.state.formControls };
    const control = { ...formControlCopy[controlName] };

    control.touched = true;
    formControlCopy[controlName] = control;
    control.valid = this.validControl(
      control.value,
      control.required,
      control.touched,
      control.type,
    );
    this.setState({
      formControls: formControlCopy,
    });
  };

  onChangeHandler = (event, controlName) => {
    // eslint-disable-next-line
    const formControlCopy = { ...this.state.formControls };
    const control = { ...formControlCopy[controlName] };

    control.value = event.target.value;
    formControlCopy[controlName] = control;
    this.setState({
      [controlName]: event.target.value,
      formControls: formControlCopy,
    });
  }

  renderInputs = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];

      return (
        <div
          className="field"
          key={`${control.label}${Math.ceil(Math.random(100))}`}
        >
          <label>{control.label}</label>
          {
            control.inputType === 'input'
              ? (
                <input
                  key={`${control.label}${Math.ceil(Math.random(10))}`}
                  type={control.type}
                  value={control.value}
                  valid={control.valid}
                  touched={control.touched}
                  errormessage={control.errormessage}
                  onChange={event => this.onChangeHandler(event, controlName)}
                  onBlur={event => this.onBlurHandler(controlName)}
                />
              )
              : (
                <textarea
                  key={`${control.label}${Math.ceil(Math.random(10))}`}
                  type={control.type}
                  value={control.value}
                  valid={control.valid}
                  touched={control.touched}
                  errormessage={control.errormessage}
                  onChange={event => this.onChangeHandler(event, controlName)}
                  onBlur={event => this.onBlurHandler(controlName)}
                />
              )
          }
          {
            control.valid && control.touched
              ? null
              : <span>{control.errormessage}</span>
          }
        </div>
      );
    });
  }

  render() {
    return (
      <form className="ui form" onSubmit={this.handleSubmit}>
        {this.renderInputs()}
        <button
          className="fluid ui button blue"
          type="submit"
          disabled={
            this.validForm(this.state.formControls)
            && 'disabled'
          }
        >
          Add Movie
        </button>
      </form>
    );
  }
}
NewMovie.defaultProps = {
  addMovie: PropTypes.func.isRequired,
};

export default NewMovie;
