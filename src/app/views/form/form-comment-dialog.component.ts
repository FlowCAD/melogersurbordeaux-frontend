import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ApartService } from '@core/services/apart.service';
import { Apart } from '@core/interfaces';

@Component({
  selector: 'app-form-comment-dialog',
  templateUrl: './form-comment-dialog.component.html',
  styleUrls: ['./form.component.css']
})
export class formCommentDialogComponent {
  public comment: string = '';

  constructor(
    public dialogRef: MatDialogRef<formCommentDialogComponent>,
    private _apartService: ApartService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {appartCode: string}
  ) { }

  public saveComment() {
    this._apartService.addCommentOnApart(this.data.appartCode, this.comment).subscribe(
      (appart: Apart) => {
        this._snackBar.open('Commentaire ajouté', 'OK');
        this.dialogRef.close(appart);
      },
      err => console.error(err)
    )
  }

}
