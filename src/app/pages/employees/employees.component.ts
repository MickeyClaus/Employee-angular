import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0', opacity: 0 })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out'))
    ])
  ]
})
export class EmployeesComponent implements OnInit {
  divState: 'collapsed' | 'expanded' = 'expanded';
  hideIcon: boolean = false;
  filteredData: any;
  toggleDivState() {
    this.divState = this.divState === 'collapsed' ? 'expanded' : 'collapsed';
  }

  ngOnInit(): void {
    if (window.screen.width < 768) { 
      this.hideIcon = true;
    }
  }

  receiveObject(obj: any) {
    this.filteredData = obj;
  }

  event(){
    alert('Не понял условие что надо загрузить в хранилище но для записи используется localStorage.setItem("item", item )')
  }
}
