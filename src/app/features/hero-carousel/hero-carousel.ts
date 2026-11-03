import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsStateService } from '../../core/services/cms-state';
import { EditableTextComponent } from '../../shared/components/editable-text/editable-text';
import { EditableImageComponent } from '../../shared/components/editable-image/editable-image';

@Component({
  selector: 'app-hero-carousel',
  standalone: true,
  imports: [CommonModule, EditableTextComponent, EditableImageComponent],
  template: `
    <style>
      @keyframes slideDownFade {
        0% { opacity: 0; transform: translateY(-40px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      .animate-hero-1 { animation: slideDownFade 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      .animate-hero-2 { animation: slideDownFade 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; opacity: 0; }
      .animate-hero-3 { animation: slideDownFade 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards; opacity: 0; }
    </style>
    
    <section class="relative w-full h-[95vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      <!-- FONDO COMO IMAGEN -->
      <div class="absolute inset-0 w-full h-full z-0">
        <app-editable-image 
           [imageUrl]="cms.content()!.hero.bgMediaUrl" 
           containerClasses="absolute inset-0 w-full h-full" 
           imgClasses="w-full h-full object-cover object-center" 
           (imageChanged)="updateHero('bgMediaUrl', $event)">
        </app-editable-image>
      </div>
      <div class="absolute inset-0 bg-black/30 z-10 pointer-events-none mix-blend-multiply"></div>
      
      <div class="relative z-20 text-center px-6 flex flex-col items-center max-w-5xl mt-12 md:mt-20">
        
        <!-- TÍTULO MÁS PEQUEÑO (text-4xl md:text-6xl lg:text-7xl) -->
        <app-editable-text 
           [textValue]="cms.content()!.hero.title" 
           customClasses="block text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] drop-shadow-2xl mb-6 animate-hero-1" 
           (contentChanged)="updateHero('title', $event)">
        </app-editable-text>
        
        <app-editable-text 
           [textValue]="cms.content()!.hero.subtitle" 
           customClasses="block text-lg md:text-2xl font-medium text-white/90 drop-shadow-lg mb-10 max-w-2xl mx-auto animate-hero-2" 
           (contentChanged)="updateHero('subtitle', $event)">
        </app-editable-text>
        
        <a href="#tienda" class="bg-nutriflow-yellow text-nutriflow-green-dark px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 hover:bg-white hover:text-nutriflow-green-dark transition-all shadow-2xl flex items-center gap-3 group animate-hero-3">
          <app-editable-text [textValue]="cms.content()!.hero.buttonText" (contentChanged)="updateHero('buttonText', $event)"></app-editable-text>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-4 h-4 transform group-hover:translate-x-1 transition-transform"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
        </a>
      </div>
      
      <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
        <svg class="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[90px]" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,80 C480,150 800,-10 1200,60 L1200,120 L0,120 Z" class="fill-nutriflow-cream"></path>
        </svg>
      </div>
    </section>
  `
})
export class HeroCarouselComponent {
  cms = inject(CmsStateService);
  updateHero(field: string, value: string) { this.cms.updateContent('hero', field, value); }
}