import styled from 'styled-components';


export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  border: 1px solid lightblue;
  border-radius: 20px;
  height: 100%;
  
  &:hover {
    background: #d3dfe4;
  }

  .cheese-name {
    font-weight: bold;
  }
  button {
    border-radius: 0 0 20px 20px;
  }

  .cart-button:hover {
    font-weight: bold;
  }

  img {
    max-height: 250px;
    width: 100%;
    object-fit: cover;
    border-radius: 20px 20px 0 0;
  }

  .item-details {
    font-family: Arial, Helvetica, sans-serif;
    padding: 1rem;
    height: 100%;
  }
`;

export const ItemInfo = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  .item-id {
    color: #808080;
  }
`;