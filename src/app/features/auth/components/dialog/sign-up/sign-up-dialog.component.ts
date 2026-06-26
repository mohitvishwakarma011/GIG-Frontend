import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";


@Component({
    selector:'ngx-sign-up-dialog',
    standalone:false,
    templateUrl:'./sign-up-dialog.component.html',
})
export class SignUpDialogComponent{
    constructor(private readonly router:Router,
        private readonly dialogRef:MatDialogRef<SignUpDialogComponent>
    ){}
    protected redirectToLogin():void{
        this.dialogRef.close();
        this.router.navigate(['/auth/login']);
    }
}