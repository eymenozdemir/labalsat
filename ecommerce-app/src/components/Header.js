import React, { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import labalsatLogo from "../images/yatay-labalsat.png";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import { useDispatch, useSelector } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getAProduct } from '../features/products/productSlice';
import { getUserCart, getUserProductWishlist } from '../features/user/userSlice';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

/*
<div>
                <Link to='/cart' className='d-flex align-items-center gap-10 text-white'>
                  <img src={cart} alt='cart' />
                  <div className='d-flex flex-column gap-10'>
                    <span className='badge bg-white text-dark'>{cartState?.length ? cartState?.length : 0}</span>
                    <p className='mb-0'>$ {total ? total : 0}</p>
                  </div>
                </Link>
              </div>
*/


const Header = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 1223px)' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector(state=>state?.user?.cartProducts);
  const authState = useSelector(state => state?.user);
  const productState = useSelector(state => state?.product?.product);
  const [productOpt, setProductOpt] = useState([]);
  const [paginate, setPaginate] = useState(true);
  //const options = range(0, 1000).map((o) => `Item ${o}`);
  const [total, setTotal] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); // i18n.language contains the language assigned to lng in i18n.js file.


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

  useEffect(() => {
    dispatch(getUserCart(config2));
}, []);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + (Number(cartState[index].quantity) * cartState[index].price);
      setTotal(sum);
    }
  }, [cartState]);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      data.push({id:index,prod:element?._id,name:element?.title});
    }
    setProductOpt(data);
  }, [productState]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  }

  const chooseLanguage = (e) => {
    e.preventDefault();
    i18n.changeLanguage(e.target.value);   // i18n.changeLanguage() is used to change the language assigned to lng in i18n.js file.
    setSelectedLanguage(e.target.value);
    localStorage.setItem("lang", e.target.value);
}

  return (
  <>
    {isDesktop && 
    <>
      <header className="header-top-strip py-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">{t("Quote")}</p>
            </div>
            <div className="d-flex justify-content-end col-6">
              <select className=" text-white mb-0" style={{borderColor: "#131921", background: "#131921"}} defaultValue={selectedLanguage} onChange={chooseLanguage}>
                  <option value="en">English</option>
                  <option value="tr">Türkçe</option>
              </select>
              <p className="text-white mb-0">&nbsp; | &nbsp;</p>
              <p className="text-end text-white mb-0">{t("Contact")} <a className="text-white" href="tel: +90 533 051 5767"> +90 533 051 5767</a></p>
            </div>
          </div>
        </div>
      </header>

      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-3">
              <h2>
                <Link to='/' className="text-white">
                  <img src={labalsatLogo} width={300} height={80} alt='logo' />
                </Link>
              </h2>
            </div>

            <div className="col-5">
              <div className="input-group">
                <Typeahead
                  id='pagination-example'
                  onPaginate={() => console.log("Results paginated")}
                  onChange={(selected) => {
                    navigate(`/product/${selected[0]?.prod}`);
                    dispatch(getAProduct(selected[0]?.prod));
                  }}
                  options={productOpt}
                  paginate={paginate}
                  labelKey={'name'}
                  minLength={2}
                  placeholder={t("Search")}
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className='fs-6' />
                </span>
              </div>
            </div>

            <div className="col-4">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  {/*<Link to='/compare-product' className='d-flex align-items-center gap-10 text-white'>
                    <img src={compare} alt='compare' />
                    <p className='mb-0'>Compare <br /> Products</p>
                  </Link> */}
                </div>
                <div>
                  <Link to='/wishlist' className='d-flex align-items-center gap-10 text-white'>
                    <img src={wishlist} alt='wishlist' />
                    <p className='mb-0'>{t("About")} <br /> {t("Wishlist")}</p>
                  </Link>
                </div>
                <div>
                  <Link to={authState?.user === "" ? '/login' : '/my-profile'} className='d-flex align-items-center gap-10 text-white'>
                    <img src={user} alt='user' />
                    {
                      authState?.user === null ? <p className='mb-0'>{t("Login")}</p> : <p className='mb-0'>{t("Welcome")}<br />{authState?.user?.firstname}</p>
                    }
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-9">
              <div className="menu-bottom d-flex align-items-center gap-30">
                  <div className='d-flex align-items-center gap-30'>
                    <NavLink to="/"><button style={{ color: "white", background: "none" }} className='border border-0 bg-transpanet text-white text-uppercase ' type='button'>{t("Home")}</button></NavLink>
                    <NavLink to="/contact"><button style={{ color: "white", background: "none" }} className='border border-0 bg-transpanet text-white text-uppercase ' type='button'>{t("ContactHeader")}</button></NavLink>
                    <NavLink to="/offer"><button style={{ color: "white", background: "none" }} className='border border-0 bg-transpanet text-white text-uppercase ' type='button'>{t("Offer")}</button></NavLink>
                    <NavLink to="/my-profile"><button style={{ color: "white", background: "none" }} className='border border-0 bg-transpanet text-white text-uppercase ' type='button'>{t("MyOrders")}</button></NavLink>
                  </div>
              </div>
            </div>
            <div className="col-3" align='right'>
            <button onClick={handleLogout} style={{ color: "white", background: "none" }} className='border border-0 text-white text-uppercase ' type='button'>{t("Logout")}</button>
            </div>
          </div>
        </div>
      </header>
    </>}
    
    {isMobile && <>
      <header className="header-top-strip py-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-5">
              <p className="text-white mb-0">{t("Quote")}</p>
            </div>
            <div className="col-2">
              <select className=" text-white mb-0" style={{borderColor: "#131921", background: "#131921"}} defaultValue={selectedLanguage} onChange={chooseLanguage}>
                  <option value="en">English</option>
                  <option value="tr">Türkçe</option>
              </select>
            </div>
            <div className="d-flex justify-content-end align-items-start float-end col-5">
              <p className="text-end text-white mb-0"><a className="text-white" href="tel: +90 533 051 5767"> +90 533 051 5767</a></p>
            </div>
          </div>
        </div>
      </header>

      <header className="header-upper header-top-strip">
        <div className="container-xxl d-flex align-items-center justify-content-center">
          <div className="row d-flex align-items-center justify-content-center">
              <h2>
                <Link to='/' className="text-white">
                  <img src={labalsatLogo} width={300} height={80} alt='logo' />
                </Link>
              </h2>
          </div>
        </div>
      </header>

      <header className="header-upper header-top-strip">
        <div className="container-xxl" style={{maxWidth: "600px", paddingRight: "20px", paddingLeft: "20px"}}>
          <div className="row align-items-center">
            <div className="header-upper-links d-flex align-items-center justify-content-between">
              <div>
                <Link to='/wishlist' className='d-flex align-items-center gap-10 text-white'>
                  <img src={wishlist} alt='wishlist' />
                  <p className='mb-0'>{t("Fav")} <br /> {t("Wishlist")}</p>
                </Link>
              </div>
              <div>
                <Link to={authState?.user === "" ? '/login' : '/my-profile'} className='d-flex align-items-center gap-10 text-white'>
                  <img src={user} alt='user' />
                  {
                    authState?.user === null ? <p className='mb-0'>{t("Login")}</p> : <p className='mb-0'>{t("Welcome")}<br />{authState?.user?.firstname}</p>
                  }
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>


      <header className="header-upper py-1">
        <div className="container-xxl" style={{maxWidth: "600px"}}>
          <div className="row align-items-center">
              <div className="input-group">
                <Typeahead
                  id='pagination-example'
                  onPaginate={() => console.log("Results paginated")}
                  onChange={(selected) => {
                    navigate(`/product/${selected[0]?.prod}`);
                    dispatch(getAProduct(selected[0]?.prod));
                  }}
                  options={productOpt}
                  paginate={paginate}
                  labelKey={'name'}
                  minLength={2}
                  placeholder={t("Search")}
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className='fs-6' />
                </span>
              </div>
          </div>
        </div>
      </header>

      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-10">
              <div className="menu-bottom d-flex align-items-center gap-30">
                  <div className='d-flex align-items-center gap-30'>
                    <NavLink to="/"><button style={{ color: "white", background: "none" }} className='border border-0 bg-transpanet text-white text-uppercase ' type='button'>{t("Home")}</button></NavLink>
                    <NavLink to="/contact"><button style={{ color: "white", background: "none" }} className='border border-0 bg-transpanet text-white text-uppercase ' type='button'>{t("ContactHeader")}</button></NavLink>
                    <NavLink to="/offer"><button style={{ color: "white", background: "none" }} className='border border-0 bg-transpanet text-white text-uppercase ' type='button'>{t("Offer")}</button></NavLink>
                    <NavLink to="/my-profile"><button style={{ color: "white", background: "none" }} className='border border-0 bg-transpanet text-white text-uppercase ' type='button'>{t("MyOrders")}</button></NavLink>
                  </div>
              </div>
            </div>
            <div className="col-2" align='right'>
            <button onClick={handleLogout} style={{ color: "white", background: "none" }} className='border border-0 text-white text-uppercase ' type='button'>{t("Logout")}</button>
            </div>
          </div>
        </div>
      </header>
    </>}
  </>);
}

export default Header