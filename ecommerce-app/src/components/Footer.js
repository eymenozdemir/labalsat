import React from 'react';
import { Link } from 'react-router-dom';
import { BsLinkedin, BsInstagram, BsYoutube, BsFacebook, BsTwitter } from 'react-icons/bs';
import newsletter from "../images/newsletter.png";
import contact1 from "../images/contact-1.png";
import contact2 from "../images/contact-2.png";
import contact3 from "../images/contact-3.png";
import contact4 from "../images/contact-4.png";
import { createQuery } from '../features/contact/contactSlice';
import { useDispatch } from 'react-redux';
import {useState} from 'react';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 1223px)' });
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  function multiOnClick() {
    dispatch(createQuery({name: "", email: message, mobile: "", comment: "*MAIL LIST*", status: "MAIL LIST"}))
    setMessage('');
  }

  return (
    <>
      {isDesktop && <>
        <footer className='py-4'>
          <div className="container-xxl">
            <div className="row align-items-center">
              <div className="col-5">
                <div className="footer-top-data d-flex gap-30 align-items-center">
                  <img src={newsletter} alt="newsletter" />
                  <h2 className='mb-0 text-white text-center'>{t("SubscribeTo")}<br /> {t("AboutNews")}</h2>
                </div>
              </div>
              <div className="col-5">
                <div className="input-group">
                  <input
                    id='email-list'
                    type="text"
                    className="form-control py-1"
                    placeholder={t("EmailAddress")}
                    aria-label="Email Address..."
                    aria-describedby="basic-addon2"
                    value={message}
                    onChange={(e) => {setMessage(e.target.value)}} />
                  <span className="input-group-text p-2" id="basic-addon2" onClick={() => multiOnClick()}>
                    {t("Subscribe")}
                  </span>
                </div>
              </div>
              <div className="col-2">
                <div className="social_icons d-flex align-items-center gap-15">
                  <a className='text-white' href="https://www.linkedin.com/in/labalsat-analyze-well-199752291/" target="_blank" rel="noreferrer noopener">
                    <BsLinkedin className='fs-4' size = {40}/>
                  </a>
                  <a className='text-white' href="https://www.instagram.com/labalsat/" target="_blank" rel="noreferrer noopener">
                    <BsInstagram className='fs-4' size = {40}/>
                  </a>
                  <a className='text-white' href="https://www.facebook.com/profile.php?id=61551040628169" target="_blank" rel="noreferrer noopener">
                    <BsFacebook className='fs-4' size = {40}/>
                  </a>
                  <a className='text-white' href="https://twitter.com/labAlsat" target="_blank" rel="noreferrer noopener">
                    <BsTwitter className='fs-4' size = {40}/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <footer className='py-4'>
          <div className="container-xxl">
            <div className="row">
              <div className="col-1">
              </div>
              <div className="col-4">
                <h4 className='text-white mb-4'>{t("ContactUs")}</h4>
                <div>
                  <address className='text-white fs-6'>Koşuyolu, İsmail Paşa Sk. No:33 <br />34718 Kadıköy/İstanbul</address>
                  <a href="tel:+902164726956" className="mt-2 d-block mb-1 text-white"> <img className='me-2' src={contact2} alt='service-03' /> +90 216 472 6956</a>
                  <a href="fax:+902164726956" className="mt-2 d-block mb-1 text-white"> <img className='me-2' src={contact4} alt='service-03' /> +90 216 472 6958</a>
                  <a href="https://wa.me/905330515767" className="mt-2 d-block mb-1 text-white"> <img className='me-2' src={contact1} alt='service-03' /> +90 533 051 5767</a>
                  <a href="mailto:info@pronitron.com" className="mt-2 d-block mb-1 text-white"> <img className='me-2' src={contact3} alt='service-03' /> info@pronitron.com</a>
                </div>
              </div>
              <div className="col-4">
                <h4 className='text-white mb-4'>{t("Information")}</h4>
                <div className='footer-links d-flex flex-column'>
                  <Link to='/privacy-policy' className="text-white py-1 mb-1">{t("Guarantee")}</Link>
                  <Link to='/shipping-policy' className="text-white py-1 mb-1">{t("Warranties")}</Link>
                  <Link to='/refund-policy' className="text-white py-1 mb-1">{t("BroadScope")}</Link>
                  <Link to='/faq' className="text-white py-1 mb-1">{t("ServiceContracts")}</Link>
                  <Link to='/service-engineer' className="text-white py-1 mb-1">{t("ServiceEng")}</Link>
                  <Link to='/terms-conditions' className="text-white py-1 mb-1">{t("TermsOfService")}</Link>
                </div>
              </div>
              <div className="col-2">
                <h4 className='text-white mb-4'>{t("Account")}</h4>
                <div className='footer-links d-flex flex-column'>
                  <Link to='/my-profile' className="text-white py-1 mb-1">{t("Profile")}</Link>
                  <Link to='/wishlist' className="text-white py-1 mb-1">{t("Wishlist")}</Link>
                  <Link to='/my-profile' className="text-white py-1 mb-1">{t("Orders")}</Link>
                  <Link to="/offer" className="text-white py-1 mb-1">{t("NewOffer")}</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <footer className='py-4'>
          <div className="container-xxl">
            <div className="row">
              <div className="col-12">
                <p className='text-center mb-0 text-white'>&copy; {new Date().getFullYear()}; {t("PoweredBy")}</p>
              </div>
            </div>
          </div>
        </footer>
      </>}

      {isMobile && <>
        <footer className='py-2'>
          <div className="container-xxl d-flex align-items-center justify-content-center">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="footer-top-data d-flex gap-30 align-items-center justify-content-center">
                  <h3 className='mb-0 text-white text-center'>{t("SubscribeTo")} {t("AboutNews")}</h3>
                </div>
                <div className="input-group py-2 d-flex justify-content-center "  style={{maxWidth: "600px"}}>
                  <input
                    id='email-list'
                    type="text"
                    className="form-control py-1"
                    placeholder={t("EmailAddress")}
                    aria-label="Email Address..."
                    aria-describedby="basic-addon2"
                    value={message}
                    onChange={(e) => {setMessage(e.target.value)}} />
                  <span className="input-group-text p-2" id="basic-addon2" onClick={() => multiOnClick()}>
                    {t("Subscribe")}
                  </span>
                </div>
              <div className="py-2">
                <div className="social_icons d-flex align-items-center justify-content-center gap-15">
                  <a className='text-white' href="https://www.linkedin.com/in/labalsat-analyze-well-199752291/" target="_blank" rel="noreferrer noopener">
                    <BsLinkedin className='fs-4' size = {40}/>
                  </a>
                  <a className='text-white' href="https://www.instagram.com/labalsat/" target="_blank" rel="noreferrer noopener">
                    <BsInstagram className='fs-4' size = {40}/>
                  </a>
                  <a className='text-white' href="https://www.facebook.com/profile.php?id=61551040628169" target="_blank" rel="noreferrer noopener">
                    <BsFacebook className='fs-4' size = {40}/>
                  </a>
                  <a className='text-white' href="https://twitter.com/labAlsat" target="_blank" rel="noreferrer noopener">
                    <BsTwitter className='fs-4' size = {40}/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <footer className='py-4'>
          <div className="container-xxl">
            <div className="row d-flex justify-content-center">
              <div className="col-1"></div>
              <div className="col-5">
                <h4 className='text-white mb-4'>{t("Information")}</h4>
                <div className='footer-links d-flex flex-column'>
                  <Link to='/privacy-policy' className="text-white py-1 mb-1">{t("Guarantee")}</Link>
                  <Link to='/shipping-policy' className="text-white py-1 mb-1">{t("Warranties")}</Link>
                  <Link to='/refund-policy' className="text-white py-1 mb-1">{t("BroadScope")}</Link>
                  <Link to='/faq' className="text-white py-1 mb-1">{t("ServiceContracts")}</Link>
                  <Link to='/service-engineer' className="text-white py-1 mb-1">{t("ServiceEng")}</Link>
                  <Link to='/terms-conditions' className="text-white py-1 mb-1">{t("TermsOfService")}</Link>
                </div>
              </div>
              <div className="col-1"></div>
              <div className="col-5">
                <h4 className='text-white mb-4'>{t("Account")}</h4>
                <div className='footer-links d-flex flex-column'>
                  <Link to='/my-profile' className="text-white py-1 mb-1">{t("Profile")}</Link>
                  <Link to='/wishlist' className="text-white py-1 mb-1">{t("Wishlist")}</Link>
                  <Link to='/my-profile' className="text-white py-1 mb-1">{t("Orders")}</Link>
                  <Link to="/offer" className="text-white py-1 mb-1">{t("NewOffer")}</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>

          <footer className='py-4'>
          <div className="container-xxl">
            <div className="row d-flex justify-content-center">
                <h4 className='footer-top-data text-white mb-4 d-flex justify-content-center'>{t("ContactUs")}</h4>
                <div>
                  <address className='text-white fs-6 d-flex justify-content-center'>Koşuyolu, İsmail Paşa Sk. No:33 <br />34718 Kadıköy/İstanbul</address>
                  <a href="tel:+902164726956" className="mt-2 d-block mb-1 text-white d-flex justify-content-center"> <img className='me-2' src={contact2} alt='service-03' /> +90 216 472 6956</a>
                  <a href="fax:+902164726956" className="mt-2 d-block mb-1 text-white d-flex justify-content-center"> <img className='me-2' src={contact4} alt='service-03' /> +90 216 472 6958</a>
                  <a href="https://wa.me/905330515767" className="mt-2 d-block mb-1 text-white d-flex justify-content-center"> <img className='me-2' src={contact1} alt='service-03' /> +90 533 051 5767</a>
                  <a href="mailto:info@pronitron.com" className="mt-2 d-block mb-1 text-white d-flex justify-content-center"> <img className='me-2' src={contact3} alt='service-03' /> info@pronitron.com</a>
                </div>
            </div>
          </div>
        </footer>

        <footer className='py-4'>
          <div className="container-xxl">
            <div className="row">
              <div className="col-12">
                <p className='text-center mb-0 text-white'>&copy; {new Date().getFullYear()}; {t("PoweredBy")}</p>
              </div>
            </div>
          </div>
        </footer>
      </>}
    </>
  );
};

export default Footer