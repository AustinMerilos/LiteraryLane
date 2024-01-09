export default function currencyFormater(amount = 0) {
  // Define formatting options
  const options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2, // Ensure exactly 2 decimal places
  };

  // Create an Intl.NumberFormat instance with the specified options
  const formatter = Intl.NumberFormat("en-US", options);

  // Format the amount and return the result
  const formattedAmount = formatter.format(amount / 100);

  // Append ".00" if it's a clean dollar amount
  return formattedAmount.replace(/\.\d$/, ".00");
}
