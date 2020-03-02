import styled from 'styled-components';

export const Container = styled.aside`
  background: #4A5173;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  &: 
`;

export const Item = styled.button`
  border: 0;
  background: transparent;
  margin: .5rem .5rem 1rem .5rem;
`;

export const ItemText = styled.span`
  font-size: 16px;
  line-height: 22px;
  color: #FFFCF8;
`;