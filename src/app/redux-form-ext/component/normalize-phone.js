const normalizePhone = (value, previousValue) => {
    const regexRemoveNonDigits = /[^\d]/g;
    const regexRightParenthesisMissing = /^\([0-9]{0,3}[^\)]+$/;
    let cleanedValue = value.trim();
    let normalizedValue = '';

    // check if empty case 
    if (!cleanedValue || cleanedValue.length === 0) {
      // prevent further execution
      return '';
    }

    if (regexRightParenthesisMissing.test(cleanedValue)) {
      // need to remove the last number as well to make sure to remove the number instead of just the parenthesis, otherwise it won't remove anything
      cleanedValue = cleanedValue.slice(0, -1);
    }

    if (cleanedValue && cleanedValue.length === 12) {
      cleanedValue = cleanedValue.replace(" - ", '');
    }

    // finish cleaing up removing formatting chars 
    cleanedValue = cleanedValue.replace(regexRemoveNonDigits, '');

    // check formatting 
    if (cleanedValue.length > 0) {
      normalizedValue += '(' + cleanedValue.substr(0, 3) + ')';
    }

    if (cleanedValue.length > 3) {
      normalizedValue += ' ' + cleanedValue.substr(3, 3);
    }
    if (cleanedValue.length > 6) {
      normalizedValue += ' - ' + cleanedValue.substr(6, 4);
    }

    return normalizedValue;
  }

  export default normalizePhone;
