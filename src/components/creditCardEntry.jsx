import "./creditCardEntry.css";

const CreditCardEntry = (props) => {
  return (
    <form className="form-container">
      <div className="form-input-container">
        <label htmlFor="cc-name">cardholder name</label>
        <input
          id="cc-name"
          className={props.errorStates[0] !== 0 ? "input-error" : null}
          type="text"
          placeholder="e.g. Jane Appleseed"
          value={props.ccName}
          onChange={(e) => props.onChange_ccName(e.target.value)}
          required
        ></input>
        {props.errorStates[0] === 1 ? (
          <div className="error-message">Can't be blank</div>
        ) : null}
      </div>
      <div className="form-input-container">
        <label htmlFor="cc-number">card number</label>
        <input
          id="cc-number"
          className={props.errorStates[1] !== 0 ? "input-error" : null}
          type="text"
          placeholder="e.g. 1234 5678 9123 0000"
          value={props.ccNumber}
          onChange={(e) => props.onChange_ccNumber(e.target.value)}
          required
        ></input>
        {props.errorStates[1] === 1 ? (
          <div className="error-message">Can't be blank</div>
        ) : null}
        {props.errorStates[1] === 2 ? (
          <div className="error-message">Wrong format, numbers only</div>
        ) : null}
      </div>
      <div className="form-exp-cvc-container">
        <div className="form-input-container">
          <label htmlFor="cc-date-month cc-date-year">exp. date (mm/yy)</label>
          <div className="cc-date-container">
            <input
              id="cc-date-month"
              className={props.errorStates[2] !== 0 ? "input-error" : null}
              type="number"
              placeholder="MM"
              value={props.ccExpMonth}
              onChange={(e) => props.onChange_ccExpMonth(e.target.value)}
              required
            ></input>
            <input
              id="cc-date-year"
              className={props.errorStates[3] !== 0 ? "input-error" : null}
              type="number"
              placeholder="YY"
              value={props.ccExpYear}
              onChange={(e) => props.onChange_ccExpYear(e.target.value)}
              required
            ></input>
          </div>
          {props.errorStates[2] === 1 || props.errorStates[3] === 1 ? (
            <div className="error-message">Can't be blank</div>
          ) : null}
          {props.errorStates[2] === 2 ? (
            <div className="error-message">Invalid month</div>
          ) : null}
        </div>
        <div className="form-input-container">
          <label htmlFor="cc-cvc">cvc</label>
          <input
            id="cc-cvc"
            className={props.errorStates[4] !== 0 ? "input-error" : null}
            type="number"
            placeholder="e.g. 123"
            value={props.ccCvc}
            onChange={(e) => props.onChange_ccCvc(e.target.value)}
            required
          ></input>
          {props.errorStates[4] === 1 ? (
            <div className="error-message">Can't be blank</div>
          ) : null}
        </div>
      </div>
      <button type="submit" className="submit-button" onClick={props.submit}>
        Confirm
      </button>
    </form>
  );
};

export default CreditCardEntry;
