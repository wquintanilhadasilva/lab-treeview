// tslint:disable: variable-name
// tslint:disable: prefer-const
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TerritoryLevel, LevelType } from '../territory/domain';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-territory-detail',
  templateUrl: './territory-detail.component.html',
  styleUrls: ['./territory-detail.component.scss']
})
export class TerritoryDetailComponent implements OnInit {

  _form: FormGroup;

  _level: TerritoryLevel;

  @Input()
  public set level(value: TerritoryLevel) {
    this._level = value;
    this.buildForm();
  }

  @Output()
  remove: EventEmitter<TerritoryLevel> = new EventEmitter<TerritoryLevel>();

  @Output()
  addChild: EventEmitter<TerritoryLevel> = new EventEmitter<TerritoryLevel>();

  @Output()
  save: EventEmitter<TerritoryLevel> = new EventEmitter<TerritoryLevel>();

  constructor(
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this._level = new TerritoryLevel();
    this._level.name = '';
    this._level.responsable = '';
    this.buildForm();
  }

  addLevel(): void {
    console.log('add');
    console.log(this._level);
    this._level.levelType = LevelType.MANAGER;
    let newLevel = this._level.addChildren('Novo item filho', 'respons´vael');
    this.addChild.emit(newLevel);
  }

  saveClick(): void {
    console.log('save');
    this._level.name = this._form.get('name').value;
    this._level.responsable = this._form.get('responsable').value;
    console.log(this._level);
    this.save.emit(this._level);
  }

  delete(): void {
    console.log('delete');
    console.log(this._level);
    this.remove.emit(this._level);
  }

  private buildForm(): void {

    this._form = this.formBuilder.group({
      name: [this._level?.name ?? '', [Validators.required]],
      responsable: [this._level?.responsable ?? '', [Validators.required]],
      // tags: this.formBuilder.group({
      //   [this.level.tags, [Validators.required]],
      // })
    });

  }

}
