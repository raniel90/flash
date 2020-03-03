import React, { Component } from 'react';

import {
  DialogForm, DialogFormButtonContainer,
  DialogInput, DialogSpan, Container
} from './styles';

import { Creators as DialogActions } from '../../store/ducks/dialog';
import { Creators as TagActions } from '../../store/ducks/tag';
import { actions as toastrActions } from 'react-redux-toastr';
import { connect } from 'react-redux';

import Dialog from '../Dialog';
import Button from '../../styles/Button';
import { ConfigContainer } from '../../styles/ConfigContainer';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SideMenu from '../SideMenu';
import { Header } from '../Indicators/styles';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import Table from '../Table';

class Tags extends Component {

  state = {
    id: null,
    tag: null,
    monthly_value: null,
    is_calculate_suggest: false
  }

  componentDidMount() {
    this.props.getTags();
  }

  submit() {
    const { id, tag, monthly_value, is_calculate_suggest } = this.state;
    const { setDialog, postTag } = this.props;

    if (!tag) {
      this.renderWarningMsg('Informe a tag');
      return;
    }

    if (!monthly_value) {
      this.renderWarningMsg('Informe o Valor Mensal');
      return;
    }

    postTag({ id, tag, monthly_value: +monthly_value, is_calculate_suggest: !!is_calculate_suggest });
    setDialog('tag');
    this.setState({ 
      id: null,
      tag: null,
      monthly_value: null,
      is_calculate_suggest: false
    });
  }

  renderWarningMsg = (msg) => {
    this.props.add({
      type: 'warning',
      title: 'Atenção',
      message: msg
    });
  }

  handleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleChange = (item, name) => this.setState({ [name]: item });

  renderDialog() {
    const { tag, monthly_value, is_calculate_suggest } = this.state;
    const { setDialog } = this.props;

    return (
      <Dialog size="big">
        <DialogForm>
          <h1>Criar Tag</h1>

          <DialogSpan>Tag</DialogSpan>
          <DialogInput value={tag} autoComplete="off" onChange={this.handleChangeInput} name="tag"></DialogInput>

          <DialogSpan>Saldo Mensal (R$)</DialogSpan>
          <DialogInput value={monthly_value} onChange={this.handleChangeInput} name="monthly_value" type="number" />

          <div style={{ marginTop: '20px' }}>
          <Checkbox 
            value={is_calculate_suggest} 
            label="Calcular Sugestão de Gastos?" 
            onChange={this.handleChangeInput} 
            name="is_calculate_suggest" />
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
    const { dialog, } = this.props;
    const { data, loading, error } = this.props.tag;

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

          <Table 
            data={data}
            loading={loading}
            error={error}
            hasEdit={true}
            hasDelete={true}
           />
         
        </ConfigContainer>
        {dialog.tag ? this.renderDialog() : null}
      </PerfectScrollbar>
      </Container>
    );
  }
}

const mapStateToProps = ({ dialog, tag }) => ({ dialog, tag });

export default connect(
  mapStateToProps, {
  ...DialogActions,...toastrActions, ...TagActions
}
)(Tags);