import { Component, inject } from '@angular/core';
import { CmsStateService } from '../../services/cms-state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-toolbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-6 left-6 z-[100] flex flex-col md:flex-row gap-4 items-end">
      
      <button 
         (click)="logout()" 
         class="px-5 py-3 rounded-full font-bold shadow-xl transition-all bg-gray-800 text-white hover:bg-black hover:scale-105">
          Salir
      </button>

      <!-- BOTÓN DE EMERGENCIA -->
      <!-- @if (cms.isEditMode()) {
         <button 
           (click)="cms.emergencyClearGallery()"
           class="px-5 py-3 rounded-full font-bold shadow-xl transition-all bg-red-600 text-white hover:bg-red-700 hover:scale-105 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
            Vaciar Galería
         </button>
      } -->

      <button 
         (click)="cms.toggleEditMode()"
        class="px-6 py-3 rounded-full font-bold shadow-2xl transition-all transform hover:scale-105"
        [ngClass]="cms.isEditMode() ? 'bg-nutriflow-yellow text-nutriflow-green-dark border-2 border-white' : 'bg-nutriflow-green-dark text-white border-2 border-transparent'">
        {{ cms.isEditMode() ? '✅ Guardar cambios' : '✏️ Editar Web' }}
      </button>
    </div>
  `
})
export class AdminToolbarComponent {
  cms = inject(CmsStateService);
  
  logout() {
    this.cms.isAdmin.set(false);
    this.cms.isEditMode.set(false);
  }
}