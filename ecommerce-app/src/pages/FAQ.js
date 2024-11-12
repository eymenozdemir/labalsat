import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
  const { t } = useTranslation();
  return (
    <>
            <Meta title={"Service Contracts"} />
            <BreadCrumb title={t("ServiceContracts")} />
            <Container class1="policy-wrapper py-5 home-wrapper-2">
                    <div className="row">
                        <div className="col-12">
                            <div className="policy">
                            {t("ServiceContracts1")}
                            <br /><br />{t("ServiceContracts2")}

                            </div>
                            <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                                <Link to='/service-contract' className="button signup">{t("ServiceContractsReq")}</Link>
                            </div>
                        </div>
                    </div>
                </Container>
    </>
  )
}

export default FAQ