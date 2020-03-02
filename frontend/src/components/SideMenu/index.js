import React, { Component } from 'react';

import logo from '../../assets/logo.svg';
import { Container, ItemList, Item, ItemText } from './styles';
import { connect } from 'react-redux';

import { Creators as AuthActions } from '../../store/ducks/auth';
import { bindActionCreators } from 'redux';
import TagIcon from 'react-feather/dist/icons/tag';
import TransactionIcon from 'react-feather/dist/icons/dollar-sign';

class SideMenu extends Component {

  render() {
    const { signOutRequest } = this.props;

    return (
      <Container>
        <ItemList>
          <Item title="Transações">
          <TransactionIcon color={'#FFF'}/>
          </Item>
          <Item title="Tags">
            <TagIcon color={'#FFF'}/>
          </Item>
        </ItemList>
        <ItemList>
          <Item>
            <ItemText onClick={signOutRequest}>Sair</ItemText>
          </Item>
        </ItemList>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(AuthActions, dispatch);

export default connect(
  null, mapDispatchToProps
)(SideMenu);