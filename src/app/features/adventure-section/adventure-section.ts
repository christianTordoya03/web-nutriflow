import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsStateService } from '../../core/services/cms-state';
import { EditableTextComponent } from '../../shared/components/editable-text/editable-text';
import { EditableVideoComponent } from '../../shared/components/editable-video/editable-video';
import { EditableImageComponent } from '../../shared/components/editable-image/editable-image';

@Component({
  selector: 'app-adventure-section',
  standalone: true,
  imports: [CommonModule, EditableTextComponent, EditableVideoComponent, EditableImageComponent],
  template: `
    <div class="w-full flex flex-col">
      
      <!-- ============================================== -->
      <!-- PARTE 1: IMPULSO PARA LOS AUDACES (Crema)      -->
      <!-- ============================================== -->
      <section class="relative w-full bg-nutriflow-cream pt-12 pb-28 z-10">
                 
        <div class="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row items-center gap-12 md:gap-20 relative z-10">
                     
          <!-- Izquierda: Textos y Pasos -->
          <div class="w-full md:w-1/2 flex flex-col justify-center">
            <app-editable-text 
               [textValue]="cms.content()!.adventure.title" 
               customClasses="block text-4xl md:text-5xl font-black text-nutriflow-green-dark tracking-tighter uppercase leading-[1.1] mb-10" 
               (contentChanged)="cms.updateContent('adventure', 'title', $event)">
            </app-editable-text>
                         
            <div class="flex flex-col gap-8 border-l-2 border-nutriflow-yellow pl-6">
              <div>
                <h4 class="text-nutriflow-green-dark font-black italic text-lg tracking-wide mb-1">1. AGITA</h4>
                <app-editable-text [textValue]="cms.content()!.adventure.step1" customClasses="block text-gray-500 font-medium text-sm" (contentChanged)="cms.updateContent('adventure', 'step1', $event)"></app-editable-text>
              </div>
              <div>
                <h4 class="text-nutriflow-green-dark font-black italic text-lg tracking-wide mb-1">2. ABRE</h4>
                <app-editable-text [textValue]="cms.content()!.adventure.step2" customClasses="block text-gray-500 font-medium text-sm" (contentChanged)="cms.updateContent('adventure', 'step2', $event)"></app-editable-text>
              </div>
              <div>
                <h4 class="text-nutriflow-green-dark font-black italic text-lg tracking-wide mb-1">3. TÓMALO</h4>
                <app-editable-text [textValue]="cms.content()!.adventure.step3" customClasses="block text-gray-500 font-medium text-sm" (contentChanged)="cms.updateContent('adventure', 'step3', $event)"></app-editable-text>
              </div>
            </div>
          </div>

          <!-- Derecha: Video Box -->
          <div class="w-full md:w-1/2 relative z-20">
            <div class="aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl bg-gray-200">
               <app-editable-video 
                 [mediaUrl]="cms.content()!.adventure.videoUrl" 
                 [posterUrl]="cms.content()!.adventure.videoPosterUrl" 
                 [allowPoster]="true" 
                 [autoPlay]="false" 
                 mediaClasses="w-full h-full object-cover" 
                 (mediaChanged)="cms.updateContent('adventure', 'videoUrl', $event)" 
                 (posterChanged)="cms.updateContent('adventure', 'videoPosterUrl', $event)">
               </app-editable-video>
            </div>
          </div>
        </div>
                 
        <!-- Onda Amarilla Inferior -->
        <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-0 translate-y-[1px]">
          <svg class="relative block w-full h-[50px] md:h-[90px]" preserveAspectRatio="none" viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,80 C480,0 960,100 1440,90 L1440,100 L0,100 Z" class="fill-nutriflow-yellow"></path>
          </svg>
        </div>
      </section>

      <!-- ============================================== -->
      <!-- PARTE 2: ¿VIVES LA AVENTURA? (CARRUSEL ZIG-ZAG) -->
      <!-- ============================================== -->
      <section class="relative w-full bg-nutriflow-yellow pt-12 pb-32 z-0 overflow-hidden">
                 
        <style>
          .carousel-track { display: flex; width: max-content; animation: scroll-carousel 60s linear infinite; }
          .carousel-track:hover { animation-play-state: paused; }
          @keyframes scroll-carousel { 
             0% { transform: translateX(0); } 
             100% { transform: translateX(-50%); } 
           }
        </style>

        <div class="container mx-auto px-6 max-w-6xl text-center mb-12">
          <app-editable-text 
             [textValue]="cms.content()!.adventure.eventosTitle || 'COMUNIDAD EN MOVIMIENTO'" 
             customClasses="block text-4xl md:text-6xl font-black text-nutriflow-green-dark tracking-tighter uppercase mb-4" 
             (contentChanged)="cms.updateContent('adventure', 'eventosTitle', $event)">
          </app-editable-text>
                     
          <app-editable-text 
             [textValue]="cms.content()!.adventure.carouselSubtitle || 'Únete a nuestra comunidad. Sigue haciendo lo que amas y lleva a Nutriflow contigo.'" 
             customClasses="block text-nutriflow-green-dark font-bold max-w-2xl mx-auto text-lg" 
             (contentChanged)="cms.updateContent('adventure', 'carouselSubtitle', $event)">
          </app-editable-text>
        </div>
                 
        <!-- Contenedor del Carrusel con Padding vertical para permitir el Zig-Zag -->
        <div class="w-full relative overflow-hidden py-10">
                     
          <!-- Degradados Laterales -->
          <div class="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-nutriflow-yellow to-transparent z-10 pointer-events-none"></div>
          <div class="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-nutriflow-yellow to-transparent z-10 pointer-events-none"></div>
                     
          <!-- Pista en Movimiento (Centrada verticalmente) -->
          <div class="carousel-track items-center cursor-grab active:cursor-grabbing">
                         
            <!-- BLOQUE 1 (Editable) -->
            <div class="flex gap-4 md:gap-6 pr-4 md:pr-6 items-center">
              @for (img of cms.content()?.adventure?.carouselImages; track img.id; let i = $index) {
                 <!-- Magia Zig-Zag: Se alterna la traslación en Y -->
                 <div class="w-[220px] md:w-[320px] flex-shrink-0 aspect-square rounded-[2rem] overflow-hidden shadow-xl bg-nutriflow-cream relative border-4 border-white/40 hover:border-white transition-all group"
                      [ngClass]="i % 2 === 0 ? '-translate-y-6' : 'translate-y-6'">
                   <app-editable-image 
                      [imageUrl]="img.imageUrl" 
                      containerClasses="absolute inset-0 w-full h-full" 
                      imgClasses="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" 
                      (imageChanged)="cms.updateAdventureImage(img.id, $event)">
                   </app-editable-image>
                 </div>
              }
            </div>

            <!-- BLOQUE 2 (Clon Visual) -->
            <div class="flex gap-4 md:gap-6 pr-4 md:pr-6 items-center">
              @for (img of cms.content()?.adventure?.carouselImages; track 'clone-' + img.id; let i = $index) {
                 <!-- Mismo Zig-Zag para mantener la continuidad -->
                 <div class="w-[220px] md:w-[320px] flex-shrink-0 aspect-square rounded-[2rem] overflow-hidden shadow-xl bg-nutriflow-cream relative border-4 border-white/40 hover:border-white transition-all group pointer-events-none"
                      [ngClass]="i % 2 === 0 ? '-translate-y-6' : 'translate-y-6'">
                   <img [src]="img.imageUrl" class="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700">
                 </div>
              }
            </div>

          </div>
        </div>

      </section>
    </div>
  `
})
export class AdventureSectionComponent {
  cms = inject(CmsStateService);
}