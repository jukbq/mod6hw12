import { Component, OnInit } from '@angular/core';
import { ActionResponse } from 'src/app/shared/interfaces/action';
import { ActionService } from 'src/app/shared/services/action/action.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  constructor(
    private actionService: ActionService
  ) { }

  public actions: Array<ActionResponse> = [];

  ngOnInit(): void {
    this.getACtiont()
  }

  getACtiont(): void {
    this.actionService.getAll().subscribe(data => {
      this.actions = data

    })
  }

}
