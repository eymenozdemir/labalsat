import { React, useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import ProductCard from '../components/ProductCard';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../features/products/productSlice';

const Store = () => {
  const productState = useSelector((state) => state?.product?.product);
  const dispatch = useDispatch();
  const [ brands, setBrands] = useState([]);
  const [ categories, setCategories] = useState([]);
  const [ tags, setTags] = useState([]);
  const [ tag, setTag] = useState(null);
  const [ category, setCategory] = useState(null);
  const [ brand, setBrand] = useState(null);
  const [ minPrice, setMinPrice] = useState(null);
  const [ maxPrice, setMaxPrice] = useState(null);
  const [ sort, setSort] = useState(null);

  useEffect(() => {
    let newBrands = [];
    let category = [];
    let newTags = [];
    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      newBrands.push(element.brand);
      category.push(element.category);
      newTags.push(element.tags);
    }
    setBrands(newBrands);
    setCategories(category);
    setTags(newTags);
  }, [productState]);

  useEffect(() => {
    getProducts();
  }, [sort, tag, brand, category, minPrice, maxPrice]);
  
  const getProducts = () => {
    dispatch(getAllProducts({sort, tag, brand, category, minPrice, maxPrice}));
  };

  
  return (
    <>
      <Meta title={"Store"} />
      <BreadCrumb title='Store' />
      <Container class1="store-wrapper home-wrapper-2 py-5">
          <div className="row">
            <div className="col-3">
              <div className='filter-card mb-3'>
                <h3 className="filter-title">
                  Shop By Categories
                </h3>
                <div>
                  <ul className='ps-0'>
                    {
                      categories && [...new Set(categories)].map((item, index) => {
                        return (<li key={index} onClick={() => setCategory(item)}>{item}</li>)
                      })
                    }
                  </ul>
                </div>
              </div>
              <div className='filter-card mb-3'>
                <h3 className="filter-title">
                  Filter By
                </h3>
                <div>
                  <h5 className="sub-title">Price</h5>
                  <div className='d-flex align-items-center gap-10'>
                    <div className="form-floating mb-3">
                      <input type="number" onChange={(e) => setMinPrice(e.target.value)} className="form-control" id="floatingInput" placeholder="From" />
                      <label htmlFor="floatingInput">From</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input type="number" onChange={(e) => setMaxPrice(e.target.value)} className="form-control" id="floatingInput1" placeholder="To" />
                      <label htmlFor="floatingInput1">To</label>
                    </div>
                  </div>
                  <h5 className="sub-title">Availability</h5>
                  <div>
                    <div className="form-check">
                      <input className='form-check-input' type="checkbox" value="" id="" />
                      <label className='form-check-label' htmlFor="">
                        In Stock (2)
                      </label>
                    </div>
                    <div className="form-check">
                      <input className='form-check-input' type="checkbox" value="" id="" />
                      <label className='form-check-label' htmlFor="">
                        Out of Stock (0)
                      </label>
                    </div>
                  </div>
                  <h5 className="sub-title">Condition</h5>
                  <div>
                    <div className="form-check">
                      <input className='form-check-input' type="checkbox" value="" id="" />
                      <label className='form-check-label' htmlFor="">
                        Brand-new (4)
                      </label>
                    </div>
                    <div className="form-check">
                      <input className='form-check-input' type="checkbox" value="" id="" />
                      <label className='form-check-label' htmlFor="">
                        Perfect (5)
                      </label>
                    </div>
                    <div className="form-check">
                      <input className='form-check-input' type="checkbox" value="" id="" />
                      <label className='form-check-label' htmlFor="">
                        Usable (3)
                      </label>
                    </div>
                    <div className="form-check">
                      <input className='form-check-input' type="checkbox" value="" id="" />
                      <label className='form-check-label' htmlFor="">
                        Partially Efficient (2)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
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
            </div>
            <div className="col-9">
              <div className="filter-sort-grid mb-4">
                <div className='d-flex justify-content-between align-items-center'>
                  <div className='d-flex align-items-center gap-10'>
                    <p className="mb-0 d-block" style={{ "width": "100px" }}>Sort By</p>
                    <select name="" className='form-control form-select' id="" onChange={(e)=>setSort(e.target.value)}>
                      <option value="title">Alphabetically (A-Z)</option>
                      <option value="price">Price (Low to High)</option>
                      <option value="-price">Price (High to Low)</option>
                      <option value="createdAt">Date (New to Old)</option>
                      <option value="-createdAt">Date (Old to New)</option>
                    </select>
                  </div>
                  <div className='d-flex align-items-center gap-10'>
                    <p className="total-products mb-0">21 Products</p>

                  </div>
                </div>
              </div>
              <div className="products-list pb-5">
                <div className="d-flex gap-10 flex-wrap justify-content-between">
                  <ProductCard data={productState ? productState : []} />
                  <ProductCard />
                  <ProductCard />
                  <ProductCard />
                </div>
              </div>
            </div>
          </div>
        </Container>
    </>
  )
}

export default Store