import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

const LIST: any[] = [
  { name: 'Акції', link: 'action' },
  { name: 'Категорії', link: 'categories' },
  { name: 'Товари', link: 'goods' },
  { name: 'Замовлення', link: 'order' }
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})



export class AdminComponent implements OnInit {

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
