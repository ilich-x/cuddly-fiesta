import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import formatMoney from '../lib/formatMoney';

import RemoveFromCart from './RemoveFromCart';

const CartItemStyles = styled.li`
  padding: 1em 0;
  border-bottom: 1px solid ${props => props.theme.lightgrey};
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 10px;
  }
  h3,
  p {
    margin: 0;
  }
`;

const CartItem = ({ cartItem }) => {
  if (!cartItem.item)
    return (
      <CartItemStyles>
        <p>This item is no longer available</p>
        <RemoveFromCart id={cartItem.id} />
      </CartItemStyles>
    );
  const { image, title, price } = cartItem.item;

  return (
    <CartItemStyles>
      <img width="120" src={image} alt={title} />
      <div className="cart-item-details">
        <h3>{title}</h3>
        <p>
          {formatMoney(price * cartItem.quantity)}
          {' -  '}
          <em>
            {cartItem.quantity} &times; {formatMoney(price)} each
          </em>
        </p>
      </div>
      <RemoveFromCart id={cartItem.id} />
    </CartItemStyles>
  );
};

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
};

export default CartItem;
