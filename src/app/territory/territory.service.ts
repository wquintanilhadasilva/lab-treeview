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

  _dataChange = new BehaviorSubject<TerritoryLevel[]>(this.buildData());

  constructor() {
  }

  private buildData(): TerritoryLevel[] {
    this.territory = new Territory();
    let root = this.territory.createRoot('MATRIZ GLOBAL', 'Muhammad-Bande');

    let br = root.addChildrenManager('BR Division', 'Jair Bonosauro');
    let usa = root.addChildrenManager('USA Division', 'Donald Trump');
    let china = root.addChildrenManager('China Division', 'Chi Jin Ping');

    let sp = br.addChildrenManager('SP', 'John Doria');
    let go = br.addChildrenManager('GO', 'Ronald Caiado');
    let df = br.addChildrenManager('DF', 'Ibaneis Rocha');

    go.addChildrenOperation('Goiânia', 'Iris Resende');
    go.addChildrenOperation('Anápolis', 'Ricardo Harris');
    go.addChildrenOperation('Aparecida de Goiânia', 'Gustavo Mendanha');
    go.addChildrenOperation('Senador Canedo', 'Divino Lemes');

    // this._dataChange.next(this.territory.level);
    return this.territory.level;

  }

}
