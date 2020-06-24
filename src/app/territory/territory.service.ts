import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TerritoryLevel, Territory } from './domain';

@Injectable({
  providedIn: 'root'
})
// tslint:disable: prefer-const
// tslint:disable: variable-name
export class TerritoryService {

  private territory: Territory;

  _dataChange = new BehaviorSubject<Territory>(this.buildData());

  constructor() {
  }

  private buildData(): Territory {
    this.territory = new Territory();
    let root = this.territory.createRoot('MATRIZ GLOBAL', 'Muhammad-Bande');

    let br = root.addChildren('BR Division', 'Jair Bonosauro');
    let usa = root.addChildren('USA Division', 'Donald Trump');
    let china = root.addChildren('China Division', 'Chi Jin Ping');

    let sp = br.addChildren('SP', 'John Doria');
    let go = br.addChildren('GO', 'Ronald Caiado');
    let df = br.addChildren('DF', 'Ibaneis Rocha');

    go.addChildren('Goiânia', 'Iris Resende');
    go.addChildren('Anápolis', 'Ricardo Harris');
    go.addChildren('Aparecida de Goiânia', 'Gustavo Mendanha');
    go.addChildren('Senador Canedo', 'Divino Lemes');

    // this._dataChange.next(this.territory.level);
    return this.territory;

  }

}
