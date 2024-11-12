import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import Container from '../components/Container';
import { useTranslation } from 'react-i18next';

const TermAndConditions = () => {
    const { t } = useTranslation();
    return (
        <>
            <Meta title={"Terms and Conditions"} />
            <BreadCrumb title={t("TC")} />
            <Container class1="policy-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="policy">
                        {t("TC1")}

<br /><br />{t("TC2")}
<br />{t("TC3")}
<br /><br />{t("TC4")}
<br />{t("TC5")}
<br /><br />{t("TC6")}
<br />{t("TC7")}
<br /><br />{t("TC8")}
<br />{t("TC9")}
<br />{t("TC10")}
<br />{t("TC11")}

<br />{t("TC12")}

<br /><br />{t("TC13")}
<br />{t("TC14")}
<br />{t("TC15")}
<br />{t("TC16")}
<br />{t("TC17")}
<br />{t("TC18")}

<br /><br />{t("TC19")}
<br />{t("TC20")}
<br />{t("TC21")}
<br />{t("TC22")}
<br /><br />{t("TC23")}
<br />{t("TC24")}
<br />{t("TC25")}
<br />{t("TC26")}
<br />{t("TC27")}
<br /><br />{t("TC28")}
<br />{t("TC29")}
<br /><br />{t("TC30")}
<br />{t("TC31")}

<br /><br />{t("TC32")}
<br />{t("TC33")}
<br /><br />{t("TC34")}
<br />{t("TC35")}
<br />{t("TC36")}
<br />{t("TC37")}
<br />{t("TC38")}
<br />{t("TC39")}
<br />{t("TC40")}
<br />{t("TC41")}

<br /><br />{t("TC42")}
<br />{t("TC43")}
<br />{t("TC44")}
<br />{t("TC45")}
<br /><br />{t("TC46")}

                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default TermAndConditions