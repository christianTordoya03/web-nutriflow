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
    <div class="pt-24 pb-32 min-h-screen relative z-10 bg-nutriflow-cream font-montserrat overflow-hidden">
      
      <!-- CONTROLES DE FONDO (Admin) -->
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

      <div class="container mx-auto px-6 max-w-7xl relative z-10">
        
        <!-- HEADER DIARIO -->
        <div class="text-center mb-24 max-w-4xl mx-auto">
          <app-editable-text [textValue]="cms.content()!.diario.heroTitle" customClasses="block text-5xl md:text-6xl lg:text-7xl font-black mb-4 tracking-tighter uppercase text-nutriflow-green-dark drop-shadow-sm" (contentChanged)="cms.updateDiario('heroTitle', $event)"></app-editable-text>
          <div class="w-24 h-1.5 bg-nutriflow-yellow mx-auto mb-6 rounded-full"></div>
          <app-editable-text [textValue]="cms.content()!.diario.heroSubtitle" customClasses="block text-lg lg:text-xl font-bold text-nutriflow-green-dark/80" (contentChanged)="cms.updateDiario('heroSubtitle', $event)"></app-editable-text>
        </div>

        <!-- SECCIÓN HERO (Main Product) -->
        <section class="flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-24 mb-40">
          
          <div class="w-full lg:w-1/2 flex flex-col justify-center relative z-20 text-center lg:text-left mt-8 lg:mt-0">
            <div class="inline-flex items-center bg-nutriflow-yellow text-nutriflow-green-dark font-black text-xs px-6 py-2.5 rounded-full uppercase tracking-[0.2em] self-center lg:self-start mb-8 shadow-lg transform -rotate-2 border-2 border-white">
              <app-editable-text [textValue]="cms.content()!.diario.mainTag" (contentChanged)="cms.updateDiario('mainTag', $event)"></app-editable-text>
            </div>
            
            <app-editable-text [textValue]="cms.content()!.diario.mainTitle" customClasses="block text-[3.5rem] md:text-6xl lg:text-[7rem] font-black tracking-tighter mb-6 leading-[0.85] text-nutriflow-green-dark uppercase" (contentChanged)="cms.updateDiario('mainTitle', $event)"></app-editable-text>
            
            <div class="w-16 h-1.5 bg-nutriflow-green-light mb-8 rounded-full mx-auto lg:mx-0 hidden md:block"></div>
            
            <app-editable-text [textValue]="cms.content()!.diario.mainText" customClasses="block text-nutriflow-green-dark/80 font-bold leading-relaxed text-lg md:text-xl max-w-lg mx-auto lg:mx-0" (contentChanged)="cms.updateDiario('mainText', $event)"></app-editable-text>
          </div>
          
          <div class="w-full lg:w-1/2 relative group max-w-md lg:max-w-full mx-auto">
            <div class="absolute inset-0 bg-nutriflow-yellow rounded-[3rem] md:rounded-full transform translate-x-4 translate-y-6 md:translate-x-8 md:translate-y-8 scale-[0.98] transition-transform duration-500 group-hover:translate-x-10 group-hover:translate-y-10"></div>
            <div class="relative aspect-[4/5] rounded-[3rem] md:rounded-full overflow-hidden shadow-2xl bg-gray-100 border-[8px] md:border-[16px] border-white z-10">
              <app-editable-image [imageUrl]="cms.content()!.diario.mainImage" containerClasses="absolute inset-0 w-full h-full" imgClasses="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-700" (imageChanged)="cms.updateDiario('mainImage', $event)"></app-editable-image>
            </div>
          </div>
        </section>

        <!-- SECCIÓN DE FÓRMULAS (Dinámica con @for) -->
        <section class="mb-40 relative">
          
          <div class="flex items-center gap-4 mb-20 justify-center md:justify-start">
            <div class="w-12 h-1 bg-nutriflow-yellow hidden md:block"></div>
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-nutriflow-green-light tracking-widest uppercase">Nuestras Fórmulas</h2>
          </div>

          <div class="flex flex-col gap-32 lg:gap-40">
            @for (product of cms.content()?.products; track product.id; let i = $index) {
              <div class="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-24" [class.lg:flex-row-reverse]="i % 2 !== 0">
                
                <div class="w-full lg:w-1/2 relative group max-w-md lg:max-w-full mx-auto">
                  <div class="absolute inset-0 rounded-[2rem] transform translate-x-4 translate-y-4 scale-[0.98] transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6"
                       [class.bg-nutriflow-green-light]="i % 2 === 0"
                       [class.bg-nutriflow-yellow]="i % 2 !== 0">
                  </div>
                  <div class="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl border-[8px] border-white bg-gray-100 z-10">
                    <app-editable-image [imageUrl]="cms.content()?.diario?.diarioImages?.[product.id] || product.imageUrl" containerClasses="absolute inset-0 w-full h-full" imgClasses="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-700" (imageChanged)="cms.updateDiarioProductImage(product.id, $event)"></app-editable-image>
                  </div>
                </div>

                <div class="w-full lg:w-1/2 flex flex-col justify-center relative z-20 text-center lg:text-left mt-8 lg:mt-0">
                  
                  <div class="inline-flex items-center gap-2 bg-white text-nutriflow-green-dark font-black text-xs px-6 py-2.5 rounded-full uppercase tracking-widest self-center lg:self-start mb-6 shadow-md border-2 border-nutriflow-cream">
                    @if (i === 0) {
                      <svg class="w-4 h-4 text-nutriflow-green-light" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                    } @else if (i === 1) {
                      <svg class="w-4 h-4 text-nutriflow-yellow" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
                    } @else {
                      <svg class="w-4 h-4 text-nutriflow-green-dark" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    }
                    <app-editable-text [textValue]="product.name" (contentChanged)="cms.updateProduct(product.id, 'name', $event)"></app-editable-text>
                  </div>
                  
                  <app-editable-text [textValue]="product.claim" customClasses="block text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] text-nutriflow-green-dark mb-10" (contentChanged)="cms.updateProduct(product.id, 'claim', $event)"></app-editable-text>
                  
                  <div class="space-y-8 relative w-full">
                    
                    <div class="flex flex-col lg:flex-row items-center lg:items-start gap-5">
                      <div class="w-14 h-14 bg-white rounded-full shadow-md border-2 border-nutriflow-cream flex-shrink-0 relative overflow-hidden flex items-center justify-center transform hover:scale-110 transition-transform">
                        <!-- Aplicamos $any() aquí -->
                        <app-editable-image [imageUrl]="$any(product).icono1 || ''" containerClasses="absolute inset-0 w-full h-full p-2.5" imgClasses="object-contain object-center w-full h-full" (imageChanged)="cms.updateProduct(product.id, 'icono1', $event)"></app-editable-image>
                      </div>
                      <div class="flex-1">
                        <div class="inline-block border border-dashed border-nutriflow-yellow text-nutriflow-green-light font-bold text-[10px] md:text-xs tracking-widest uppercase px-2 py-1 mb-2">
                          <app-editable-text [textValue]="product.benefitsTitle || '¿PARA QUÉ SIRVE?'" (contentChanged)="cms.updateProduct(product.id, 'benefitsTitle', $event)"></app-editable-text>
                        </div>
                        <app-editable-text [textValue]="product.benefits || 'Escribe aquí los beneficios...'" customClasses="block text-xl font-black text-nutriflow-green-dark leading-tight" (contentChanged)="cms.updateProduct(product.id, 'benefits', $event)"></app-editable-text>
                      </div>
                    </div>

                    <div class="flex flex-col lg:flex-row items-center lg:items-start gap-5">
                      <div class="w-14 h-14 bg-white rounded-full shadow-md border-2 border-nutriflow-cream flex-shrink-0 relative overflow-hidden flex items-center justify-center transform hover:scale-110 transition-transform">
                        <!-- Aplicamos $any() aquí -->
                        <app-editable-image [imageUrl]="$any(product).icono2 || ''" containerClasses="absolute inset-0 w-full h-full p-2.5" imgClasses="object-contain object-center w-full h-full" (imageChanged)="cms.updateProduct(product.id, 'icono2', $event)"></app-editable-image>
                      </div>
                      <div class="flex-1">
                        <div class="inline-block border border-dashed border-nutriflow-yellow text-nutriflow-green-light font-bold text-[10px] md:text-xs tracking-widest uppercase px-2 py-1 mb-2">
                          <app-editable-text [textValue]="product.ingredientsTitle || 'INSUMOS 100% ORGÁNICOS'" (contentChanged)="cms.updateProduct(product.id, 'ingredientsTitle', $event)"></app-editable-text>
                        </div>
                        <app-editable-text [textValue]="product.ingredients || 'Zanahoria, Naranja...'" customClasses="block text-xl font-black text-nutriflow-green-dark leading-tight" (contentChanged)="cms.updateProduct(product.id, 'ingredients', $event)"></app-editable-text>
                      </div>
                    </div>
                  </div>
                  
                  <div class="mt-12 flex flex-col lg:flex-row items-center lg:items-start gap-4 pt-8 border-t border-nutriflow-green-dark/10">
                    <div class="w-10 h-10 flex-shrink-0 relative flex items-center justify-center transform hover:scale-110 transition-transform">
                      <!-- Aplicamos $any() aquí -->
                      <app-editable-image [imageUrl]="$any(product).icono3 || ''" containerClasses="absolute inset-0 w-full h-full p-1" imgClasses="object-contain object-center w-full h-full" (imageChanged)="cms.updateProduct(product.id, 'icono3', $event)"></app-editable-image>
                    </div>
                    <div class="flex-1">
                      <div class="inline-block border border-dashed border-nutriflow-yellow text-nutriflow-green-dark/60 font-bold text-[10px] md:text-xs tracking-widest uppercase px-3 py-1.5 bg-white shadow-sm">
                        <app-editable-text [textValue]="product.diarioQuote || 'HECHO CON AMOR, PARA TU BIENESTAR.'" (contentChanged)="cms.updateProduct(product.id, 'diarioQuote', $event)"></app-editable-text>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            }
          </div>
        </section>
      </div>

    </div>
  `
})
export class DiarioPageComponent {
  cms = inject(CmsStateService);
  bgPosition = signal<string>('right top');
  
  changeBackground() { this.cms.openGallery((url: string) => this.cms.updateDiario('bgDecorUrl', url)); }
  removeBackground() { this.cms.updateDiario('bgDecorUrl', ''); }
}