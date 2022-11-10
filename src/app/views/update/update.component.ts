import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { DistrictService } from '@core/services/district.service';
import { IMADistrictExtended, IMADistrictPayload, IPricesItem } from '@core/interfaces';
import { MA_DISTRICTS } from '@core/constants';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  @ViewChild('districtForm') districtForm!: NgForm;
  public loading: boolean = false;
  public updatedData: Array<IMADistrictExtended>;
  public selectedDateToUpdate: string;
  public readonly maBaseUrl: string = 'https://www.meilleursagents.com/prix-immobilier/bordeaux-33000/';

  constructor(
    private _router: Router,
    private _districtService: DistrictService,
    private _snackBar: MatSnackBar
  ) {
    this.updatedData = this._initDataStructure();
    this.selectedDateToUpdate = this._getFormattedCurrentDate();
  }

  public save() {
    this.loading = true;
    const payload: Array<IMADistrictPayload> = [];
    this.updatedData.forEach((element: IMADistrictExtended) => {
      if (!this._hasANullPrice(element.added_prices)) {
        const {added_prices, ...cleanedElement} = element;
        payload.push(
          {
            ...cleanedElement,
            prices: {[this.selectedDateToUpdate]: {...element.added_prices}}
          }
        )
      }
    });
    let api: Observable<Array<IMADistrictExtended>>;

    api = this._districtService.updateAllDistricts(payload);

    api.subscribe(
      () => {
        this._snackBar.open('Sauvegarde effectuée', 'OK');
        this._router.navigateByUrl(`/charts`);
        this.loading = false;
      },
      err => console.error(err)
    )
  }

  /**
   * @returns the data structure with the tmp added_prices object
   */
  private _initDataStructure(): Array<IMADistrictExtended> {
    const data: Array<IMADistrictExtended> = [];
    MA_DISTRICTS.forEach(district => {
      data.push({
        ...district,
        added_prices: {prix_moy: 0, prix_max: 0, prix_min: 0}
      })
    });
    return data;
  }

  /**
   * @returns date with a format like AAAAMM
   */
  private _getFormattedCurrentDate(): string {
    const currentMonth = new Date().getMonth() +1;
    const month = currentMonth < 10 ? `0${currentMonth}` : currentMonth;
    return `${new Date().getFullYear()}${month}`;
  }

  private _hasANullPrice(addedPricesList: IPricesItem): boolean {
    return Object.values(addedPricesList).some(price => price === 0)
  }

  /**
   * @returns true if the selectedDateToUpdate is valid
   */
  get isDateToUpdateValid(): boolean {
    return this.districtForm?.controls?.selectedDateToUpdate?.valid;
  }
}
