import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsStateService } from '../../core/services/cms-state';
import { EditableTextComponent } from '../../shared/components/editable-text/editable-text';
import { EditableImageComponent } from '../../shared/components/editable-image/editable-image';

@Component({
  selector: 'app-promo-modal',
  standalone: true,
  imports: [CommonModule, EditableTextComponent, EditableImageComponent],
  template: `
    @if (showModal() && cms.content()?.promoModal?.isActive) {
      <div class="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
        <div class="relative w-full max-w-4xl bg-nutriflow-cream rounded-3xl shadow-2xl overflow-hidden flex flex-col-reverse md:flex-row">
          <button (click)="closeModal()" class="absolute top-4 right-4 z-20 bg-white text-nutriflow-green-dark hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl shadow-md transition-colors">✕</button>
          
          <div class="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-center md:text-left">
            <app-editable-text [textValue]="cms.content()!.promoModal.title" customClasses="block text-6xl md:text-7xl font-black text-nutriflow-green-dark mb-4 leading-[1.1]" (contentChanged)="updateField('title', $event)"></app-editable-text>
            <app-editable-text [textValue]="cms.content()!.promoModal.subtitle" customClasses="block text-lg font-bold text-nutriflow-green-dark mb-8" (contentChanged)="updateField('subtitle', $event)"></app-editable-text>
            
            <div class="flex flex-col gap-4 mt-2">
              <input #phoneInput type="tel" placeholder="Tu número de celular" class="w-full px-6 py-4 rounded-full border border-nutriflow-green-dark/20 focus:outline-none focus:border-nutriflow-green-dark bg-white text-nutriflow-green-dark font-medium text-center md:text-left">
              
              <!-- BOTÓN CON ACCIÓN DE WHATSAPP -->
              <button (click)="submitPromo(phoneInput.value)" class="w-full bg-nutriflow-green-dark text-white font-bold py-4 rounded-full hover:bg-nutriflow-green-light transition-all shadow-md text-lg">
                <app-editable-text [textValue]="cms.content()!.promoModal.buttonText" (contentChanged)="updateField('buttonText', $event)"></app-editable-text>
              </button>
              
              <button (click)="closeModal()" class="w-full bg-nutriflow-green-light/30 text-nutriflow-green-dark font-bold py-4 rounded-full hover:bg-nutriflow-green-light/50 transition-all text-lg">No gracias</button>
            </div>
          </div>
          
          <div class="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-200">
            <app-editable-image [imageUrl]="cms.content()!.promoModal.bgImageUrl" containerClasses="absolute inset-0 w-full h-full" imgClasses="object-cover w-full h-full" (imageChanged)="updateField('bgImageUrl', $event)"></app-editable-image>
          </div>
        </div>
      </div>
    }
  `
})
export class PromoModalComponent {
  cms = inject(CmsStateService);
  showModal = signal(true);
  
  closeModal() { this.showModal.set(false); }
  
  updateField(field: string, value: string) { this.cms.updateContent('promoModal', field, value); }

  submitPromo(phone: string) {
    if (!phone.trim()) {
      alert('Por favor, ingresa tu número para enviarte el código.');
      return;
    }
    const text = `¡Hola Nutriflow! Quiero mi 10% de descuento de primera orden. Mi número es: ${phone.trim()}`;
    window.open(`https://wa.me/51964211518?text=${encodeURIComponent(text)}`, '_blank');
    this.closeModal();
  }
}