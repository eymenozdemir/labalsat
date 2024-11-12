import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import Container from '../components/Container';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  return (
    <>
      <Meta title={"labAlsat Guarantee"} />
      <BreadCrumb title={t("Guarantee")} />
      <Container class1="policy-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy">
              {t("Guarantee1")}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default PrivacyPolicy