const Util = {
  convertToSlug: function convertToSlug(str) {
    return str.toLowerCase().replace(/\s/g, '-');
  }
};

export default Util;