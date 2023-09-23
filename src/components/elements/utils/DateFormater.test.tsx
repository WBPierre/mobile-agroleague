import DateFormater from './DateFormater';

test('Should return a valid date format', () => {
	const date = DateFormater(new Date('2020-08-12'));
    expect(date).toBe("12/08/2020 02:00:00")
});
