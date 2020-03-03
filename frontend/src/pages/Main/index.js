import React, { Component } from 'react';

import { Container } from './styles';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import SideMenu from '../../components/SideMenu';
import Transactions from '../../components/Transactions';
import { Creators as ScreenActions } from '../../store/ducks/screen';

class Main extends Component {

  render() {
    return (
      <Container>
        <SideMenu />
        <Transactions />
      </Container>
    )
  }
}

const mapStateToProps = ({ screen }) => ({ screen });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...ScreenActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);