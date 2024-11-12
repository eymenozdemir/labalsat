import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAContract,
  resetState,
  updateAContract,
} from "../features/contract/contractSlice";
import { BiArrowBack } from "react-icons/bi";

const ViewContract = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getContId = location.pathname.split("/")[3];
  const contractState = useSelector((state) => state.contract);
  const { contractName, contractMobile, contractEmail, contractCompany, contractInstrument, contractDuration, contractContent } = contractState;

  useEffect(() => {
    dispatch(getAContract(getContId));
  }, [getContId]);
  const goBack = () => {
    navigate(-1);
  };
  const setContractStatus = (e, i) => {
    const data = { id: i, contData: e };
    dispatch(updateAContract(data));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getAContract(getContId));
    }, 100);
  };
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">View Contract</h3>
        <button
          className="bg-transpatent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" /> Go Back
        </button>
      </div>
      <div className="mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Name:</h6>
          <p className="mb-0">{contractName}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Mobile:</h6>
          <p className="mb-0">
            <a href={`tel:+91${contractMobile}`}>{contractMobile}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Email:</h6>
          <p className="mb-0">
            <a href={`mailto:{contractEmail}`}>{contractEmail}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Company:</h6>
          <p className="mb-0">{contractCompany}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Instrument:</h6>
          <p className="mb-0">{contractInstrument}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Duration:</h6>
          <p className="mb-0">{contractDuration}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Change Content:</h6>
          <div>
            <select
              name=""
              value={contractContent ? contractContent : "Maintenance"}
              className="form-control form-select"
              id=""
              onChange={(e) => setContractStatus(e.target.value, getContId)}
            >
                <option value="Maintenance">Maintenance</option>
                <option value="Maintenance and Validation">Maintenance and Validation</option>
                <option value="Maintenance and Technical Support">Maintenance and Technical Support</option>
                <option value="Maintenance, Technical Support, IQ/OQ/PQ (Parts Excluded)">Maintenance, Technical Support, IQ/OQ/PQ (Parts Excluded)</option>
                <option value="Maintenance, Technical Support, IQ/OQ/PQ (Parts Included)">Maintenance, Technical Support, IQ/OQ/PQ (Parts Included)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewContract;
