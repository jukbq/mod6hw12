import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const LIST: any[] = [
  { name: 'Особисті дані', link: 'personalData' },
  { name: 'Історія замовлень', link: 'orderHistory' },
  { name: 'Зміна паролю', link: 'passwordChange' },
];

@Component({
  selector: 'app-user-cabinet',
  templateUrl: './user-cabinet.component.html',
  styleUrls: ['./user-cabinet.component.scss']
})
export class UserCabinetComponent implements OnInit {

  public list: any[] = LIST;
  public activeItem: any;


  constructor(

    private router: Router
  ) { }

  ngOnInit(): void {
  }
  onSelectItem(item: string): void {
    this.activeItem = item;
  }

  logout() {
    this.router.navigate(['/']);
    localStorage.removeItem('curentUser')
    window.location.reload();
  }

}
