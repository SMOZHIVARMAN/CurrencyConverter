const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");

// Populate currency dropdowns
const currencyList = ["USD", "EUR", "INR", "GBP", "JPY", "CAD", "AUD", "CNY", "SGD", "ZAR"];

currencyList.forEach((currency) => {
  const option1 = document.createElement("option");
  const option2 = document.createElement("option");
  option1.value = option2.value = currency;
  option1.text = option2.text = currency;
  fromCurrency.appendChild(option1);
  toCurrency.appendChild(option2);
});

// Set defaults
fromCurrency.value = "USD";
toCurrency.value = "INR";

async function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amt = amount.value;

  if (amt === "" || amt <= 0) {
    result.innerText = "Please enter a valid amount.";
    return;
  }

  try {
    const res = await fetch(`https://v6.exchangerate-api.com/v6/4f8529c7646d2244d5707b2e/latest/${from}`);
    const data = await res.json();
    const rate = data.conversion_rates[to];
    const converted = (amt * rate).toFixed(2);
    result.innerText = `${amt} ${from} = ${converted} ${to}`;
  } catch (error) {
    result.innerText = "Error fetching exchange rates.";
  }
}
