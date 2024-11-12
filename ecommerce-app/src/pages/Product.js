import React, { useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import ProductCard from '../components/ProductCard';
import MobileCard from '../components/MobileCard';
import ReactImageZoom from 'react-image-zoom';
import Container from '../components/Container';
import noImageIcon from "../images/no-image.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAProduct, getAllProducts } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import { addProdToCart, getUserCart, deleteUserCart } from '../features/user/userSlice';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';

//8.video 11.42 eğer add to cart çalışmıyosa
const Product = () => {
    const { t } = useTranslation();
    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 1223px)' });
    const [quantity, setQuantity] = useState(1);
    const [setup, setSetup] = useState(false);
    const [service, setService] = useState(false);
    const [alreadyAdded, setAlreadyAdded] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const getProductId = location.pathname.split('/')[2];
    const dispatch = useDispatch();
    const productState = useSelector(state => state?.product?.singleproduct);
    const productsState = useSelector(state => state?.product?.product);
    const cartState = useSelector(state => state?.user?.cartProducts);
    const [photoState, setPhotoState] = useState("");

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
        dispatch(getAProduct(getProductId));
        dispatch(getUserCart(config2));
        dispatch(getAllProducts());
    }, []);

    useEffect(() => {
        for (let index = 0; index < cartState?.length; index++) { //cartState.length vardı koşulda
            if(getProductId===cartState[index]?.productId?._id){
                setAlreadyAdded(true);
            }
        };
    }, []);

    const uploadCart = () => {
        dispatch(deleteUserCart(config2));
        let tempPrice = 0;
        if(productState?.price !== null){
            tempPrice = productState?.price
        };
        let tempCurrency = "USD";
        if(productState?.currency !== ""){
            tempCurrency = productState?.currency
        };
        dispatch(addProdToCart({productId: productState?._id, setup, service, quantity, currency: tempCurrency, price: tempPrice, config:config2}));
        navigate('/checkout');
    }
    
    const [otherProduct, setOtherProduct] = useState([]);
    //related için istenen fonksiyonu sor ve ona göre burayı düzenle
    useEffect(() => {
        let data = [];
        for (let index = 0; index < productsState?.length; index++) { //cartState.length vardı koşulda
            const element = productsState[index];
            if (element.category === productState?.category) {
                data.push(element);
            }
            setOtherProduct(data);
            if (data.length == 3) {
                break;
            }
        }            
        setPhotoState(productState?.images[0]?.url)
    }, [productState]);

    const props = { scale: 0.5, img: photoState ? photoState : noImageIcon };
    return (
        <>
            {isDesktop && <>
                <Meta title={"Product Name"} />
                <BreadCrumb title={productState?.title} />
                <Container class1="main-product-wrapper py-5 home-wrapper-2">
                    <div className="row">
                        <div className="col-6">
                            <div className="main-product-image">
                                <div>
                                    <ReactImageZoom {...props} />
                                </div>
                            </div>

                            <div className="other-product-images d-flex flex-wrap gap-15 justify-content-between">
                                {productState?.images.map((item, index) => {
                                    return<div key={index}>
                                        <img
                                            src={item?.url}
                                            className='img-fluid'
                                            alt=""
                                            onClick={() => setPhotoState(item?.url)}
                                        />
                                    </div>
                                })}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="main-product-details">
                                <div className="border-bottom">
                                    <h3 className='title'>{productState?.title}</h3>
                                    <p className='id'>ID: {productState?._id.substr(productState?._id.length - 6)}</p>
                                </div>
                                <div className="border-bottom">
                                    {(productState?.price===0 || productState?.price==="" || productState?.price===null) ? <p className="price my-2">{t("RequestQuote")}</p> : <p className="price my-2">{productState?.currency ? productState?.currency : "USD"} {productState?.price}</p>}
                                </div>
                                <div className="py-3">
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                        <h3 className='product-heading'>{t("BrandDot")}</h3>
                                        <p className='prduct-data'>{productState?.brand}</p>
                                    </div>
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                        <h3 className='product-heading'>{t("CategoryDot")}</h3>
                                        <p className='prduct-data'>{productState?.category}</p>
                                    </div>
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                        <h3 className='product-heading'>{t("TypeDot")}</h3>
                                        <p className='prduct-data'>{productState?.type}</p>
                                    </div>
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                        <h3 className='product-heading'>{t("ModelDot")}</h3>
                                        <p className='prduct-data'>{productState?.model} {productState?.submodel}</p>
                                    </div>
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                        <h3 className='product-heading'>{t("LocationDot")}</h3>
                                        <p className='prduct-data'>{productState?.location}</p>
                                    </div>
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                        <h3 className='product-heading'>{t("AgeDot")}</h3>
                                        <p className='prduct-data'>{productState?.age}</p>
                                    </div>
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                        <h3 className='product-heading'>{t("TagsDot")}</h3>
                                        <p className='prduct-data'>{productState?.tags}</p>
                                    </div>
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                        <h3 className='product-heading'>{t("ConditionDot")}</h3>
                                        <p className='prduct-data'>{productState?.condition}</p>
                                    </div>
                                    {
                                    true && <div className="d-flex gap-10 align-items-center my-2 form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={(e)=>{console.log("changed", e);setSetup(e.target.checked)}} value={setup}/>
                                        {productState?.setupPrice===null || productState?.setupPrice==="" ? <label className="form-check-label" htmlFor="exampleCheck1">{t("InstallationDot2")}</label> : <label className="form-check-label" htmlFor="exampleCheck1">{t("InstallationDot")} {productState?.currency} {productState?.setupPrice}</label>}
                                    </div>
                                    }
                                    {
                                    true && <div className="d-flex gap-10 align-items-center my-2 form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={(e)=>setService(e.target.checked)} value={service}/>
                                        {productState?.servicePrice===null || productState?.servicePrice==="" ? <label className="form-check-label" htmlFor="exampleCheck1">{t("WarrantyDot2")}</label> : <label className="form-check-label" htmlFor="exampleCheck1">{t("WarrantyDot")} {productState?.currency} {productState?.servicePrice}</label>}
                                    </div>
                                    }
                                    <div className='d-flex gap-15 align-items-center flex-row mt-2 mb-3'>
                                        {
                                            true && <>
                                                <h3 className='product-heading'>{t("QuantityDot")}</h3>
                                                <div>
                                                    <input type="number" className='form-control' style={{ width: "50px" }} min={1} max={10} onChange={(e)=>setQuantity(e.target.value)} value={quantity}/>
                                                </div>
                                            </>
                                        }
                                        <div className={alreadyAdded ? 'd-flex align-items-center gap-30 ms-0' : 'd-flex align-items-center gap-30 ms-5'}>
                                            <button className='button border-0' type='submit' onClick={()=>uploadCart()}>{alreadyAdded ? t("GoCart") : t("AddCart")}</button>
                                            {/*<button className="button signup border-0">Buy It Now</button>*/}
                                        </div>

                                    </div>
                                    <div className='d-flex gap-10 flex-column my-3'>
                                        <h3 className='product-heading'>{t("DescriptionDot")}</h3>
                                        <p className='prduct-data' dangerouslySetInnerHTML={{ __html: productState?.description}}></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
                {/*
                <Container class1="description-wrapper py-5 home-wrapper-2">
                    <div className="row">
                        <div className="col-12">
                            <h4>Description</h4>
                            <div className='bg-white p-3'>
                                <p dangerouslySetInnerHTML={{ __html: productState?.description}}>
                                    
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
                */}
                <Container class1="featured-wrapper py-5 home-wrapper-2">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="section-heading">{t("Featured")}</h3>
                        </div>
                        <ProductCard data={otherProduct}/>
                        <ProductCard />
                        <ProductCard />
                    </div>
                </Container>
            </>}

            {isMobile && <>
                <Meta title={"Product Name"} />
                <BreadCrumb title={productState?.title} />
                <Container class1="main-product-wrapper py-5 home-wrapper-2">
                    <div className="row">
                        <div className="col-12">
                            <div className="border-bottom">
                                <h3 className='title'>{productState?.title}</h3>
                            </div>
                            <div className="main-product-image">
                                <img
                                    src={photoState ? photoState : noImageIcon}
                                    className='img-fluid'
                                    alt=""
                                />
                            </div>

                            <div className="other-product-images d-flex flex-wrap gap-15 justify-content-between">
                                {productState?.images.map((item, index) => {
                                    return<div key={index}>
                                        <img
                                            src={item?.url}
                                            className='img-fluid'
                                            alt=""
                                            onClick={() => setPhotoState(item?.url)}
                                        />
                                    </div>
                                })}
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="main-product-details">
                                <div className="border-bottom">
                                    <h3 className='title'>{productState?.title}</h3>
                                    <p className='id'>ID: {productState?._id.substr(productState?._id.length - 6)}</p>
                                </div>
                                <div className="border-bottom">
                                    {(productState?.price===0 || productState?.price==="" || productState?.price===null) ? <p className="price my-2">Request a Quote</p> : <p className="price my-2">{productState?.currency ? productState?.currency : "USD"} {productState?.price}</p>}
                                </div>
                                <div className="py-3">
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                        <h3 className='product-heading'>{t("BrandDot")}</h3>
                                        <p className='prduct-data'>{productState?.brand}</p>
                                    </div>
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                        <h3 className='product-heading'>{t("CategoryDot")}</h3>
                                        <p className='prduct-data'>{productState?.category}</p>
                                    </div>
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                        <h3 className='product-heading'>{t("TypeDot")}</h3>
                                        <p className='prduct-data'>{productState?.type}</p>
                                    </div>
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                        <h3 className='product-heading'>{t("ModelDot")}</h3>
                                        <p className='prduct-data'>{productState?.model} {productState?.submodel}</p>
                                    </div>
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                        <h3 className='product-heading'>{t("LocationDot")}</h3>
                                        <p className='prduct-data'>{productState?.location}</p>
                                    </div>
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                        <h3 className='product-heading'>{t("AgeDot")}</h3>
                                        <p className='prduct-data'>{productState?.age}</p>
                                    </div>
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                        <h3 className='product-heading'>{t("TagsDot")}</h3>
                                        <p className='prduct-data'>{productState?.tags}</p>
                                    </div>
                                    <div className='d-flex gap-10 align-items-center my-2'>
                                        <h3 className='product-heading'>{t("ConditionDot")}</h3>
                                        <p className='prduct-data'>{productState?.condition}</p>
                                    </div>
                                    {
                                    true && <div className="d-flex gap-10 align-items-center my-2 form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={(e)=>{console.log("changed", e);setSetup(e.target.checked)}} value={setup}/>
                                        {productState?.setupPrice===null || productState?.setupPrice==="" ? <label className="form-check-label" htmlFor="exampleCheck1">{t("InstallationDot2")}</label> : <label className="form-check-label" htmlFor="exampleCheck1">{t("InstallationDot")}{productState?.currency} {productState?.setupPrice}</label>}
                                    </div>
                                    }
                                    {
                                    true && <div className="d-flex gap-10 align-items-center my-2 form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={(e)=>setService(e.target.checked)} value={service}/>
                                        {productState?.servicePrice===null || productState?.servicePrice==="" ? <label className="form-check-label" htmlFor="exampleCheck1">{t("WarrantyDot2")}</label> : <label className="form-check-label" htmlFor="exampleCheck1">{t("WarrantyDot")}{productState?.currency} {productState?.servicePrice}</label>}
                                    </div>
                                    }
                                    <div className='d-flex gap-15 align-items-center flex-row mt-2 mb-3'>
                                        {
                                            true && <>
                                                <h3 className='product-heading'>{t("QuantityDot")}</h3>
                                                <div>
                                                    <input type="number" className='form-control' style={{ width: "50px" }} min={1} max={10} onChange={(e)=>setQuantity(e.target.value)} value={quantity}/>
                                                </div>
                                            </>
                                        }
                                        <div className={alreadyAdded ? 'd-flex align-items-center gap-30 ms-0' : 'd-flex align-items-center gap-30 ms-5'}>
                                            <button className='button border-0' type='submit' onClick={()=>uploadCart()}>{alreadyAdded ? t("GoCart") : t("AddCart")}</button>
                                            {/*<button className="button signup border-0">Buy It Now</button>*/}
                                        </div>

                                    </div>
                                    <div className='d-flex gap-10 flex-column my-3'>
                                        <h3 className='product-heading'>{t("DescriptionDot")}</h3>
                                        <p className='prduct-data' dangerouslySetInnerHTML={{ __html: productState?.description}}></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
                {/*
                <Container class1="description-wrapper py-5 home-wrapper-2">
                    <div className="row">
                        <div className="col-12">
                            <h4>Description</h4>
                            <div className='bg-white p-3'>
                                <p dangerouslySetInnerHTML={{ __html: productState?.description}}>
                                    
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
                */}
                <Container class1="featured-wrapper py-5 home-wrapper-2">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="section-heading">{t("Featured")}</h3>
                        </div>
                        <MobileCard data={[otherProduct[0],otherProduct[1]]}/>
                        <MobileCard />
                        <MobileCard />
                    </div>
                </Container>
            </>}
        </>
    )
}

export default Product