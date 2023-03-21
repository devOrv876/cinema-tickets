import InvalidPurchaseException from "./InvalidPurchaseException.js";

export default class InvalidAccountIdException extends InvalidPurchaseException {
  constructor(message) {
    super(message);
  }
}
