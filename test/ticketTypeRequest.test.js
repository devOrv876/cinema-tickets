import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest";

describe("TicketTypeRequestTests", () => {
  test("Should throw with invalid ticket type", () => {
    expect(() => new TicketTypeRequest("ERROR", 3)).toThrow(TypeError);
  });
  test("Should throw with invalid ticket request Type", () => {
    expect(() => new TicketTypeRequest("abc", 3)).toThrow(TypeError);
    expect(() => new TicketTypeRequest(123, 3)).toThrow(TypeError);
    expect(() => new TicketTypeRequest("CAR", 3)).toThrow(TypeError);
  });
  test("Should not with valid ticket request types", () => {
    expect(() => new TicketTypeRequest("ADULT", 3)).not.toThrow(TypeError);
    expect(() => new TicketTypeRequest("CHILD", 3)).not.toThrow(TypeError);
    expect(() => new TicketTypeRequest("INFANT", 3)).not.toThrow(TypeError);
  });

  test("Should throw invalid ticket number", () => {
    expect(() => new TicketTypeRequest("ADULT", "abc")).toThrow(TypeError);
    expect(() => new TicketTypeRequest("ADULT", -1)).toThrow(TypeError);
  });

  test("Should accept valid ticket requests amount", () => {
    expect(() => new TicketTypeRequest("ADULT", 1)).not.toThrow(TypeError);
    expect(() => new TicketTypeRequest("CHILD", 2)).not.toThrow(TypeError);
    expect(() => new TicketTypeRequest("INFANT", 2)).not.toThrow(TypeError);
  });
});
