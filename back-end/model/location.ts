export class Location {
    private id?: number;
    private country: string;
    private city: string;
    private streetName: string;
    private zipCode: string;
    private number: number;

    constructor(location: {
        id: number;
        country: string;
        city: string;
        streetName: string;
        zipCode: string;
        number: number;
    }) {
        this.id = location.id;
        this.country = location.country;
        this.city = location.city;
        this.streetName = location.streetName;
        this.zipCode = location.zipCode;
        this.number = location.number;
    }

    // Getters
    getId(): number | undefined {
        return this.id;
    }

    getCountry(): string {
        return this.country;
    }

    getCity(): string {
        return this.city;
    }

    getStreetName(): string {
        return this.streetName;
    }

    getZipCode(): string {
        return this.zipCode;
    }

    getNumber(): number {
        return this.number;
    }

    // Setters
    setCountry(country: string): void {
        this.country = country;
    }

    setCity(city: string): void {
        this.city = city;
    }

    setStreetName(streetName: string): void {
        this.streetName = streetName;
    }

    setZipCode(zipCode: string): void {
        this.zipCode = zipCode;
    }

    setNumber(number: number): void {
        this.number = number;
    }

    equals(location: Location): boolean {
        return (
            this.country === location.getCountry() &&
            this.city === location.getCity() &&
            this.streetName === location.getStreetName() &&
            this.zipCode === location.getZipCode() &&
            this.number === location.getNumber()
        );
    }
}
