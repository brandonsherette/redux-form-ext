const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncValidate = (values) => {
  return sleep(500).then(() => {
    if (values.accountType.toLowerCase() === 'admin') {
      throw { validation: 'Account needs to be verified' }
    }
  });
};

export default asyncValidate;