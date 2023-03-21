/**
 * Immutable Object.
 */

export default class TicketTypeRequest {
  #type;

  #noOfTickets;

  #ticketPrice = {
    ADULT: 20,
    CHILD: 10,
    INFANT: 0,
  };

  constructor(type, noOfTickets) {
    if (!this.#Type.includes(type)) {
      throw new TypeError(
        `type must be ${this.#Type
          .slice(0, -1)
          .join(", ")}, or ${this.#Type.slice(-1)}`
      );
    }

    if (!Number.isInteger(noOfTickets)) {
      throw new TypeError("noOfTickets must be an integer");
    }
    if (noOfTickets < 0) {
      throw new TypeError("noOfTickets must be greater than 0");
    }

    this.#type = type;
    this.#noOfTickets = noOfTickets;
  }

  getNoOfTickets() {
    return this.#noOfTickets;
  }

  getTicketType() {
    return this.#type;
  }

  getTotalPrice() {
    return this.#noOfTickets * this.#ticketPrice[this.#type];
  }

  #Type = ["ADULT", "CHILD", "INFANT"];
}
