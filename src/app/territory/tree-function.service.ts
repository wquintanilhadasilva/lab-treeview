import { Injectable } from '@angular/core';
import { TerritoryLevel } from './domain';

// tslint:disable: no-string-literal
// tslint:disable: prefer-for-of

@Injectable({
  providedIn: 'root'
})
export class TreeFunctionService {

  flatJsonArray(flattenedAray: Array<TerritoryLevel>, node: TerritoryLevel[]) {
    const array: Array<TerritoryLevel> = flattenedAray;
    node.forEach(element => {
      if (element.children) {
        array.push(element);
        this.flatJsonArray(array, element.children);
      }
    });
    return array;
  }

  findNodeMaxId(node: TerritoryLevel[]) {
    const flatArray = this.flatJsonArray([], node);
    const flatArrayWithoutChildren = [];
    flatArray.forEach(element => {
      flatArrayWithoutChildren.push(element.level);
    });
    return Math.max(...flatArrayWithoutChildren);
  }

  findPosition(id: number, data: TerritoryLevel[]) {
    for (let i = 0; i < data.length; i += 1) {
      if (id === data[i].level) {
        return i;
      }
    }
  }

  findFatherNode(id: number, data: TerritoryLevel[]) {
    for (let i = 0; i < data.length; i += 1) {
      const currentFather = data[i];
      for (let z = 0; z < currentFather.children.length; z += 1) {

        if (id === currentFather.children[z]['level']) {
          return [currentFather, z];
        }
      }

      for (let z = 0; z < currentFather.children.length; z += 1) {
        if (id !== currentFather.children[z]['level']) {
          const result = this.findFatherNode(id, currentFather.children);
          if (result !== false) {
            return result;
          }
        }
      }
    }
    return false;
  }

}
