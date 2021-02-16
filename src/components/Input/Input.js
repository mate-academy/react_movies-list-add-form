import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

// eslint-disable-next-line max-len
const urlExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export class Input extends React.PureComponent {
  validateUrl = () => {
    const { name, saveValue, value } = this.props;

    if (!urlExp.test(value)) {
      saveValue(name, 'Please add correct url');

      return;
    }

    saveValue(name);
  }

  validateValue = () => {
    const { name, saveValue, value } = this.props;

    if (!value) {
      saveValue(name, `Please add ${name}`);

      return;
    }

    if (name.includes('Url')) {
      this.validateUrl();

      return;
    }

    saveValue(name);
  }

  render() {
    const { name, changeValue, value, error } = this.props;

    const styleClasses = ClassNames('form-control', 'myInput', {
      'is-invalid': error,
    });

    return (
      <div className="form-row">
        <div className="col-md-12 mb-2">
          {
            name !== 'description'
              ? (
                <input
                  type="text"
                  className={styleClasses}
                  id={name}
                  placeholder={name}
                  value={value}
                  required
                  onChange={e => changeValue(e, name)}
                  onBlur={this.validateValue}
                />
              )
              : (
                <textarea
                  type="text"
                  className={styleClasses}
                  id={name}
                  placeholder={name}
                  value={value}
                  required
                  onChange={e => changeValue(e, name)}
                  onBlur={this.validateValue}
                />
              )
          }
          <div className="invalid-feedback">
            {error}
          </div>

        </div>
      </div>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  changeValue: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  saveValue: PropTypes.func.isRequired,
};
