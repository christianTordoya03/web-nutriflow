import { Component, inject, ElementRef, ViewChild, computed } from '@angular/core';
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
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <span class="font-bold text-sm tracking-wide">{{ errorMessage }}</span>
            <button (click)="errorMessage = ''" class="text-white/80 hover:text-white transition-colors ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        }

        <div class="bg-nutriflow-cream w-full max-w-5xl h-[85vh] rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
          
          <div class="px-8 py-6 border-b border-gray-200 flex justify-between items-center bg-white shadow-sm z-10">
            <h3 class="text-2xl font-black text-nutriflow-green-dark uppercase tracking-tighter">Tu Galería</h3>
            <button (click)="cms.closeGallery()" class="text-gray-400 hover:text-red-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div class="p-8 flex-grow overflow-y-auto bg-gray-50 relative">
            @if (isUploading) {
              <div class="absolute inset-0 z-50 bg-white/80 flex flex-col items-center justify-center backdrop-blur-sm rounded-b-[2rem]">
                <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-nutriflow-green-dark border-l-transparent mb-4"></div>
                <p class="font-black text-nutriflow-green-dark uppercase tracking-widest text-sm">Optimizando calidad...</p>
              </div>
            }

            <div class="mb-10 flex flex-col items-center gap-4">
              <input type="file" #fileInput class="hidden" accept="image/jpeg,image/png,image/webp,video/mp4,video/webm" (change)="onFileSelected($event)">
              <button (click)="triggerUpload()" class="bg-nutriflow-yellow text-nutriflow-green-dark px-10 py-5 rounded-full font-black uppercase tracking-widest shadow-lg hover:bg-nutriflow-green-dark hover:text-white transition-colors flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                Subir Imagen Pesada
              </button>
            </div>

            @if (images().length > 0) {
              <div>
                <h4 class="text-nutriflow-green-dark font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-gray-200 pb-2">Imágenes Guardadas</h4>
                <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  @for (media of images(); track media) {
                    <div class="aspect-square bg-white rounded-2xl overflow-hidden shadow-md hover:ring-4 hover:ring-nutriflow-yellow transition-all group relative" 
                         style="background-image: linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%); background-size: 20px 20px; background-position: 0 0, 0 10px, 10px -10px, -10px 0px;">
                      <button (click)="deleteMedia(media, $event)" class="absolute top-2 right-2 z-20 bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 hover:scale-110 transition-all shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                      <div (click)="selectMedia(media)" class="w-full h-full cursor-pointer relative z-10">
                        <img [src]="media" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onerror="this.src='https://placehold.co/400x400/eeeeee/999999?text=Error'">
                      </div>
                    </div>
                  }
                </div>
              </div>
            }

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

  videos = computed(() => {
    const lib = this.cms.content()?.mediaLibrary || [];
    return lib.filter(url => this.isVideo(url));
  });

  images = computed(() => {
    const lib = this.cms.content()?.mediaLibrary || [];
    return lib.filter(url => !this.isVideo(url));
  });

  triggerUpload() { this.fileInput.nativeElement.click(); }
  
  isVideo(url: string): boolean { 
    return url.toLowerCase().includes('.mp4') || url.toLowerCase().includes('.webm') || url.toLowerCase().includes('data:video') || url.includes('youtube'); 
  }
  
  showError(msg: string) {
    this.errorMessage = msg;
    setTimeout(() => { this.errorMessage = ''; }, 6000);
  }

  deleteMedia(url: string, event: Event) {
    event.stopPropagation();
    this.cms.removeMediaFromLibrary(url);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.isUploading = true;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        
        // ULTRA-COMPRESIÓN MÁXIMA: Reducimos a 500px para garantizar peso mínimo en Base64
        const MAX_WIDTH = 500; const MAX_HEIGHT = 500;
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

        // Calidad ajustada a 0.45 (Máxima seguridad para Base64)
        const compressedBase64 = canvas.toDataURL('image/webp', 0.45);
        
        await this.cms.addMediaToLibrary(compressedBase64);
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