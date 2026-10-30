import { Component, inject, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsStateService } from '../../../core/services/cms-state';

@Component({
  selector: 'app-editable-image',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="relative inline-block w-full h-full overflow-hidden group" 
      [class.editable-image-active]="cms.isEditMode()"
      [class]="containerClasses()"
      (click)="triggerGallery()">
      
      <!-- CARTEL FLOTANTE (Solo en modo edición) -->
      @if (cms.isEditMode()) {
        <div class="absolute inset-0 z-50 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
          <span class="bg-nutriflow-green-dark text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" /><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" /></svg>
            Cambiar Imagen
          </span>
        </div>
      }

      <img 
        [src]="formattedUrl()" 
        [alt]="altText()" 
        onerror="this.src='https://placehold.co/600x400/eeeeee/999999?text=Sin+Imagen'"
        class="w-full h-full object-cover transition-transform duration-300"
        [class]="imgClasses()" />
    </div>
  `
})
export class EditableImageComponent {
  cms = inject(CmsStateService);
  imageUrl = input.required<string>();
  altText = input<string>('Imagen Nutriflow Fit');
  containerClasses = input<string>('');
  imgClasses = input<string>('');
  imageChanged = output<string>();

  formattedUrl = computed(() => {
    const url = this.imageUrl();
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('data:')) return url; 
    return url.startsWith('/') ? url : '/' + url; 
  });

  triggerGallery() {
    if (!this.cms.isEditMode()) return;
    this.cms.openGallery((url: string) => { this.imageChanged.emit(url); });
  }
}