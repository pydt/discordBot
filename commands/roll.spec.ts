import { RollLogic } from "./roll";
import { expect } from 'chai';

describe('Roll Command', () => {
    it('Rolls correctly with known seed', () => {
        expect(new RollLogic('123').roll('2d3')).to.eq(`You rolled 3, 2`);
        expect(new RollLogic('123').roll('6d10')).to.eq(`You rolled 10, 4, 1, 7, 10, 5`);
        expect(new RollLogic('123').roll('6d6')).to.eq(`You rolled 6, 3, 1, 4, 6, 3`);
        expect(new RollLogic('123').roll('!6d6')).to.eq(`You rolled 6, 3, 1, 4, 2, 5`);
    });

    it('Errors correctly with bad input', () => {
        expect(new RollLogic('123').roll('')).to.eq(`I didn't understand the dice you asked for.  Try something like \`2d6\`.`);
        expect(new RollLogic('123').roll('alsasdadasd')).to.eq(`I didn't understand the dice you asked for.  Try something like \`2d6\`.`);
        expect(new RollLogic('123').roll('-1d1-')).to.eq(`That's silly!`);
        expect(new RollLogic('123').roll('0d1')).to.eq(`That's silly!`);
        expect(new RollLogic('123').roll('1d1')).to.eq(`That's silly!`);
        expect(new RollLogic('123').roll('25d1001')).to.eq(`That's silly!`);
        expect(new RollLogic('123').roll('26d5')).to.eq(`That's silly!`);
        expect(new RollLogic('123').roll('!6d5')).to.eq(`In permutation mode, you must have as many dice as sides!`);
    });
});