import { React, useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/user/userSlice';
import { useTranslation } from 'react-i18next';


const loginSchema = yup.object({
    email: yup.string().email("Email should be valid").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

const Login = () => {
    const { t } = useTranslation();
    const authState = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",

        },
        validationSchema: loginSchema,
        onSubmit: (values) => {
            dispatch(loginUser(values));
            localStorage.setItem("fromLogin", true);
            setTimeout(() => {
                navigate('/');
            }, 300);
        },
    });

    useEffect(() => {
        if (authState.user!==null && authState.isError === false){
            navigate('/');
        }
    }, [authState]);
    
    return (
        <>
            <Meta title={"Login"} />
            <BreadCrumb title={t("Login")} />
            <Container class1="login-wrapper py-3 home-wrapper-2">
                <div className="row">
                    <div className="col-12 d-flex">
                        <div className="auth-card">
                            <h3 className='text-center mb-3'>{t("Login")}</h3>
                            <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                                <CustomInput type="email" name="email" placeholder={t("Email")} onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")} value={formik.values.email} />
                                <div className="error">
                                    {formik.touched.email && formik.errors.email}
                                </div>
                                <CustomInput type="password" name="password" placeholder={t("Password")} onChange={formik.handleChange("password")} onBlur={formik.handleBlur("password")} value={formik.values.password} />
                                <div className="error">
                                    {formik.touched.password && formik.errors.password}
                                </div>
                                <div>
                                    {/* <Link to="/forgot-password">Forgot your password?</Link> */}
                                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                                        <button className='button border-0' type='submit'>{t("Login")}</button>
                                        <Link to='/signup' className="button signup">{t("SignUp")}</Link>
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

export default Login;
