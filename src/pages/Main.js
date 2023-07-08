import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, getProducts } from '../redux/slices/GetProductSlice';

function Main() {
  const { data } = useSelector((state) => state.getProductSlice);
  const dispatch = useDispatch();
  const handleAddClick = (e) => {
    dispatch(addProduct(e));
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
      {data?.map((item) => (
        <div key={item.id} style={{ width: '300px' }}>
          <img src={item.images[0]} alt="img" style={{ width: '100%' }} />
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <button onClick={() => handleAddClick(item)}>Добавить в корзину</button>
        </div>
      ))}
    </div>
  );
}

export default Main;
