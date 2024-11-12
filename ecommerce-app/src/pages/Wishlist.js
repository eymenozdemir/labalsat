import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProductWishlist } from '../features/user/userSlice';
import { deleteFromWishlist } from '../features/products/productSlice';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';

//30.line change the deffault image
const Wishlist = () => {
    const { t } = useTranslation();
    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 1223px)' });

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

    const dispatch = useDispatch();
    useEffect(() => {
        getWishlistFromDb();
    }, []);
    const getWishlistFromDb = () => {
        dispatch(getUserProductWishlist(config2));
    };
    const wishlistState = useSelector((state) => state?.user?.wishlist?.wishlist); //.Wishlist.Wishlist olabilir son wishlist ismi değişebilir ya da productslicede state."" kısmı buranın son değişkeni  olabilir
    const removeFromWishlist = (id) => {
        dispatch(deleteFromWishlist({id:id, config2:config2}));
        setTimeout(() => {
            //dispatch(addToWishlist(id));
            window.location.reload(false);          
        }, 300);
    }
    return (
        <>    
            {isDesktop && <>
                <Meta title={"Wishlist"} />
                <BreadCrumb title={t("Wishlist")} />
                <Container class1="wishlist-wrapper home-wrapper-2 py-5">
                        <div className="row">
                            {
                                wishlistState && wishlistState.length === 0 && <div className="text-center fs-3">
                                    {t("NoProdAdded")}
                                </div>
                            }
                            {
                                wishlistState && wishlistState?.map((item, index) => {
                                    return(
                                        <div className="col-3" key={index}>
                                            <div className="wishlist-card position-relative">
                                                <img onClick={() => {removeFromWishlist(item?._id)}} src="images/cross.svg" alt="cross" className="position-absolute cross img-fluid" />
                                                <div className="wishlist-card-image">
                                                    <img src={item?.images[0]?.url ? item?.images[0]?.url : "images/cross.svg"} className='img-fluid w-100 d-block mx-auto' alt="watch" />
                                                </div>
                                                <div className='bg-white px-3 py-3 align-items-center justify-content-between'>
                                                    <h6 className="brand">{item?.brand}</h6>
                                                    <h5 className='title'>{item?.title}</h5>
                                                    <p className="price">{item?.currency} {item?.price}</p>
                                                    <Link to={'/product/'+ item?._id} style={{ alignItems: 'center', flex: 1, justifyContent: 'center'}} className='mt-3 mx-4 align-items-center justify-content-between button '>{t("DETAILS")}</Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            
                        </div>
                    </Container>
            </>}

            {isMobile && <>
                <Meta title={"Wishlist"} />
                <BreadCrumb title={t("Wishlist")} />
                <Container class1="wishlist-wrapper home-wrapper-2 py-5">
                        <div className="row">
                            {
                                wishlistState && wishlistState.length === 0 && <div className="text-center fs-3">
                                    {t("NoProdAdded")}
                                </div>
                            }
                            {
                                wishlistState && wishlistState?.map((item, index) => {
                                    return(
                                        <div className="col-6 mt-3" key={index}>
                                            <div className="wishlist-card position-relative">
                                                <img onClick={() => {removeFromWishlist(item?._id)}} src="images/cross.svg" alt="cross" className="position-absolute cross img-fluid" />
                                                <div className="wishlist-card-image">
                                                    <img src={item?.images[0]?.url ? item?.images[0]?.url : "images/cross.svg"} className='img-fluid w-100 d-block mx-auto' alt="watch" />
                                                </div>
                                                <div className='bg-white px-3 py-3 align-items-center justify-content-between'>
                                                    <h6 className="brand">{item?.brand}</h6>
                                                    <h5 className='title'>{item?.title}</h5>
                                                    <p className="price">{item?.currency} {item?.price}</p>
                                                    <Link to={'/product/'+ item?._id} style={{ alignItems: 'center', flex: 1, justifyContent: 'center'}} className='mt-3 mx-4 align-items-center justify-content-between button '>{t("DETAILS")}</Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            
                        </div>
                    </Container>
            </>}
        </>
    )
}

export default Wishlist