import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import Container from '../components/Container';
import { useTranslation } from 'react-i18next';

const ServiceEngineer = () => {
  const { t } = useTranslation();
  return (
    <>
            <Meta title={"Find Your Service Engineer"} />
            <BreadCrumb title={t("FindServEngineer")} />
            <Container class1="policy-wrapper py-5 home-wrapper-2">
                    <div className="row">
                        <div className="col-12">
                            <div className="policy">
                            {t("ServEngineer1")}
                            </div>
                        </div>
                    </div>
                </Container>
    </>
  )
}

export default ServiceEngineer