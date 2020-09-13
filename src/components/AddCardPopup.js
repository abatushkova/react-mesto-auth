import React from 'react';
import PopupWithForm from './PopupWithForm';
import ButtonSubmit from './ButtonSubmit';

class AddCardPopup extends React.Component {
  constructor(props) {
    super(props);

    this.title = React.createRef();
    this.src = React.createRef();

    this.state = {
      formProps: {
        title: {
          inputClass: '',
          errorClass: '',
          errorMsg: '',
        },
        src: {
          inputClass: '',
          errorClass: '',
          errorMsg: '',
        }
      },
      isFormValid: false,
      isLoading: false
    };
  }

  render() {
    return (
      <PopupWithForm
        name="card"
        title="Новое место"
        isOpen={this.props.isOpen}
        onClose={this.handleClose}
        onSubmit={this.handleSubmit}
      >
        <label className="popup__label" htmlFor="title-input">
          <input 
            type="text"
            name="title"
            className={`popup__input ${this.state.formProps.title.inputClass}`}
            id="title-input"
            ref={this.title}
            onChange={this.handleChange}
            placeholder="Название"
            minLength={1}
            maxLength={30}
            required={true}
          />
          <span 
            className={`popup__error ${this.state.formProps.title.errorClass}`} 
            id="title-input-error"
          >
            {this.state.formProps.title.errorMsg}
          </span>
        </label>
        <label className="popup__label" htmlFor="src-input">
          <input 
            type="url"
            name="src"
            className={`popup__input ${this.state.formProps.src.inputClass}`}
            id="src-input"
            ref={this.src}
            onChange={this.handleChange}
            placeholder="Ссылка"
            required={true}
          />
          <span 
            className={`popup__error ${this.state.formProps.src.errorClass}`} 
            id="src-input-error"
          >
            {this.state.formProps.src.errorMsg}
          </span>
        </label>
        <ButtonSubmit isDisabled={!this.state.isFormValid}>
          {this.state.isLoading ? 'Загрузка...' : 'Создать'}
        </ButtonSubmit>
      </PopupWithForm>
    );
  }

  handleChange = (evt) => {
    const target = this[evt.target.name].current;
    const input = target.name;

    const updatedForm = { ...this.state.formProps };
    const updatedInput = { ...updatedForm[input] };

    let isFormValid = true;
    for (let input in updatedForm) {
      isFormValid = isFormValid
        && this[input].current.validity.valid;
    }

    if (!target.validity.valid) {
      this.showInputError(target, updatedInput);
    } else {
      this.hideInputError(updatedInput);
    }

    updatedForm[input] = updatedInput;

    this.setState({
      formProps: updatedForm,
      isFormValid: isFormValid
    });
  }

  showInputError = (name, input) => {
    input.inputClass = 'popup__input_type_error';
    input.errorClass = 'popup__error_visible';
    input.errorMsg = name.validationMessage;
  }

  hideInputError = (input) => {
    input.inputClass = '';
    input.errorClass = '';
    input.errorMsg = '';
  }

  handleClose = () => {
    const form = this.state.formProps;

    this.props.onClose();
    this.setState({ isFormValid: false });

    for (let input in form) {
      this.hideInputError(form[input]);
    }
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.setState({ isLoading: true });

    const form = this.state.formProps;

    this.props.onAddCardSubmit({
      name: this.title.current.value,
      link: this.src.current.value
    })
    .finally(() => {
      this.setState({
        isFormValid: false,
        isLoading: false
      });
      for (let input in form) {
        this.hideInputError(form[input]);
      }
    });
  }
}

export default AddCardPopup;
