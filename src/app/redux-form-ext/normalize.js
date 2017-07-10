const Normalize = {
  /**
   * Normalizes name type.
   * 
   * Difference between name and title is name only uppercases first letter of each word leaving original format of the rest of the letters.
   * 
   * Example: 
   * var name = Normalize.name('mC doNalds'); // result 'MC DoNalds''
   * 
   * @method name
   * @param {String} str the string to normalize.
   * @return the normalized value.
   */
  name: function(str) {
    if (!str) { return str; }

    const normalizedParts = [];
    const parts = str.split(' ');

    parts.forEach((part) => {
      if (part.length > 0) {
        part = part[0].toUpperCase() + part.slice(1, part.length);
      }

      normalizedParts.push(part);
    });
    
    return normalizedParts.join(' ');
  },

  /**
   * Normalizes middle initial type.
   * 
   * Example: 
   * var middleInitial = Normalize.middleInitital('iGaloo'') // result 'I'
   * 
   * @method middleInitial
   * @param {String} str the string to normalize.
   * @return the normalized value.
   */
  middleInitial: function(str) {
    if (!str) { return str; }

    return Normalize.name(str.substr(0,1));
  },

  /**
   * Normalizes a U.S. Phone number.
   * 
   * Example: 
   * var phone = Normalize.phone(1112223333); // result: "(111) 222 - 3333"
   * 
   * @method phone
   * @param {String} value the value to normalize.
   * @return {String} the normalized phone value.
   */
  phone: function(value) {
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
  },

  /**
   * Normalizes title type.
   * 
   * Difference between title and name is title, lowercase everything but first letter in word.
   * 
   * Example:
   * var title = Normalize.title('mC dOnalds'); // result 'Mc Donalds';
   * 
   * @method title 
   * @param {String} str the string to normalize.
   * @return {String} the normalized value.
   */
  title: function(str) {
    if (!str) { return str; }

    return Normalize.name(str.toLowerCase());
  }
};

export default Normalize