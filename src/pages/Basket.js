import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct } from '../redux/slices/GetProductSlice';

function Basket() {
  const { basket } = useSelector((state) => state.getProductSlice);
  const dispatch = useDispatch();
  const handleRemoveClick = (e) => {
    dispatch(removeProduct(e));
  };

  return (
    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
      {basket?.map((item) => (
        <div key={item.id} style={{ width: '300px' }}>
          <img src={item.images[0]} alt="img" style={{ width: '100%' }} />
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <h3>{item.count}</h3>
          <button onClick={() => handleRemoveClick(item.id)}>Удалить из корзины</button>
        </div>
      ))}
    </div>
  );
}

export default Basket;
