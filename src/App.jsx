import { useEffect, useState } from "react";
import "./App.css";
import CreditCardEntry from "./components/creditCardEntry";
import Success from "./components/success";

import CardLogo from "./assets/images/card-logo.svg";

function App() {
  const [incomplete, setIncomplete] = useState(true);
  const [ccName, setCCName] = useState("");
  const [ccNumber, setCCNumber] = useState("");
  const [ccExpMonth, setCCExpMonth] = useState("");
  const [ccExpYear, setCCExpYear] = useState("");
  const [ccCvc, setCCCvc] = useState("");
  // 0 = no error, 1 = error, 2 = exclusively card number format error
  const [errorStates, setErrorStates] = useState(Array(5).fill(0));

  /* handle on changes */
  const onChange_ccNumber = (str) => {
    const arr = [];

    let containsLetter = false;
    for (let i = 0; i < str.length; i++) {
      // prevent more than 16 numbers
      if (arr.length === 16) {
        break;
      }

      const c = str.charAt(i);
      if (c === " ") {
        continue;
      }

      if (isNaN(c)) {
        containsLetter = true;
      }

      arr.push(c);
    }

    const currErrorState = Array.from(errorStates);
    if (containsLetter) {
      currErrorState[1] = 2;
    } else {
      currErrorState[1] = 0;
    }
    setErrorStates(currErrorState);

    // add spaces
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (i % 4 === 0) {
        newArr.push(" ");
      }
      newArr.push(arr[i]);
    }

    setCCNumber(newArr.join(""));
  };

  /* dev: should i filter out misc characters like ". , -" ? */
  const onChange_ccName = (str) => {
    setCCName(str.slice(0, 20));
  };

  const onChange_ccExpMonth = (str) => {
    setCCExpMonth(str.slice(0, 2));
  };

  const onChange_ccExpYear = (str) => {
    setCCExpYear(str.slice(0, 2));
  };

  const onChange_ccCvc = (str) => {
    setCCCvc(str.slice(0, 3));
  };

  /* handle submit form */
  const handleSubmit = (e) => {
    e.preventDefault();

    const currErrorState = Array(5).fill(0);

    // check empty
    if (ccName === "") {
      currErrorState[0] = 1;
    }

    if (ccNumber === "") {
      currErrorState[1] = 1;
    }

    if (ccExpMonth === "") {
      currErrorState[2] = 1;
    }

    if (ccExpYear === "") {
      currErrorState[3] = 1;
    }

    if (ccCvc === "") {
      currErrorState[4] = 1;
    }

    // check cc number format (the other numbers are set to number only)
    if (errorStates[1] === 2 || ccNumber.length !== 20) {
      console.log(ccNumber);
      currErrorState[1] = 2;
    }

    // check exp month (1 -> 12 and fill in any blanks)
    if (ccExpMonth !== "") {
      if (Number(ccExpMonth) === 0 || Number(ccExpMonth) > 12) {
        currErrorState[2] = 2;
      } else if (Number(ccExpMonth) < 10) {
        setCCExpMonth(`0${Number(ccExpMonth)}`);
      }
    }

    // check exp date (1 -> 99 and fill in any blanks, check based on input month)
    if (ccExpYear !== "") {
      if (Number(ccExpYear) < 10) {
        setCCExpYear(`0${Number(ccExpYear)}`);
      }
    }

    // check cvc (at least 3 numbers)

    // if no errors -> continue to success
    let noErrors = true;
    for (const error of currErrorState) {
      if (error !== 0) {
        noErrors = false;
      }
    }
    if (noErrors) {
      setIncomplete(false);
      return;
    }

    setErrorStates(currErrorState);
  };

  const handleContinue = () => {
    // reset states
    setCCName("");
    setCCNumber("");
    setCCExpMonth("");
    setCCExpYear("");
    setCCCvc("");

    setErrorStates(Array(5).fill(0));

    setIncomplete(true);
  };

  return (
    <>
      <main>
        <section className="cc-container">
          <div className="cc-front-container cc">
            <img className="cc-logo" src={CardLogo} alt="card logo"></img>
            <div className="cc-front-info-container">
              <div className="cc-number">
                {ccNumber === "" ? "0000 0000 0000 0000" : ccNumber}
              </div>
              <div className="cc-name-exp-container">
                <div className="cc-name">
                  {ccName === "" ? "jane appleseed" : ccName}
                </div>
                <div className="cc-exp">
                  <div>{ccExpMonth === "" ? "00" : ccExpMonth}</div>
                  {"/"}
                  <div>{ccExpYear === "" ? "00" : ccExpYear}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="cc-back-container cc">
            <div className="cc-cvc">{ccCvc === "" ? "000" : ccCvc}</div>
          </div>
        </section>
        {incomplete ? (
          <CreditCardEntry
            submit={handleSubmit}
            onChange_ccNumber={onChange_ccNumber}
            ccNumber={ccNumber}
            ccName={ccName}
            onChange_ccName={onChange_ccName}
            ccExpMonth={ccExpMonth}
            onChange_ccExpMonth={onChange_ccExpMonth}
            ccExpYear={ccExpYear}
            onChange_ccExpYear={onChange_ccExpYear}
            ccCvc={ccCvc}
            onChange_ccCvc={onChange_ccCvc}
            errorStates={errorStates}
          ></CreditCardEntry>
        ) : (
          <Success onClick={handleContinue}></Success>
        )}
      </main>
      <footer className="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a href="https://github.com/exchyphen" target="_blank">
          exc
        </a>
        .
      </footer>
    </>
  );
}

export default App;
