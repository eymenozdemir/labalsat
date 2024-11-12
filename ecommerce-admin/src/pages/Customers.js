import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteAUser } from "../features/customers/customerSlice";
import CustomModal from "../components/CustomModal";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
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
    title: "Company",
    dataIndex: "company",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Customers = () => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setUserId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const customerstate = useSelector((state) => state.customer.customers);
  const data1 = [];
  for (let i = 0; i < customerstate.length; i++) {
      data1.push({
        key: i + 1,
        id: customerstate[i]._id,
        name: customerstate[i].firstname + " " + customerstate[i].lastname,
        email: customerstate[i].email,
        mobile: customerstate[i].mobile,
        company: customerstate[i].company,
        action: (
          <>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(customerstate[i]._id)}
            >
              <AiFillDelete />
            </button>
          </>
        ),
      });
  }
  const deleteUser = (e) => {
    dispatch(deleteAUser(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getUsers());
    }, 100);
  };
  return (
    <div>
      <h3 className="mb-4 title">Customers</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteUser(userId);
        }}
        title="Are you sure you want to delete this Customer?"
      />
    </div>
  );
};

export default Customers;
