import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AdminToolbarComponent } from './core/components/admin-toolbar/admin-toolbar';
import { PromoModalComponent } from './features/promo-modal/promo-modal';
import { NavbarComponent } from './core/components/navbar/navbar';
import { FooterComponent } from './core/components/footer/footer';
import { MediaGalleryComponent } from './core/components/media-gallery/media-gallery';
import { CmsStateService } from './core/services/cms-state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AdminToolbarComponent, PromoModalComponent, NavbarComponent, FooterComponent, MediaGalleryComponent],
  template: `
    @if (cms.content()) {
      <div class="relative min-h-screen flex flex-col font-montserrat">
        
        <!-- TEXTURA DE FONDO -->
        <div class="fixed inset-0 z-[-1] pointer-events-none bg-nutriflow-cream">
          <img src="/image_d1ff89.jpg" class="w-full h-full object-cover opacity-5 mix-blend-multiply">
        </div>

        <app-media-gallery></app-media-gallery>
        <app-promo-modal></app-promo-modal>
        <app-navbar></app-navbar>

        <main class="flex-grow">
          <router-outlet></router-outlet>
        </main>

        <app-footer></app-footer>
        
        <!-- WHATSAPP FLOTANTE CON MENSAJE PRECARGADO -->
        <a href="https://wa.me/51964211518?text=%C2%A1Hola%20Nutriflow!%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20shots%20funcionales." target="_blank" 
           class="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_4px_25px_rgba(37,211,102,0.6)] transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.396.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c.003-3.625 2.952-6.574 6.577-6.574a6.56 6.56 0 0 1 4.647 1.928 6.565 6.565 0 0 1 1.928 4.647c-.004 3.625-2.953 6.575-6.578 6.575z"/><path d="M11.874 9.693c-.214-.107-1.266-.625-1.463-.696-.196-.071-.34-.107-.482.107-.143.214-.555.696-.68.839-.125.143-.251.16-.465.054-.214-.107-.905-.334-1.724-1.063-.637-.568-1.067-1.27-1.192-1.484-.125-.214-.014-.33.093-.437.096-.096.214-.251.321-.375.107-.125.143-.214.214-.357.071-.143.036-.268-.018-.375-.054-.107-.482-1.163-.66-1.593-.174-.421-.35-.364-.482-.371-.125-.007-.268-.007-.411-.007-.143 0-.375.054-.572.268-.196.214-.75.733-.75 1.787 0 1.055.768 2.074.875 2.217.107.143 1.513 2.312 3.665 3.24.512.221.912.353 1.224.453.513.163.98.14 1.35.085.417-.063 1.282-.524 1.463-1.03.18-.506.18-.939.125-1.03-.054-.092-.196-.145-.41-.252z"/></svg>
        </a>

        @if (cms.isAdmin()) { <app-admin-toolbar></app-admin-toolbar> }
      </div>
    } @else {
      <div class="min-h-screen flex items-center justify-center bg-nutriflow-cream">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nutriflow-green-dark"></div>
      </div>
    }
  `
})
export class AppComponent {
  cms = inject(CmsStateService);
  
  @HostListener('window:keydown.control.shift.x', ['$event'])
  handleAdminLogin(event: Event) { 
    event.preventDefault();
    if (!this.cms.isAdmin()) {
      const pwd = prompt('Modo Administrador. Ingrese la contraseña:');
      if (pwd === 'nutriflow2025') {
        this.cms.isAdmin.set(true);
      } else if (pwd) {
        alert('Contraseña incorrecta');
      }
    } else {
      this.cms.isAdmin.set(false);
      this.cms.isEditMode.set(false);
    }
  }
}