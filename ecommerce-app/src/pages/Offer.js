import { React, useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import Container from '../components/Container';
import CustomInput from "../needed/CustomInput";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../needed/brand/brandSlice";
import { getCategories } from "../needed/pcategory/pcategorySlice";
import Dropzone from "react-dropzone";
import { delImg, uploadImg, resetImg } from "../needed/upload/uploadSlice";
import { createProducts, resetState } from "../features/products/productSlice";
import { useTranslation } from 'react-i18next';

let schema = yup.object().shape({
  ownerId: yup.string(),
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  category: yup.string().required("Category is Required"),
  brand: yup.string().required("Brand is Required"),
  model: yup.string(),
  submodel: yup.string(),
  location: yup.string().required("Location is Required"),
  condition: yup.string().required("Condition is Required"),
  age: yup.number(),
  quantity: yup.number().required("Quantity is Required"),
  currency: yup.string(),
  price: yup.number(),
  });

const Offer = () => {
  const { t } = useTranslation();

  const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer")).token
  : null;

  const config2 = {
      headers: {
      Authorization: `Bearer ${
          getTokenFromLocalStorage !== null ? getTokenFromLocalStorage : ""
      }`,
      Accept: "application/json",
      User: JSON.parse(localStorage.getItem("customer"))?._id,
      },
  };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userState = useSelector(state=>state?.user?.user);
    const [images, setImages] = useState([]);
    useEffect(() => {
      dispatch(getBrands());
      dispatch(getCategories());
    }, []);
  
    const brandState = useSelector((state) => state.brand.brands);
    const catState = useSelector((state) => state.pCategory.pCategories);
  
    const imgState = useSelector((state) => state.upload.images);
    const newProduct = useSelector((state) => state.product);
    const { isSuccess, isError, isLoading, createdProduct } = newProduct;
    useEffect(() => {
      if (isSuccess && createdProduct) {
        toast.success("Product Added Successfullly!");
      }
      if (isError) {
        toast.error("Something Went Wrong!");
      }
    }, [isSuccess, isError, isLoading]);
    
    /*
    const img = [];
    imgState.forEach((i) => {
      img.push({
        public_id: i.public_id,
        asset_id: i.asset_id,
        url: i.url,
      });
      console.log("foreachhh", i, img);
    });
    */
  
    useEffect(() => {
      formik.values.images = imgState;
    }, [imgState]);
    
    const formik = useFormik({
      initialValues: {
        ownerId:userState?._id,
        title: "",
        description: "",
        category: "",
        brand: "",
        model: "",
        submodel: "",
        location: "",
        condition: "",
        age: "",
        quantity: "",
        currency: "",
        price: "",
        images: "",
      },
      validationSchema: schema,
      onSubmit: (values) => {
        dispatch(createProducts({data:values, config2: config2}));
        formik.resetForm();
        //img=[];
        setTimeout(() => {
          dispatch(resetState());
          dispatch(resetImg());
          window.location.reload();
        }, 1000);
      },
    });

  return (
    <>
            <Meta title={"Offer"} />
            <BreadCrumb title={t("Offer")} />
            <Container class1="policy-wrapper py-5 home-wrapper-2">
                    <div className="row">
                        <div className="col-12">
                            <div className="policy">
                            <div>
      <h3 className="mb-4 title">{t("AddItem")}</h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Item Title"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="my-0">
            <ReactQuill
              placeholder={t("Headline")}
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">{t("SelectCat")}</option>
            {catState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <select
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">{t("SelectBrand")}</option>
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <CustomInput
            type="text"
            label={t("EnterModel")}
            name="model"
            onChng={formik.handleChange("model")}
            onBlr={formik.handleBlur("model")}
            val={formik.values.model}
          />
          <CustomInput
            type="text"
            label={t("EnterSubmodel")}
            name="submodel"
            onChng={formik.handleChange("submodel")}
            onBlr={formik.handleBlur("submodel")}
            val={formik.values.submodel}
          />
          <CustomInput
            type="text"
            label={t("EnterLoc")}
            name="location"
            onChng={formik.handleChange("location")}
            onBlr={formik.handleBlur("location")}
            val={formik.values.location}
          />
          <select
            name="condition"
            onChange={formik.handleChange("condition")}
            onBlur={formik.handleBlur("condition")}
            value={formik.values.condition}
            className="form-control py-3 my-3"
            id=""
          >
            <option value="" disabled>
            {t("SelectCond")}
            </option>
            <option value="New">{t("New")}</option>
            <option value="New - Open Box">{t("OpenBox")}</option>
            <option value="Working/Good Condition">{t("Working")}</option>
            <option value="Refurbished">{t("Refurbished")}</option>
            <option value="Consumables and Spare Parts">{t("Consumables")}</option>
            <option value="Not Working/For Parts Only">{t("NotWorking")}</option>
            <option value="Not Tested">{t("NotTested")}</option>
            <option value="Other">{t("Other")}</option>
          </select>
          <CustomInput
            type="number"
            label={t("EnterYear")}
            name="age"
            onChng={formik.handleChange("age")}
            onBlr={formik.handleBlur("age")}
            val={formik.values.age}
          />
          <CustomInput
            type="number"
            label={t("EnterQuantity")}
            name="quantity"
            onChng={formik.handleChange("quantity")}
            onBlr={formik.handleBlur("quantity")}
            val={formik.values.quantity}
          />
          <div className="row">
            <p>{t("PriceWarning")}</p>
            <div className="col-4">
              <select
                name="currency"
                onChange={formik.handleChange("currency")}
                onBlur={formik.handleBlur("currency")}
                value={formik.values.currency}
                className="form-control py-3 my-3"
                id=""
              >
                <option value="" disabled>
                {t("SelectCurrency")}
                </option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="TRY">TRY</option>
              </select>
            </div>
            <div className="col-8">
              <CustomInput
                type="number"
                label={t("EnterPrice")}
                name="price"
                onChng={formik.handleChange("price")}
                onBlr={formik.handleBlur("price")}
                val={formik.values.price}
              />
            </div>
          </div>
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg({data:acceptedFiles, config:config2}))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                    {t("Click")} <span style={{background:"#232f3e", color:"white"}}> &nbsp; {t("Here")}&nbsp; </span> &nbsp;{t("ToAddPhoto")}
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {imgState?.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg({images:imgState, id:i.public_id, config:config2}))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {t("PublishItem")}
          </button>
          {formik.touched.title && formik.errors.title ? <div className="error" style={{color: 'red'}}>{formik.touched.title && formik.errors.title} !</div> : ""}
          {formik.touched.description && formik.errors.description ? <div className="error" style={{color: 'red'}}>{formik.touched.description && formik.errors.description} !</div> : ""}
          {formik.touched.category && formik.errors.category ? <div className="error" style={{color: 'red'}}>{formik.touched.category && formik.errors.category} !</div> : ""}
          {formik.touched.brand && formik.errors.brand ? <div className="error" style={{color: 'red'}}>{formik.touched.brand && formik.errors.brand} !</div> : ""}
          {formik.touched.location && formik.errors.location ? <div className="error" style={{color: 'red'}}>{formik.touched.location && formik.errors.location} !</div> : ""}
          {formik.touched.condition && formik.errors.condition ? <div className="error" style={{color: 'red'}}>{formik.touched.condition && formik.errors.condition} !</div> : ""}
          {formik.touched.quantity && formik.errors.quantity ? <div className="error" style={{color: 'red'}}>{formik.touched.quantity && formik.errors.quantity} !</div> : ""}
        </form>
      </div>
    </div>
                            </div>
                        </div>
                    </div>
                </Container>
    </>
  )
}

export default Offer