import { Match } from "../../model/match";

test('given: valid values for match, when: creating a new match, then: match is created with those values', () => {
    // given
    const id = 1;
    const date = new Date('2021-01-01');


    // when
    const match = new Match(id, date, );

    // then
    expect(match).toBeDefined();

    expect(match.getId()).toBe(id);
    expect(match.getDate()).toBe(date);

});
