// tslint:disable: prefer-const
// tslint:disable: variable-name

export enum LevelType  {
  OPERATION, // Operation
  MANAGER, // Manager
}

export class Territory {
  _id: string;
  _rev: string;
  version: string;
  startDate: Date;
  createBy: string;
  createAt: Date;
  updateBy: string;
  updateAt: Date;
  approvedBy: string;
  approvedAt: Date;
  level?: TerritoryLevel[] = [];

  public createRoot(name: string, responsable: string): TerritoryLevel {
    this.level = [];
    let root = new TerritoryLevel();
    root.name = name;
    root.responsable = responsable;
    root.level = 0;
    this.level.push(root);
    return root;
  }

  unselected(): void {
    this.level?.forEach(l => l.cleanSelection());
  }
}

export class TerritoryLevel {
  level: number;
  name: string;
  responsable: string;
  levelType: LevelType;
  children?: TerritoryLevel[] | null;
  selected: boolean;
  tags: string[];

  public get hasChildren(): boolean {
    return this.children?.length > 0;
  }

  constructor() {
    this.children = [];
    this.tags = [];
    this.selected = false;
  }

  // public addChildrenOperation(name: string, responsable: string) {
  //   return this.newChildren(name, responsable, LevelType.OPERATION);
  // }
  // public addChildrenManager(name: string, responsable: string) {
  //   return this.newChildren(name, responsable, LevelType.MANAGER);
  // }
  public cleanSelection(): void {
    this.selected = false;
    this.children?.forEach(c => c.cleanSelection());
  }
  public addChildren(name: string, responsable: string) {
    let instance = new TerritoryLevel();
    instance.levelType = LevelType.OPERATION;
    instance.name = name;
    instance.level = this.level + 1;
    instance.responsable = responsable;
    this.children.push(instance);

    this.levelType = LevelType.MANAGER;
    return instance;
  }
  public getChildrens(): TerritoryLevel[] {

    let list: TerritoryLevel[] = [];
    if (this.hasChildren) {
      this.children.forEach(c => {
        list.push(c);
        if (c.hasChildren) {
          list = list.concat(c.getChildrens());
        }
      });
    }

    return list;

  }
  // public hasSelected(): boolean {
  //   if (this.selected) {
  //     return true;
  //   } else {
  //     if (this.hasChildren) {
  //       let selected = false;
  //       this.children.forEach(item => {
  //         selected = item.hasSelected();
  //         if (selected) {
  //           return true;
  //         }
  //       });
  //       return selected;
  //     } else {
  //       return false;
  //     }
  //   }
  // }

}
