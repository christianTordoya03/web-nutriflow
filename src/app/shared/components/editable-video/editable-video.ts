import { Component, inject, input, output, computed, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsStateService } from '../../../core/services/cms-state';

@Component({
  selector: 'app-editable-video',
  standalone: true,
  imports: [CommonModule],
  // 1. BLOQUEO NUCLEAR CSS: Destruye los controles inyectados por Chrome/Safari
  styles: [`
    video::-webkit-media-controls,
    video::-webkit-media-controls-enclosure,
    video::-webkit-media-controls-panel,
    video::-webkit-media-controls-overlay-play-button,
    video::-webkit-media-controls-start-playback-botton {
      display: none !important;
      -webkit-appearance: none !important;
    }
  `],
  template: `
    <div 
      class="relative w-full h-full overflow-hidden group bg-gray-900"
      [class.editable-image-active]="cms.isEditMode()"
      (click)="handleBackgroundClick($event)">
      
      <!-- CARTEL FLOTANTE (Solo en modo edición) -->
      @if (cms.isEditMode()) {
        <div class="absolute inset-0 z-50 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
          <span class="bg-nutriflow-yellow text-nutriflow-green-dark px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" /></svg>
            Cambiar Multimedia
          </span>
        </div>
      }

      @if (isMediaVideo()) {
        <!-- Atributos agresivos para bloquear AirPlay, PiP y Remote Playback -->
        <video 
          #videoPlayer
          [src]="formattedUrl()" 
          [autoplay]="!cms.isEditMode()"
          [muted]="isMuted"
          playsinline
          disablePictureInPicture
          disableRemotePlayback
          x-webkit-airplay="deny"
          controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
          (ended)="onVideoEnded()"
          class="w-full h-full object-cover transition-transform duration-700 pointer-events-none outline-none border-none"
          [class]="mediaClasses()">
        </video>

        <!-- CONTROLES PERSONALIZADOS LIMPIOS -->
        @if (!cms.isEditMode()) {
          
          <!-- Botón de Play Central -->
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300" [class.opacity-0]="isPlaying" [class.opacity-100]="!isPlaying">
            <div class="bg-black/50 text-white rounded-full p-4 md:p-5 backdrop-blur-md shadow-2xl border border-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 md:w-10 md:h-10 ml-1"><path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" /></svg>
            </div>
          </div>

          <!-- 2. MOVIMIENTO ESTRATÉGICO: Botón de Mute Esquina Inferior IZQUIERDA -->
          <button (click)="toggleSound($event)" class="absolute bottom-4 left-4 md:bottom-6 md:left-6 z-20 bg-black/50 text-white p-2.5 md:p-3 rounded-full backdrop-blur-md hover:bg-black/70 hover:scale-110 transition-all shadow-lg border border-white/20 outline-none">
            @if (isMuted) {
              <!-- Icono Mute -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 md:w-6 md:h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" /></svg>
            } @else {
              <!-- Icono Volumen Activo -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 md:w-6 md:h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" /></svg>
            }
          </button>
        }

      } @else {
        <img 
          [src]="formattedUrl()" 
          alt="Nutriflow Media" 
          onerror="this.src='https://placehold.co/600x400/eeeeee/999999?text=Sin+Medio'"
          class="w-full h-full object-cover transition-transform duration-700"
          [class]="mediaClasses()" />
      }
    </div>
  `
})
export class EditableVideoComponent implements OnInit {
  cms = inject(CmsStateService);
  mediaUrl = input.required<string>();
  mediaClasses = input<string>('');
  mediaChanged = output<string>(); 

  @ViewChild('videoPlayer') videoPlayer?: ElementRef<HTMLVideoElement>;
  
  loopCount = 0;
  isMuted = true;
  isPlaying = false; 

  formattedUrl = computed(() => {
    const url = this.mediaUrl();
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('data:')) return url;
    return url.startsWith('/') ? url : '/' + url;
  });

  isMediaVideo(): boolean {
    const url = this.mediaUrl().toLowerCase();
    return url.includes('.mp4') || url.includes('.webm') || url.includes('data:video') || url.includes('youtube');
  }

  ngOnInit() {
    this.isPlaying = !this.cms.isEditMode();
  }

  handleBackgroundClick(event: Event) {
    if (this.cms.isEditMode()) {
      event.preventDefault();
      this.cms.openGallery((url: string) => { 
        this.mediaChanged.emit(url); 
        this.loopCount = 0; 
        this.isPlaying = false;
      });
    } else if (this.videoPlayer) {
      const video = this.videoPlayer.nativeElement;
      if (video.paused) {
        this.loopCount = 3; 
        video.play();
        this.isPlaying = true;
      } else {
        video.pause();
        this.isPlaying = false;
      }
    }
  }

  toggleSound(event: Event) {
    event.stopPropagation(); 
    this.isMuted = !this.isMuted;
    if (this.videoPlayer) {
      this.videoPlayer.nativeElement.muted = this.isMuted;
    }
  }

  onVideoEnded() {
    if (this.loopCount < 2) {
      this.loopCount++;
      if (this.videoPlayer) {
        this.videoPlayer.nativeElement.play();
      }
    } else {
      this.isPlaying = false; 
    }
  }
}