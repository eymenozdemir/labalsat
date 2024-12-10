import { React, useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import StoreCard from "../components/StoreCard";
import MobileCard from "../components/MobileCard";
import Container from "../components/Container";
import sellBanner from "../images/sell_banner.jpg";
import buyBanner from "../images/buy_banner.jpg";
import serviceBanner from "../images/service-banner.jpg";
import pic1 from "../images/Picture1.png";
import pic2 from "../images/Picture2.png";
import pic3 from "../images/Picture3.jpg";
import pic4 from "../images/Picture4.jpg";
import pic5 from "../images/Picture5.jpg";
import pic6 from "../images/Picture6.jpg";
import pic7 from "../images/Picture7.jpg";
import pic8 from "../images/Picture8.jpg";
import pic9 from "../images/Picture9.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { services } from "../utils/Data";
import { getAllProducts } from "../features/products/productSlice";
import { getBrands } from "../needed/brand/brandSlice";
import { getCategories } from "../needed/pcategory/pcategorySlice";
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
/* condition filter
<div>
                <h5 className="sub-title">Condition</h5>
                {conditions &&
                  [...new Set(conditions)].map((item, index) => {
                    return (
                      <div key={index} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="condition"
                          id=""
                          onChange={(e) => filterFunc({ e, item })}
                        />
                        <label className="form-check-label" htmlFor="">
                          {item} (
                          {
                            conditions.filter((name) => name.includes(item))
                              .length
                          }
                          )
                        </label>
                      </div>
                    );
                  })}
              </div>
*/


/* Tag filtrelemesi
<div className='filter-card mb-3'>
              <h3 className="sub-title">
                Product Tags
              </h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                {
                  brands && [...new Set(brands)].map((item, index) => {
                    return (<span key={index} onClick={()=>setBrand(item)} className="text-capitalize badge bg-light text-secondary rounded-3 py-2 px-3">{item}</span>)
                  })
                }
                </div>
              </div>
            </div>
*/
//<Link className='button'>REVIEW</Link>
/* SORT DROPDOWN
<p className="mb-0 d-block" style={{ "width": "100px" }}>Sort By</p>
                  <select name="" className='form-control form-select' id="" onChange={(e)=>setSort(e.target.value)}>
                    <option value="title">Alphabetically (A-Z)</option>
                    <option value="price">Price (Low to High)</option>
                    <option value="-price">Price (High to Low)</option>
                    <option value="createdAt">Date (New to Old)</option>
                    <option value="-createdAt">Date (Old to New)</option>
                  </select>
*/
/*
<Container class1='categories-wrapper home-wrapper-2 pb-3'>
      <div className="row">
        <div className="col-12">

          <h3 className="section-heading">Products</h3>
        </div>
        <div className="col-12">
          <div className="categories d-flex justify-content-between flex-wrap align-items-center">
            <div className='d-flex gap-30 align-items-center'>
              <div>
                <h6>Cameras</h6>
                <p>13 items</p>
              </div>
              <img src="images/camera.jpg" alt="camera" />
            </div>
            <div className='d-flex gap-30 align-items-center'>
              <div>
                <h6>Cat-2</h6>
                <p>7 items</p>
              </div>
              <img src="images/tv.jpg" alt="camera" />
            </div>
            <div className='d-flex gap-30 align-items-center'>
              <div>
                <h6>Categorie-3</h6>
                <p>12 items</p>
              </div>
              <img src="images/headphone.jpg" alt="camera" />
            </div>
            <div className='d-flex gap-30 align-items-center'>
              <div>
                <h6>Cameras</h6>
                <p>13 items</p>
              </div>
              <img src="images/camera.jpg" alt="camera" />
            </div>
            <div className='d-flex gap-30 align-items-center'>
              <div>
                <h6>Cat-2</h6>
                <p>7 items</p>
              </div>
              <img src="images/tv.jpg" alt="camera" />
            </div>
            <div className='d-flex gap-30 align-items-center'>
              <div>
                <h6>Categorie-3</h6>
                <p>12 items</p>
              </div>
              <img src="images/headphone.jpg" alt="camera" />
            </div>
            <div className='d-flex gap-30 align-items-center'>
              <div>
                <h6>Cameras</h6>
                <p>13 items</p>
              </div>
              <img src="images/camera.jpg" alt="camera" />
            </div>
            <div className='d-flex gap-30 align-items-center'>
              <div>
                <h6>Cat-2</h6>
                <p>7 items</p>
              </div>
              <img src="images/tv.jpg" alt="camera" />
            </div>
          </div>
        </div>
      </div>
    </Container>

*/
let tempList = [];
let tempData = "";
let brandFilter = [];
let conditionFilter = [];
let filteredProducts = [];
const Home = () => {
  const { trans } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 1223px)' });
  const productState = useSelector((state) => state?.product?.product);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loadCounter, setLoadCounter] = useState(1);
  const [tag, setTag] = useState(null);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(null);
  const [brand, setBrand] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);
  const [filtered, setFiltered] = useState([]);
  const [paged, setPaged] = useState([]);
  const [filterCat, setFilterCat] = useState([]);
  //console.log(productState, filtered);

  useEffect(() => {
    if(localStorage.getItem("fromLogin") === "true"){
      //console.log("ahasadasa", localStorage.getItem("fromLogin"));
      localStorage.setItem("fromLogin", false);
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  }, []);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    let newBrands = [];
    let category = [];
    let newTags = [];
    setFilterCat("All Categories");
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      newBrands.push(element?.brand);
      category.push(element?.category);
      newTags.push(element?.tags);
    }
    setBrands(newBrands);
    setCategories(category);
    setTags(newTags);
    filterFunc("empty");
  }, [productState]);
  const brandState = useSelector((state) => state?.brand?.brands);
  const catState = useSelector((state) => state?.pCategory?.pCategories);
  //console.log("farkli midir", brands, brandState);

  useEffect(() => {
    pageFunc("empty");
  }, [filtered]);

  useEffect(() => {
    getProducts();
  }, [sort, tag, brand, minPrice, maxPrice]);

  const getProducts = () => {
    dispatch(
      getAllProducts({ sort, tag, brand, page, category, minPrice, maxPrice })
    );
  };

  const filterFunc = (data) => {
    //console.log("asaddaadas", productState);
    if (data?.e?.target?.checked) {
      if (data.e.target.defaultValue === "brand") {
        brandFilter.push(data.item.title);
      } else if (data?.e?.target?.defaultValue === "condition") {
        conditionFilter.push(data.item);
      }
    } else {
      if (data?.e?.target?.defaultValue === "brand") {
        brandFilter = brandFilter.filter((f) => f !== data.item.title);
      } else if (data?.e?.target?.defaultValue === "condition") {
        conditionFilter = conditionFilter.filter((f) => f !== data.item);
      } else if (data === "All Categories") {
        setFilterCat(data);
        tempData = "";
      } else if (data !== "empty") {
        setFilterCat(data.title);
        tempData = data.title;
      } else {
        //category seçim aynısı
      }
    }
    filteredProducts = productState;
    let tempList = [];
    if (brandFilter?.length !== 0) {
      for (let i = 0; i < filteredProducts?.length; i++) {
        if (brandFilter?.includes(filteredProducts[i]?.brand)) {
          tempList.push(filteredProducts[i]);
        }
      }
      filteredProducts = tempList;
    }
    if (conditionFilter?.length !== 0) {
      tempList = [];
      for (let i = 0; i < filteredProducts?.length; i++) {
        if (conditionFilter?.includes(filteredProducts[i]?.condition)) {
          tempList.push(filteredProducts[i]);
        }
      }
      filteredProducts = tempList;
    }
    if (tempData !== "") {
      tempList = [];
      for (let i = 0; i < filteredProducts?.length; i++) {
        if (filteredProducts[i]?.category === tempData) {
          tempList.push(filteredProducts[i]);
        }
      }
      filteredProducts = tempList;
    }
    else {
      tempList = [];
      for (let i = 0; i < filteredProducts?.length; i++) {
          tempList.push(filteredProducts[i]);
      }
      filteredProducts = tempList;
    }
    //console.log("after categry", filteredProducts, filterCat, tempData);
    //console.log(filteredProducts, brandFilter, conditionFilter);
    setFiltered(filteredProducts);
    setPage(1);
    pageFunc("empty");
  };

  const pageFunc = (direction) => {
    if(direction==="previous" && page!==1) {
      tempList = [];
      for (let i = page*10-20; i < page*10-10; i++) {
          tempList.push(filtered[i]);
      }
      setPage(page-1);
    }
    else if(direction==="next" && page!==(~~(filtered?.length/10))+1) {
      tempList = [];
      for (let i = page*10; i < page*10+10; i++) {
          tempList.push(filtered[i]);
      }
      setPage(page+1);
    }
    else{
      tempList = [];
      for (let i = page*10-10; i < page*10; i++) {
          tempList.push(filtered[i]);
      }
    }
    tempList = tempList?.filter(item => item !== undefined)
    setPaged(tempList);
  };

  return (
    <>
      {isDesktop && <>
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-4">
            <a href="/offer" className="main-banner position-relative">
              <img
                src={sellBanner}
                className="img-fluid rounded-3"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute text-white">
                <h5>{trans("SELL")}</h5>
                <p>
                  {trans("SELL1")}<br />{trans("SELL2")}
                </p>
              </div>
            </a>
          </div>
          <div className="col-4">
            <a
              href="/product-list"
              className="main-banner position-relative"
            >
              <img
                src={buyBanner}
                className="img-fluid rounded-3"
                alt="sell banner"
              />
              <div className="main-banner-content position-absolute text-white">
                <h5>{trans("BUY")}</h5>
                <p>
                  {trans("BUY1")}<br />{trans("BUY2")}
                </p>
              </div>
            </a>
          </div>
          <div className="col-4">
            <a href="/contact" className="main-banner position-relative">
              <img
                src={serviceBanner}
                className="img-fluid rounded-3"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute text-white">
                <h5>{trans("SERVICE")}</h5>
                <p>
                  {trans("SERVICE1")}<br />{trans("SERVICE2")}
                </p>
              </div>
            </a>
          </div>
        </div>
      </Container>
      <Container id="products-section" class1="store-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">{trans("ByCategory")}</h3>
              <div>
                <ul className="ps-0">
                  <li onClick={() => filterFunc("All Categories")}>
                    {trans("AllCategories")}
                  </li>
                  {catState &&
                    [...new Set(catState)].map((item, index) => {
                      return (
                        <li key={index} onClick={() => filterFunc(item)}>
                          {item.title}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">{trans("FilterBy")}</h3>
              <div>
                <h5 className="sub-title">{trans("Brand")}</h5>
                {brandState &&
                  [...new Set(brandState)].map((item, index) => {
                    return (
                      <div key={index} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value="brand"
                          id=""
                          onChange={(e) => filterFunc({ e, item })}
                        />
                        <label className="form-check-label" htmlFor="">
                          {item?.title} (
                          {brands?.filter((name) => name?.includes(item?.title) && name?.length===item?.title?.length)?.length})
                        </label>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="total-products mb-0">{filterCat}</p>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <p className="total-products mb-0">
                    {filtered?.length} {trans("Products")}
                  </p>
                </div>
              </div>
            </div>
            <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap justify-content-between">
                <StoreCard data={paged ? paged : []} />
              </div>
            </div>
            <div className="mb-5 d-flex justify-content-center gap-15 align-items-center">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item" onClick={() => pageFunc("previous")}>
                    <a className="page-link" href="#products-section" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item"><a className="page-link" href="#products-section">{page}</a></li>
                  <li className="page-item" onClick={() => pageFunc("next")}>
                    <a className="page-link" href="#products-section" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between">
              {services?.map((i, j) => {
                if (localStorage.getItem("lang") === "tr"){
                return (
                  <div className="d-flex align-items-center gap-15" key={j}>
                    <img src={i.image} alt="services" />
                    <div>
                      <h6>{i.trtitle}</h6>
                      <p className="mb-0">{i.trtagline}</p>
                    </div>
                  </div>
                );}
                else {
                  return (
                    <div className="d-flex align-items-center gap-15" key={j}>
                      <img src={i.image} alt="services" />
                      <div>
                        <h6>{i.entitle}</h6>
                        <p className="mb-0">{i.entagline}</p>
                      </div>
                    </div>
                  );}
              })}
            </div>
          </div>
        </div>
      </Container>
      <Container class1="marquee-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee>
                <div className="mx-4 w-25">
                  <img
                    src={pic1}
                    alt="brand"
                    style={{ maxHeight: 150, maxWidth: 300 }}
                  />
                </div>
                <div className="mx-4 w-25">
                  <img
                    src={pic2}
                    alt="brand"
                    style={{ maxHeight: 150, maxWidth: 300 }}
                  />
                </div>
                <div className="mx-4 w-25">
                  <img
                    src={pic3}
                    alt="brand"
                    style={{ maxHeight: 150, maxWidth: 300 }}
                  />
                </div>
                <div className="mx-4 w-25">
                  <img
                    src={pic4}
                    alt="brand"
                    style={{ maxHeight: 150, maxWidth: 300 }}
                  />
                </div>
                <div className="mx-4 w-25">
                  <img
                    src={pic5}
                    alt="brand"
                    style={{ maxHeight: 150, maxWidth: 300 }}
                  />
                </div>
                <div className="mx-4 w-25">
                  <img
                    src={pic6}
                    alt="brand"
                    style={{ maxHeight: 150, maxWidth: 300 }}
                  />
                </div>
                <div className="mx-4 w-25">
                  <img
                    src={pic7}
                    alt="brand"
                    style={{ maxHeight: 150, maxWidth: 300 }}
                  />
                </div>
                <div className="mx-4 w-25">
                  <img
                    src={pic8}
                    alt="brand"
                    style={{ maxHeight: 150, maxWidth: 300 }}
                  />
                </div>
                <div className="mx-4 w-25">
                  <img
                    src={pic9}
                    alt="brand"
                    style={{ maxHeight: 150, maxWidth: 300 }}
                  />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
    </>}
    {isMobile && <>
      <Container class1="home-wrapper-2 py-3">
        <div className="row">
          <div className="col-6">
            <a href="/offer" className="main-banner position-relative">
              <img
                src={sellBanner}
                className="img-fluid rounded-3"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute text-white">
                <h5>{trans("SELL")}</h5>
              </div>
            </a>
          </div>
          <div className="col-6">
            <a
              href="/product-list"
              className="main-banner position-relative"
            >
              <img
                src={buyBanner}
                className="img-fluid rounded-3"
                alt="sell banner"
              />
              <div className="main-banner-content position-absolute text-white">
                <h5>{trans("BUY")}</h5>
              </div>
            </a>
          </div>
        </div>
        <div className="row pt-4">
          <div className="col-6">
            <a href="/contact" className="main-banner position-relative">
              <img
                src={serviceBanner}
                className="img-fluid rounded-3"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute text-white">
                <h5>{trans("SERVICE")}</h5>
              </div>
            </a>
          </div>
          <div className="col-6">
            <a href="/contact" className="main-banner position-relative">
              <img
                src={serviceBanner}
                className="img-fluid rounded-3"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute text-white">
                <h5>{trans("HIRING")}</h5>
              </div>
            </a>
          </div>
        </div>
      </Container>
      <Container id="filter-section" class1="store-wrapper home-wrapper-2">
      <div className="row">
          <div className="col-12">
            <div className="filter-card mb-3">
              <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      {filterCat}
                    </button>
                  </h2>
                  <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                    <div>
                      <ul className="ps-0">
                        <li onClick={() => filterFunc("All Categories")}>
                          {trans("AllCategories")}
                        </li>
                        {catState &&
                          [...new Set(catState)].map((item, index) => {
                            return (
                              <li key={index} onClick={() => filterFunc(item)}>
                                {item.title}
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="accordion mt-3" id="accordionExamplex">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOnex">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOnex" aria-expanded="true" aria-controls="collapseOnex">
                      {trans("FilterByBrand")}
                    </button>
                  </h2>
                  <div id="collapseOnex" class="accordion-collapse collapse" aria-labelledby="headingOnex" data-bs-parent="#accordionExamplex">
                    <div class="accordion-body">
                    {brandState &&
                      [...new Set(brandState)].map((item, index) => {
                        return (
                          <div key={index} className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value="brand"
                              id=""
                              onChange={(e) => filterFunc({ e, item })}
                            />
                            <label className="form-check-label" htmlFor="">
                              {item?.title} (
                              {brands?.filter((name) => name?.includes(item?.title) && name?.length===item?.title?.length)?.length})
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container id="products-section" class1="store-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="total-products mb-0">{filterCat}</p>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <p className="total-products mb-0">
                    {filtered?.length} {trans("Products")}
                  </p>
                </div>
              </div>
            </div>
            <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap justify-content-between">
                <MobileCard data={paged ? paged : []} />
              </div>
            </div>
            <div className="mb-5 d-flex justify-content-center gap-15 align-items-center">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item" onClick={() => pageFunc("previous")}>
                    <a className="page-link" href="#products-section" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li className="page-item"><a className="page-link" href="#products-section">{page}</a></li>
                  <li className="page-item" onClick={() => pageFunc("next")}>
                    <a className="page-link" href="#products-section" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between">
              {services?.map((i, j) => {
                if(localStorage.getItem("lang") === "tr"){
                return (
                  <div className="col-2 align-items-center justify-content-center" key={j}>
                    <div className="d-flex align-items-center justify-content-center">
                      <img src={i.image} alt="services" />
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
                      <h6>{i.trtitle}</h6>
                    </div>
                  </div>
                );}
                else {
                  return (
                    <div className="col-2 align-items-center justify-content-center" key={j}>
                      <div className="d-flex align-items-center justify-content-center">
                        <img src={i.image} alt="services" />
                      </div>
                      <div className="d-flex align-items-center justify-content-center">
                        <h6>{i.entitle}</h6>
                      </div>
                    </div>
                  );}
              })}
            </div>
          </div>
        </div>
      </Container>
      <Container class1="marquee-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee>
                <div className="mx-4 w-25">
                  <img
                    src={pic1}
                    alt="brand"
                    style={{ maxHeight: 100, maxWidth: 200 }}
                  />
                </div>
                <div className="mx-4 w-25">
                  <img
                    src={pic2}
                    alt="brand"
                    style={{ maxHeight: 100, maxWidth: 200 }}
                  />
                </div>
                <div className="mx-4 w-25">
                  <img
                    src={pic3}
                    alt="brand"
                    style={{ maxHeight: 100, maxWidth: 200 }}
                  />
                </div>
                <div className="mx-4 w-25">
                  <img
                    src={pic4}
                    alt="brand"
                    style={{ maxHeight: 100, maxWidth: 200 }}
                  />
                </div>
                <div className="mx-4 w-25">
                  <img
                    src={pic5}
                    alt="brand"
                    style={{ maxHeight: 100, maxWidth: 200 }}
                  />
                </div>
                <div className="mx-4 w-25">
                  <img
                    src={pic6}
                    alt="brand"
                    style={{ maxHeight: 100, maxWidth: 200 }}
                  />
                </div>
                <div className="mx-4 w-25">
                  <img
                    src={pic7}
                    alt="brand"
                    style={{ maxHeight: 100, maxWidth: 200 }}
                  />
                </div>
                <div className="mx-4 w-25">
                  <img
                    src={pic8}
                    alt="brand"
                    style={{ maxHeight: 100, maxWidth: 200 }}
                  />
                </div>
                <div className="mx-4 w-25">
                  <img
                    src={pic9}
                    alt="brand"
                    style={{ maxHeight: 100, maxWidth: 200 }}
                  />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
    </>}
    </>
  );
};

export default Home;
