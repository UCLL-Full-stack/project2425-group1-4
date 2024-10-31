import { Location } from '../../model/location';

test(`given: valid parameters, when: creating location, then: location is created`, () => {
    // Given
    const id = 1;
    const country = 'Country';
    const city = 'City';
    const streetName = 'Streetname';
    const zipCode = 'City';
    const number = 1;

    // When
    const location = new Location({
        id,
        country,
        city,
        streetName,
        zipCode,
        number
    });

    // Then
    expect(location).toBeDefined();
    
    expect(location.getId()).toBe(id);
    expect(location.getCountry()).toBe(country);
    expect(location.getCity()).toBe(city);
    expect(location.getStreetName()).toBe(streetName);
    expect(location.getZipCode()).toBe(zipCode);
    expect(location.getNumber()).toBe(number);

});