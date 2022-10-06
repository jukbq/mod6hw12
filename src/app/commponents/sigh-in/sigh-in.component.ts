import { Component, OnDestroy, OnInit } from '@angular/core';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { stringLength } from '@firebase/util';
import { observable, Subscription } from 'rxjs';
import { ROLE } from 'src/app/shared/services/constant/role.constant';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SighUpComponent } from '../sigh-up/sigh-up.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sigh-in',
  templateUrl: './sigh-in.component.html',
  styleUrls: ['./sigh-in.component.scss']
})
export class SighInComponent implements OnInit, OnDestroy {

  public loginForn!: FormGroup;
  public user: any;
  public loginSubscription!: Subscription;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: Auth,
    private afs: Firestore,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SighInComponent>
  ) { }



  ngOnInit(): void {
    this.logFormInit()

  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  logFormInit(): void {
    this.loginForn = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  loginUser(): void {
    const { email, password } = this.loginForn.value;
    this.login(email, password).then(() => {
      this.toastr.success('Користувач успішно автроризувався');
    }).catch(e => {
      this.toastr.error('Невірний email фбо пароль');
    })
  }

  async login(email: string, password: string): Promise<void> {
    const curent = await signInWithEmailAndPassword(this.auth, email, password)
    this.loginSubscription = docData(doc(this.afs, 'users', curent.user.uid)).subscribe(user => {
      this.user = user
      const curentUser = { ...user, uid: curent.user.uid }
      localStorage.setItem('curentUser', JSON.stringify(user))

      this.actuve()
    })
  }
  actuve(): void {
    if (this.user && this.user.role === ROLE.USER) {
      this.close()
      this.router.navigate(['/user-cabinet']);
    } else if (this.user && this.user.role === ROLE.ADMIN) {
      this.close()
      this.router.navigate(['/admin']);
    }
  }

  sighUpMaoal(): void {
    this.close()
    this.dialog.open(SighUpComponent, {
      panelClass: 'sigh_maoa_dialog',
    })
  }

  close(): void {
    this.dialogRef.close()
  }

}






