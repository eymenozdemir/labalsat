import React, { useEffect } from 'react'
import Container from '../components/Container'
import BreadCrumb from '../components/BreadCrumb'
import { useDispatch, useSelector } from 'react-redux'
import { getUserOrder } from '../features/user/userSlice'

const Orders = () => {
    const dispatch = useDispatch();
    const orderState = useSelector(state=>state?.auth?.getorderedProduct?.orders);

    useEffect(() => {
        dispatch(getUserOrder());
    }, []);

  return (
    <>
        <BreadCrumb title='My Orders' />
        <Container class1='cart-warpper home-wrapper-2 py-5'>
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        <div className="col-4">
                            <h5>Order Id</h5>
                        </div>
                        <div className="col-4">
                            <h5>Total Amount</h5>
                        </div>
                        <div className="col-4">
                            <h5>Status</h5>
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-3">
                    {
                        orderState && orderState?.map((item,index) => {
                            return (
                                <div style={{backgroundColor:"#febd69"}} className="row pt-3 my-3" key={index}>
                                    <div className="col-4">
                                        <p>{item?._id}</p>
                                    </div>
                                    <div className="col-4">
                                        <p>{item?.currency} {item?.totalPrice}</p>
                                    </div>
                                    <div className="col-4">
                                        <p>{item?.orderStatus}</p>
                                    </div>
                                    <div className="col-12">
                                        <div className="row py-3" style={{backgroundColor:"#232f3e"}}>
                                            <div className="col-4">
                                                <h5 className='text-white'>Product Name</h5>
                                            </div>
                                            <div className="col-4">
                                                <h5 className='text-white'>Quantity</h5>
                                            </div>
                                            <div className="col-4">
                                                <h5 className='text-white'>Price</h5>
                                            </div>
                                            {
                                                item?.orderItems?.map((item,index) => {
                                                    return(
                                                        <div className="col-12">
                                                            <div className="row p-3" style={{backgroundColor:"#232f3e"}}>
                                                                <div className="col-4">
                                                                    <p className='text-white'>{item?.product?.title}</p>
                                                                </div>
                                                                <div className="col-4">
                                                                    <p className='text-white'>{item?.quantity}</p>
                                                                </div>
                                                                <div className="col-4">
                                                                    <p className='text-white'>{item?.currency} {item?.price}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Container>
    </>
  )
}

export default Orders