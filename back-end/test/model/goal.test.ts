import { Goal } from "../../model/goal";

test(`given: valid parameters, when: create a goal, then: goal is created`, () => {
    // given
    const id = 1;
    const time = 5;

    // when
    const goal = new Goal({
        id,
        time
    });

    // then
    expect(goal).toBeDefined();
    expect(goal.getId()).toBe(id);
    expect(goal.getTime()).toBe(1);
});