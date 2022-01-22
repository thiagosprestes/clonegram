const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

const IsEmailValid = (email: string) => {
  if (!emailRegex.test(email)) {
    return false;
  }

  return true;
};

export default IsEmailValid;
