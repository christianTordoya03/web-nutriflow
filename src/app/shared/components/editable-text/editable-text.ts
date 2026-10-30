import { Component, ElementRef, ViewChild, inject, input, output } from '@angular/core';
import { CmsStateService } from '../../../core/services/cms-state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editable-text',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (cms.isEditMode()) {
      <span
        #textElement
        contenteditable="true"
        class="editable-active inline-block min-w-[20px] cursor-text hover:bg-nutriflow-yellow/20 rounded px-1 transition-colors outline-none focus:ring-2 focus:ring-nutriflow-green-light"
        [class]="customClasses()"
        (click)="onClick($event)"
        (blur)="onBlur()"
        (keydown.enter)="$event.preventDefault(); onBlur()">
        {{ textValue() }}
      </span>
    } @else {
      <span [class]="customClasses()">{{ textValue() }}</span>
    }
  `
})
export class EditableTextComponent {
  cms = inject(CmsStateService);
  textValue = input.required<string>();
  customClasses = input<string>(''); 
  contentChanged = output<string>();

  @ViewChild('textElement') textElement!: ElementRef<HTMLElement>;

  // SOLUCIÓN AL BUG: Detiene el clic para que no active enlaces padres (routerLink o href)
  onClick(event: Event) {
    if (this.cms.isEditMode()) {
      event.stopPropagation(); 
    }
  }

  onBlur() {
    const newValue = this.textElement.nativeElement.innerText.trim();
    if (newValue && newValue !== this.textValue()) {
      this.contentChanged.emit(newValue);
    }
  }
}