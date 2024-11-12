import React, { useEffect, useState } from "react";

import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAContract,
  getContracts,
  resetState,
} from "../features/contract/contractSlice";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
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
    title: "Company",
    dataIndex: "company",
  },
  {
    title: "Instrument",
    dataIndex: "instrument",
  },
  {
    title: "Content",
    dataIndex: "content",
  },
  {
    title: "Duration",
    dataIndex: "duration",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ServiceContracts = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [contractId, setContractId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setContractId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(resetState());
    dispatch(getContracts());
  }, []);
  const contractState = useSelector((state) => state?.contract?.contract);
  const data1 = [];
  for (let i = 0; i < contractState.length; i++) {
    data1.push({
      key: i + 1,
      name: contractState[i].name,
      email: contractState[i].email,
      mobile: contractState[i].mobile,
      company: contractState[i].company,
      instrument: contractState[i].instrument,
      content: contractState[i].content,
      duration: contractState[i].duration,
      action: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/contracts/${contractState[i]._id}`}
          >
            <AiOutlineEye />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModal(contractState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteCont = (e) => {
    dispatch(deleteAContract(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getContracts());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Service Contracts</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
            deleteCont(contractId);
        }}
        title="Are you sure you want to delete this service contract?"
      />
    </div>
  );
};

export default ServiceContracts;
