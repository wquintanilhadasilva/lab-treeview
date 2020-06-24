import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TerritoryLevel } from '../territory/domain';

@Component({
  selector: 'app-territory-detail-actions',
  templateUrl: './territory-detail-actions.component.html',
  styleUrls: ['./territory-detail-actions.component.scss']
})
// tslint:disable: member-ordering
export class TerritoryDetailActionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output()
  remove: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  addChild: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  save: EventEmitter<void> = new EventEmitter<void>();

}
