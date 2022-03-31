import { Apartment, ApartmentList } from './apartment';

describe('ApartmentList', () => {
  it('should add apartment', () => {
    const apList = new ApartmentList();

    const apCailhau = new Apartment('Porte Cailhau', 44.8387, -0.5685);
    const apDijeaux = new Apartment('Porte Dijeaux', 44.8407, -0.5798);

    apList.addApartment(apCailhau);
    apList.addApartment(apDijeaux);

    const apartmentList = apList.getApartmentList();

    expect(apartmentList).toEqual([apCailhau, apDijeaux]);
  });

  xit('should remove apartment', () => {
    throw new Error("WIP");
  });
});