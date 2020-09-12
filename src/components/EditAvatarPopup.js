import React from 'react';
import PopupWithForm from './PopupWithForm';
import ButtonSubmit from './ButtonSubmit';

class EditAvatarPopup extends React.Component {
  constructor(props) {
    super(props);

    this.avatar = React.createRef();

    this.state = {
      inputClass: '',
      errorClass: '',
      errorMsg: '',
      isFormValid: false,
      isLoading: false
    };
  }

  render() {
    return (
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        isOpen={this.props.isOpen}
        onClose={this.handleClose}
        onSubmit={this.handleSubmit}
      >
        <label className="popup__label" htmlFor="avatar-input">
          <input 
            type="url"
            name="avatar"
            className={`popup__input ${this.state.inputClass}`}
            id="avatar-input"
            ref={this.avatar}
            onChange={this.handleChange}
            placeholder="Ссылка"
            required={true}
          />
          <span 
            className={`popup__error ${this.state.errorClass}`}
            id="avatar-input-error"
          >
            {this.state.errorMsg}
          </span>
        </label>
        <ButtonSubmit isDisabled={!this.state.isFormValid}>
          {this.state.isLoading ? 'Загрузка...' : 'Сохранить'}
        </ButtonSubmit>
      </PopupWithForm>
    );
  }

  handleChange = () => {
    const avatar = this.avatar.current;

    if (!avatar.validity.valid) {
      this.setState({ isFormValid: false });
      this.showInputError(avatar);
    } else {
      this.setState({ isFormValid: true });
      this.hideInputError();
    }
  }

  showInputError = (avatar) => {
    this.setState({
      inputClass: 'popup__input_type_error',
      errorClass: 'popup__error_visible',
      errorMsg: avatar.validationMessage
    });
  }

  hideInputError = () => {
    this.setState({
      inputClass: '',
      errorClass: '',
      errorMsg: ''
    });
  }

  handleClose = () => {
    this.props.onClose();
    this.setState({ isFormValid: false });
    this.hideInputError();
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    this.setState({ isLoading: true });

    this.props.onUpdateAvatar({
      avatar: this.avatar.current.value
    })
    .finally(() => {
      this.setState({
        isFormValid: false,
        isLoading: false
      });
      this.hideInputError();
    });
  }
}

export default EditAvatarPopup;
