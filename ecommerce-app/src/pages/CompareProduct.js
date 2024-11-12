import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import Container from '../components/Container';

const CompareProduct = () => {
    return (
        <>
            <Meta title={"Compare Products"} />
            <BreadCrumb title='Compare Products' />
            <Container class1="compare-product-wrapper py-5 home-wrapper-2">
                    <div className="row">
                        <div className="col-3">
                            <div className="compare-product-card position-relative">
                                <img src="images/cross.svg" alt="cross" className="position-absolute cross img-fluid" />
                                <div className="product-card-image">
                                    <img src="images/watch.jpg" alt="watch" />
                                </div>
                                <div className="compare-product-details">
                                    <h5 className="title">Monster Abra A5 128 Gb Gaming Laptop v12.7</h5>
                                    <h6 className="price mb-2 mt-3">$100</h6>
                                    <div>
                                        <div className='product-detail'>
                                            <h5>Brand</h5>
                                            <p>Monster</p>
                                        </div>
                                        <div className='product-detail'>
                                            <h5>Type</h5>
                                            <p>Laptop</p>
                                        </div>
                                        <div className='product-detail'>
                                            <h5>Availability</h5>
                                            <p>In-Stock</p>
                                        </div>
                                        <div className='product-detail'>
                                            <h5>Condition</h5>
                                            <p>Perfect</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="compare-product-card position-relative">
                                <img src="images/cross.svg" alt="cross" className="position-absolute cross img-fluid" />
                                <div className="product-card-image">
                                    <img src="images/watch.jpg" alt="watch" />
                                </div>
                                <div className="compare-product-details">
                                    <h5 className="title">Moster Abra A5 128 Gb Gaming Laptop v12.7</h5>
                                    <h6 className="price mb-2 mt-3">$100</h6>
                                    <div>
                                        <div className='product-detail'>
                                            <h5>Brand</h5>
                                            <p>Monster</p>
                                        </div>
                                        <div className='product-detail'>
                                            <h5>Type</h5>
                                            <p>Laptop</p>
                                        </div>
                                        <div className='product-detail'>
                                            <h5>Availability</h5>
                                            <p>In-Stock</p>
                                        </div>
                                        <div className='product-detail'>
                                            <h5>Condition</h5>
                                            <p>Perfect</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
        </>
    )
}

export default CompareProduct