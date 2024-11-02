import { Location } from '../../domain/model/location';

const validId = 1;
const validCountry = 'Country';
const validCity = 'City';
const validStreetName = 'Streetname';
const validZipCode = 5;
const validNumber = 1;

const negativeId = -1;
const emptyCountry = '';
const emptyCity = '';
const emptyStreetName = '';
const invalidZipCode = 0;
const invalidNumber = 0;

test(`given: valid parameters, when: creating location, then: location is created`, () => {
    // When
    const location = new Location({
        id: validId,
        country: validCountry,
        city: validCity,
        streetName: validStreetName,
        zipCode: validZipCode,
        number: validNumber,
    });

    // Then
    expect(location).toBeDefined();

    expect(location.getId()).toBe(1);
    expect(location.getCountry()).toBe('Country');
    expect(location.getCity()).toBe('City');
    expect(location.getStreetName()).toBe('Streetname');
    expect(location.getZipCode()).toBe(5);
    expect(location.getNumber()).toBe(1);
});

test(`given: negative id, when: create location, then: error is thrown`, () => {
    expect(
        () =>
            new Location({
                id: negativeId,
                country: validCountry,
                city: validCity,
                streetName: validStreetName,
                zipCode: validZipCode,
                number: validNumber,
            })
    ).toThrow('Id cannot be negative');
});

test(`given: empty country, when: create location, then: error is thrown`, () => {
    expect(
        () =>
            new Location({
                id: validId,
                country: emptyCountry,
                city: validCity,
                streetName: validStreetName,
                zipCode: validZipCode,
                number: validNumber,
            })
    ).toThrow('Invalid country');
});

test(`given: empty city, when: create location, then: error is thrown`, () => {
    expect(
        () =>
            new Location({
                id: validId,
                country: validCountry,
                city: emptyCity,
                streetName: validStreetName,
                zipCode: validZipCode,
                number: validNumber,
            })
    ).toThrow('Invalid city');
});

test(`given: empty street name, when: create location, then: error is thrown`, () => {
    expect(
        () =>
            new Location({
                id: validId,
                country: validCountry,
                city: validCity,
                streetName: emptyStreetName,
                zipCode: validZipCode,
                number: validNumber,
            })
    ).toThrow('Invalid street name');
});

test(`given: invalid zip code, when: create location, then: error is thrown`, () => {
    expect(
        () =>
            new Location({
                id: negativeId,
                country: validCountry,
                city: validCity,
                streetName: validStreetName,
                zipCode: invalidZipCode,
                number: validNumber,
            })
    ).toThrow('Invalid zip code');
});

test(`given: invalid number, when: create location, then: error is thrown`, () => {
    expect(
        () =>
            new Location({
                id: negativeId,
                country: validCountry,
                city: validCity,
                streetName: validStreetName,
                zipCode: validZipCode,
                number: invalidNumber,
            })
    ).toThrow('Invalid number');
});
