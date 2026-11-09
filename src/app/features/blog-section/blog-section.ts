import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsStateService } from '../../core/services/cms-state';
import { EditableTextComponent } from '../../shared/components/editable-text/editable-text';
import { EditableImageComponent } from '../../shared/components/editable-image/editable-image';
import { EditableVideoComponent } from '../../shared/components/editable-video/editable-video';

@Component({
  selector: 'app-blog-section',
  standalone: true,
  imports: [CommonModule, EditableTextComponent, EditableImageComponent, EditableVideoComponent],
  template: `
    <!-- FRANJA VERDE CORREDIZA (Iconos limpios y transparentes sin fondos que ensucien) -->
      <div class="w-full relative z-20 border-t-4 border-nutriflow-yellow overflow-hidden shadow-[inset_0_4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div class="absolute inset-0 bg-nutriflow-green-dark opacity-95"></div>
        <div class="absolute top-0 left-0 w-full h-[1px] bg-white/20"></div>

        <style>
          .marquee-slow { display: flex; width: max-content; animation: scroll-slow 35s linear infinite; }
          @keyframes scroll-slow { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .marquee-slow:hover { animation-play-state: paused; }
        </style>
        
        <div class="marquee-slow items-center gap-12 md:gap-24 text-sm md:text-base font-black uppercase tracking-[0.25em] text-white py-3 md:py-4 relative z-10">
          
          <!-- ========================================== -->
          <!-- PRIMER GRUPO -->
          <!-- ========================================== -->
          <div class="flex items-center gap-12 md:gap-24">
            
            <!-- Item 1: 100% COLD PRESS -->
            <span class="flex items-center gap-4">
              <!-- Eliminado bg-white/10. Ahora es transparente -->
              <div class="w-6 h-6 md:w-8 md:h-8 relative bg-transparent flex items-center justify-center overflow-hidden">
                <app-editable-image 
                  [imageUrl]="cms.content()?.marquee?.icon1 || ''" 
                  containerClasses="absolute inset-0 w-full h-full" 
                  imgClasses="object-contain object-center w-full h-full drop-shadow-sm" 
                  (imageChanged)="cms.updateMarquee('icon1', $event)">
                </app-editable-image>
              </div>
              <app-editable-text [textValue]="cms.content()?.marquee?.text1 || '100% COLD PRESS'" customClasses="drop-shadow-sm" (contentChanged)="cms.updateMarquee('text1', $event)"></app-editable-text>
            </span>
            
            <!-- Item 2: SIN AZÚCAR AÑADIDA -->
            <span class="flex items-center gap-4 text-[#FDE047] drop-shadow-[0_0_8px_rgba(253,224,71,0.4)]">
              <!-- Eliminado bg-[#FDE047]/10. Ahora es transparente -->
              <div class="w-6 h-6 md:w-8 md:h-8 relative bg-transparent flex items-center justify-center overflow-hidden">
                <app-editable-image 
                  [imageUrl]="cms.content()?.marquee?.icon2 || ''" 
                  containerClasses="absolute inset-0 w-full h-full" 
                  imgClasses="object-contain object-center w-full h-full" 
                  (imageChanged)="cms.updateMarquee('icon2', $event)">
                </app-editable-image>
              </div>
              <app-editable-text [textValue]="cms.content()?.marquee?.text2 || 'SIN AZÚCAR AÑADIDA'" (contentChanged)="cms.updateMarquee('text2', $event)"></app-editable-text>
            </span>
            
            <!-- Item 3: HECHO EN PERÚ -->
            <span class="flex items-center gap-4">
              <!-- Eliminado bg-white/10. Ahora es transparente -->
              <div class="w-6 h-6 md:w-8 md:h-8 relative bg-transparent flex items-center justify-center overflow-hidden">
                <app-editable-image 
                  [imageUrl]="cms.content()?.marquee?.icon3 || ''" 
                  containerClasses="absolute inset-0 w-full h-full" 
                  imgClasses="object-contain object-center w-full h-full drop-shadow-sm" 
                  (imageChanged)="cms.updateMarquee('icon3', $event)">
                </app-editable-image>
              </div>
              <app-editable-text [textValue]="cms.content()?.marquee?.text3 || 'HECHO EN PERÚ'" customClasses="drop-shadow-sm" (contentChanged)="cms.updateMarquee('text3', $event)"></app-editable-text>
            </span>

          </div>

          <!-- ========================================== -->
          <!-- SEGUNDO GRUPO (Bucle Infinito - Exactamente igual al primero) -->
          <!-- ========================================== -->
          <div class="flex items-center gap-12 md:gap-24 pl-12 md:pl-24">
            
            <span class="flex items-center gap-4">
              <div class="w-6 h-6 md:w-8 md:h-8 relative bg-transparent flex items-center justify-center overflow-hidden">
                <app-editable-image 
                  [imageUrl]="cms.content()?.marquee?.icon1 || ''" 
                  containerClasses="absolute inset-0 w-full h-full" 
                  imgClasses="object-contain object-center w-full h-full drop-shadow-sm" 
                  (imageChanged)="cms.updateMarquee('icon1', $event)">
                </app-editable-image>
              </div>
              <app-editable-text [textValue]="cms.content()?.marquee?.text1 || '100% COLD PRESS'" customClasses="drop-shadow-sm" (contentChanged)="cms.updateMarquee('text1', $event)"></app-editable-text>
            </span>
            
            <span class="flex items-center gap-4 text-[#FDE047] drop-shadow-[0_0_8px_rgba(253,224,71,0.4)]">
              <div class="w-6 h-6 md:w-8 md:h-8 relative bg-transparent flex items-center justify-center overflow-hidden">
                <app-editable-image 
                  [imageUrl]="cms.content()?.marquee?.icon2 || ''" 
                  containerClasses="absolute inset-0 w-full h-full" 
                  imgClasses="object-contain object-center w-full h-full" 
                  (imageChanged)="cms.updateMarquee('icon2', $event)">
                </app-editable-image>
              </div>
              <app-editable-text [textValue]="cms.content()?.marquee?.text2 || 'SIN AZÚCAR AÑADIDA'" (contentChanged)="cms.updateMarquee('text2', $event)"></app-editable-text>
            </span>
            
            <span class="flex items-center gap-4">
              <div class="w-6 h-6 md:w-8 md:h-8 relative bg-transparent flex items-center justify-center overflow-hidden">
                <app-editable-image 
                  [imageUrl]="cms.content()?.marquee?.icon3 || ''" 
                  containerClasses="absolute inset-0 w-full h-full" 
                  imgClasses="object-contain object-center w-full h-full drop-shadow-sm" 
                  (imageChanged)="cms.updateMarquee('icon3', $event)">
                </app-editable-image>
              </div>
              <app-editable-text [textValue]="cms.content()?.marquee?.text3 || 'HECHO EN PERÚ'" customClasses="drop-shadow-sm" (contentChanged)="cms.updateMarquee('text3', $event)"></app-editable-text>
            </span>

          </div>
        </div>
      </div>
   <!-- TESTIMONIOS (Card Unificada con Color Dinámico y Offset) -->
    <section class="py-24 bg-nutriflow-cream relative z-10 font-montserrat">
      <div class="container mx-auto px-6 max-w-7xl">
        <h2 class="text-4xl md:text-5xl font-black text-center text-nutriflow-green-dark tracking-tighter uppercase mb-4">La Tribu Nutriflow</h2>
        <p class="text-center text-gray-500 font-bold mb-16">Lo que dice nuestra comunidad en redes.</p>
        
        <!-- Contenedor scrollable horizontal (agregamos padding top/bottom para la animación) -->
        <div class="flex overflow-x-auto gap-8 md:gap-12 pt-4 pb-16 snap-x snap-mandatory scroll-smooth justify-start lg:justify-center items-stretch px-4" style="scrollbar-width: none;">
          
          <!-- Agregamos let i = $index para poder alternar los colores -->
          @for (testimonio of cms.content()?.testimonials; track testimonio.id; let i = $index) {
            
            <!-- CONTENEDOR PADRE RELATIVO (Agrupa la tarjeta y el efecto de color) -->
            <div class="relative flex flex-col flex-shrink-0 snap-center min-w-[300px] w-[300px] md:w-[340px] group cursor-pointer">
              
              <!-- 🔴 EL EFECTO DE COLOR (Fondo Desfasado) -->
              <!-- Cambia de color dependiendo de si es par o impar, y se expande al hacer hover -->
              <div class="absolute inset-0 rounded-[2.5rem] transform translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6"
                   [class.bg-nutriflow-yellow]="i % 2 === 0"
                   [class.bg-nutriflow-green-light]="i % 2 !== 0">
              </div>

              <!-- ⚪ LA TARJETA PRINCIPAL BLANCA (Va por encima del color) -->
              <div class="relative flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden border-[6px] border-white z-10 transform transition-transform duration-500 group-hover:-translate-y-1 group-hover:-translate-x-1">
                
                <!-- Mitad Superior: El Video (Reel) -->
                <div class="relative w-full h-[400px] md:h-[460px] bg-black overflow-hidden rounded-[2rem]">
                  
                  <app-editable-video 
                     [mediaUrl]="testimonio.videoUrl" 
                     [posterUrl]="testimonio.posterUrl || ''"
                     [allowPoster]="true"
                     mediaClasses="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                     (mediaChanged)="cms.updateTestimonial(testimonio.id, $event)"
                     (posterChanged)="cms.updateTestimonialField(testimonio.id, 'posterUrl', $event)">
                  </app-editable-video>
                  
                  <!-- Gradiente para el texto sobre el video -->
                  <div class="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-5 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                    <div class="self-end bg-white/20 backdrop-blur-md rounded-full p-2 border border-white/10 shadow-sm">
                      <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                    
                    <div class="flex flex-col gap-2 mt-auto">
                      <div class="flex items-center gap-3">
                        <div class="w-9 h-9 rounded-full bg-nutriflow-yellow flex items-center justify-center border-2 border-white text-nutriflow-green-dark font-black flex-shrink-0 shadow-md">@</div>
                        <a [href]="cms.isEditMode() ? 'javascript:void(0)' : (testimonio.linkUrl || '#')" 
                           (click)="handleLinkClick($event)"
                           [target]="cms.isEditMode() ? '_self' : '_blank'" 
                           class="text-white font-black text-sm md:text-base tracking-wide transition-colors pointer-events-auto flex items-center gap-1 group/link drop-shadow-md">
                          <app-editable-text 
                             [textValue]="testimonio.username || 'usuario'" 
                             customClasses="inline-block border-b border-transparent group-hover/link:border-white transition-colors" 
                             (contentChanged)="cms.updateTestimonialField(testimonio.id, 'username', $event)">
                          </app-editable-text>
                        </a>
                      </div>
                      
                      @if (cms.isEditMode()) {
                        <button (click)="editTestimonialLink(testimonio.id, testimonio.linkUrl || '')" class="pointer-events-auto bg-white/20 text-white text-[9px] px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-sm self-start hover:bg-white/40 transition-colors border border-white/30 ml-12">
                          🔗 Cambiar Enlace
                        </button>
                      }
                    </div>
                  </div>
                </div>

                <!-- Mitad Inferior: Bloque de Texto -->
                <div class="p-6 md:p-8 text-left bg-white flex-grow flex flex-col justify-start">
                  
                  <!-- Detalle de color interno para romper el blanco -->
                  <div class="w-12 h-1.5 rounded-full mb-5"
                       [class.bg-nutriflow-green-light]="i % 2 === 0"
                       [class.bg-nutriflow-yellow]="i % 2 !== 0">
                  </div>

                  <app-editable-text 
                    [textValue]="$any(testimonio).title || '¡ME ENCANTA!'" 
                    customClasses="block text-[24px] md:text-[28px] font-black text-nutriflow-green-dark tracking-tighter uppercase mb-3 leading-[1.1]" 
                    (contentChanged)="cms.updateTestimonialField(testimonio.id, 'title', $event)">
                  </app-editable-text>
                  
                  <app-editable-text 
                    [textValue]="$any(testimonio).quote || 'Escribe aquí la reseña o comentario de esta persona.'" 
                    customClasses="block text-nutriflow-green-dark/70 font-medium text-[15px] leading-relaxed" 
                    (contentChanged)="cms.updateTestimonialField(testimonio.id, 'quote', $event)">
                  </app-editable-text>
                  
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
    <!-- BLOG SECTION (Igual que antes) -->
    <section class="pt-28 pb-36 bg-nutriflow-green-dark relative z-0">
      
      <div class="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 -mt-[1px]">
        <svg class="relative block w-full h-[50px] md:h-[90px]" preserveAspectRatio="none" viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,80 C480,0 960,100 1440,20 L1440,100 L0,100 Z" class="fill-nutriflow-cream"></path>
        </svg>
      </div>

      <div class="container mx-auto px-6 max-w-7xl relative z-10">
        <div class="text-center mb-16">
          <app-editable-text [textValue]="cms.content()!.blog.title" customClasses="block text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2 drop-shadow-md" (contentChanged)="cms.updateContent('blog', 'title', $event)"></app-editable-text>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-stretch">
          @for (article of cms.content()?.blog?.articles; track article.id) {
            <div class="bg-white rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 flex flex-col overflow-hidden group border border-white">
              <div class="w-full aspect-[5/6] bg-gray-100 relative overflow-hidden">
                <app-editable-image [imageUrl]="article.imageUrl" containerClasses="absolute inset-0 w-full h-full" imgClasses="object-cover object-center w-full h-full group-hover:scale-110 transition-transform duration-700" (imageChanged)="cms.updateBlogArticle(article.id, 'imageUrl', $event)"></app-editable-image>
                <div class="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-nutriflow-green-dark shadow-sm">
                  Diario
                </div>
              </div>
              <div class="p-6 md:p-8 flex flex-col flex-grow bg-white">
                <app-editable-text [textValue]="article.title" customClasses="block text-xl md:text-2xl font-black text-nutriflow-green-dark tracking-tight leading-snug mb-6 flex-grow" (contentChanged)="cms.updateBlogArticle(article.id, 'title', $event)"></app-editable-text>
                
                <a href="/diario" class="w-full bg-nutriflow-yellow text-nutriflow-green-dark font-black text-xs uppercase tracking-widest py-4 rounded-2xl hover:bg-nutriflow-green-dark hover:text-white transition-colors shadow-sm flex items-center justify-center gap-2 mt-auto">
                  <app-editable-text [textValue]="cms.content()!.blog.buttonText" (contentChanged)="cms.updateContent('blog', 'buttonText', $event)"></app-editable-text>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </a>
              </div>
            </div>
          }
        </div>
      </div>

      <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 translate-y-[1px]">
        <svg class="relative block w-full h-[50px] md:h-[90px]" preserveAspectRatio="none" viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,20 C480,100 960,-20 1440,40 L1440,105 L0,105 Z" class="fill-nutriflow-cream"></path>
        </svg>
      </div>
    </section>
  `
})
export class BlogSectionComponent {
  cms = inject(CmsStateService);

  editTestimonialLink(id: number, currentLink: string) {
    const newLink = prompt("Pega aquí el enlace de la publicación de Instagram o TikTok:", currentLink);
    if (newLink !== null) {
      this.cms.updateTestimonialField(id, 'linkUrl', newLink);
    }
  }

  handleLinkClick(event: Event) {
    if (this.cms.isEditMode()) {
      event.preventDefault();
    }
  }
}