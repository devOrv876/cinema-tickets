import TicketService from "../src/pairtest/TicketService";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest";
import InvalidPurchaseException from "../src/pairtest/lib/InvalidPurchaseException";
import InvalidAccountIdException from "../src/pairtest/lib/InvalidAccountIdException";
import TicketPurchaseLimitException from "../src/pairtest/lib/TicketPurchaseLimitException";
import AdultTicketRequiredException from "../src/pairtest/lib/AdultTicketRequiredException";

describe("TicketServiceTests", () => {
  let ticketService;

  beforeEach(() => {
    ticketService = new TicketService();
  });

  test("Should throw if no tickets are requested", () => {
    expect(() => ticketService.purchaseTickets(1, [])).toThrow(
      InvalidPurchaseException
    );
  });

  test("Should throw error when ticket type is invalid", () => {
    expect(() =>
      ticketService.purchaseTickets(1, [new TicketTypeRequest("ERROR", 1)])
    ).toThrow(TypeError);
  });

  test("Should throw error when account id is invalid", () => {
    expect(() =>
      ticketService.purchaseTickets(-1, [new TicketTypeRequest("ADULT", 3)])
    ).toThrow(InvalidAccountIdException);
    expect(() =>
      ticketService.purchaseTickets("-1", [new TicketTypeRequest("ADULT", 3)])
    ).toThrow(InvalidAccountIdException);
    expect(() =>
      ticketService.purchaseTickets(2, [new TicketTypeRequest("ADULT", 3)])
    ).not.toThrow(InvalidAccountIdException);
  });

  test("Cannot purchase more than 20 tickets at one time", () => {
    expect(() =>
      ticketService.purchaseTickets(1, [new TicketTypeRequest("ADULT", 21)])
    ).toThrow(TicketPurchaseLimitException);
    expect(() =>
      ticketService.purchaseTickets(1, [new TicketTypeRequest("ADULT", 20)])
    ).not.toThrow(TicketPurchaseLimitException);
    expect(() =>
      ticketService.purchaseTickets(1, [
        new TicketTypeRequest("CHILD", 1),
        new TicketTypeRequest("ADULT", 1),
        new TicketTypeRequest("ADULT", 21),
      ])
    ).toThrow(TicketPurchaseLimitException);
  });

  test("Requires atleast one adult ticket", () => {
    expect(() =>
      ticketService.purchaseTickets(1, [new TicketTypeRequest("CHILD", 1)])
    ).toThrow(AdultTicketRequiredException);

    expect(() =>
      ticketService.purchaseTickets(1, [new TicketTypeRequest("INFANT", 1)])
    ).toThrow(AdultTicketRequiredException);

    expect(() =>
      ticketService.purchaseTickets(1, [
        new TicketTypeRequest("ADULT", 1),
        new TicketTypeRequest("CHILD", 1),
      ])
    ).not.toThrow(AdultTicketRequiredException);
  });

  test("Should return total price", () => {
    expect(
      ticketService.purchaseTickets(1, [
        new TicketTypeRequest("ADULT", 1),
        new TicketTypeRequest("CHILD", 1),
      ])
    ).toBe(30);
  });

  test("Should return total price for multiple tickets", () => {
    expect(
      ticketService.purchaseTickets(1, [
        new TicketTypeRequest("ADULT", 2),
        new TicketTypeRequest("CHILD", 2),
        new TicketTypeRequest("INFANT", 2),
      ])
    ).toBe(60);
  });
});
