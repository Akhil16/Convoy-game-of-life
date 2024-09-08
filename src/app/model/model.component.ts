// model.component.ts
import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent {
  @Input() title: string = 'Default Model Title';
  @Input() content: string = 'Default Model Content';
  @Input() isOpen: boolean = false;

  @Output() close = new EventEmitter<void>();

  closeModel() {
    this.isOpen = false;
    this.close.emit();
  }

  onBackgroundClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('model')) {
      this.closeModel();
    }
  }
  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent) {
    if (this.isOpen) {
      this.closeModel();
    }
  }
}
