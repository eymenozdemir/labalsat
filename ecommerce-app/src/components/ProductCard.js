import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../features/products/productSlice';

const ProductCard = (props) => {
  
  const { data } = props;
  const dispatch = useDispatch();
  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  }
//dangerouslySetInnerHTML={{ __html: item?.description}} to dodge <p> tags
  return (
    <>
      {
        data?.map((item, index) => {
          return (
            <div key={index} className='gr-4 mb-3'>
            {/* eslint-disable-next-line */}
              <div className="product-card position-relative">
                  <div className="product-image d-flex justify-content-center">
                      <img src={item?.images[0]?.url} className='img-fluid' alt="product_img" />
                      <img src={item?.images[1] ? item.images[1].url : item?.images[0]?.url} className='img-fluid' alt="product_img" />
                  </div>
                  <div className="product-details">
                      <h6 className="brand">{item?.brand}</h6>
                      <h5 className='product-title'>{item?.title}</h5>
                      <p className="description" dangerouslySetInnerHTML={{ __html: item?.description}} ></p>
                      <p className="price" style={{ textTransform: 'uppercase'}}> {item?.status}</p>
                  </div>
              </div>
            </div>
          )
        })
      }
      
    </>
  );
};

export default ProductCard;