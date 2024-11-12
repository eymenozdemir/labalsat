import React, {useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import redWish from "../images/wish-black.svg";
import watch from "../images/watch.jpg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import tv from "../images/tv.jpg";
import { addToWishlist } from '../features/products/productSlice';
import { getUserProductWishlist } from '../features/user/userSlice';
import { useTranslation } from 'react-i18next';

const MobileCard = (props) => {
  
  const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer")).token
  : null;

  const config2 = {
      headers: {
      Authorization: `Bearer ${
          getTokenFromLocalStorage !== null ? getTokenFromLocalStorage : ""
      }`,
      Accept: "application/json",
      User: JSON.parse(localStorage.getItem("customer"))?._id,
      },
  };

  const { t } = useTranslation();
  const { data } = props;
  const dispatch = useDispatch();
  let location = useLocation();
  const wishState = useSelector((state) => state?.user?.wishlist?.wishlist);
  useEffect(() => {
    dispatch(getUserProductWishlist(config2));
  }, [wishState]);
  const addToWish = (id) => {
    dispatch(addToWishlist({id:id, config2:config2}));
  }
//dangerouslySetInnerHTML={{ __html: item?.description}} to dodge <p> tags
  return (
    <>
      {
        data?.map((item, index) => {
          return (
            <div key={index} className='gr-3'>
            {/* eslint-disable-next-line */}
              <div className="product-card position-relative">
                <div className="wishlist-icon position-absolute">
                  <button className='border-0 bg-transparent' onClick={(e) => {addToWish(item?._id)}} ><img src={wishState?.filter(i => i._id === item?._id).length > 0 ? redWish : wish} alt="wishlist" /></button>
                </div>
                  <div className="product-image d-flex justify-content-center">
                      <img src={item?.images[0]?.url} className='img-fluid' alt="product_img" />
                      <img src={item?.images[1] ? item.images[1].url : item?.images[0]?.url} className='img-fluid' alt="product_img" />
                  </div>
                  <div className="product-details mt-3">
                      <h6 className="brand">{item?.brand}</h6>
                      <h5 className='product-title'>{item?.title}</h5>
                      <p className="description" dangerouslySetInnerHTML={{ __html: item?.description}} ></p>
                      {(item?.price===0 || item?.price==="" || item?.price===null) ? <p className="price">{t("RequestQuote")}</p> : <p className="price">{item?.currency ? item?.currency : "USD"} {item?.price}</p>}
                  </div>
                  <div className="mt-1 d-flex align-items-center justify-content-center">
                    <Link to={'/product/'+ item?._id} className='d-flex justify-content-center border-0 button '>{t("DETAILS")}</Link>
                  </div>
              </div>
            </div>
          )
        })
      }
      
    </>
  );
};

export default MobileCard;