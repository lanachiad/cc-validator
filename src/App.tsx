import React, { FormEvent, useRef, useState } from "react";
import axios from "axios";
import "./App.css";

interface IAppProps {
  digits: string;
}

export default function App({ digits }: IAppProps) {
  const [response, setResponse] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateDigitsAPI = (inputDigits: string) => {
    const paramReq = { inputDigits: inputDigits };

    axios
      .post("http://localhost:9000/validator", paramReq)
      .then((res) => setResponse(JSON.stringify(res.data)))
      .catch((err) => console.log(err));

    return response;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submittedDigits: string = inputRef.current!.value;
    if (inputRef.current !== null) {
      validateDigitsAPI(submittedDigits);
    }
  };

  const renderResults = (response: string | null) => {
    if (response === null) {
      return "";
    } else if (response === "true") {
      return "Your credit card information has been validated!";
    } else {
      return "Invalid credit card information provided. Please try again!";
    }
  };

  return (
    <div className="App">
      <h1>Credit Card Validator</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="digit-input"
          name="digits"
          placeholder="Enter credit card information"
          ref={inputRef}
          required
          type="text"
        />
        <button type="submit">Validate</button>
      </form>
      <p className="results">{renderResults(response)}</p>
    </div>
  );
}
