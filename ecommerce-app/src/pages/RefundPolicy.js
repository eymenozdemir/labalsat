import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import Container from '../components/Container';
import { useTranslation } from 'react-i18next';

const RefundPolicy = () => {
  const { t } = useTranslation();
  return (
    <>
            <Meta title={"Broad Scope"} />
            <BreadCrumb title={t("BroadScope")} />
            <Container class1="policy-wrapper py-5 home-wrapper-2">
                    <div className="row">
                        <div className="col-12">
                            <div className="policy">
                            {t("BroadScope1")}
                            </div>
                        </div>
                    </div>
            </Container>
    </>
  )
}

export default RefundPolicy