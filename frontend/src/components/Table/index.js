import _ from 'lodash';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { baseColor } from '../../styles/global';
import React, { Component, Fragment } from 'react';
import ArrowUpIcon from 'react-feather/dist/icons/chevron-up';
import ArrowDownIcon from 'react-feather/dist/icons/chevron-down';
import {
  StyledTable, HeaderColumn, ItemColumn,
  Separator, CenterContainer
} from './styles';
import { fieldParser } from '../../utils';
import { CircularProgress } from '@material-ui/core';
import { TYPE_LINK } from '../../utils/schema';

class Table extends Component {

  handleRowClick(rowId, item) {
    const { expandedRow, hasDetail } = this.props;

    if (!hasDetail) {
      return;
    }

    if (expandedRow !== rowId) {
      this.getCharts(item, ['pie', 'bar']);
    }

    this.props.expand(expandedRow !== rowId ? rowId : null);
  }

  handleChange = (option, name, item) => {
    this.setState({ [name]: option }, () => this.getCharts(item, ['pie']));
  };

  getValueTd = (item, headerByKey, key) => {
    const column = headerByKey[key];

    if (column && column.type === TYPE_LINK && column.value_static) {
      return column.value_static;
    }

    return fieldParser(item[key], column.type);
  }

  getTypeColumn = (headerByKey, key) => {
    return headerByKey[key] && headerByKey[key].type ? headerByKey[key].type : null;
  }

  onClickTd = (column, item, e) => {
    if (column && column.type === TYPE_LINK && item.link) {
      this.props.history.push(item.link);
    }
  }

  renderItem(items, item, idx, headerByKey) {
    const { expandedRow } = this.props;
    const isExpanded = expandedRow === idx;
    const color = isExpanded ? baseColor : '#000';
    const colSpan = Object.keys(headerByKey).length;
    const isFirst = idx === 0;
    const isLast = idx + 1 === items.length;

    return (
      <Fragment key={`row-data-fragment-${idx}`}>
        <tr onClick={this.handleRowClick.bind(this, idx, item)} key={`row-data-tr-${idx}`}>
          {Object.keys(headerByKey).map((key, idx) => (
            <ItemColumn
              isFirst={isFirst}
              isLast={isLast}
              onClick={this.onClickTd.bind(this, headerByKey[key], item)}
              type={this.getTypeColumn(headerByKey, key)}
              title={this.getValueTd(item, headerByKey, key)}
              key={`row-data-td${idx}`}
              align={headerByKey[key] && headerByKey[key].align ? headerByKey[key].align : null}
              color={color}>{this.getValueTd(item, headerByKey, key)}
            </ItemColumn>
          ))}
        </tr>
      </Fragment >
    )
  }

  getAlignment = (column) => {
    if (!column) return;

    if (column.align === 'right') {
      return 'flex-end';
    }

    if (column.align === 'center') {
      return column.align;
    }

    return 'flex-start';
  }

  renderHeader = (column, idx) => {
    const { sort } = this.props;
    const isSort = sort && sort[column.value] && sort[column.value].value === column.value;

    return (
      <HeaderColumn isSort={column.is_sort === false ? false : true} key={idx} align={column.align} onClick={this.sortItems.bind(this, column)}>
        <div style={{ display: 'flex', justifyContent: this.getAlignment(column), alignItems: 'center' }}>
          <div>{column.label}</div>
          <div style={{ marginLeft: '.2rem', marginTop: '.5vh' }}>
            {isSort && sort[column.value].order === 'asc' ? <ArrowUpIcon size={22} /> : null}
            {isSort && sort[column.value].order === 'desc' ? <ArrowDownIcon size={22} /> : null}
            {!isSort && column.align !== 'right' ? <ArrowDownIcon color="transparent" size={22} /> : null}
          </div>
        </div>
      </HeaderColumn>
    )
  }

  sortItems = (column) => {
    let newItems;
    let orders = [];
    let columns = [];
    let isContinue = true;
    let { data, defaultData, sort } = this.props;
    let newSort = Object.assign({}, sort ? sort.asMutable(): sort);

    if (column && column.is_sort === false) {
      return;
    }

    if (newSort[column.value]) {
      newSort[column.value] = newSort[column.value].asMutable();
    } else {
      newSort[column.value] = { value: column.value, order: 'asc' };
      isContinue = false;
    }

    if (column.value === newSort[column.value].value && isContinue) {
      let order = newSort[column.value].order;

      if (order === 'asc') {
        newSort[column.value].order = 'desc';
      }

      if (order === 'desc') {
        delete newSort[column.value];
      }
    }

    Object.keys(newSort).forEach(key => {
      columns.push(key);
      orders.push(newSort[key].order);
    });

    newItems = defaultData ? defaultData.items : data.items;

    if (orders.length) {
      newItems = _.orderBy(data.items, columns, orders);
    }

    if (this.props.sortBy) {
      this.props.sortBy({ header: data.header, items: newItems }, newSort);
    }
  }

  renderLoading = () => (
    <CenterContainer color={baseColor}>
      <CircularProgress color="primary" />
    </CenterContainer>
  )

  renderError = () => (
    <CenterContainer>Ocorreu um erro. Tente novamente.</CenterContainer>
  )

  renderEmptyState = () => (
    <CenterContainer>Sem dados para serem exibidos.</CenterContainer>
  )

  render() {
    let items = [];
    let header = [];
    let headerByKey = {};
    const { data, error, loading, hasDetail } = this.props;

    if (error && !loading) return this.renderError();
    if (loading) return this.renderLoading();

    if (!data || !data.header || !data.items) return this.renderEmptyState();

    header = data.header;
    items = data.items;

    header.forEach(item => headerByKey[item.value] = item);

    return (
      <StyledTable hasDetail={hasDetail}>
        <thead>
          <tr>
            {header.map((column, idx) => this.renderHeader(column, idx))}
          </tr>
        </thead>

        <tbody>
          <tr>
            <td colSpan={header.length}>
              <Separator />
            </td>
          </tr>

          {items && items.length ? items.map((item, idx) => this.renderItem(items, item, idx, headerByKey)) : null}
        </tbody>
      </StyledTable>
    )
  }
}

Table.propTypes = {
  header: PropTypes.arrayOf(PropTypes.shape),
  items: PropTypes.arrayOf(PropTypes.shape),
  sort: PropTypes.object,
  error: PropTypes.bool,
  loading: PropTypes.bool,
  sortBy: PropTypes.func.isRequired
};

// const mapStateToProps = ({ filter }) => ({ filter });

export default compose(
  connect(null, null)
)(Table);