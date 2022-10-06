import { NumberSymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, idToken } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SighInComponent } from '../sigh-in/sigh-in.component';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-sigh-up',
  templateUrl: './sigh-up.component.html',
  styleUrls: ['./sigh-up.component.scss']
})
export class SighUpComponent implements OnInit {

  public sighUoForn!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: Auth,
    private afs: Firestore,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SighUpComponent>
  ) { }

  ngOnInit(): void {
    this.logFormInit()
  }

  logFormInit(): void {
    this.sighUoForn = this.formBuilder.group({
      firstname: [null],
      lastname: [null],
      phone: [null],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      password2: [null, [Validators.required]]
    })
  }

  userRegister() {
    const pass = this.sighUoForn.value.password;
    const pass2 = this.sighUoForn.value.password2;
    if (pass !== pass2) {
      this.toastr.error('Введені паролі не співпадають');
    } else {
      const { email, password } = this.sighUoForn.value;
      this.enailSighUp(email, password).then(() => {
        this.toastr.success('Користувача успішно зареэстровано');
        this.sighInMaoal()
      }).catch(e => {
        this.toastr.error('Корситувача з такою адресою вже зареєстровано');
      })
    }
  }

  async enailSighUp(email: string, password: string): Promise<any> {
    const userReg = await createUserWithEmailAndPassword(this.auth, email, password)
    const user = {
      email: userReg.user.email,
      password: password,
      firstName: this.sighUoForn.value.firstname,
      lastName: this.sighUoForn.value.lastname,
      phone: this.sighUoForn.value.phone,
      orders: [],
      adress: '',
      role: 'USER'
    };
    setDoc(doc(this.afs, 'users', userReg.user.uid), user);
     }




  sighInMaoal(): void {
    this.close()
    this.dialog.open(SighInComponent, {
      panelClass: 'sigh_maoa_dialog',
    })
  }

  close(): void {
    this.dialogRef.close()
  }


}


