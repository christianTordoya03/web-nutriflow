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
           class="fixed bottom-6 right-6 z-[90] bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_4px_25px_rgba(37,211,102,0.6)] transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.396.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c.003-3.625 2.952-6.574 6.577-6.574a6.56 6.56 0 0 1 4.647 1.928 6.565 6.565 0 0 1 1.928 4.647c-.004 3.625-2.953 6.575-6.578 6.575z"/><path d="M11.874 9.693c-.214-.107-1.266-.625-1.463-.696-.196-.071-.34-.107-.482.107-.143.214-.555.696-.68.839-.125.143-.251.16-.465.054-.214-.107-.905-.334-1.724-1.063-.637-.568-1.067-1.27-1.192-1.484-.125-.214-.014-.33.093-.437.096-.096.214-.251.321-.375.107-.125.143-.214.214-.357.071-.143.036-.268-.018-.375-.054-.107-.482-1.163-.66-1.593-.174-.421-.35-.364-.482-.371-.125-.007-.268-.007-.411-.007-.143 0-.375.054-.572.268-.196.214-.75.733-.75 1.787 0 1.055.768 2.074.875 2.217.107.143 1.513 2.312 3.665 3.24.512.221.912.353 1.224.453.513.163.98.14 1.35.085.417-.063 1.282-.524 1.463-1.03.18-.506.18-.939.125-1.03-.054-.092-.196-.145-.41-.252z"/></svg>
        </a>

        @if (cms.isAdmin()) { <app-admin-toolbar></app-admin-toolbar> }

        <!-- ============================================================ -->
        <!-- MODAL ELEGANTE INCRUSTADO DIRECTAMENTE -->
        <!-- ============================================================ -->
        @if (showAdminLogin) {
          <div class="fixed inset-0 z-[100] flex items-center justify-center bg-nutriflow-green-dark/60 backdrop-blur-sm transition-opacity p-4">
            
            <style>
              @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(20px) scale(0.95); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
              .animate-fade-in-up { animation: fade-in-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            </style>
            
            <div class="relative w-full max-w-sm bg-nutriflow-cream shadow-2xl rounded-[4rem_0_4rem_4rem] p-10 overflow-hidden transform transition-all animate-fade-in-up">
              
              <!-- Hoja de fondo -->
              <svg class="absolute -bottom-12 -left-12 text-nutriflow-green-light/20 w-64 h-64 transform -rotate-12 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
                 <path d="M10,60 C 20,20 80,10 95,40 C 80,80 20,90 10,60 Z"/>
              </svg>
              
              <div class="relative z-10 flex flex-col items-center text-center">
                <!-- Icono de candado -->
                <div class="w-14 h-14 bg-nutriflow-yellow rounded-full flex items-center justify-center mb-5 text-nutriflow-green-dark shadow-md transform rotate-3">
                  <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                
                <h3 class="text-2xl font-black text-nutriflow-green-dark uppercase tracking-widest mb-2">Modo Editor</h3>
                <p class="text-nutriflow-green-dark/70 text-xs font-bold uppercase tracking-wider mb-8">Ingresa tu clave</p>
                
                <!-- CONTENEDOR DEL INPUT CON BOTÓN DE OJITO -->
                <div class="relative w-full mb-8">
                  <input
                    #pwdInput
                    [type]="showPassword ? 'text' : 'password'"
                    placeholder="••••••••"
                    class="w-full bg-white border-4 border-white focus:border-nutriflow-yellow text-center text-nutriflow-green-dark text-xl font-black tracking-[0.2em] rounded-full py-3 pl-6 pr-12 outline-none transition-colors shadow-inner"
                    (keyup.enter)="verifyAdminPassword(pwdInput.value)"
                    autofocus
                  >
                  <!-- Botón Ojo -->
                  <button type="button" (click)="togglePassword()" class="absolute right-4 top-1/2 transform -translate-y-1/2 text-nutriflow-green-dark/40 hover:text-nutriflow-yellow transition-colors focus:outline-none p-1">
                    @if (showPassword) {
                      <!-- Icono Ojo Abierto (Ocultar) -->
                      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    } @else {
                      <!-- Icono Ojo Cerrado (Mostrar) -->
                      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    }
                  </button>
                </div>
                
                <!-- Botones -->
                <div class="flex gap-4 w-full">
                  <button (click)="cancelAdminLogin()" class="flex-1 py-3 rounded-full font-bold text-xs uppercase tracking-wider text-nutriflow-green-dark bg-transparent border-2 border-nutriflow-green-dark/20 hover:border-nutriflow-green-dark hover:bg-nutriflow-green-dark/5 transition-all">
                    Cancelar
                  </button>
                  <button (click)="verifyAdminPassword(pwdInput.value)" class="flex-1 py-3 rounded-full font-bold text-xs uppercase tracking-wider text-nutriflow-green-dark bg-nutriflow-yellow border-2 border-nutriflow-yellow hover:scale-105 transition-transform shadow-[0_4px_14px_0_rgba(252,211,77,0.39)]">
                    Entrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
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
  
  // Controla la visibilidad de nuestro modal y de la contraseña
  showAdminLogin = false;
  showPassword = false;
  
  @HostListener('window:keydown.control.shift.x', ['$event'])
  handleAdminLogin(event: Event) { 
    event.preventDefault();
    if (!this.cms.isAdmin()) {
      this.showPassword = false; // Nos aseguramos que siempre inicie oculto por seguridad
      this.showAdminLogin = true;
    } else {
      this.cms.isAdmin.set(false);
      this.cms.isEditMode.set(false);
    }
  }

  // Alterna el estado de visibilidad del password
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Verifica la contraseña escrita en el input
  verifyAdminPassword(pwd: string) {
    if (pwd === 'nutriflow2026') {
      this.cms.isAdmin.set(true);
      this.showAdminLogin = false; // Cierra el modal exitosamente
      this.showPassword = false; // Resetea el ojito
    } else if (pwd) {
      alert('Contraseña incorrecta. Inténtalo de nuevo.');
    }
  }

  // Cierra el modal si el usuario se arrepiente
  cancelAdminLogin() {
    this.showAdminLogin = false;
    this.showPassword = false; // Resetea el ojito
  }
}