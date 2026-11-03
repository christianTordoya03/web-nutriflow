import { Component, inject } from '@angular/core';
import { CmsStateService } from '../../services/cms-state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-toolbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- AUMENTAMOS EL Z-INDEX A 99999 PARA QUE SIEMPRE ESTÉ POR ENCIMA DEL MODAL DE INICIO -->
    <div class="fixed bottom-6 left-6 z-[99999] flex flex-col md:flex-row gap-4 items-end">
             
      <button 
          (click)="logout()" 
          class="px-5 py-3 rounded-full font-bold shadow-xl transition-all bg-gray-800 text-white hover:bg-black hover:scale-105">
          Salir
      </button>

      <button 
          (click)="cms.toggleEditMode()" 
        class="px-6 py-3 rounded-full font-bold shadow-2xl transition-all transform hover:scale-105"
        [ngClass]="cms.isEditMode() ? 'bg-nutriflow-yellow text-nutriflow-green-dark border-2 border-white' : 'bg-nutriflow-green-dark text-white border-2 border-transparent'">
        {{ cms.isEditMode() ? '💾 Guardar cambios' : '✏️ Editar Web' }}
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