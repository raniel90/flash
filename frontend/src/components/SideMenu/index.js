import React, { Component } from 'react';

import { Container, ItemList, Item, ItemText } from './styles';
import { connect } from 'react-redux';

import { Creators as AuthActions } from '../../store/ducks/auth';
import { bindActionCreators } from 'redux';
import TagIcon from 'react-feather/dist/icons/tag';
import TransactionIcon from 'react-feather/dist/icons/dollar-sign';
import { NavLink } from 'react-router-dom';
import { ROOT, TAGS } from '../../constants';

class SideMenu extends Component {

  getLink = (opts) => {
    return (
      <NavLink key={opts.href} to={opts.href}>
        <Item>{opts.icon}</Item>
      </NavLink>
    )
  }

  render() {
    const { signOutRequest } = this.props;
    const links = [
      {
        href: ROOT,
        icon: <TransactionIcon color={'#FFF'}/>
      },
      {
        href: TAGS,
        icon: <TagIcon color={'#FFF'}/>
      },
    ];

    return (
      <Container>
        <ItemList>
         {links.map(l => this.getLink(l))}
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
  bindActionCreators({...AuthActions}, dispatch);

export default connect(
  null, mapDispatchToProps
)(SideMenu);