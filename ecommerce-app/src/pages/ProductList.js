import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts} from "../features/products/productSlice";
import { Link } from "react-router-dom";
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import Container from '../components/Container';
import { AiOutlineEye } from "react-icons/ai";
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';

const columnsEn = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Model",
    dataIndex: "model",
    sorter: (a, b) => a.model.length - b.model.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Condition",
    dataIndex: "condition",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const columnsTr = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Başlık",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Model",
    dataIndex: "model",
    sorter: (a, b) => a.model.length - b.model.length,
  },
  {
    title: "Kategori",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Durum",
    dataIndex: "condition",
  },
  {
    title: "Ücret",
    dataIndex: "price",
  },
  {
    title: "İşlem",
    dataIndex: "action",
  },
];

const mobileColumnsEn = [
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const mobileColumnsTr = [
  {
    title: "Başlık",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Kategori",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Ücret",
    dataIndex: "price",
  },
  {
    title: "İşlem",
    dataIndex: "action",
  },
];

const Productlist = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 1223px)' });  
  const productState = useSelector((state) => state?.product?.product);
  const [open, setOpen] = useState(false);
  const [prodId, setProdId] = useState("");
  const [ tag, setTag] = useState(null);
  const [ category, setCategory] = useState(null);
  const [ brand, setBrand] = useState(null);
  const [ minPrice, setMinPrice] = useState(null);
  const [ maxPrice, setMaxPrice] = useState(null);
  const [ sort, setSort] = useState(null);
  const showModal = (e) => {
    setOpen(true);
    setProdId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  
  const dispatch = useDispatch();
  useEffect(() => {
    getProducts();
  }, [sort, tag, brand, minPrice, maxPrice]);

  const getProducts = () => {
    dispatch(
      getAllProducts({ sort, tag, brand, category, minPrice, maxPrice })
    );
  };

  const data1 = [];
  const data2 = [];
  for (let i = 0; i < productState.length; i++) {
    let tempPrice = (productState[i].price===0 || productState[i].price==="") ? "Request a Quote" : productState[i].currency + " " + productState[i].price;
    data1.push({
      key: i + 1,
      id: productState[i]._id.substr(productState[i]._id.length - 6),
      title: productState[i].title,
      model: productState[i].brand + " " + productState[i].model + " " + productState[i].submodel,
      category: productState[i].category,
      condition: productState[i].condition,
      price: tempPrice,
      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/product/${productState[i]._id}`}
          >
            <AiOutlineEye />
          </Link>
        </>
      ),
    });
    data2.push({
      key: i + 1,
      title: productState[i].title,
      category: productState[i].category,
      price: tempPrice,
      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/product/${productState[i]._id}`}
          >
            <AiOutlineEye />
          </Link>
        </>
      ),
    });
  }
  
  return (
    <>
      {isDesktop && localStorage.getItem("lang") === "tr" && <>
        <Meta title={"Product List"} />
        <BreadCrumb title={t("ProductList")} />
        <Container class1="policy-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div>
                        <h3 className="mb-4 title">{t("Products")}</h3>
                        <div>
                            <Table columns={columnsTr} dataSource={data1} />
                        </div>
                    </div>
                </div>
            </Container>
      </>}

      {isDesktop && localStorage.getItem("lang") === "en" && <>
        <Meta title={"Product List"} />
        <BreadCrumb title={t("ProductList")} />
        <Container class1="policy-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div>
                        <h3 className="mb-4 title">{t("Products")}</h3>
                        <div>
                            <Table columns={columnsEn} dataSource={data1} />
                        </div>
                    </div>
                </div>
            </Container>
      </>}

      {isMobile && localStorage.getItem("lang") === "tr" && <>
        <Meta title={"Product List"} />
        <BreadCrumb title={t("ProductList")} />
        <Container class1="policy-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div>
                        <h3 className="mb-4 d-flex align-items-center justify-content-center title">Products</h3>
                        <div className="d-flex align-items-center justify-content-center">
                            <Table columns={mobileColumnsTr} dataSource={data2} />
                        </div>
                    </div>
                </div>
            </Container>
      </>}

      {isMobile && localStorage.getItem("lang") === "en" && <>
        <Meta title={"Product List"} />
        <BreadCrumb title={t("ProductList")} />
        <Container class1="policy-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div>
                        <h3 className="mb-4 d-flex align-items-center justify-content-center title">Products</h3>
                        <div className="d-flex align-items-center justify-content-center">
                            <Table columns={mobileColumnsEn} dataSource={data2} />
                        </div>
                    </div>
                </div>
            </Container>
      </>}
    </>
  );
};

export default Productlist;
