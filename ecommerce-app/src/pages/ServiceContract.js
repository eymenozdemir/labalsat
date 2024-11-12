import React from 'react'
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import Container from '../components/Container';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createQuery } from '../features/contract/contractSlice';
import { useTranslation } from 'react-i18next';

const contractSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().nullable().email("Email should be valid").required("Email is required"),
  mobile: yup.string().default('').nullable().required("Mobile number is required"),
  company: yup.string(),
  instrument: yup.string().required("Instrument details are required"),
  duration: yup.string().required("Contract suration is required"),
  content: yup.string().required("Content is required"),
});

const ServiceContract = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      company: '',
      instrument: '',
      duration: '',
      content: '',
    },
    validationSchema: contractSchema,
    onSubmit: values => {
      dispatch(createQuery({name: values.name, email: values.email, mobile: values.mobile, company: values.company, instrument: values.instrument, duration: values.duration, content: values.content,}));
      formik.resetForm();
    },
  });

  return (
    <>
      <Meta title={"Service Contract"} />
      <BreadCrumb title={t("ServiceContract")} />
      <Container class1="contact-wrapper py-5 home-wrapper-2">
          <div className="row">
            <div className="col-12 mt-5">
              <div className="contact-inner-wrapper d-flex justify-content-between">
                <div>
                  <h3 className="contact-title mb-4">{t("ServiceContract")}</h3>
                  <form action="" onSubmit={formik.handleSubmit} className='d-flex flex-column gap-15'>
                    <div>
                      <input type="text" className="form-control" placeholder={t("NameSurname")} name='name' onChange={formik.handleChange("name")} onBlur={formik.handleBlur("name")} value={formik.values.name}/>
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
                      <input type="text" className="form-control" placeholder={t("Company")} name='company' onChange={formik.handleChange("company")} onBlur={formik.handleBlur("company")} value={formik.values.company}/>
                      <div className="errors">
                        {formik.touched.company && formik.errors.company}
                      </div>
                    </div>
                    <div>
                      <textarea id="" cols="30" rows="6" type="text" className="w-100 form-control" placeholder={t("Instrument")} name='instrument' onChange={formik.handleChange("instrument")} onBlur={formik.handleBlur("instrument")} value={formik.values.instrument}></textarea>
                      <div className="errors">
                        {formik.touched.instrument && formik.errors.instrument}
                      </div>
                    </div>
                    <div>
                      <input type="text" className="form-control" placeholder={t("ContDuration")} name='duration' onChange={formik.handleChange("duration")} onBlur={formik.handleBlur("duration")} value={formik.values.duration}/>
                      <div className="errors">
                        {formik.touched.duration && formik.errors.duration}
                      </div>
                    </div>
                    <div>
                    <select
                      name="content"
                      onChange={formik.handleChange("content")}
                      onBlur={formik.handleBlur("content")}
                      value={formik.values.content}
                      className="form-control py-3 my-3"
                      id=""
                    >
                      <option value="" disabled>
                      {t("SelectContent")}
                      </option>
                      <option value="Maintenance">{t("SelectContent1")}</option>
                      <option value="Maintenance and Validation">{t("SelectContent2")}</option>
                      <option value="Maintenance and Technical Support">{t("SelectContent3")}</option>
                      <option value="Maintenance, Technical Support, IQ/OQ/PQ (Parts Excluded)">{t("SelectContent4")}</option>
                      <option value="Maintenance, Technical Support, IQ/OQ/PQ (Parts Included)">{t("SelectContent5")}</option>
                    </select>
                      <div className="errors">
                        {formik.touched.content && formik.errors.content}
                      </div>
                    </div>
                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                      <button type='submit' className='button border-0'>{t("Submit")}</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Container>
    </>
  )
}

export default ServiceContract