const { expect } = require('chai');
const echo = require('../../index');

const prevLevel = echo.iLevel;
describe('echo.getSilly() should work properly', () => {
    it(`Последнее сообщение д.б. равно 1`, () => {
        echo.error('1');
        expect(echo.clrESC(echo._lastLogMessage)).to.equal('1');
    });
    it(`Текущий уровень - 2 (info)`, () => {
        expect(echo.iLevel).to.equal(2);
    });
    it(`функция getSilly() -> silly() не должна ничего печатать`, () => {
        const silly = echo.getSilly('REST');
        silly(`Test message`);
        expect(echo.clrESC(echo._lastLogMessage)).to.equal('1');
    });
    it(`Устанавливаем уровень silly`, () => {
        echo.setILevel(5);
        expect(echo.iLevel).to.equal(5);
    });
    it(`Теперь функция getSilly() -> silly() должна печатать`, () => {
        const silly = echo.getSilly({ debugIDs: ['REST'], prefix: 'CONFIG-SERVICE' });
        silly('Test message');
        expect(echo.clrESC(echo._lastLogMessage)).to.equal('[CONFIG-SERVICE]: Test message');
        echo.setILevel(prevLevel);
    });
    it(`Возвращаем уровень info`, () => {
        echo.setILevel(prevLevel);
        expect(echo.iLevel).to.equal(2);
    });
    it(`Устанавливаем process.env.DEBUG = '*', silly() должна печатать`, () => {
        process.env.DEBUG = '*';
        const silly = echo.getSilly({ debugIDs: ['REST'], prefix: 'CONFIG-SERVICE' });
        silly('Test message 2');
        expect(echo.iLevel).to.equal(2);
        expect(echo.clrESC(echo._lastLogMessage)).to.equal('[CONFIG-SERVICE]: Test message 2');
        process.env.DEBUG = '';
    });
    it(`Устанавливаем process.env.DEBUG = 'REST', silly() должна печатать`, () => {
        process.env.DEBUG = 'REST';
        const silly = echo.getSilly({ debugIDs: ['REST'], prefix: 'CONFIG-SERVICE' });
        silly('Test message 2');
        expect(echo.iLevel).to.equal(2);
        expect(echo.clrESC(echo._lastLogMessage)).to.equal('[CONFIG-SERVICE]: Test message 2');
        process.env.DEBUG = '';
    });
});
