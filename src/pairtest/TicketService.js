import TicketTypeRequest from "./lib/TicketTypeRequest.js";
import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import InvalidAccountIdException from "./lib/InvalidAccountIdException.js";
import TicketPurchaseLimitException from "./lib/TicketPurchaseLimitException.js";
import AdultTicketRequiredException from "./lib/AdultTicketRequiredException.js";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  #ticketPaymentService;
  #seatReservationService;

  constructor() {
    this.#ticketPaymentService = new TicketPaymentService();
    this.#seatReservationService = new SeatReservationService();
  }

  purchaseTickets(accountId, ...ticketTypeRequests) {
    try {
      //validate account id
      this.#validateAccountId(accountId);

      //validate ticket type requests
      this.#validateTicketRequests(...ticketTypeRequests);

      //get total price
      const totalPrice = this.#getTotalPrice(...ticketTypeRequests);

      //purchase tickets
      this.#ticketPaymentService.makePayment(accountId, totalPrice);

      //get seats to allocate
      const totalSeatsToAllocate = this.#totalSeatsToAllocate(
        ...ticketTypeRequests
      );

      //reserve seats
      this.#seatReservationService.reserveSeat(accountId, totalSeatsToAllocate);

      //return total price
      return totalPrice;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  #getTotalPrice(ticketTypeRequests) {
    return ticketTypeRequests.reduce((total, ticketTypeRequest) => {
      return total + ticketTypeRequest.getTotalPrice();
    }, 0);
  }

  #validateTicketRequests(ticketTypeRequests) {
    if (ticketTypeRequests.length === 0) {
      throw new InvalidPurchaseException("No tickets requested");
    }

    if (!this.#IsValidNumberOfTickets(ticketTypeRequests)) {
      throw new TicketPurchaseLimitException(
        "Cannot purchase more than 20 tickets at one time"
      );
    }

    if (
      !ticketTypeRequests.some(
        (ticketTypeRequest) => ticketTypeRequest.getTicketType() === "ADULT"
      )
    ) {
      throw new AdultTicketRequiredException(
        "Requires atleast one adult ticket"
      );
    }
  }

  #IsValidNumberOfTickets(ticketTypeRequests) {
    var totalTickets = ticketTypeRequests.reduce((total, ticketTypeRequest) => {
      return total + ticketTypeRequest.getNoOfTickets();
    }, 0);
    return totalTickets <= 20;
  }

  #validateAccountId(accountId) {
    if (accountId <= 0) {
      throw new InvalidAccountIdException("Account id is invalid");
    }
  }

  #totalSeatsToAllocate(ticketTypeRequests) {
    let adultSeats = 0;
    let childSeats = 0;

    ticketTypeRequests.forEach((ticketTypeRequest) => {
      if (ticketTypeRequest.getTicketType() === "ADULT") {
        adultSeats += ticketTypeRequest.getNoOfTickets();
      } else if (ticketTypeRequest.getTicketType() === "CHILD") {
        childSeats += ticketTypeRequest.getNoOfTickets();
      }
    }, 0);
    return adultSeats + childSeats;
  }
}
