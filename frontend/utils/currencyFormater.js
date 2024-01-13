export default function currencyFormatter(amount = 0) {
  // Define formatting options
  const options = {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2, // Ensure exactly 2 decimal places
  };

  // Create an Intl.NumberFormat instance with the specified options
  const formatter = Intl.NumberFormat("en-US", options);

  // Format the amount and return the result without the currency symbol
  const formattedAmount = formatter.format(amount / 100);

  // Remove the currency symbol and return the formatted amount
  return formattedAmount.replace(/^\D+/, "");
}
