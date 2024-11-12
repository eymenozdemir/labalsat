import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../components/Container'
import BreadCrumb from '../components/BreadCrumb'
import ProductCard from '../components/ProductCard';
import MobileProdCard from '../components/MobileProdCard';
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrder, loginUser, updateProfile } from '../features/user/userSlice'
import { getAProduct, getMyProducts } from '../features/products/productSlice';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {FiEdit} from 'react-icons/fi';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';

/* Bunu ürünlerde servis ve kurulum için kullanabiliriz
<div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
</div>
*/

const profileSchema = yup.object({
    firstname: yup.string().required("First name is required"),
    lastname: yup.string().required("Last name is required"),
    email: yup.string().email("Email should be valid").required("Email is required"),
    mobile: yup.string().required("Mobile number is required"),
    company: yup.string(),
  });

const Profile = () => {
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
    const orderState = useSelector(state=>state?.user?.getorderedProduct);
    const userState = useSelector(state=>state?.user?.user);
    const productsState = useSelector(state => state?.product?.myProduct);
    const [edit, setEdit] = useState(true);
    const [otherProduct, setOtherProduct] = useState([]);

    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
            firstname: userState.firstname,
            lastname: userState.lastname,
            email: userState.email,
            mobile: userState.mobile,
            company: userState.company || "",

        },
        validationSchema: profileSchema,
        onSubmit: (values) => {
            dispatch(updateProfile({data:values, config2: config2}));
            setEdit(true);
        },
    });

    useEffect(() => {
        dispatch(getUserOrder(config2));
        dispatch(getMyProducts());
        //dispatch(loginUser());
    }, []);

    useEffect(() => {
        let data = [];
        for (let index = 0; index < productsState?.length; index++) { //cartState.length vardı koşulda
            const element = productsState[index];
            //console.log("eşleşiyo mu", element.ownerId, userState?._id);
            if (element.ownerId === userState?._id) {
                //console.log("eşleşiyo", element.ownerId, userState?._id);
                data.push(element);
            }
            setOtherProduct(data);
        }            
    }, [productsState, userState]);

    const orderFunc = (Id) => {
        let data = [];
        for (let index = 0; index < productsState?.length; index++) { //cartState.length vardı koşulda
            if (productsState[index]._id == Id) {
                data.push(productsState[index]);
            }
        }
        return data[0];
    }

  return (
    <>
        {isDesktop && <>
            <BreadCrumb title={t("MyProfile")} />
            <Container class1='cart-warpper home-wrapper-2 py-5'>
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className='my-3'>{t("UpdateProfile")}</h3>
                            <FiEdit className='fs-3' onClick={()=>setEdit(false)}/>
                        </div>
                    </div>
                    <div className="col-12">
                        <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="example1" className="form-label">{t("FName")}</label>
                            <input type="text" name="firstname" disabled={edit} className="form-control" id="example1" value={formik.values.firstname} onChange={formik.handleChange('firstname')} onBlur={formik.handleBlur('firstname')}/>
                            <div className="error">
                                {formik.touched.firstname && formik.errors.firstname}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="example12" className="form-label">{t("LName")}</label>
                            <input type="text" name="lastname" disabled={edit} className="form-control" id="example12" value={formik.values.lastname} onChange={formik.handleChange('lastname')} onBlur={formik.handleBlur('lastname')}/>
                            <div className="error">
                                {formik.touched.lastname && formik.errors.lastname}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">{t("EmailAdd")}</label>
                            <input type="email" name="email" disabled={edit} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={formik.values.email} onChange={formik.handleChange('email')} onBlur={formik.handleBlur('email')}/>
                            <div className="error">
                                {formik.touched.email && formik.errors.email}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail12" className="form-label">{t("MobileNumber")}</label>
                            <input type="number" name="mobile" disabled={edit} className="form-control" id="exampleInputEmail12" aria-describedby="emailHelp" value={formik.values.mobile} onChange={formik.handleChange('mobile')} onBlur={formik.handleBlur('mobile')}/>
                            <div className="error">
                                {formik.touched.mobile && formik.errors.mobile}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="example3" className="form-label">{t("CompanyName")}</label>
                            <input type="text" name="company" disabled={edit} className="form-control" id="example3" value={formik.values.company} onChange={formik.handleChange('company')} onBlur={formik.handleBlur('company')}/>
                            <div className="error">
                                {formik.touched.company && formik.errors.company}
                            </div>
                        </div>
                        {edit===false && <button type="submit" className="btn btn-primary">{t("Save")}</button>}
                        </form>
                    </div>
                </div>           
            </Container>
            <Container class1='cart-warpper home-wrapper-2 py-5'>
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className='my-3'>{t("MyOrders")}</h3>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mt-3">
                        {
                            orderState && orderState?.map((item,index) => {
                                return (
                                    <div style={{backgroundColor:"#febd69"}} className="row pt-3 my-3" key={index}>
                                        <div className="col-12">
                                            <div className="row py-3" style={{backgroundColor:"#232f3e"}}>
                                                <div className="row">
                                                    <div className="col-3">
                                                        <h5 style={{color: '#febd69'}}>{t("ProdName")}</h5>
                                                    </div>
                                                    <div className="col-3">
                                                        <h5 style={{color: '#febd69'}}>{t("Brand")}</h5>
                                                    </div>
                                                    <div className="col-3">
                                                        <h5 style={{color: '#febd69'}}>{t("Category")}</h5>
                                                    </div>
                                                    <div className="col-3">
                                                        <h5 style={{color: '#febd69'}}>{t("Price")}</h5>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-3">
                                                        <h5 className='text-white'>{orderFunc(item?.orderedItems[0]?.product)?.title}</h5>
                                                    </div>
                                                    <div className="col-3">
                                                        <h5 className='text-white'>{orderFunc(item?.orderedItems[0]?.product)?.brand}</h5>
                                                    </div>
                                                    <div className="col-3">
                                                        <h5 className='text-white'>{orderFunc(item?.orderedItems[0]?.product)?.category}</h5>
                                                    </div>
                                                    <div className="col-3">
                                                        <h5 className='text-white'>{(orderFunc(item?.orderedItems[0]?.product)?.price===0 || orderFunc(item?.orderedItems[0]?.product)?.price === null) ? t("ReqedQuote") : orderFunc(item?.orderedItems[0]?.product)?.currency + " " + orderFunc(item?.orderedItems[0]?.product)?.price}</h5>
                                                    </div>
                                                </div>
                                                {
                                                    item?.orderItems?.map((item,index) => {
                                                        return(
                                                            <div className="col-12">
                                                                <div className="row p-3" style={{backgroundColor:"#232f3e"}}>
                                                                    <div className="col-4">
                                                                        <p className='text-white'></p>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <p className='text-white'>{item?.quantity}</p>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <p className='text-white'>{item?.currency} {item?.price}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>       
            </Container>
            <Container class1='cart-warpper home-wrapper-2 py-5'>
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className='my-3'>{t("MyProducts")}</h3>
                            <Link to='/offer' className="button">{t("NewOffer")}</Link>
                        </div>
                    </div>
                    <ProductCard data={otherProduct}/>
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>           
            </Container>
        </>}

        {isMobile && <>
            <BreadCrumb title={t("MyProfile")} />
            <Container class1='cart-warpper home-wrapper-2 py-5'>
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className='my-3'>{t("UpdateProfile")}</h3>
                            <FiEdit className='fs-3' onClick={()=>setEdit(false)}/>
                        </div>
                    </div>
                    <div className="col-12">
                        <form onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="example1" className="form-label">{t("FName")}</label>
                            <input type="text" name="firstname" disabled={edit} className="form-control" id="example1" value={formik.values.firstname} onChange={formik.handleChange('firstname')} onBlur={formik.handleBlur('firstname')}/>
                            <div className="error">
                                {formik.touched.firstname && formik.errors.firstname}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="example12" className="form-label">{t("LName")}</label>
                            <input type="text" name="lastname" disabled={edit} className="form-control" id="example12" value={formik.values.lastname} onChange={formik.handleChange('lastname')} onBlur={formik.handleBlur('lastname')}/>
                            <div className="error">
                                {formik.touched.lastname && formik.errors.lastname}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">{t("EmailAdd")}</label>
                            <input type="email" name="email" disabled={edit} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={formik.values.email} onChange={formik.handleChange('email')} onBlur={formik.handleBlur('email')}/>
                            <div className="error">
                                {formik.touched.email && formik.errors.email}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail12" className="form-label">{t("MobileNumber")}</label>
                            <input type="number" name="mobile" disabled={edit} className="form-control" id="exampleInputEmail12" aria-describedby="emailHelp" value={formik.values.mobile} onChange={formik.handleChange('mobile')} onBlur={formik.handleBlur('mobile')}/>
                            <div className="error">
                                {formik.touched.mobile && formik.errors.mobile}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="example3" className="form-label">{t("CompanyName")}</label>
                            <input type="text" name="company" disabled={edit} className="form-control" id="example3" value={formik.values.company} onChange={formik.handleChange('company')} onBlur={formik.handleBlur('company')}/>
                            <div className="error">
                                {formik.touched.company && formik.errors.company}
                            </div>
                        </div>
                        {edit===false && <button type="submit" className="btn btn-primary">{t("Save")}</button>}
                        </form>
                    </div>
                </div>           
            </Container>
            <Container class1='cart-warpper home-wrapper-2 py-3'>
                <div className="row">
                    <div className="col-12">
                        <h3 className='d-flex justify-content-center'>{t("MyOrders")}</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {
                            orderState && orderState?.map((item,index) => {
                                return (
                                    <div style={{backgroundColor:"#febd69"}} className="row pt-3 my-3" key={index}>
                                        <div className="col-12">
                                            <div className="row py-3" style={{backgroundColor:"#232f3e"}}>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <h5 style={{color: '#febd69'}}>{t("ProdName")}</h5>
                                                    </div>
                                                    <div className="col-6">
                                                        <h5 style={{color: '#febd69'}}>{t("Brand")}</h5>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <h5 className='text-white'>{orderFunc(item?.orderedItems[0]?.product)?.title}</h5>
                                                    </div>
                                                    <div className="col-6">
                                                        <h5 className='text-white'>{orderFunc(item?.orderedItems[0]?.product)?.brand}</h5>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col-6">
                                                        <h5 style={{color: '#febd69'}}>{t("Category")}</h5>
                                                    </div>
                                                    <div className="col-6">
                                                        <h5 style={{color: '#febd69'}}>{t("Price")}</h5>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <h5 className='text-white'>{orderFunc(item?.orderedItems[0]?.product)?.category}</h5>
                                                    </div>
                                                    <div className="col-6">
                                                        <h5 className='text-white'>{(orderFunc(item?.orderedItems[0]?.product)?.price===0 || orderFunc(item?.orderedItems[0]?.product)?.price === null) ? t("ReqedQuote") : orderFunc(item?.orderedItems[0]?.product)?.currency + " " + orderFunc(item?.orderedItems[0]?.product)?.price}</h5>
                                                    </div>
                                                </div>
                                                {
                                                    item?.orderItems?.map((item,index) => {
                                                        return(
                                                            <div className="col-12">
                                                                <div className="row p-3" style={{backgroundColor:"#232f3e"}}>
                                                                    <div className="col-4">
                                                                        <p className='text-white'></p>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <p className='text-white'>{item?.quantity}</p>
                                                                    </div>
                                                                    <div className="col-4">
                                                                        <p className='text-white'>{item?.currency} {item?.price}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>       
            </Container>
            <Container class1='cart-warpper home-wrapper-2 py-5'>
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className='my-3'>{t("MyProducts")}</h3>
                            <Link to='/offer' className="button">{t("NewOffer")}</Link>
                        </div>
                    </div>
                    <MobileProdCard data={otherProduct}/>
                    <MobileProdCard />
                    <MobileProdCard />
                    <MobileProdCard />
                </div>           
            </Container>
        </>}
    </>
  )
}

export default Profile