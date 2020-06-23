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
    this.level?.forEach(l => l.unselected());
  }
}

export class TerritoryLevel {
  level: number;
  name: string;
  responsable: string;
  levelType: LevelType;
  children?: TerritoryLevel[] | null;
  selected: boolean;

  constructor() {
    this.children = [];
    this.selected = false;
  }

  public addChildrenOperation(name: string, responsable: string) {
    return this.newChildren(name, responsable, LevelType.OPERATION);
  }
  public addChildrenManager(name: string, responsable: string) {
    return this.newChildren(name, responsable, LevelType.MANAGER);
  }
  public unselected(): void {
    this.selected = false;
    this.children?.forEach(c => c.unselected());
  }
  private newChildren(name: string, responsable: string, type: LevelType) {
    let instance = new TerritoryLevel();
    instance.levelType = type;
    instance.name = name;
    instance.level = this.level + 1;
    instance.responsable = responsable;
    this.children.push(instance);
    return instance;
  }

}
