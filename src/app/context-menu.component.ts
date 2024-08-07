import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit, OnDestroy {
  @Input() menuItems: { label: string, action: (i: number, j: number, type: number) => void }[] = [];
  position = { x: '0px', y: '0px' };
  visible = false;
  i = 0;
  j = 0;
  type = 0;

  // Change the type to accept a function that takes a MouseEvent
  private clickListener!: (event: MouseEvent) => void;

  ngOnInit() {
    this.clickListener = this.onClickOutside.bind(this);
    document.addEventListener('click', this.clickListener);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.clickListener);
  }

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

  private onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const contextMenu = document.querySelector('app-context-menu') as HTMLElement;
    
    if (contextMenu && !contextMenu.contains(target)) {
      this.hide();
    }
  }
}