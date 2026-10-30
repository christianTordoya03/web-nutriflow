import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CmsStateService } from '../../services/cms-state';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="w-full bg-white/90 backdrop-blur-md py-4 px-6 md:px-12 flex items-center justify-between shadow-sm sticky top-0 z-50 transition-all border-b border-gray-100">
      
      <div routerLink="/" class="flex-shrink-0 cursor-pointer flex flex-col leading-none hover:scale-105 transition-transform duration-300">
        <span class="font-montserrat font-black text-2xl text-nutriflow-green-dark tracking-tighter">NÜTRÍ</span>
        <div class="flex items-baseline">
          <span class="font-montserrat font-black text-2xl text-nutriflow-green-light tracking-tighter">FIÖW</span>
          <span class="font-montserrat font-bold text-sm text-nutriflow-green-light ml-1">fit</span>
        </div>
      </div>

      <nav class="hidden md:flex items-center gap-10 text-sm font-black text-nutriflow-green-dark tracking-widest uppercase">
        <a routerLink="/" routerLinkActive="text-nutriflow-green-light border-b-2 border-nutriflow-yellow" [routerLinkActiveOptions]="{exact: true}" class="pb-1 hover:text-nutriflow-green-light transition-colors cursor-pointer">INICIO</a>
        <a href="/#tienda" class="pb-1 hover:text-nutriflow-green-light transition-colors cursor-pointer">TIENDA</a>
        <a routerLink="/diario" routerLinkActive="text-nutriflow-green-light border-b-2 border-nutriflow-yellow" class="pb-1 hover:text-nutriflow-green-light transition-colors cursor-pointer">DIARIO</a>
      </nav>

      <div class="flex items-center gap-6 text-nutriflow-green-dark">
        <button id="cart-bag-icon" (click)="cms.checkoutWhatsApp()" class="relative hover:text-nutriflow-green-light transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-7 h-7"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
          <span class="absolute -top-2 -right-2 bg-red-600 text-white text-[11px] font-black px-1.5 py-0.5 rounded-full border-2 border-white">{{ cms.cart().length }}</span>
        </button>
      </div>
    </header>
  `
})
export class NavbarComponent {
  cms = inject(CmsStateService);
}