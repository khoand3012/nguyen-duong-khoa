import React from 'react';
import { createRoot } from "react-dom/client";
import CurrencyExchangeForm from "./components/CurrencyExchangeForm";

const mountingDiv = document.querySelector("#root") as HTMLDivElement;

if (mountingDiv) {
  const root = createRoot(mountingDiv);
  root.render(<CurrencyExchangeForm />)
}
