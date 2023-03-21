import InvalidPurchaseException from "./InvalidPurchaseException.js";

export default class AdultTicketRequiredException extends InvalidPurchaseException {
  constructor(message) {
    super(message);
  }
}
