import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders, deleteAnOrder } from "../features/auth/authSlice";
import CustomModal from "../components/CustomModal";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

  

const Orders = () => {
  
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setOrderId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

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
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state.auth.orders);

  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    let tempLink = `https://www.labalsat.com/product/${orderState[i].orderedItems[0].product}`;
    data1.push({
      key: i + 1,
      name: orderState[i].user.firstname +" "+ orderState[i].user.lastname,
      email: orderState[i].user.email,
      mobile: orderState[i].user.mobile,
      address: orderState[i].shippingInfo?.address +" "+ orderState[i].shippingInfo?.other +" "+ orderState[i].shippingInfo?.city +" "+ orderState[i].shippingInfo?.country +" "+ orderState[i].shippingInfo?.pincode,
      product: (
        <a href={tempLink} target="_blank" rel="noreferrer noopener">
          <p>{orderState[i].orderedItems[0].product.substr(orderState[i].orderedItems[0].product.length - 6)}</p>
        </a>
      ),
      date: new Date(orderState[i].createdAt).toLocaleString(),
      action: (
        <>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(orderState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  };

  const deleteOrder = (e) => {
    dispatch(deleteAnOrder(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getOrders());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteOrder(orderId);
        }}
        title="Are you sure you want to delete this Order ?"
      />
    </div>
  );
};

export default Orders;
