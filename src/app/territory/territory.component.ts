import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { TerritoryLevel, Territory } from './domain';
import { TreeFunctionService } from './tree-function.service';
import { TerritoryService } from './territory.service';
import {of as observableOf} from 'rxjs';

@Component({
  selector: 'app-territory',
  templateUrl: './territory.component.html',
  styleUrls: ['./territory.component.scss']
})
// tslint:disable: variable-name
export class TerritoryComponent implements OnInit {

  nestedTreeControl: NestedTreeControl<TerritoryLevel>;
  nestedDataSource: MatTreeNestedDataSource<TerritoryLevel>;

  selectedNode: TerritoryLevel;
  territory: Territory;

  constructor(
    private dataService: TerritoryService,
    private service: TreeFunctionService
  ) {}

  private _getChildren = (node: TerritoryLevel) => observableOf(node.children);
  hasNestedChild = (_: number, nodeData: TerritoryLevel) => nodeData.children.length > 0;

  ngOnInit() {
    this.nestedTreeControl = new NestedTreeControl<TerritoryLevel>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();
    this.dataService._dataChange.subscribe(
      data => {
        this.territory = data;
        this.nestedDataSource.data = this.territory.level;
      }
    );
  }

  refreshTreeData() {
    const data = this.nestedDataSource.data;
    this.nestedDataSource.data = null;
    this.nestedDataSource.data = data;
  }

  addNode(node: TerritoryLevel) {
    // node.Id = this.service.findNodeMaxId(this.nestedDataSource.data) + 1;
    // this.nestedDataSource.data.push(node);
    this.refreshTreeData();
  }

  addChildNode(childrenNodeData) {
    // childrenNodeData.node.Id = this.service.findNodeMaxId(this.nestedDataSource.data) + 1;
    // childrenNodeData.currentNode.Children.push(childrenNodeData.node);
    this.refreshTreeData();
  }

  editNode(nodeToBeEdited) {
  //   const fatherElement: TerritoryLevel = this.service.findFatherNode(nodeToBeEdited.currentNode.Id, this.nestedDataSource.data);
  //   let elementPosition: number;
  //   nodeToBeEdited.node.Id = this.service.findNodeMaxId(this.nestedDataSource.data) + 1;
  //   if (fatherElement[0]) {
  //      fatherElement[0].Children[fatherElement[1]] = nodeToBeEdited.node;
  //  } else {
  //      elementPosition = this.service.findPosition(nodeToBeEdited.currentNode.Id, this.nestedDataSource.data);
  //      this.nestedDataSource.data[elementPosition] = nodeToBeEdited.node;
  //  }
  //   this.refreshTreeData();
  }

  deleteNode(nodeToBeDeleted: TerritoryLevel) {

    this.service.deleteSelected(this.nestedDataSource.data);
    this.service.cleanSelection(this.nestedDataSource.data);

    if (this.nestedDataSource.data.length === 0) {
      const root = new TerritoryLevel();
      root.name = 'root';
      root.responsable = null;
      this.nestedDataSource.data.push(root);
      this.selected(this.nestedDataSource.data[0]);
    }

    this.selectedNode = null;

    this.refreshTreeData();
    // const deletedElement: TerritoryLevel = this.service.findFatherNode(nodeToBeDeleted.name, this.nestedDataSource.data);
    // let elementPosition: number;
    // if (window.confirm('Are you sure you want to delete ' + nodeToBeDeleted.name + '?' )) {
    //   if (deletedElement[0]) {
    //     deletedElement[0].Children.splice(deletedElement[1], 1);
    //   } else {
    //       elementPosition = this.service.findPosition(nodeToBeDeleted.name, this.nestedDataSource.data);
    //       this.nestedDataSource.data.splice(elementPosition, 1);
    //   }
    //   this.refreshTreeData();
    // }
  }

  selected(value: TerritoryLevel): void {
    console.log(value);
    this.nestedDataSource.data.forEach(d => d.cleanSelection());
    value.selected = true;
    this.selectedNode = value;
  }

}
