var luhn = require("luhn");

const ccValidator = (testDigits) => {
  let is_valid;

  // Most CCs are 16 digits, AX is 15 digits, rarely there can be 19 digits
  // Info from here: https://www.forbes.com/advisor/credit-cards/what-does-your-credit-card-number-mean/#:~:text=Credit%20card%20numbers%20are%20usually,card%20companies%20employ%2019%20digits.
  if (testDigits.length < 15 || testDigits.length > 20) {
    return false;
  }

  // Check for only numerical values
  const numericalDigits = Number(testDigits);
  if (Number.isNaN(numericalDigits)) {
    return false;
  }

  is_valid = luhn.validate(testDigits);

  return is_valid;
};

module.exports = { ccValidator };
