export class Apartment {

  constructor(
    public name: string,
    public lon: number,
    public lat: number
  ) { }

}

export class ApartmentList {
  private _apartmentList: Apartment[] = [];

  addApartment(apartment: Apartment) {
    this._apartmentList = [...this._apartmentList, apartment];
  }

  /**
   * @deprecated WIP
   */
  removeApartment(apartment: Apartment) {
    throw new Error("WIP");
  }

  getApartmentList() {
    return this._apartmentList;
  }
}
