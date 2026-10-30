import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsStateService } from '../../core/services/cms-state';
import { EditableTextComponent } from '../../shared/components/editable-text/editable-text';
import { EditableImageComponent } from '../../shared/components/editable-image/editable-image';
import { EditableVideoComponent } from '../../shared/components/editable-video/editable-video';

@Component({
  selector: 'app-diario-page',
  standalone: true,
  imports: [CommonModule, EditableTextComponent, EditableImageComponent, EditableVideoComponent],
  template: `
    <div class="pt-24 pb-20 min-h-screen relative z-10 bg-nutriflow-cream">
      
      <!-- CONTROLES DE FONDO -->
      @if (cms.isEditMode()) {
        <div class="fixed top-28 left-6 z-[150] flex flex-col gap-3 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-gray-100">
          <span class="text-[10px] font-black uppercase tracking-widest text-nutriflow-green-dark mb-1">Decoración Sutil</span>
          
          <button (click)="changeBackground()" class="bg-nutriflow-yellow text-nutriflow-green-dark px-4 py-2 rounded-full shadow-sm font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
            Seleccionar Imagen
          </button>
          
          @if (cms.content()?.diario?.bgDecorUrl && cms.content()?.diario?.bgDecorUrl !== '') {
            <div class="flex gap-2 justify-center mt-2">
               <button (click)="bgPosition.set('left top')" [class.bg-nutriflow-green-dark]="bgPosition() === 'left top'" [class.text-white]="bgPosition() === 'left top'" class="p-1.5 rounded-md hover:bg-gray-200 transition-colors" title="Arriba Izquierda">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25" /></svg>
               </button>
               <button (click)="bgPosition.set('right top')" [class.bg-nutriflow-green-dark]="bgPosition() === 'right top'" [class.text-white]="bgPosition() === 'right top'" class="p-1.5 rounded-md hover:bg-gray-200 transition-colors" title="Arriba Derecha">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" /></svg>
               </button>
            </div>
            <button (click)="removeBackground()" class="mt-2 text-red-500 px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-red-50 transition-all flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              Quitar
            </button>
          }
        </div>
      }

      <div class="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply z-0" 
           style="background-image: url('/image_d1ff89.jpg'); background-size: cover; background-position: center; background-attachment: fixed;">
      </div>

      @if (cms.content()?.diario?.bgDecorUrl) {
        <div class="fixed inset-0 z-[-1] pointer-events-none opacity-60 transition-all duration-700"
             [style.backgroundImage]="'url(' + cms.content()!.diario.bgDecorUrl + ')'"
             [style.backgroundPosition]="bgPosition()"
             style="background-size: 350px; background-repeat: no-repeat;">
        </div>
      }

      <div class="container mx-auto px-6 max-w-6xl relative z-10">
        
        <div class="text-center mb-24">
          <app-editable-text [textValue]="cms.content()!.diario.heroTitle" customClasses="block text-5xl md:text-6xl font-black mb-4 tracking-tighter uppercase text-nutriflow-green-dark" (contentChanged)="cms.updateDiario('heroTitle', $event)"></app-editable-text>
          <div class="w-24 h-1 bg-nutriflow-yellow mx-auto mb-6"></div>
          <app-editable-text [textValue]="cms.content()!.diario.heroSubtitle" customClasses="block text-lg font-medium text-nutriflow-green-dark/80 max-w-2xl mx-auto" (contentChanged)="cms.updateDiario('heroSubtitle', $event)"></app-editable-text>
        </div>

        <section class="flex flex-col md:flex-row items-center gap-12 lg:gap-24 mb-32">
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

        <section class="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24 mb-32">
          <div class="w-full md:w-1/2 flex flex-col justify-center relative z-20">
            <div class="inline-flex items-center bg-[#2c3e2e] text-white font-bold text-xs px-5 py-2.5 rounded-full uppercase tracking-widest self-start mb-6 shadow-md hover:bg-nutriflow-green-light transition-colors">
              <span class="tracking-widest">Sobre Nosotros</span>
            </div>
            
            <app-editable-text [textValue]="cms.content()!.diario.conocenosTitle" customClasses="text-4xl md:text-5xl lg:text-6xl font-black text-nutriflow-green-dark tracking-tighter mb-6 leading-[1.05] block" (contentChanged)="cms.updateDiario('conocenosTitle', $event)"></app-editable-text>
            
            <div class="w-16 h-1 bg-nutriflow-yellow/80 mb-8 rounded-full"></div>
            
            <app-editable-text [textValue]="cms.content()!.diario.conocenosText" customClasses="text-lg font-medium text-gray-800 leading-relaxed block" (contentChanged)="cms.updateDiario('conocenosText', $event)"></app-editable-text>
          </div>

          <div class="w-full md:w-1/2 relative group">
            <div class="absolute inset-0 bg-[#e8e4db] rounded-[3rem] transform -translate-x-4 translate-y-4 group-hover:-translate-x-6 group-hover:translate-y-6 transition-transform duration-500 border-2 border-white/50 shadow-lg"></div>
            
            <div class="relative aspect-square md:aspect-[4/3] rounded-[3rem] overflow-hidden shadow-xl bg-white border-[6px] border-white z-10">
               <app-editable-video [mediaUrl]="cms.content()!.diario.conocenosMedia" mediaClasses="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-700" (mediaChanged)="cms.updateDiario('conocenosMedia', $event)"></app-editable-video>
            </div>
          </div>
        </section>

        <!-- ========================================== -->
        <!-- 3. BEBIDAS CON IMÁGENES DESVINCULADAS -->
        <!-- ========================================== -->
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
                    <!-- LLAMADA A LA IMAGEN DESVINCULADA -->
                    <!-- Si no hay imagen en el diario, muestra por defecto la de la tienda hasta que la cambies -->
                    <app-editable-image 
                      [imageUrl]="cms.content()?.diario?.diarioImages?.[product.id] || product.imageUrl" 
                      containerClasses="absolute inset-0 w-full h-full" 
                      imgClasses="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" 
                      (imageChanged)="cms.updateDiarioProductImage(product.id, $event)">
                    </app-editable-image>
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
                    <!-- TEXTO VINCULADO -->
                    <app-editable-text [textValue]="product.name" (contentChanged)="cms.updateProduct(product.id, 'name', $event)"></app-editable-text>
                  </div>
                  
                  <app-editable-text [textValue]="product.claim" customClasses="block text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] text-[#2c3e2e] mb-6" (contentChanged)="cms.updateProduct(product.id, 'claim', $event)"></app-editable-text>
                  
                  <div class="w-16 h-1 bg-nutriflow-yellow/80 mb-10 rounded-full"></div>
                  
                  <div class="space-y-8 relative">
                    <div class="flex items-start gap-4">
                      <div class="mt-1 p-2 bg-white rounded-full shadow-sm text-nutriflow-green-light flex-shrink-0">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-.813.2846a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" /></svg>
                      </div>
                      <div>
                        <h4 class="text-[#2c3e2e] font-black text-[11px] uppercase tracking-widest mb-1 opacity-60">¿Para qué sirve?</h4>
                        <app-editable-text [textValue]="product.benefits || 'Escribe aquí los beneficios...'" customClasses="block text-gray-800 font-medium text-lg leading-relaxed" (contentChanged)="cms.updateProduct(product.id, 'benefits', $event)"></app-editable-text>
                      </div>
                    </div>

                    <div class="flex items-start gap-4">
                      <div class="mt-1 p-2 bg-white rounded-full shadow-sm text-nutriflow-green-light flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>
                      </div>
                      <div>
                        <h4 class="text-[#2c3e2e] font-black text-[11px] uppercase tracking-widest mb-1 opacity-60">Insumos 100% Orgánicos</h4>
                        <app-editable-text [textValue]="product.ingredients" customClasses="block text-gray-800 font-bold text-lg leading-relaxed" (contentChanged)="cms.updateProduct(product.id, 'ingredients', $event)"></app-editable-text>
                      </div>
                    </div>
                  </div>

                  <div class="mt-12 flex items-center gap-3 pt-6 border-t border-[#2c3e2e]/10">
                    <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-[#2c3e2e]"><path d="M17.5 3C15.5 3 13.5 4 12 5.5C10.5 4 8.5 3 6.5 3C3 3 0 6 0 9.5C0 14.5 5 18.5 12 24C19 18.5 24 14.5 24 9.5C24 6 21 3 17.5 3ZM12 21.5C6 16.5 2 13 2 9.5C2 7 4 5 6.5 5C8 5 9.5 6 11 7.5L12 8.5L13 7.5C14.5 6 16 5 17.5 5C20 5 22 7 22 9.5C22 13 18 16.5 12 21.5Z"/></svg>
                    <span class="text-[10px] font-medium text-[#2c3e2e] uppercase tracking-wider opacity-80">hecho con amor,<br>para tu bienestar.</span>
                  </div>

                  <div class="hidden">
                    <app-editable-text [textValue]="product.tag" (contentChanged)="cms.updateProduct(product.id, 'tag', $event)"></app-editable-text>
                  </div>

                </div>

              </div>
            }
          </div>
        </section>

      </div> 

      <!-- 4. SECCIÓN UNIFICADA (Comunidad y Mosaico) -->
      <section class="mb-10 w-full relative z-10 overflow-hidden">
        <div class="container mx-auto px-6 max-w-6xl text-center mb-12 bg-white/60 p-8 rounded-[3rem] backdrop-blur-sm border border-white/50 shadow-sm max-w-4xl">
          <h2 class="text-4xl md:text-5xl font-black text-nutriflow-green-dark tracking-tighter uppercase mb-3">Comunidad en Movimiento</h2>
          <p class="text-lg font-medium text-nutriflow-green-dark/70 max-w-2xl mx-auto">Nuestra huella en la cancha y la vida en shots.</p>
        </div>
        
        <div class="flex flex-col gap-16 w-full">
          
          <div class="container mx-auto px-6 max-w-6xl">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              @for (evento of cms.content()?.adventure?.eventos; track evento.id) {
                <article class="relative bg-gray-200 rounded-[2rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col group aspect-[4/3] md:aspect-auto md:h-[26rem] border-[6px] border-white cursor-pointer">
                  <app-editable-image [imageUrl]="evento.imageUrl" containerClasses="absolute inset-0 w-full h-full" imgClasses="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-700" (imageChanged)="cms.updateEvento(evento.id, 'imageUrl', $event)"></app-editable-image>
                  
                  <div class="absolute inset-0 bg-gradient-to-t from-nutriflow-green-dark via-nutriflow-green-dark/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500 pointer-events-none"></div>
                  
                  <div class="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col justify-end text-left z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                    <span class="text-nutriflow-yellow font-black text-xs uppercase tracking-widest mb-2"><app-editable-text [textValue]="evento.date" (contentChanged)="cms.updateEvento(evento.id, 'date', $event)"></app-editable-text></span>
                    <app-editable-text [textValue]="evento.title" customClasses="text-2xl md:text-3xl font-black text-white tracking-tighter leading-tight drop-shadow-lg" (contentChanged)="cms.updateEvento(evento.id, 'title', $event)"></app-editable-text>
                  </div>
                </article>
              }
            </div>
          </div>

          <style>
            .collage-marquee { display: flex; width: max-content; gap: 1.5rem; }
            .scroll-left { animation: scroll-L 45s linear infinite; }
            .scroll-right { animation: scroll-R 45s linear infinite; }
            .collage-marquee:hover { animation-play-state: paused; }
            @keyframes scroll-L { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            @keyframes scroll-R { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
          </style>

          <div class="relative w-full flex flex-col gap-6 py-4">
            <div class="absolute inset-y-0 left-0 w-24 md:w-56 bg-gradient-to-r from-[#f7f4ee] via-[#f7f4ee]/90 to-transparent z-20 pointer-events-none"></div>
            <div class="absolute inset-y-0 right-0 w-24 md:w-56 bg-gradient-to-l from-[#f7f4ee] via-[#f7f4ee]/90 to-transparent z-20 pointer-events-none"></div>

            <div class="collage-marquee scroll-left px-4">
              @for (img of collageRow1(); track img.id) {
                <div class="w-44 h-44 md:w-60 md:h-60 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-transform duration-300 relative border-[4px] border-white group cursor-pointer flex-shrink-0 bg-white">
                  <app-editable-image [imageUrl]="img.imageUrl" containerClasses="absolute inset-0 w-full h-full" imgClasses="object-cover object-center w-full h-full group-hover:scale-110 transition-transform duration-700" (imageChanged)="cms.updateCollageImage(img.id, $event)"></app-editable-image>
                </div>
              }
              @for (img of collageRow1(); track img.id + 'clone') {
                <div class="w-44 h-44 md:w-60 md:h-60 rounded-[2rem] overflow-hidden shadow-sm transition-transform duration-300 relative border-[4px] border-white flex-shrink-0 bg-white">
                  <img [src]="img.imageUrl" class="absolute inset-0 w-full h-full object-cover object-center" onerror="this.src='https://placehold.co/400x400/eeeeee/999999?text=Sin+Imagen'">
                </div>
              }
            </div>

            <div class="collage-marquee scroll-right px-4">
              @for (img of collageRow2(); track img.id) {
                <div class="w-44 h-44 md:w-60 md:h-60 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-transform duration-300 relative border-[4px] border-white group cursor-pointer flex-shrink-0 bg-white">
                  <app-editable-image [imageUrl]="img.imageUrl" containerClasses="absolute inset-0 w-full h-full" imgClasses="object-cover object-center w-full h-full group-hover:scale-110 transition-transform duration-700" (imageChanged)="cms.updateCollageImage(img.id, $event)"></app-editable-image>
                </div>
              }
              @for (img of collageRow2(); track img.id + 'clone') {
                <div class="w-44 h-44 md:w-60 md:h-60 rounded-[2rem] overflow-hidden shadow-sm transition-transform duration-300 relative border-[4px] border-white flex-shrink-0 bg-white">
                  <img [src]="img.imageUrl" class="absolute inset-0 w-full h-full object-cover object-center" onerror="this.src='https://placehold.co/400x400/eeeeee/999999?text=Sin+Imagen'">
                </div>
              }
            </div>

          </div>
        </div>
      </section>

    </div>
  `
})
export class DiarioPageComponent {
  cms = inject(CmsStateService);
  
  bgPosition = signal<string>('right top');

  collageRow1 = computed(() => {
    const collage = this.cms.content()?.diario?.collage || [];
    return collage.slice(0, 6);
  });

  collageRow2 = computed(() => {
    const collage = this.cms.content()?.diario?.collage || [];
    return collage.slice(6, 12);
  });

  changeBackground() {
    this.cms.openGallery((url: string) => {
      this.cms.updateDiario('bgDecorUrl', url);
    });
  }

  removeBackground() {
    this.cms.updateDiario('bgDecorUrl', '');
  }
}