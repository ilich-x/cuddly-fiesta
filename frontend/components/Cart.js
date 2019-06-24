import React from 'react';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import CloseButton from './styles/CloseButton';
import SickButton from './styles/SickButton';

const Cart = () => (
  <CartStyles>
    <header>
      <CloseButton title="close">&times;</CloseButton>
      <Supreme>You Cart</Supreme>
      <p>You have</p>
    </header>

    <footer>
      <p>$10</p>
      <SickButton>Checkout</SickButton>
    </footer>
  </CartStyles>
);

export default Cart;
