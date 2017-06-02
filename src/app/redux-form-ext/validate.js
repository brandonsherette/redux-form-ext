const Validate = {
  isValidEmail: (email) => {
    return (email && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email));
  },

  isValidPhone: (phone) => {
    return (phone && /^\([0-9]{3}\) [0-9]{3} \- [0-9]{4}$/.test(phone));
  },

  isValidPassword: (pass) => {
    const passCheck1 = /[a-z]+/;
    const passCheck2 = /[A-Z]+/;
    const passCheck3 = /[0-9]+/;
    const passCheck4 = /^[\S\d]{6,24}$/;
    //const fullCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,24}$/

    const isValidFormat = (
      pass.match(passCheck1) && 
      pass.match(passCheck2) && 
      pass.match(passCheck3) && 
      pass.match(passCheck4)
    ) ? true : false;

    return (pass && isValidFormat);
  },

  isValidZip: (zip) => {
    return (/[0-9]{4,10}/.test(zip));
  }
}

export default Validate;
