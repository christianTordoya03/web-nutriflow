import { Component, inject, ElementRef, ViewChild, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsStateService } from '../../services/cms-state';

@Component({
  selector: 'app-media-gallery',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (cms.isGalleryOpen()) {
      <div class="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-8">
        
        @if (errorMessage) {
          <div class="absolute top-8 left-1/2 transform -translate-x-1/2 z-[300] bg-red-600 text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 animate-fade-in-down border-2 border-white/20">
            <span class="font-bold text-sm tracking-wide">{{ errorMessage }}</span>
            <button (click)="errorMessage = ''" class="text-white/80 hover:text-white transition-colors ml-2">X</button>
          </div>
        }

        <div class="bg-nutriflow-cream w-full max-w-5xl h-[85vh] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
          
          <div class="px-8 py-6 border-b border-gray-200 flex justify-between items-center bg-white shadow-sm z-10">
            <h3 class="text-2xl font-black text-nutriflow-green-dark uppercase tracking-tighter">Gestor de Medios</h3>
            <button (click)="cms.closeGallery()" class="text-gray-400 hover:text-red-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <!-- PESTAÑAS (TABS) -->
          <div class="bg-white px-8 flex gap-8 border-b border-gray-100 shadow-sm z-10">
             <button (click)="activeTab.set('images')" [class.border-nutriflow-green-dark]="activeTab() === 'images'" [class.text-nutriflow-green-dark]="activeTab() === 'images'" class="py-4 border-b-4 border-transparent text-gray-400 font-black uppercase tracking-widest text-xs transition-colors">Imágenes ({{ imageItems().length }})</button>
             <button (click)="activeTab.set('videos')" [class.border-nutriflow-green-dark]="activeTab() === 'videos'" [class.text-nutriflow-green-dark]="activeTab() === 'videos'" class="py-4 border-b-4 border-transparent text-gray-400 font-black uppercase tracking-widest text-xs transition-colors">Videos ({{ videoItems().length }})</button>
             <button (click)="activeTab.set('trash')" [class.border-red-500]="activeTab() === 'trash'" [class.text-red-500]="activeTab() === 'trash'" class="py-4 border-b-4 border-transparent text-gray-400 font-black uppercase tracking-widest text-xs transition-colors flex items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
               Papelera ({{ trashedItems().length }})
             </button>
          </div>

          <div class="p-8 flex-grow overflow-y-auto bg-gray-50 relative">
            @if (isUploading) {
              <div class="absolute inset-0 z-50 bg-white/80 flex flex-col items-center justify-center backdrop-blur-sm rounded-b-[2rem]">
                <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-nutriflow-green-dark border-l-transparent mb-4"></div>
                <p class="font-black text-nutriflow-green-dark uppercase tracking-widest text-sm">Subiendo a NutriflowFit...</p>
              </div>
            }

            @if (activeTab() !== 'trash') {
              <div class="mb-10 flex flex-col items-center gap-6 max-w-lg mx-auto">
                <input type="file" #fileInput class="hidden" accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm" (change)="onFileSelected($event)">
                <button (click)="triggerUpload()" class="w-full bg-nutriflow-yellow text-nutriflow-green-dark px-10 py-5 rounded-full font-black uppercase tracking-widest shadow-lg hover:bg-nutriflow-green-dark hover:text-white transition-colors flex justify-center items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  Subir Nuevo Archivo
                </button>
              </div>
            }

            <!-- GRID DE CONTENIDOS -->
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              
              <!-- Pestaña Imágenes -->
              @if (activeTab() === 'images') {
                @for (media of imageItems(); track media) {
                  <div class="aspect-square bg-white rounded-2xl overflow-hidden shadow-md hover:ring-4 hover:ring-nutriflow-yellow transition-all group relative">
                    <button (click)="trash(media, $event)" title="Enviar a papelera" class="absolute top-2 right-2 z-20 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 hover:scale-110 transition-all shadow-md">X</button>
                    <div (click)="selectMedia(media)" class="w-full h-full cursor-pointer relative z-10">
                      <img [src]="media" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                    </div>
                  </div>
                }
              }

              <!-- Pestaña Videos -->
              @if (activeTab() === 'videos') {
                @for (media of videoItems(); track media) {
                  <div class="aspect-square bg-white rounded-2xl overflow-hidden shadow-md hover:ring-4 hover:ring-nutriflow-yellow transition-all group relative">
                    <button (click)="trash(media, $event)" title="Enviar a papelera" class="absolute top-2 right-2 z-20 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 hover:scale-110 transition-all shadow-md">X</button>
                    <div (click)="selectMedia(media)" class="w-full h-full cursor-pointer relative z-10">
                      <video [src]="media" class="w-full h-full object-cover" muted></video>
                      <div class="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                         <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                  </div>
                }
              }

              <!-- Pestaña Papelera (Archivos comprimidos visualmente) -->
              @if (activeTab() === 'trash') {
                @for (media of trashedItems(); track media) {
                  <div class="aspect-square bg-gray-200 rounded-2xl overflow-hidden shadow-inner relative group border-2 border-dashed border-gray-300">
                    
                    <!-- Botón Restaurar -->
                    <button (click)="restore(media, $event)" title="Restaurar a la galería" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 bg-nutriflow-green-dark text-white rounded-full p-4 opacity-0 group-hover:opacity-100 hover:scale-110 transition-all shadow-2xl">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
                    </button>
                    
                    <!-- Botón Eliminar Permanente -->
                    <button (click)="permanentDelete(media, $event)" title="Eliminar definitivamente" class="absolute top-2 right-2 z-30 bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 hover:scale-110 transition-all shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                    </button>

                    <div class="w-full h-full relative z-10 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all scale-90">
                      @if (isVideo(media)) {
                         <video [src]="media" class="w-full h-full object-cover" muted></video>
                      } @else {
                         <img [src]="media" class="w-full h-full object-cover">
                      }
                    </div>
                  </div>
                }
              }

            </div>
          </div>
        </div>
      </div>
    }
  `
})
export class MediaGalleryComponent {
  cms = inject(CmsStateService);
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  isUploading = false;
  errorMessage = '';

  activeTab = signal<'images' | 'videos' | 'trash'>('images');

  activeItems = computed(() => this.cms.content()?.mediaLibrary || []);
  trashedItems = computed(() => this.cms.content()?.trashedMedia || []);
  
  imageItems = computed(() => this.activeItems().filter(url => !this.isVideo(url)));
  videoItems = computed(() => this.activeItems().filter(url => this.isVideo(url)));

  triggerUpload() { this.fileInput.nativeElement.click(); }

  isVideo(url: string): boolean {
    return url.toLowerCase().includes('.mp4') || url.toLowerCase().includes('.webm') || url.toLowerCase().includes('.mov');
  }

  showError(msg: string) {
    this.errorMessage = msg;
    setTimeout(() => { this.errorMessage = ''; }, 6000);
  }

  trash(url: string, event: Event) {
    event.stopPropagation();
    this.cms.trashMedia(url);
  }

  restore(url: string, event: Event) {
    event.stopPropagation();
    this.cms.restoreMedia(url);
  }

  permanentDelete(url: string, event: Event) {
    event.stopPropagation();
    if(confirm('¿Estás seguro de eliminar este archivo permanentemente? Esta acción no se puede deshacer.')) {
      this.cms.permanentDeleteMedia(url);
    }
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    this.isUploading = true;
    
    if (file.type.startsWith('video/')) {
      const publicUrl = await this.cms.uploadFileToStorage(file);
      if (publicUrl) {
        await this.cms.addMediaToLibrary(publicUrl);
        this.activeTab.set('videos'); // Cambia a la pestaña de videos
        this.selectMedia(publicUrl);
      }
      this.isUploading = false;
      this.fileInput.nativeElement.value = '';
      return;
    }
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800; const MAX_HEIGHT = 800; // Incrementado ligeramente para máxima nitidez
        let width = img.width; let height = img.height;
        if (width > height) {
          if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
        } else {
          if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
        }
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.clearRect(0, 0, width, height);
        ctx?.drawImage(img, 0, 0, width, height);
        
        const compressedBase64 = canvas.toDataURL('image/webp', 0.90);
        await this.cms.addMediaToLibrary(compressedBase64);
        
        this.activeTab.set('images'); // Cambia a la pestaña de imágenes
        this.selectMedia(compressedBase64);
        this.isUploading = false;
        this.fileInput.nativeElement.value = '';
      };
      img.onerror = () => {
         this.showError('Error al leer la imagen.');
         this.isUploading = false;
      }
    };
  }

  selectMedia(url: string) {
    if (this.cms.onMediaSelected) { this.cms.onMediaSelected(url); }
    this.cms.closeGallery();
  }
}