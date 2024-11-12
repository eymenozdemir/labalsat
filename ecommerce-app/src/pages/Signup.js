import { React, useEffect, useState } from "react";
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser } from '../features/user/userSlice';
import { useTranslation } from 'react-i18next';

const signUpSchema = yup.object({
    firstname: yup.string().required("First name is required"),
    lastname: yup.string().required("Last name is required"),
    email: yup.string().email("Email should be valid").required("Email is required"),
    mobile: yup.string().required("Mobile number is required"),
    company: yup.string(),
    password: yup.string().required("Password is required"),
  });

const Signup = () => {
    const { t } = useTranslation();
    const authState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            mobile: "",
            password: "",
            company: "",

        },
        validationSchema: signUpSchema,
        onSubmit: (values) => {
            dispatch(registerUser(values));
            //dispatch(loginUser((values?.email, values?.password)));
            navigate('/');
        },
    });

    useEffect(() => {
        if (authState.createdUser!==null && authState.isError === false){
            //navigate('/login');
        }
    }, [authState]);

    return (
        <>
            <Meta title={"Sign Up"} />
            <BreadCrumb title={t("SignUp")} />
            <Container class1="login-wrapper py-3 home-wrapper-2">
                <div className="row">
                    <div className="col-12 d-flex">
                        <div className="auth-card">
                            <h3 className='text-center mb-3'>{t("CreateAccount")}</h3>
                            <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                                <CustomInput type="text" name="firstname" placeholder={t("FNameStar")} value={formik.values.firstname} onChange={formik.handleChange("firstname")} onBlur={formik.handleBlur("firstname")} />
                                <div className="error">
                                    {formik.touched.firstname && formik.errors.firstname}
                                </div>
                                <CustomInput type="text" name="lastname" placeholder={t("LNameStar")} value={formik.values.lastname} onChange={formik.handleChange("lastname")} onBlur={formik.handleBlur("lastname")} />
                                <div className="error">
                                    {formik.touched.lastname && formik.errors.lastname}
                                </div>
                                <CustomInput type="tel" name="mobile" placeholder={t("MNumber")} value={formik.values.mobile} onChange={formik.handleChange("mobile")} onBlur={formik.handleBlur("mobile")} />
                                <div className="error">
                                    {formik.touched.mobile && formik.errors.mobile}
                                </div>
                                <CustomInput type="email" name="email" placeholder={t("EmailStar")} value={formik.values.email} onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")} />
                                <div className="error">
                                    {formik.touched.email && formik.errors.email}
                                </div>
                                <CustomInput type="text" name="company" placeholder={t("Company")} value={formik.values.company} onChange={formik.handleChange("company")} onBlur={formik.handleBlur("company")} />
                                <div className="error">
                                </div>
                                <CustomInput type="password" name="password" placeholder={t("Password")} value={formik.values.password} onChange={formik.handleChange("password")} onBlur={formik.handleBlur("password")} />
                                <div className="error">
                                    {formik.touched.password && formik.errors.password}
                                </div>
                                <div>
                                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                                        <button className='button border-0' type='submit'>{t("SignUp")}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Signup