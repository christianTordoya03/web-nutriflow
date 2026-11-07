import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsStateService } from '../../core/services/cms-state';
import { EditableTextComponent } from '../../shared/components/editable-text/editable-text';
import { EditableImageComponent } from '../../shared/components/editable-image/editable-image';

@Component({
  selector: 'app-diario-page',
  standalone: true,
  imports: [CommonModule, EditableTextComponent, EditableImageComponent],
  template: `
    <div class="pt-24 pb-20 min-h-screen relative z-10 bg-nutriflow-cream">
      
      <!-- CONTROLES DE FONDO (Igual que antes) -->
      @if (cms.isEditMode()) {
        <div class="fixed top-28 left-6 z-[150] flex flex-col gap-3 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-gray-100">
          <span class="text-[10px] font-black uppercase tracking-widest text-nutriflow-green-dark mb-1">Decoración Sutil</span>
          <button (click)="changeBackground()" class="bg-nutriflow-yellow text-nutriflow-green-dark px-4 py-2 rounded-full shadow-sm font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2">Seleccionar Imagen</button>
          @if (cms.content()?.diario?.bgDecorUrl && cms.content()?.diario?.bgDecorUrl !== '') {
            <div class="flex gap-2 justify-center mt-2">
               <button (click)="bgPosition.set('left top')" [class.bg-nutriflow-green-dark]="bgPosition() === 'left top'" [class.text-white]="bgPosition() === 'left top'" class="p-1.5 rounded-md hover:bg-gray-200 transition-colors" title="Arriba Izquierda">⬅️</button>
               <button (click)="bgPosition.set('right top')" [class.bg-nutriflow-green-dark]="bgPosition() === 'right top'" [class.text-white]="bgPosition() === 'right top'" class="p-1.5 rounded-md hover:bg-gray-200 transition-colors" title="Arriba Derecha">➡️</button>
            </div>
            <button (click)="removeBackground()" class="mt-2 text-red-500 px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-red-50 transition-all flex items-center justify-center gap-2">Quitar</button>
          }
        </div>
      }

      <div class="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply z-0" style="background-image: url('/image_d1ff89.jpg'); background-size: cover; background-position: center; background-attachment: fixed;"></div>
      @if (cms.content()?.diario?.bgDecorUrl) {
        <div class="fixed inset-0 z-[-1] pointer-events-none opacity-60 transition-all duration-700" [style.backgroundImage]="'url(' + cms.content()!.diario.bgDecorUrl + ')'" [style.backgroundPosition]="bgPosition()" style="background-size: 350px; background-repeat: no-repeat;"></div>
      }

      <div class="container mx-auto px-6 max-w-6xl relative z-10">
        
        <div class="text-center mb-24">
          <app-editable-text [textValue]="cms.content()!.diario.heroTitle" customClasses="block text-5xl md:text-6xl font-black mb-4 tracking-tighter uppercase text-nutriflow-green-dark" (contentChanged)="cms.updateDiario('heroTitle', $event)"></app-editable-text>
          <div class="w-24 h-1 bg-nutriflow-yellow mx-auto mb-6"></div>
          <app-editable-text [textValue]="cms.content()!.diario.heroSubtitle" customClasses="block text-lg font-medium text-nutriflow-green-dark/80 max-w-2xl mx-auto" (contentChanged)="cms.updateDiario('heroSubtitle', $event)"></app-editable-text>
        </div>

        <section class="flex flex-col md:flex-row items-center gap-12 lg:gap-24 mb-32">
          <!-- Main Hero Section (Igual que antes) -->
          <div class="w-full md:w-1/2 flex flex-col justify-center relative z-20">
            <div class="inline-flex items-center bg-[#2c3e2e] text-white font-bold text-xs px-5 py-2.5 rounded-full uppercase tracking-widest self-start mb-6 shadow-md hover:bg-nutriflow-green-light transition-colors">
              <app-editable-text [textValue]="cms.content()!.diario.mainTag" (contentChanged)="cms.updateDiario('mainTag', $event)"></app-editable-text>
            </div>
            <app-editable-text [textValue]="cms.content()!.diario.mainTitle" customClasses="block text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-6 leading-[1.05] text-nutriflow-green-dark" (contentChanged)="cms.updateDiario('mainTitle', $event)"></app-editable-text>
            <div class="w-16 h-1 bg-nutriflow-yellow/80 mb-8 rounded-full"></div>
            <app-editable-text [textValue]="cms.content()!.diario.mainText" customClasses="block text-gray-800 font-medium leading-relaxed text-lg" (contentChanged)="cms.updateDiario('mainText', $event)"></app-editable-text>
          </div>
          <div class="w-full md:w-1/2 relative group">
            <div class="absolute inset-0 bg-[#e8e4db] rounded-[3rem] transform translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500 border-2 border-white/50 shadow-lg"></div>
            <div class="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-xl bg-white border-[6px] border-white z-10">
              <app-editable-image [imageUrl]="cms.content()!.diario.mainImage" containerClasses="absolute inset-0 w-full h-full" imgClasses="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-700" (imageChanged)="cms.updateDiario('mainImage', $event)"></app-editable-image>
            </div>
          </div>
        </section>

        <!-- BEBIDAS (Con todos los textos editables) -->
        <section class="mb-40 relative">
          <div class="text-center mb-20 bg-white/60 p-8 rounded-[3rem] backdrop-blur-sm border border-white/50 shadow-sm max-w-4xl mx-auto">
            <h2 class="text-4xl md:text-5xl font-black text-nutriflow-green-dark tracking-tighter uppercase mb-4">Nuestras Fórmulas</h2>
            <p class="text-lg font-medium text-nutriflow-green-dark/70 max-w-2xl mx-auto">La ciencia y los insumos detrás de cada shot 100% Cold Press.</p>
          </div>

          <div class="flex flex-col gap-32">
            @for (product of cms.content()?.products; track product.id; let i = $index) {
              <div class="flex flex-col md:flex-row items-center gap-12 lg:gap-24" [class.md:flex-row-reverse]="i % 2 !== 0">
                <div class="w-full md:w-1/2 relative group">
                  <div class="absolute inset-0 bg-[#e8e4db] rounded-[3rem] transform translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500 border-2 border-white/50 shadow-lg"></div>
                  <div class="relative aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden shadow-xl border-[6px] border-white bg-white z-10">
                    <app-editable-image [imageUrl]="cms.content()?.diario?.diarioImages?.[product.id] || product.imageUrl" containerClasses="absolute inset-0 w-full h-full" imgClasses="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" (imageChanged)="cms.updateDiarioProductImage(product.id, $event)"></app-editable-image>
                  </div>
                </div>
                <div class="w-full md:w-1/2 flex flex-col justify-center relative z-20">
                  <div class="inline-flex items-center gap-2 bg-[#2c3e2e] text-white font-bold text-xs px-5 py-2.5 rounded-full uppercase tracking-widest self-start mb-6 shadow-md hover:bg-nutriflow-green-light transition-colors">
                    @if (i === 0) {
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                    } @else if (i === 1) {
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
                    } @else {
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    }
                    <app-editable-text [textValue]="product.name" (contentChanged)="cms.updateProduct(product.id, 'name', $event)"></app-editable-text>
                  </div>
                  
                  <app-editable-text [textValue]="product.claim" customClasses="block text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] text-[#2c3e2e] mb-6" (contentChanged)="cms.updateProduct(product.id, 'claim', $event)"></app-editable-text>
                  <div class="w-16 h-1 bg-nutriflow-yellow/80 mb-10 rounded-full"></div>
                  
                  <div class="space-y-8 relative">
                    <!-- BLOQUE 1: ¿PARA QUÉ SIRVE? -->
                    <div class="flex items-start gap-4">
                      
                      <div>
                        <!-- TÍTULO EDITABLE -->
                        <app-editable-text [textValue]="product.benefitsTitle || '¿PARA QUÉ SIRVE?'" customClasses="block text-[#2c3e2e] font-black text-[11px] uppercase tracking-widest mb-1 opacity-60" (contentChanged)="cms.updateProduct(product.id, 'benefitsTitle', $event)"></app-editable-text>
                        <!-- TEXTO EDITABLE -->
                        <app-editable-text [textValue]="product.benefits || 'Escribe aquí los beneficios...'" customClasses="block text-gray-800 font-medium text-lg leading-relaxed" (contentChanged)="cms.updateProduct(product.id, 'benefits', $event)"></app-editable-text>
                      </div>
                    </div>

                    <!-- BLOQUE 2: INSUMOS -->
                    <div class="flex items-start gap-4">
                      
                      <div>
                        <!-- TÍTULO EDITABLE -->
                        <app-editable-text [textValue]="product.ingredientsTitle || 'INSUMOS 100% ORGÁNICOS'" customClasses="block text-[#2c3e2e] font-black text-[11px] uppercase tracking-widest mb-1 opacity-60" (contentChanged)="cms.updateProduct(product.id, 'ingredientsTitle', $event)"></app-editable-text>
                        <!-- TEXTO EDITABLE -->
                        <app-editable-text [textValue]="product.ingredients" customClasses="block text-gray-800 font-bold text-lg leading-relaxed" (contentChanged)="cms.updateProduct(product.id, 'ingredients', $event)"></app-editable-text>
                      </div>
                    </div>
                  </div>
                  
                  <!-- FRASE FINAL EDITABLE -->
                  <div class="mt-12 flex items-center gap-3 pt-6 border-t border-[#2c3e2e]/10">
                    
                    <app-editable-text [textValue]="product.diarioQuote || 'hecho con amor, para tu bienestar.'" customClasses="block text-[10px] font-medium text-[#2c3e2e] uppercase tracking-wider opacity-80" (contentChanged)="cms.updateProduct(product.id, 'diarioQuote', $event)"></app-editable-text>
                  </div>

                </div>
              </div>
            }
          </div>
        </section>
      </div>

      <!-- COMUNIDAD Y COLLAGE (Mantenidos igual que antes) -->
      <!-- ... (Mantén tu código actual para el grid y el marquee de la tribu Nutriflow) ... -->
    </div>
  `
})
export class DiarioPageComponent {
  cms = inject(CmsStateService);
  bgPosition = signal<string>('right top');
  collageRow1 = computed(() => (this.cms.content()?.diario?.collage || []).slice(0, 6));
  collageRow2 = computed(() => (this.cms.content()?.diario?.collage || []).slice(6, 12));
  changeBackground() { this.cms.openGallery((url: string) => this.cms.updateDiario('bgDecorUrl', url)); }
  removeBackground() { this.cms.updateDiario('bgDecorUrl', ''); }
}