import { Goal } from '../../model/goal';

const validTime = 5;
const validId = 1;

const emptyId: number | undefined = undefined;
const emptyTime: number | undefined = undefined;

const tooLowTime = -1;
const tooHighTime = 91;

const negativeId = -1;

test(`given: valid parameters, when: create a goal, then: goal is created`, () => {
    // given
    const goal = new Goal({
        id: validId,
        time: validTime,
    });

    // then
    expect(goal).toBeDefined();
    expect(goal.getId()).toBe(1);
    expect(goal.getTime()).toBe(5);
});

test(`given: time under zero, when: create goal, then: error is thrown`, () => {
    expect(() => new Goal({ id: validId, time: tooLowTime })).toThrow(
        'Goal time must be greater than 0'
    );
});

test(`given: time over 90, when: create goal, then: error is thrown`, () => {
    expect(() => new Goal({ id: validId, time: tooHighTime })).toThrow(
        'Goal time must be under 90'
    );
});
