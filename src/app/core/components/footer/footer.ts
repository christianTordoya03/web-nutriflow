import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-nutriflow-green-dark text-white pt-16 pb-8 mt-auto z-20">
      <div class="container mx-auto px-6 text-center">
        
        <div class="flex justify-center items-baseline gap-1 mb-8">
          <span class="font-montserrat font-black text-3xl tracking-tighter text-white">NÜTRÍ</span>
          <span class="font-montserrat font-black text-3xl tracking-tighter text-nutriflow-yellow">FIÖW</span>
          <span class="font-montserrat font-medium text-sm ml-1 text-nutriflow-yellow">fit</span>
        </div>
        
        <div class="flex justify-center gap-8 mb-10 font-black text-[11px] uppercase tracking-widest text-white/80">
          <a href="/#tienda" class="hover:text-nutriflow-yellow transition-colors cursor-pointer">Tienda</a>
          <a href="/diario" class="hover:text-nutriflow-yellow transition-colors cursor-pointer">Diario</a>
          <a href="https://wa.me/51964211518?text=%C2%A1Hola%20Nutriflow!%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20shots%20funcionales." target="_blank" class="hover:text-nutriflow-yellow transition-colors cursor-pointer">WhatsApp</a>
        </div>
        
        <div class="border-t border-white/10 pt-6 text-[10px] font-bold text-white/40 uppercase tracking-widest flex flex-col justify-center items-center">
          <p>© 2026 Nutriflow Fit. | Hecho con 💚 en Perú</p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}