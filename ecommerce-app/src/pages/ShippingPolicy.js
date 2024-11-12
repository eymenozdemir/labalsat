import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import Container from '../components/Container';
import { useTranslation } from 'react-i18next';

const ShippingPolicy = () => {
  const { t } = useTranslation();
  return (
    <>
            <Meta title={"Warranties and Technical Support"} />
            <BreadCrumb title={t("WarrantiesTechSup")} />
            <Container class1="policy-wrapper py-5 home-wrapper-2">
                    <div className="row">
                        <div className="col-12">
                            <div className="policy">
                            {t("WarrantiesTechSup")}
                            </div>
                        </div>
                    </div>
                </Container>
    </>
  )
}

export default ShippingPolicy