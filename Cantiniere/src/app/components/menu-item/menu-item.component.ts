import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent {

  @Input() menu!: Menu;
  @Input() enableEdit: boolean = false;

  @Output() onEdit: EventEmitter<Menu> = new EventEmitter();
  @Output() onDelete: EventEmitter<Menu> = new EventEmitter();

  sendEditRequest(){
    this.onEdit.emit(this.menu);
  }

  sendDeleteRequest(){
    this.onDelete.emit(this.menu);
  }
}
