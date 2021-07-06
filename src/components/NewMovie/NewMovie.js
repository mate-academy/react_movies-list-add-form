import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  formControls: {
    title: {
      value: '',
      valid: false,
      touched: false,
      required: true,
    },
    description: {
      value: '',
      valid: false,
      touched: false,
      required: true,
    },
    imgUrl: {
      value: '',
      valid: false,
      touched: false,
      required: true,
    },
    imdbUrl: {
      value: '',
      valid: false,
      touched: false,
      required: true,
    },
    imdbId: {
      value: '',
      valid: false,
      touched: false,
      required: true,
    },
  },
};

const initialValues = {
  formControls: {
    title: {
      inputType: 'input',
      type: 'text',
      label: 'Title',
      errormessage: 'Enter correct title',
    },
    description: {
      inputType: 'textArea',
      type: 'text',
      label: 'Description',
      errormessage: 'Enter correct description',
    },
    imgUrl: {
      inputType: 'input',
      type: 'url',
      label: 'ImgUrl',
      errormessage: 'Enter correct URL',
    },
    imdbUrl: {
      inputType: 'input',
      type: 'url',
      label: 'ImdbUrl',
      errormessage: 'Enter correct URL',
    },
    imdbId: {
      inputType: 'input',
      type: 'number',
      label: 'ImdbId',
      errormessage: 'Enter correct ID',
    },
  },
};

class NewMovie extends PureComponent {
  state = {
    ...initialState,
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
    const { title, description, imgUrl, imdbUrl, imdbId } = this.state;

    this.props.addMovie(
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    );
    this.clearForm();
  }

  clearForm = () => {
    this.setState({
      ...initialState,
    });
  }

  onBlurHandler = (controlName) => {
    // eslint-disable-next-line
    const formControlCopy = { ...this.state.formControls };
    const control = { ...formControlCopy[controlName] };
    const typeValue = initialValues.formControls[controlName].type;

    control.touched = true;
    formControlCopy[controlName] = control;
    control.valid = this.validControl(
      control.value,
      control.required,
      control.touched,
      typeValue,
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
    return Object.keys(initialValues.formControls).map((controlName, index) => {
      const control = initialValues.formControls[controlName];
      const stateControl = this.state.formControls[controlName];

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
                  value={stateControl.value}
                  valid={stateControl.valid}
                  touched={stateControl.touched}
                  errormessage={control.errormessage}
                  onChange={event => this.onChangeHandler(event, controlName)}
                  onBlur={event => this.onBlurHandler(controlName)}
                />
              )
              : (
                <textarea
                  key={`${control.label}${Math.ceil(Math.random(10))}`}
                  type={control.type}
                  value={stateControl.value}
                  valid={stateControl.valid}
                  touched={stateControl.touched}
                  errormessage={control.errormessage}
                  onChange={event => this.onChangeHandler(event, controlName)}
                  onBlur={event => this.onBlurHandler(controlName)}
                />
              )
          }
          {
            stateControl.valid && stateControl.touched
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
NewMovie.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

export default NewMovie;
