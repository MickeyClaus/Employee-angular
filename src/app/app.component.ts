import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';
import { User } from './models/user';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';

interface TreeNode {
  name: string;
  icon: string;
  children?: TreeNode[];
}

interface FlatTreeNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  treeControl: FlatTreeControl<FlatTreeNode>;
  treeFlattener: MatTreeFlattener<TreeNode, FlatTreeNode>;
  dataSource: MatTreeFlatDataSource<TreeNode, FlatTreeNode> ;

  public name: string | undefined;
  public position: string | undefined;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  panelOpenState = false;
  constructor(private observer: BreakpointObserver) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      (node) => node.level,
      (node) => node.expandable,
      (node) => node.children
    );

    this.treeControl = new FlatTreeControl<FlatTreeNode>(
      (node) => node.level,
      (node) => node.expandable
    );

    const treeData: TreeNode[] = [
      {
        name: 'Суперагент',
        icon: 'folder',
        children: [
          { name: 'Управление', icon: 'description' },
          { name: 'Карточка контрагента', icon: 'description' },
          { name: 'Договоры контрагента', icon: 'description' },
        ],
      },
      {
        name: 'Субагенты',
        icon: 'supervised_user_circle',
        children: [],
      },
    ];

    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );
    this.dataSource.data = treeData;
  }

  transformer = (node: TreeNode, level: number): FlatTreeNode => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  hasChild = (_: number, node: FlatTreeNode): boolean => {
    return node.expandable;
  };

  ngOnInit(): void {
    this.name = 'Иванов';
    this.position = 'Администратор';
    
    if (window.screen.width < 800) {
      this.dataSource.data.unshift({
        name: 'Иванов И.И.',
        icon: 'folder',
        children: [
        ],
      });
    }
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res: any) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
}
