import styled, { css } from 'styled-components';
import { baseColor } from '../../styles/global';
import { TYPE_LINK } from '../../utils/schema';

export const StyledTable = styled.table`
  color: black;
  width: 100%;
  border-spacing: 0;
  font-size: 14px;
  padding-top: .5vh;


  ${props => props.hasDetail === true && css`
      tr {
        cursor: pointer;
      }
  `}

  thead {
    cursor: pointer;
  }
`;

export const HeaderColumn = styled.td`
  padding: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
  font-weight: bold;
  
  ${props => props.align && css`
    text-align: ${props.align};
  `}

  &:hover {
    ${props => props.isSort && css`
      text-decoration: underline;
    `}

    ${props => !props.isSort && css`
      cursor: default;
    `}
  }
`;

export const ItemColumn = styled.td`
  padding: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-bottom: .75rem;
  padding-top: .75rem;
  max-width: 10vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${props => props.align && css`
    text-align: ${props.align};
  `}

  ${props => props.color && css`
    color: ${props.color};
  `}

  ${props => props.type === TYPE_LINK && css`
    color: ${baseColor};

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  `}

  ${props => props.isFirst === true && css`
    padding-top: 1.5rem;
  `}

  ${props => props.isLast === true && css`
    padding-bottom: 1.5rem;
  `}
`;

export const DetailText = styled.div`
  font-size: 14px;
  line-height: 21px;
`;

export const RowDetail = styled.tr`
  background-color: #EEE;
  width: 100%;
  padding-left: 2rem;
  > td {
    vertical-align: top;
    &:hover {
      cursor: default;
    }
  }
`;

export const Separator = styled.div`
  border-top: 1.5px dashed #000;
`;

export const CenterContainer = styled.div`
  display: flex;
  color: #B9B9B9;
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 0.065em;
  justify-content: center;
  margin: 10% auto;
`;

export const RowDetailHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 2vh;
`;