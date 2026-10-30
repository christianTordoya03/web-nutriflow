import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsStateService } from '../../core/services/cms-state';
import { EditableTextComponent } from '../../shared/components/editable-text/editable-text';
import { EditableImageComponent } from '../../shared/components/editable-image/editable-image';

@Component({
  selector: 'app-products-grid',
  standalone: true,
  imports: [CommonModule, EditableTextComponent, EditableImageComponent],
  template: `
    <section id="tienda" class="py-24 relative z-10 overflow-hidden bg-nutriflow-cream">
      <!-- TEXTURA DE HOJAS -->
      <div class="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply" style="background-image: url('/image_d1ff89.jpg'); background-size: cover; background-position: center;"></div>
      
      <div class="container mx-auto px-6 relative z-10">
        
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-black text-nutriflow-green-dark tracking-tighter uppercase mb-4">La Colección Flow</h2>
          <p class="text-lg font-bold text-nutriflow-green-dark/70">Diseñados para cada momento de tu día.</p>
        </div>

        <!-- GRID CARROUSEL -->
        <div class="flex overflow-x-auto gap-8 pb-10 snap-x snap-mandatory scroll-smooth justify-start md:justify-center items-stretch" style="scrollbar-width: none; -ms-overflow-style: none;">
          
          <!-- BUCLE OPTIMIZADO PARA LOS 3 PRODUCTOS -->
          @for (product of cms.content()?.products; track product.id) {
            <div class="min-w-[300px] md:min-w-[350px] w-[350px] flex-shrink-0 snap-center group relative flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-2 border-4 border-white h-full">
              
              <!-- IMAGEN FOTOGRÁFICA (object-cover para llenar el espacio) -->
              <div class="w-full relative aspect-[4/5] bg-gray-100 overflow-hidden">
                <app-editable-image 
                  [imageUrl]="product.imageUrl" 
                  containerClasses="absolute inset-0 w-full h-full z-10" 
                  imgClasses="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-700" 
                  (imageChanged)="cms.updateProduct(product.id, 'imageUrl', $event)">
                </app-editable-image>
              </div>

              <!-- FRANJA DE COLOR DINÁMICA -->
              <div class="h-1.5 w-full" 
                   [ngClass]="{
                     'bg-[#9D1B32]': product.id === 1, 
                     'bg-[#E87413]': product.id === 2, 
                     'bg-[#4B6D21]': product.id === 3
                   }">
              </div>

              <!-- CONTENIDO INFERIOR -->
              <div class="p-6 md:p-8 flex flex-col flex-grow text-center items-center">
                
                <!-- TAG DINÁMICO (Color coincidente con la franja) -->
                <div class="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 border"
                     [ngClass]="{
                       'bg-[#9D1B32]/5 text-[#9D1B32] border-[#9D1B32]/20': product.id === 1,
                       'bg-[#E87413]/5 text-[#E87413] border-[#E87413]/20': product.id === 2,
                       'bg-[#4B6D21]/5 text-[#4B6D21] border-[#4B6D21]/20': product.id === 3
                     }">
                  <app-editable-text [textValue]="product.tag" (contentChanged)="cms.updateProduct(product.id, 'tag', $event)"></app-editable-text>
                </div>

                <app-editable-text [textValue]="product.name" customClasses="block text-2xl font-black text-nutriflow-green-dark tracking-tighter mb-2" (contentChanged)="cms.updateProduct(product.id, 'name', $event)"></app-editable-text>
                
                <app-editable-text [textValue]="product.claim" customClasses="block text-sm font-bold text-gray-500 mb-6 flex-grow" (contentChanged)="cms.updateProduct(product.id, 'claim', $event)"></app-editable-text>
                
                <!-- BOTÓN AÑADIR -->
                <button (click)="cms.addToCart(product.name)" class="mt-auto w-full bg-nutriflow-yellow text-nutriflow-green-dark font-black text-xs uppercase tracking-widest py-4 rounded-xl hover:bg-nutriflow-green-dark hover:text-white transition-colors shadow-sm border border-transparent hover:border-nutriflow-green-dark">
                  Añadir
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
}