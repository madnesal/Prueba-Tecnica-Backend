export class MainBaseValidations {
  handleResult = (result) => {
    if (!result.ok) {
      throw new Error(result.msg);
    }
    return result;
  };
}

export default new MainBaseValidations();
