import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-territory-panel',
  templateUrl: './territory-panel.component.html',
  styleUrls: ['./territory-panel.component.scss']
})
export class TerritoryPanelComponent implements OnInit {
  panelOpenState = false;
  constructor() { }

  ngOnInit(): void {
  }

}
