import React, {FC} from 'react';

import cartEmptyImg from '../assets/img/empty-cart.png';
import {Link} from "react-router-dom";

const CartEmpty: FC = () => {
  return (
    <div>
      <div className="cart cart--empty">
        <h2>Корзина пустая <span>😕</span></h2>
        <p>Вероятней всего, вы не заказывали ещё пиццу.
          <br/>
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <img src={cartEmptyImg} alt="Empty cart"/>
        <Link to="/" className="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;