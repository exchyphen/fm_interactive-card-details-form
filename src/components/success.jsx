import "./success.css";

import IconComplete from "../assets/images/icon-complete.svg";

const Success = (props) => {
  return (
    <div className="success-container">
      <img
        className="icon-complete"
        src={IconComplete}
        alt="icon complete"
      ></img>
      <div className="success-text-container">
        <div className="thanks-text">thank you!</div>
        <div className="confirmation-text">We've added your card details</div>
      </div>
      <button className="continue-button" onClick={() => props.onClick()}>
        Continue
      </button>
    </div>
  );
};

export default Success;
