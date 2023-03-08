export default function formatPrice(price, currency) {
    // Convert the price to a string and add a decimal point two places from the end
    const formattedPrice = (price / 100).toFixed(2);
  
    // Create an object to map currency codes to symbols
    const currencySymbols = {
      usd: "$",
      eur: "€",
      gbp: "£",
      jpy: "¥",
      aud: "A$",
      cad: "C$",
      // add more currencies as needed
    };
  
    // Look up the currency symbol based on the provided currency code
    const symbol = currencySymbols[currency] || currency;
  
    // Return the formatted price string with the currency symbol
    return `${symbol}${formattedPrice}`;
  }