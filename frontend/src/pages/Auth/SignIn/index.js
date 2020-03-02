import React, { Component } from 'react';
import Button from '../../../styles/Button';
import { Container, SignForm, } from '../styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from '../../../store/ducks/auth';

class SignIn extends Component {

  state = {
    email: '',
    password: ''
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    const { signInRequest } = this.props;

    signInRequest(email, password);

  }

  render() {
    const { email, password } = this.state;

    return (
      <Container>
        <SignForm>
          <h1>MY FLASH</h1>

          <span>Email</span>
          <input type="email" value={email} onChange={this.handleInputChange} name="email" />

          <span>Senha</span>
          <input type="password" value={password} onChange={this.handleInputChange} name="password" />

          <Button size="big" onClick={this.handleSubmit}>Entrar</Button>

        </SignForm>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(AuthActions, dispatch);

export default connect(null, mapDispatchToProps)(SignIn);