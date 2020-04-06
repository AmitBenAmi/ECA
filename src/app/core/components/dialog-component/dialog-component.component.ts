import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.less']
})
export class DialogComponentComponent implements OnInit {

  headertitle="מסמך 1/3 - החלטה בתיק";

  constructor(
    public dialogRef: MatDialogRef<DialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  Close(){
    this.dialogRef.close();
  }

  printComponent() {
    // let printContents = document.getElementById(cmpName).innerHTML;
    // let originalContents = document.body.innerHTML;

    // document.body.innerHTML = printContents;

     window.print();

    // document.body.innerHTML = originalContents;
}

  ngOnInit() {
  }

}
