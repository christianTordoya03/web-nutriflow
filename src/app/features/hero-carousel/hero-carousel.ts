import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsStateService } from '../../core/services/cms-state';
import { EditableTextComponent } from '../../shared/components/editable-text/editable-text';
import { EditableVideoComponent } from '../../shared/components/editable-video/editable-video';

@Component({
  selector: 'app-hero-carousel',
  standalone: true,
  imports: [CommonModule, EditableTextComponent, EditableVideoComponent],
  template: `
    <section class="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      
      <!-- Fondo Multimendia -->
      <div class="absolute inset-0 w-full h-full z-0">
        <app-editable-video 
          [mediaUrl]="cms.content()!.hero.bgMediaUrl" 
          mediaClasses="object-cover object-center"
          (mediaChanged)="updateField('bgMediaUrl', $event)">
        </app-editable-video>
        <!-- Gradiente mucho más suave y sutil -->
        <div class="absolute inset-0 bg-black/30"></div>
      </div>

      <!-- Contenido Textual Minimalista y Elegante -->
      <div class="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <app-editable-text
          [textValue]="cms.content()!.hero.subtitle"
          customClasses="block text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-relaxed tracking-wide max-w-3xl drop-shadow-xl"
          (contentChanged)="updateField('subtitle', $event)">
        </app-editable-text>
      </div>

      <!-- BARRA DE MOVIMIENTO TIPO MARQUEE -->
      <style>
        .ticker-wrap { width: 100%; overflow: hidden; background-color: #335c32; padding: 16px 0; border-top: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); }
        .ticker { display: flex; white-space: nowrap; animation: ticker 25s linear infinite; }
        .ticker-item { padding: 0 3rem; font-weight: 900; letter-spacing: 0.1em; font-size: 0.875rem; text-transform: uppercase; color: #ebc343; display: flex; align-items: center; gap: 0.75rem; }
        @keyframes ticker { 0% { transform: translate3d(0, 0, 0); } 100% { transform: translate3d(-50%, 0, 0); } }
      </style>
      <div class="ticker-wrap absolute bottom-0 left-0 z-20">
        <div class="ticker">
          <div class="ticker-item"><span class="text-xl text-white">❄️</span> 100% COLD PRESS</div>
          <div class="ticker-item"><span class="text-xl text-white">💧</span> 60 ml PURA POTENCIA</div>
          <div class="ticker-item"><span class="text-xl text-white">🌱</span> INGREDIENTES FRESCOS</div>
          <div class="ticker-item"><span class="text-xl text-white">💚</span> HECHO CON AMOR</div>
          
          <div class="ticker-item"><span class="text-xl text-white">❄️</span> 100% COLD PRESS</div>
          <div class="ticker-item"><span class="text-xl text-white">💧</span> 60 ml PURA POTENCIA</div>
          <div class="ticker-item"><span class="text-xl text-white">🌱</span> INGREDIENTES FRESCOS</div>
          <div class="ticker-item"><span class="text-xl text-white">💚</span> HECHO CON AMOR</div>
        </div>
      </div>
    </section>
  `
})
export class HeroCarouselComponent {
  cms = inject(CmsStateService);
  updateField(field: string, value: string) { this.cms.updateContent('hero', field, value); }
}