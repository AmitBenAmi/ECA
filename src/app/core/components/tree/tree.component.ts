import { Component, OnInit, Input } from '@angular/core';
import { TreeDynamicDatabase,TreeDatasource, DynamicFlatNode, ITreeNode } from './tree-datasource';
import { FlatTreeControl } from '@angular/cdk/tree';


@Component({ 
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.less']
})

export class TreeComponent implements OnInit {
  @Input() database: TreeDynamicDatabase;
  @Input() options: ITreeOptions
  constructor() { 
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new TreeDatasource(this.treeControl, this.database);
  }

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: TreeDatasource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

  ngOnInit() {
  }

}

export interface ITreeOptions {
  isDynamic: boolean;
  hasCheckboxes: boolean;
  onCheckboxClick: (clickedNode) => {};
}

