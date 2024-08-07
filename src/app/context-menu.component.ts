import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent {
  @Input() menuItems: { label: string, action: (i: number, j: number, type: number) => void }[] = [];
  position = { x: '0px', y: '0px' };
  visible = false;
  i = 0;
  j = 0;
  type = 0;

  show(x: number, y: number) {
    this.position.x = `${x}px`;
    this.position.y = `${y}px`;
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  onMenuItemClick(action: (i: number, j: number, type: number) => void) {
    action(this.i, this.j, this.type);
    this.hide();
  }
}
