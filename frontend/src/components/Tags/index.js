import React, { Component } from 'react';

import {
  DialogForm, DialogFormButtonContainer,
  DialogInput, DialogSpan, Container
} from './styles';

import { Creators as DialogActions } from '../../store/ducks/dialog';
import { actions as toastrActions } from 'react-redux-toastr';
import { connect } from 'react-redux';

import Dialog from '../Dialog';
import Button from '../../styles/Button';
import { ConfigContainer } from '../../styles/ConfigContainer';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SideMenu from '../SideMenu';
import { Header } from '../Indicators/styles';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';

class Tags extends Component {

  state = {
    tag: null,
    monthlyValue: 0,
    isCalculateSuggest: false
  }

  submit() {
    const { id, tag, monthlyValue, isCalculateSuggest } = this.state;
    const { setDialog, postTag } = this.props;

    if (!tag) {
      this.renderWarningMsg('Informe a tag');
      return;
    }

    if (!monthlyValue) {
      this.renderWarningMsg('Informe o Valor Mensal');
      return;
    }

    postTag({ id, tag, monthlyValue, isCalculateSuggest });
    setDialog('tag');
  }

  renderWarningMsg = (msg) => {
    this.props.add({
      type: 'warning',
      title: 'Atenção',
      message: msg
    });
  }

  handleChangeInput = e => {
    this.setState({ [e.target.tag]: e.target.value });
  }

  onChange(e, value) {
    this.setState({})
  }

  handleChange = (item, name) => this.setState({ [name]: item });

  renderDialog() {
    const { tag, monthlyValue, isCalculateSuggest } = this.state;
    const { setDialog } = this.props;

    return (
      <Dialog size="big">
        <DialogForm>
          <h1>Criar Tag</h1>

          <DialogSpan>Tag</DialogSpan>
          <DialogInput value={tag} autoComplete="off" onChange={this.handleChangeInput} name="tag"></DialogInput>

          <DialogSpan>Saldo Mensal (R$)</DialogSpan>
          <DialogInput value={monthlyValue} onChange={this.handleChangeInput} name="monthlyValue" type="number" />

          <div style={{ marginTop: '20px' }}>
          <Checkbox 
            value={isCalculateSuggest} 
            label="Calcular Sugestão de Gastos?" 
            onChange={this.handleChangeInput} 
            name="isCalculateSuggest" />
          </div>

          <DialogFormButtonContainer>
            <Button onClick={this.submit.bind(this)}>Salvar</Button>
            <Button color="gray" isCancel={true} onClick={setDialog.bind(this, 'tag')}>Cancelar</Button>
          </DialogFormButtonContainer>

        </DialogForm>
      </Dialog>
    )
  }

  openDialog = () => {
    this.props.setDialog('tag');
  }

  render() {
    const { dialog,  } = this.props;

    return (
      <Container>
        <SideMenu/>

      <PerfectScrollbar style={{ width: '100%' }}>
        <ConfigContainer size='big' style={{ minHeight: '70%' }}>
        <Header>
            <h1>Tags</h1>
            <div>
              <Button onClick={this.openDialog.bind(this)}>Criar Tag</Button>
            </div>
          </Header>
         
        </ConfigContainer>
        {dialog.tag ? this.renderDialog() : null}
      </PerfectScrollbar>
      </Container>
    );
  }
}

const mapStateToProps = ({ dialog }) => ({ dialog });

export default connect(
  mapStateToProps, {
  ...DialogActions,...toastrActions
}
)(Tags);