import InvalidPurchaseException from "./InvalidPurchaseException.js";

export default class TicketPurchaseLimitException extends InvalidPurchaseException {
  constructor(message) {
    super(message);
  }
}
