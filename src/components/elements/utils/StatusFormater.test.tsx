import StatusFormater from './StatusFormater';

test('Should return a Pending status', () => {
	let status = StatusFormater('pending');
    expect(status).toBe("Pending")
});

test('Should return a Active status', () => {
    let status = StatusFormater('active');
    expect(status).toBe("Active")
});

test('Should return a Archived status', () => {
    let status = StatusFormater('archived');
    expect(status).toBe("Archived")
});
