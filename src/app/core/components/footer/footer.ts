import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsStateService } from '../../services/cms-state';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-nutriflow-green-dark pt-6 pb-6 relative z-20">
      
      <!-- ONDA SUPERIOR HERMÉTICA Y PARALELA -->
      <div class="absolute bottom-full left-0 w-full overflow-hidden leading-[0] translate-y-[1px]">
        <!-- Ajustamos el viewBox a 140 para que la curva encaje a la perfección -->
        <svg class="relative block w-[calc(100%+1.3px)] h-[80px] md:h-[140px]" preserveAspectRatio="none" viewBox="0 0 1440 140" xmlns="http://www.w3.org/2000/svg">
          
          <!-- 1. Onda Amarilla (Fondo): Curva base suave -->
          <path d="M0,20 C480,120 960,-20 1440,20 L1440,140 L0,140 Z" fill="#FCD34D"></path>
          
          <!-- 2. Onda Verde (Frente): Curva matemáticamente paralela (+50 exactos en cada eje Y) -->
          <path d="M0,70 C480,170 960,30 1440,70 L1440,140 L0,140 Z" class="fill-nutriflow-green-dark"></path>
        </svg>
      </div>

      <div class="container mx-auto px-6 max-w-7xl flex flex-col items-center">
        
        <!-- LOGO AÚN MÁS GRANDE (w-80 md:w-96) -->
        <div class="w-80 md:w-96">
           <img [src]="cms.content()?.navbar?.logoUrl || '/logo.png'" alt="Nutriflow Logo" class="w-full h-auto object-contain">
        </div>

        <div class="flex items-center gap-8 md:gap-12 mb-8">
          <a href="/conocenos" class="text-white text-sm font-black uppercase tracking-widest hover:text-nutriflow-yellow transition-colors">Conócenos</a>
          <a href="/#tienda" class="text-white text-sm font-black uppercase tracking-widest hover:text-nutriflow-yellow transition-colors">Tienda</a>
          <a href="/diario" class="text-white text-sm font-black uppercase tracking-widest hover:text-nutriflow-yellow transition-colors">Diario</a>
          <a href="https://wa.me/51964211518" target="_blank" class="text-white text-sm font-black uppercase tracking-widest hover:text-nutriflow-yellow transition-colors">WhatsApp</a>
        </div>

        <div class="w-full border-t border-white/20 mb-6 max-w-4xl mx-auto"></div>

        <div class="w-full max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-white/80 text-sm font-bold uppercase tracking-widest text-center md:text-left">
              © 2026 Nutriflow Fit
          </p>
          <a [href]="cms.content()?.navbar?.instagramUrl" target="_blank" class="text-white/80 hover:text-nutriflow-yellow transition-colors flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            <span class="text-sm font-bold uppercase tracking-widest">Instagram</span>
          </a>
        </div>

      </div>
    </footer>
  `
})
export class FooterComponent {
  cms = inject(CmsStateService);
}