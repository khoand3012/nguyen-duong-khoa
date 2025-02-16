import React, { useActionState } from "react";
import currencies from "../currencies";
import "./CurrencyExchangeForm.scss";

const exchangeRateMap = currencies.reduce((accumulator, currency) => {
  return { ...accumulator, [currency.currency]: currency.price };
}, {});

export default function CurrencyExchangeForm() {
  const [state, formAction, isLoading] = useActionState(handleExchange, {
    input: 0,
    output: 0,
    error: "",
  });

  return (
    <>
      <form className="currency-form" action={formAction}>
        <div className="input-block row">
          <label htmlFor="input-amount">Amount to send:</label>
          <div className="input-container">
            <input
              defaultValue={state.input}
              type="number"
              id="input-amount"
              name="input-amount"
              step="any"
            />
            <span>{state.currency1}</span>
            {state.error && <span className="error">{state.error}</span>}
          </div>
          <label htmlFor="currency-1">Select currency:</label>
          <select
            name="currency-1"
            id="currency-1"
            defaultValue={state.currency1}
          >
            {Object.keys(exchangeRateMap).map((currency) => (
              <option key={currency + "-1"} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div className="output-block row">
          <label htmlFor="output-amount">Amount to receive:</label>
          <div className="input-container">
            <input
              type="number"
              id="input-amount"
              readOnly
              defaultValue={state.output}
            />
            <span>{state.currency2}</span>
          </div>
          <label htmlFor="currency-2">Select currency:</label>
          <select
            name="currency-2"
            id="currency-2"
            defaultValue={state.currency2}
          >
            {Object.keys(exchangeRateMap).map((currency) => (
              <option key={currency + "-2"} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <button className="submit-btn" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Exchange"}
        </button>
      </form>
    </>
  );
}

async function handleExchange(prevState: unknown, formData: FormData) {
  const input = formData.get("input-amount") as any;
  const inputAmount = +input;
  if (input === "" || input === null || isNaN(inputAmount)) {
    return { error: "Invalid input amount." };
  }
  if (inputAmount < 0) {
    return { error: "Input amount must be a positive number." };
  }
  const currency1 = formData.get("currency-1") as string;
  const inputRate = exchangeRateMap[currency1];
  const currency2 = formData.get("currency-2") as string;
  const outputRate = exchangeRateMap[currency2];

  if (!inputRate || !outputRate) {
    return { error: "Please select the exchange rates." };
  }

  await wait(2000);

  const result = inputAmount * (inputRate / outputRate);

  return {
    input: inputAmount,
    output: result,
    currency1,
    currency2,
  };
}

function wait(duration: number) {
  return new Promise((res) => {
    setTimeout(res, duration);
  });
}
