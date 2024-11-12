import React from 'react'
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { AiFillHome, AiFillPrinter, AiOutlineFieldTime } from 'react-icons/ai';
import { FiPhoneCall, FiMail } from 'react-icons/fi';
import Container from '../components/Container';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createQuery } from '../features/contact/contactSlice';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';

const contactSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().nullable().email("Email should be valid").required("Email is required"),
  mobile: yup.string().default('').nullable().required("Mobile number is required"),
  comment: yup.string().default('').nullable().required("Comment is required"),
});

const Contact = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 1223px)' });
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      comment: '',
    },
    validationSchema: contactSchema,
    onSubmit: values => {
      dispatch(createQuery({name: values.name, email: values.email, mobile: values.mobile, comment: values.comment}));
      formik.resetForm();
    },
  });

  return (
    <>
      {isDesktop && <>
        <Meta title={"Contact"} />
        <BreadCrumb title='Contact' />
        <Container class1="contect-wrapper py-5 home-wrapper-2">
            <div className="row">
              <div className="col-12">
                <iframe title="Foo" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.7146268136376!2d29.037515215018445!3d41.009618927291946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab804043f421b%3A0xd1045123f91466e!2sPronitron%20Analitik%20Cihazlar!5e0!3m2!1str!2str!4v1680451270576!5m2!1str!2str" width="600" height="450" className='boreder-0 w-100' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
              <div className="col-12 mt-5">
                <div className="contact-inner-wrapper d-flex justify-content-between">
                  <div>
                    <h3 className="contact-title mb-4">{t("ContactHeader")}</h3>
                    <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                      <div>
                        <input type="text" className="form-control" placeholder={t("Name")} name='name' onChange={formik.handleChange("name")} onBlur={formik.handleBlur("name")} value={formik.values.name}/>
                        <div className="errors">
                          {formik.touched.name && formik.errors.name}
                        </div>
                      </div>
                      <div>
                        <input type="email" className="form-control" placeholder={t("EmailStar")} name='email' onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")} value={formik.values.email}/>
                        <div className="errors">
                          {formik.touched.email && formik.errors.email}
                        </div>
                      </div>
                      <div>
                        <input type="tel" className="form-control" placeholder={t("MobileNumber")} name='mobile' onChange={formik.handleChange("mobile")} onBlur={formik.handleBlur("mobile")} value={formik.values.mobile}/>
                        <div className="errors">
                          {formik.touched.mobile && formik.errors.mobile}
                        </div>
                      </div>
                      <div>
                        <textarea id="" className='w-100 form-control' cols="30" rows="6" placeholder={t("Comments")} name='comment' onChange={formik.handleChange("comment")} onBlur={formik.handleBlur("comment")} value={formik.values.comment}></textarea>
                        <div className="errors">
                          {formik.touched.comment && formik.errors.comment}
                        </div>
                      </div>
                      <div>
                        <button className='button border-0'>{t("Submit")}</button>
                      </div>
                    </form>
                  </div>
                  <div>
                    <h3 className="contact-title mb-4">{t("GetInTouch")}</h3>
                    <div>
                      <ul className='ps-0'>
                        <li className='mb-3 d-flex gap-15 align-items-center'>
                          <AiFillHome className='fs-5' />
                          <address className='mb-0'>Koşuyolu, İsmail Paşa Sk. No:33 34718 Kadıköy/İstanbul</address>
                        </li>
                        <li className='mb-3 d-flex gap-15 align-items-center'>
                          <AiOutlineFieldTime className='fs-5' />
                          <p className='mb-0'>{t("Monday")} - {t("Friday")} 08.30 AM - 18.30 PM</p>
                        </li>
                        <li className='mb-3 d-flex gap-15 align-items-center'>
                          <FiPhoneCall className='fs-5' />
                          <a href="tel:+902164726956" className="d-block mb-0">+90 216 472 6956</a>
                        </li>
                        <li className='mb-3 d-flex gap-15 align-items-center'>
                          <AiFillPrinter className='fs-5' />
                          <a href="fax:+902164726956" className="d-block mb-0">+90 216 472 6958</a>
                        </li>
                        <li className='mb-3 d-flex gap-15 align-items-center'>
                          <FiPhoneCall className='fs-5' />
                          <a href="https://wa.me/905330515767" className="d-block mb-0">+90 533 051 5767</a>
                        </li>
                        <li className='mb-3 d-flex gap-15 align-items-center'>
                          <FiMail className='fs-5' />
                          <a href="mailto:info@pronitron.com" className="d-block mb-0">info@pronitron.com</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
      </>}

      {isMobile && <>
        <Meta title={"Contact"} />
        <BreadCrumb title='Contact' />
        <Container class1="contect-wrapper py-5 home-wrapper-2">
            <div className="row">
              <div className="col-12">
                <iframe title="Foo" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.7146268136376!2d29.037515215018445!3d41.009618927291946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab804043f421b%3A0xd1045123f91466e!2sPronitron%20Analitik%20Cihazlar!5e0!3m2!1str!2str!4v1680451270576!5m2!1str!2str" width="600" height="450" className='boreder-0 w-100' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
              <div className="col-12 mt-5">
                <div className="contact-inner-wrapper justify-content-between">
                  <div>
                    <h3 className="contact-title d-flex justify-content-center mb-4">{t("ContactHeader")}</h3>
                    <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                      <div>
                        <input type="text" className="form-control" placeholder={t("Name")} name='name' onChange={formik.handleChange("name")} onBlur={formik.handleBlur("name")} value={formik.values.name}/>
                        <div className="errors">
                          {formik.touched.name && formik.errors.name}
                        </div>
                      </div>
                      <div>
                        <input type="email" className="form-control" placeholder={t("EmailStar")} name='email' onChange={formik.handleChange("email")} onBlur={formik.handleBlur("email")} value={formik.values.email}/>
                        <div className="errors">
                          {formik.touched.email && formik.errors.email}
                        </div>
                      </div>
                      <div>
                        <input type="tel" className="form-control" placeholder={t("MobileNumber")} name='mobile' onChange={formik.handleChange("mobile")} onBlur={formik.handleBlur("mobile")} value={formik.values.mobile}/>
                        <div className="errors">
                          {formik.touched.mobile && formik.errors.mobile}
                        </div>
                      </div>
                      <div>
                        <textarea id="" className='w-100 form-control' cols="30" rows="6" placeholder={t("Comments")} name='comment' onChange={formik.handleChange("comment")} onBlur={formik.handleBlur("comment")} value={formik.values.comment}></textarea>
                        <div className="errors">
                          {formik.touched.comment && formik.errors.comment}
                        </div>
                      </div>
                      <div className='d-flex justify-content-center'>
                        <button className='button border-0'>{t("Submit")}</button>
                      </div>
                    </form>
                  </div>
                  <div>
                    <h3 className="contact-title d-flex justify-content-center my-4">{t("GetInTouch")}</h3>
                    <div>
                      <ul className='ps-0'>
                        <li className='mb-3 d-flex gap-15 align-items-center'>
                          <AiFillHome className='fs-5' />
                          <address className='mb-0'>Koşuyolu, İsmail Paşa Sk. No:33 34718 Kadıköy/İstanbul</address>
                        </li>
                        <li className='mb-3 d-flex gap-15 align-items-center'>
                          <AiOutlineFieldTime className='fs-5' />
                          <p className='mb-0'>{t("Monday")} - {t("Friday")} 08.30 AM - 18.30 PM</p>
                        </li>
                        <li className='mb-3 d-flex gap-15 align-items-center'>
                          <FiPhoneCall className='fs-5' />
                          <a href="tel:+902164726956" className="d-block mb-0">+90 216 472 6956</a>
                        </li>
                        <li className='mb-3 d-flex gap-15 align-items-center'>
                          <AiFillPrinter className='fs-5' />
                          <a href="fax:+902164726956" className="d-block mb-0">+90 216 472 6958</a>
                        </li>
                        <li className='mb-3 d-flex gap-15 align-items-center'>
                          <FiPhoneCall className='fs-5' />
                          <a href="https://wa.me/905330515767" className="d-block mb-0">+90 533 051 5767</a>
                        </li>
                        <li className='mb-3 d-flex gap-15 align-items-center'>
                          <FiMail className='fs-5' />
                          <a href="mailto:info@pronitron.com" className="d-block mb-0">info@pronitron.com</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
      </>}
    </>
  )
}

export default Contact