import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import watch from "../images/watch.jpg";
import Container from '../components/Container';
import ProductCard from '../components/ProductCard';
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from "formik";
import * as yup from "yup";
import { getUserCart, createAnOrder, resetState, deleteUserCart } from '../features/user/userSlice';
import countryList from 'react-select-country-list';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';

//dispatch(createAnOrder({totalPrice:totalAmount,orderedItems:cartProductState,shippingInfo:JSON.parse(localStorage.getItem("address"))}));  gibi olucak 
//sonrasında dispatch(deleteUserCart(config2));
//localStorage.removeItem("address");
//dispatch(resetState());

const shippingSchema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    address: yup.string().required("Address details are required"),
    city: yup.string().required("City is required"),
    country: yup.string().required("Country is required"),
    pincode: yup.number(),
    description: yup.string(),
  });

const Checkout = () => {
    const { t } = useTranslation();
    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 1223px)' });
    const dispatch = useDispatch();
    const authState = useSelector(state=>state?.user?.user);
    const cartState = useSelector(state=>state?.user?.cartProducts);
    const [shippingInfo, setShippingInfo] = useState(null);
    const [cartProductState, setCartProductState] = useState([]);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            country: "",
            pincode: "",
            other: "",
            description: "",
        },
        validationSchema: shippingSchema,
        onSubmit: (values) => {
            setShippingInfo(values);
            localStorage.setItem("address", JSON.stringify(values));
            setTimeout(() => {
                //buraya gelicek galiba fonksiyon
                let temp=0;
                if (cartState[0]?.productId?.price !== null ){
                    temp=cartState[0]?.price;
                }
                if (cartState[0]?.setup === true && cartState[0]?.productId?.setupPrice !== null ){
                    temp=temp+cartState[0].productId.setupPrice;
                }
                if (cartState[0]?.service === true && cartState[0]?.productId?.servicePrice !== null ){
                    temp=temp+cartState[0].productId.servicePrice;
                }
                if (cartState[0]?.price === 0){
                    temp = 0;
                }
                dispatch(createAnOrder({currency:cartState[0]?.currency, totalPrice:temp,orderedItems:{product:cartState[0]?.productId, quantity:cartState[0]?.quantity, price:cartState[0]?.price, setup:cartState[0]?.setup, service:cartState[0]?.service},shippingInfo:JSON.parse(localStorage.getItem("address")), config:config2}));
                dispatch(deleteUserCart(config2));
                localStorage.removeItem("address");
                dispatch(resetState());
                //window.location.reload(false);
            }, 300)
        },
    });

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

    /*
    useEffect(() => {
        let item=[];
        for (let index = 0; index < cartState?.length; index++) {
            item.push(cartState[index]);
        }
        setCartProductState(item);
    }, [cartState]);
    */

    /*
    useEffect(() => {
        if(authState?.orderedProduct?.order!==null && authState?.orderedProduct?.success===true){
            navigate("my-orders");
        }
    }, [authState]);
    */

    return (
        <>
            {isDesktop && <>
                <Container class1="checkout-wrapper py-5 home-wrapper-2">
                        <div className="row align-items-center">
                            <div className="col-7">
                                <div className="checkout-left-data">
                                    <h4 className="title">{t("ContactInfo")}</h4>
                                    <p className="user-details">{t("Name")} : {authState?.firstname}  {authState?.lastname}</p>
                                    <p className="user-details">{t("Email")} : {authState?.email}</p>
                                    <p className="user-details">{t("MobileNumber")} : {authState?.mobile}</p>
                                    <p className="user-details">{t("Company")} : {authState?.company}</p>
                                    <h4 className="title my-3">{t("ShippingAddress")}</h4>
                                    <form onSubmit={formik.handleSubmit} action="" className='d-flex gap-15 flex-wrap justify-content-between'>
                                        <div className='w-100'>
                                            <select name="country" value={formik.values.country} onChange={formik.handleChange("country")} onBlur={formik.handleBlur("country")} className='form-control form-select' id="">
                                                <option value="" selected disabled>{t("SelectCountry")}</option>
                                                {countryList().getData().map((i, j) => {
                                                    return (
                                                        <option key={j} value={i.label}>
                                                        {i.label}
                                                        </option>
                                                    );
                                                    })}
                                            </select>
                                            <div className="error ms-2 my-1">
                                                {
                                                    formik.touched.country && formik.errors.country
                                                }
                                            </div>
                                        </div>
                                        <div className='flex-grow-1'>
                                            <input type="text" placeholder={t("FName")} name='firstName' value={formik.values.firstName} onChange={formik.handleChange("firstName")} onBlur={formik.handleBlur("firstName")} className="form-control" />
                                            <div className="error ms-2 my-1">
                                                {
                                                    formik.touched.firstName && formik.errors.firstName
                                                }
                                            </div>
                                        </div>
                                        <div className='flex-grow-1'>
                                            <input type="text" placeholder={t("LName")} name='lastName' value={formik.values.lastName} onChange={formik.handleChange("lastName")} onBlur={formik.handleBlur("lastName")} className="form-control" />
                                            <div className="error ms-2 my-1">
                                                {
                                                    formik.touched.lastName && formik.errors.lastName
                                                }
                                            </div>
                                        </div>
                                        <div className='w-100'>
                                            <input type="text" placeholder={t("Address")} name='address' value={formik.values.address} onChange={formik.handleChange("address")} onBlur={formik.handleBlur("address")} className="form-control" />
                                            <div className="error ms-2 my-1">
                                                {
                                                    formik.touched.address && formik.errors.address
                                                }
                                            </div>
                                        </div>
                                        <div className='w-100'>
                                            <input type="text" placeholder={t("Apt")} name='other' value={formik.values.other} onChange={formik.handleChange("other")} onBlur={formik.handleBlur("other")} className="form-control" />
                                        </div>
                                        <div className='flex-grow-1'>
                                            <input type="text" placeholder={t("City")} name='city' value={formik.values.city} onChange={formik.handleChange("city")} onBlur={formik.handleBlur("city")} className="form-control" />
                                            <div className="error ms-2 my-1">
                                                {
                                                    formik.touched.city && formik.errors.city
                                                }
                                            </div>
                                        </div>
                                        <div className='flex-grow-1'>
                                            <input type="text" placeholder={t("ZIP")} name='pincode' value={formik.values.pincode} onChange={formik.handleChange("pincode")} onBlur={formik.handleBlur("pincode")} className="form-control" />
                                            <div className="error ms-2 my-1">
                                                {
                                                    formik.touched.pincode && formik.errors.pincode
                                                }
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <ReactQuill
                                            theme="snow"
                                            name="description"
                                            onChange={formik.handleChange("description")}
                                            value={formik.values.description}
                                            placeholder={t("AnythingElse")}
                                            />
                                        </div>
                                        <div className="error">
                                            {formik.touched.description && formik.errors.description}
                                        </div>
                                        <div className='w-100'>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <Link to="/" className='text-dark'>
                                                    <BiArrowBack className='me-2' />
                                                    {t("Return")}
                                                </Link>
                                                <button className='button' type='submit'>
                                                    {t("SendReq")}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="col-5 border-start align-items-center">
                                <h4 className="title">{t("Product")}</h4>
                                <div className='py-4'>
                                    {
                                        cartState && cartState?.map((item, index) => {
                                            return(
                                                <div key={index} className=''>
                                                <div className="product-card position-relative">
                                                <div className="product-image d-flex justify-content-center">
                                                    <img src={item?.productId?.images[0]?.url} className='img-fluid' alt="product_img" />
                                                    <img src={item?.productId?.images[1] ? item?.productId?.images[1]?.url : item?.productId?.images[0]?.url} className='img-fluid' alt="product_img" />
                                                </div>
                                                <div className="product-details">
                                                    <h6 className="brand">{item?.productId?.brand}</h6>
                                                    <h5 className='product-title'>{item?.productId?.title}</h5>
                                                    <p className="description" dangerouslySetInnerHTML={{ __html: item?.productId?.description}} ></p>
                                                    <p className="setup">{item?.setup===true ? t("SetupPlus") : ""}</p>
                                                    <p className="service">{item?.service===true ? t("ServicePlus") : ""}</p>
                                                    <p className="price">{(item?.productId?.price===0 || item?.productId?.price === null) ? t("ReqQuote") : item?.productId?.currency +" "+ item?.productId?.price}</p>
                                                </div>
                                            </div>
                                            </div>

                                            );
                                        })
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </Container>
            </>}

            {isMobile && <>
                <Container class1="checkout-wrapper pt-3 pb-5 home-wrapper-2">
                        <div className="row align-items-center">
                        <div className="col-12 border-start align-items-center">
                                <h4 className="title d-flex justify-content-center">{t("Product")}</h4>
                                <div className='pb-4'>
                                    {
                                        cartState && cartState?.map((item, index) => {
                                            return(
                                                <div key={index} className=''>
                                                <div className="product-card position-relative">
                                                <div className="product-image d-flex justify-content-center">
                                                    <img src={item?.productId?.images[0]?.url} className='img-fluid' alt="product_img" />
                                                    <img src={item?.productId?.images[1] ? item?.productId?.images[1]?.url : item?.productId?.images[0]?.url} className='img-fluid' alt="product_img" />
                                                </div>
                                                <div className="product-details">
                                                    <h6 className="brand">{item?.productId?.brand}</h6>
                                                    <h5 className='product-title'>{item?.productId?.title}</h5>
                                                    <p className="description" dangerouslySetInnerHTML={{ __html: item?.productId?.description}} ></p>
                                                    <p className="setup">{item?.setup===true ? t("SetupPlus") : ""}</p>
                                                    <p className="service">{item?.service===true ? t("ServicePlus") : ""}</p>
                                                    <p className="price">{(item?.productId?.price===0 || item?.productId?.price === null) ? t("ReqQuote") : item?.productId?.currency +" "+ item?.productId?.price}</p>
                                                </div>
                                            </div>
                                            </div>

                                            );
                                        })
                                    }
                                    
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="checkout-left-data">
                                    <h4 className="title d-flex justify-content-center">{t("ContactInfo")}</h4>
                                    <p className="user-details">{t("Name")} : {authState?.firstname}  {authState?.lastname}</p>
                                    <p className="user-details">{t("Email")} : {authState?.email}</p>
                                    <p className="user-details">{t("MobileNumber")} : {authState?.mobile}</p>
                                    <p className="user-details">{t("Company")} : {authState?.company}</p>
                                    <h4 className="title  d-flex justify-content-center my-3">{t("ShippingAddress")}</h4>
                                    <form onSubmit={formik.handleSubmit} action="" className='d-flex gap-15 flex-wrap justify-content-between'>
                                        <div className='w-100'>
                                            <select name="country" value={formik.values.country} onChange={formik.handleChange("country")} onBlur={formik.handleBlur("country")} className='form-control form-select' id="">
                                                <option value="" selected disabled>{t("SelectCountry")}</option>
                                                {countryList().getData().map((i, j) => {
                                                    return (
                                                        <option key={j} value={i.label}>
                                                        {i.label}
                                                        </option>
                                                    );
                                                    })}
                                            </select>
                                            <div className="error ms-2 my-1">
                                                {
                                                    formik.touched.country && formik.errors.country
                                                }
                                            </div>
                                        </div>
                                        <div className='flex-grow-1'>
                                            <input type="text" placeholder={t("FName")} name='firstName' value={formik.values.firstName} onChange={formik.handleChange("firstName")} onBlur={formik.handleBlur("firstName")} className="form-control" />
                                            <div className="error ms-2 my-1">
                                                {
                                                    formik.touched.firstName && formik.errors.firstName
                                                }
                                            </div>
                                        </div>
                                        <div className='flex-grow-1'>
                                            <input type="text" placeholder={t("LName")} name='lastName' value={formik.values.lastName} onChange={formik.handleChange("lastName")} onBlur={formik.handleBlur("lastName")} className="form-control" />
                                            <div className="error ms-2 my-1">
                                                {
                                                    formik.touched.lastName && formik.errors.lastName
                                                }
                                            </div>
                                        </div>
                                        <div className='w-100'>
                                            <input type="text" placeholder={t("Address")} name='address' value={formik.values.address} onChange={formik.handleChange("address")} onBlur={formik.handleBlur("address")} className="form-control" />
                                            <div className="error ms-2 my-1">
                                                {
                                                    formik.touched.address && formik.errors.address
                                                }
                                            </div>
                                        </div>
                                        <div className='w-100'>
                                            <input type="text" placeholder={t("Apt")} name='other' value={formik.values.other} onChange={formik.handleChange("other")} onBlur={formik.handleBlur("other")} className="form-control" />
                                        </div>
                                        <div className='flex-grow-1'>
                                            <input type="text" placeholder={t("City")} name='city' value={formik.values.city} onChange={formik.handleChange("city")} onBlur={formik.handleBlur("city")} className="form-control" />
                                            <div className="error ms-2 my-1">
                                                {
                                                    formik.touched.city && formik.errors.city
                                                }
                                            </div>
                                        </div>
                                        <div className='flex-grow-1'>
                                            <input type="text" placeholder={t("ZIP")} name='pincode' value={formik.values.pincode} onChange={formik.handleChange("pincode")} onBlur={formik.handleBlur("pincode")} className="form-control" />
                                            <div className="error ms-2 my-1">
                                                {
                                                    formik.touched.pincode && formik.errors.pincode
                                                }
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <ReactQuill
                                            theme="snow"
                                            name="description"
                                            onChange={formik.handleChange("description")}
                                            value={formik.values.description}
                                            placeholder={t("AnythingElse")}
                                            />
                                        </div>
                                        <div className="error">
                                            {formik.touched.description && formik.errors.description}
                                        </div>
                                        <div className='w-100'>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <Link to="/" className='text-dark'>
                                                    <BiArrowBack className='me-2' />
                                                    {t("Return")}
                                                </Link>
                                                <button className='button' type='submit'>
                                                    {t("SendReq")}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Container>
            </>}
        </>
    )
}

export default Checkout