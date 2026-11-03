import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsStateService } from '../../core/services/cms-state';
import { EditableTextComponent } from '../../shared/components/editable-text/editable-text';
import { EditableImageComponent } from '../../shared/components/editable-image/editable-image';

@Component({
  selector: 'app-products-grid',
  standalone: true,
  imports: [CommonModule, EditableTextComponent, EditableImageComponent],
  template: `
    <style>
      .perspective-container { perspective: 1500px; }
      .flip-card-inner { 
        position: relative; 
        width: 100%; 
        height: 100%; 
        transform-style: preserve-3d; 
        transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1); 
      }
      .group-card:hover .flip-card-inner.can-flip { transform: rotateY(180deg); }
      .flip-card-front, .flip-card-back { 
        position: absolute; 
        width: 100%; 
        height: 100%; 
        backface-visibility: hidden; 
        -webkit-backface-visibility: hidden;
      }
      .flip-card-front { transform: rotateY(0deg); }
      .flip-card-back { transform: rotateY(180deg); }
    </style>

    <section id="tienda" class="pt-24 pb-32 relative z-10 overflow-hidden bg-nutriflow-cream">
      <div class="container mx-auto px-6 relative z-10 max-w-7xl">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-black text-nutriflow-green-dark tracking-tighter uppercase mb-4">La Colección Flow</h2>
          <p class="text-lg font-bold text-nutriflow-green-dark/70">Diseñados para cada momento de tu día.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-stretch">
          @for (product of cms.content()?.products; track product.id) {
            <div class="w-full relative flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-lg transition-all duration-500 border-4 border-white h-full group-card cursor-pointer perspective-container">
              
              <div class="w-full relative aspect-[4/5] md:aspect-[3/4] flip-card-inner" [class.can-flip]="!cms.isEditMode()" [ngClass]="{'bg-[#f7ece2]': product.id === 1, 'bg-[#f6eedf]': product.id === 2, 'bg-[#f3ead9]': product.id === 3}">
                <div class="flip-card-front z-20">
                  <app-editable-image [imageUrl]="product.imageUrl" containerClasses="absolute inset-0 w-full h-full" imgClasses="object-cover object-center w-full h-full scale-105" (imageChanged)="cms.updateProduct(product.id, 'imageUrl', $event)"></app-editable-image>
                </div>
                <div class="flip-card-back z-10">
                  <app-editable-image [imageUrl]="product.hoverImageUrl || product.imageUrl" containerClasses="absolute inset-0 w-full h-full" imgClasses="object-cover object-center w-full h-full scale-105" (imageChanged)="cms.updateProduct(product.id, 'hoverImageUrl', $event)"></app-editable-image>
                </div>
                @if(cms.isEditMode()){
                  <div class="absolute top-4 left-4 z-50 bg-black/80 text-white text-[9px] px-3 py-1 rounded-full uppercase tracking-widest">Giro pausado (Editar Frontal)</div>
                  <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50">
                    <button (click)="changeHoverImage(product.id, $event)" class="bg-nutriflow-yellow text-nutriflow-green-dark px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md hover:bg-white transition-colors">Editar Cara Trasera</button>
                  </div>
                }
              </div>

              <div class="h-1.5 w-full" [ngClass]="{'bg-[#9D1B32]': product.id === 1, 'bg-[#E87413]': product.id === 2, 'bg-[#4B6D21]': product.id === 3}"></div>
              <div class="p-8 flex flex-col flex-grow text-center items-center">
                <div class="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border" [ngClass]="{'bg-[#9D1B32]/5 text-[#9D1B32] border-[#9D1B32]/20': product.id === 1, 'bg-[#E87413]/5 text-[#E87413] border-[#E87413]/20': product.id === 2, 'bg-[#4B6D21]/5 text-[#4B6D21] border-[#4B6D21]/20': product.id === 3}">
                  <app-editable-text [textValue]="product.tag" (contentChanged)="cms.updateProduct(product.id, 'tag', $event)"></app-editable-text>
                </div>
                <app-editable-text [textValue]="product.name" customClasses="block text-2xl md:text-3xl font-black text-nutriflow-green-dark tracking-tighter mb-2" (contentChanged)="cms.updateProduct(product.id, 'name', $event)"></app-editable-text>
                <app-editable-text [textValue]="product.claim" customClasses="block text-sm font-bold text-gray-500 mb-8 flex-grow" (contentChanged)="cms.updateProduct(product.id, 'claim', $event)"></app-editable-text>
                <button (click)="cms.addToCart(product.name)" class="mt-auto w-full bg-nutriflow-yellow text-nutriflow-green-dark font-black text-xs uppercase tracking-widest py-4 rounded-xl hover:bg-nutriflow-green-dark hover:text-white transition-colors shadow-sm">PACK X6 (S/38)</button>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- CORRECCIÓN: ngClass agrupado para evitar llave duplicada -->
    <section id="planes" class="pt-24 pb-20 relative z-10 bg-nutriflow-yellow">
      <div class="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 -mt-[1px]">
        <svg class="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[80px]" preserveAspectRatio="none" viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z" class="fill-nutriflow-cream"></path>
        </svg>
      </div>

      <div class="container mx-auto px-6 max-w-7xl relative z-10">
        <div class="text-center mb-16 max-w-3xl mx-auto">
          <app-editable-text [textValue]="cms.content()!.planes.title" customClasses="block text-4xl md:text-5xl font-black text-nutriflow-green-dark tracking-tighter uppercase mb-4" (contentChanged)="cms.updatePlanField('title', $event)"></app-editable-text>
          <app-editable-text [textValue]="cms.content()!.planes.subtitle" customClasses="block text-lg font-bold text-nutriflow-green-dark/70" (contentChanged)="cms.updatePlanField('subtitle', $event)"></app-editable-text>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          @for (pack of cms.content()?.planes?.packs; track pack.id) {
            <div class="bg-white border-[6px] rounded-[2.5rem] p-6 md:p-8 flex flex-col shadow-lg transition-transform hover:-translate-y-2 duration-300"
                 [ngClass]="{'border-white': pack.id === 1 || pack.id === 3, 'border-nutriflow-green-dark shadow-2xl': pack.id === 2}">
              
              <div class="flex justify-between items-start mb-6">
                <div>
                  <app-editable-text [textValue]="pack.tag" customClasses="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1" (contentChanged)="cms.updatePlanPack(pack.id, 'tag', $event)"></app-editable-text>
                  <app-editable-text [textValue]="pack.name" customClasses="block text-2xl font-black text-nutriflow-green-dark tracking-tight" (contentChanged)="cms.updatePlanPack(pack.id, 'name', $event)"></app-editable-text>
                </div>
                <div class="text-right">
                  <span class="text-sm font-bold text-gray-400 mr-1">S/</span>
                  <app-editable-text [textValue]="pack.price.toString()" customClasses="inline-block text-3xl font-black text-nutriflow-green-dark" (contentChanged)="cms.updatePlanPack(pack.id, 'price', $event)"></app-editable-text>
                </div>
              </div>
              <app-editable-text [textValue]="pack.description" customClasses="block text-sm text-gray-600 mb-4 h-12" (contentChanged)="cms.updatePlanPack(pack.id, 'description', $event)"></app-editable-text>
              <app-editable-text [textValue]="pack.instruction" customClasses="block text-xs font-bold text-gray-400 mb-6 pb-6 border-b border-gray-100" (contentChanged)="cms.updatePlanPack(pack.id, 'instruction', $event)"></app-editable-text>
              
              <div class="flex flex-col gap-4 mb-8 flex-grow">
                @for (product of cms.content()?.products; track product.id) {
                  <div class="flex items-center justify-between p-3 rounded-2xl border" [ngClass]="{'bg-[#9D1B32]/5 border-[#9D1B32]/10': product.id === 1, 'bg-[#E87413]/5 border-[#E87413]/10': product.id === 2, 'bg-[#4B6D21]/5 border-[#4B6D21]/10': product.id === 3}">
                    <span class="font-bold text-sm" [ngClass]="{'text-[#9D1B32]': product.id === 1, 'text-[#E87413]': product.id === 2, 'text-[#4B6D21]': product.id === 3}">{{ product.name }}</span>
                    <div class="flex items-center gap-3">
                      <button (click)="removeShot(pack.id, product.id)" class="w-6 h-6 flex items-center justify-center rounded-full font-black transition-colors" [ngClass]="{'bg-white text-[#9D1B32] hover:bg-[#9D1B32] hover:text-white': product.id === 1, 'bg-white text-[#E87413] hover:bg-[#E87413] hover:text-white': product.id === 2, 'bg-white text-[#4B6D21] hover:bg-[#4B6D21] hover:text-white': product.id === 3}">-</button>
                      <span class="font-black text-sm w-3 text-center" [ngClass]="{'text-[#9D1B32]': product.id === 1, 'text-[#E87413]': product.id === 2, 'text-[#4B6D21]': product.id === 3}">{{ getQty(pack.id, product.id) }}</span>
                      <button (click)="addShot(pack.id, product.id, pack.maxPacks)" class="w-6 h-6 flex items-center justify-center rounded-full font-black text-white transition-colors shadow-sm" [ngClass]="{'bg-[#9D1B32] hover:bg-[#7a1527]': product.id === 1, 'bg-[#E87413] hover:bg-[#c4610f]': product.id === 2, 'bg-[#4B6D21] hover:bg-[#3a5419]': product.id === 3}">+</button>
                    </div>
                  </div>
                }
              </div>

              <div class="mt-auto">
                <div class="flex justify-between items-center text-xs font-bold mb-4 uppercase tracking-widest" [ngClass]="getTotalSelected(pack.id) === pack.maxPacks ? 'text-nutriflow-green-light' : 'text-gray-400'">
                  <span>Shots Seleccionados</span>
                  <span>{{ getTotalSelected(pack.id) }} / {{ pack.maxPacks }} pqtes ({{ pack.maxPacks * 7 }} shots)</span>
                </div>
                <div class="w-full h-1.5 bg-gray-100 rounded-full mb-6 overflow-hidden">
                   <div class="h-full transition-all duration-300 rounded-full" [style.width.%]="(getTotalSelected(pack.id) / pack.maxPacks) * 100" [ngClass]="getTotalSelected(pack.id) === pack.maxPacks ? 'bg-nutriflow-green-light' : 'bg-gray-300'"></div>
                </div>
                <button (click)="handlePlanCheckout(pack.id, pack.name, pack.price, pack.maxPacks)" [disabled]="getTotalSelected(pack.id) === 0" class="w-full font-black text-xs uppercase tracking-widest py-4 rounded-xl transition-all shadow-sm border border-transparent flex items-center justify-center gap-2" [ngClass]="getTotalSelected(pack.id) === pack.maxPacks ? 'bg-nutriflow-green-dark text-white hover:bg-black shadow-xl' : 'bg-gray-100 text-gray-400 cursor-not-allowed'">
                  @if (getTotalSelected(pack.id) === pack.maxPacks) {
                    Pedir este combo!
                  } @else {
                    Faltan {{ pack.maxPacks - getTotalSelected(pack.id) }} pqtes
                  }
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class ProductsGridComponent {
  cms = inject(CmsStateService);
  selections = signal<Record<number, Record<number, number>>>({ 1: { 1: 0, 2: 0, 3: 0 }, 2: { 1: 0, 2: 0, 3: 0 }, 3: { 1: 0, 2: 0, 3: 0 } });
  
  getQty(planId: number, productId: number): number { return this.selections()[planId]?.[productId] || 0; }
  getTotalSelected(planId: number): number { return Object.values(this.selections()[planId] || {}).reduce((a, b) => a + b, 0); }
  
  addShot(planId: number, productId: number, maxPacks: number) {
    if (this.getTotalSelected(planId) < maxPacks) {
      this.selections.update(s => ({ ...s, [planId]: { ...s[planId], [productId]: (s[planId]?.[productId] || 0) + 1 } }));
    }
  }
  removeShot(planId: number, productId: number) {
    if (this.getQty(planId, productId) > 0) {
      this.selections.update(s => ({ ...s, [planId]: { ...s[planId], [productId]: (s[planId]?.[productId] || 0) - 1 } }));
    }
  }
  handlePlanCheckout(planId: number, planName: string, price: number, maxPacks: number) {
    if (this.getTotalSelected(planId) !== maxPacks) { alert(`Por favor, completa tu selección de ${maxPacks} paquetes.`); return; }
    this.cms.checkoutPlanWhatsApp(planName, price, this.selections()[planId]);
  }
  
  changeHoverImage(id: number, event: Event) {
    event.stopPropagation();
    this.cms.openGallery(url => {
      this.cms.updateProduct(id, 'hoverImageUrl', url);
    });
  }
}