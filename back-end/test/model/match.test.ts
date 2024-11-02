import { Match } from '../../domain/model/match';

const validId = 1;
const validDate = new Date('2021-01-01');

test('given: valid values for match, when: creating a new match, then: match is created with those values', () => {
    // when
    const match = new Match({ id: validId, date: validDate });

    // then
    expect(match).toBeDefined();

    expect(match.getId()).toBe(1);
    expect(match.getDate()).toBe('2021-01-01');
});
