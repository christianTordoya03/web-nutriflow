import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsStateService } from '../../core/services/cms-state';
import { EditableTextComponent } from '../../shared/components/editable-text/editable-text';
import { EditableVideoComponent } from '../../shared/components/editable-video/editable-video';

@Component({
  selector: 'app-blog-section',
  standalone: true,
  imports: [CommonModule, EditableTextComponent, EditableVideoComponent],
  template: `
    <!-- FRANJA VERDE CORREDIZA CON TEXTOS EDITABLES -->
    <div class="w-full bg-nutriflow-green-dark py-8 md:py-10 overflow-hidden relative z-20 border-t-4 border-nutriflow-yellow">
      <style>
        .marquee-slow { display: flex; width: max-content; animation: scroll-slow 40s linear infinite; }
        @keyframes scroll-slow { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      </style>
      <div class="marquee-slow items-center gap-12 md:gap-24 text-2xl md:text-5xl font-black uppercase tracking-widest text-white">
        <!-- Primer Grupo -->
        <div class="flex items-center gap-12 md:gap-24">
          <span class="flex items-center gap-4"><app-editable-text [textValue]="cms.content()?.marquee?.text1 || '100% COLD PRESS'" (contentChanged)="cms.updateMarquee('text1', $event)"></app-editable-text></span>
          <span class="flex items-center gap-4 text-nutriflow-yellow"><app-editable-text [textValue]="cms.content()?.marquee?.text2 || 'SIN AZÚCAR AÑADIDA'" (contentChanged)="cms.updateMarquee('text2', $event)"></app-editable-text></span>
          <span class="flex items-center gap-4"><app-editable-text [textValue]="cms.content()?.marquee?.text3 || 'HECHO EN PERÚ'" (contentChanged)="cms.updateMarquee('text3', $event)"></app-editable-text></span>
        </div>
        <!-- Segundo Grupo (Bucle Infinito) -->
        <div class="flex items-center gap-12 md:gap-24">
          <span class="flex items-center gap-4"><app-editable-text [textValue]="cms.content()?.marquee?.text1 || '100% COLD PRESS'" (contentChanged)="cms.updateMarquee('text1', $event)"></app-editable-text></span>
          <span class="flex items-center gap-4 text-nutriflow-yellow"><app-editable-text [textValue]="cms.content()?.marquee?.text2 || 'SIN AZÚCAR AÑADIDA'" (contentChanged)="cms.updateMarquee('text2', $event)"></app-editable-text></span>
          <span class="flex items-center gap-4"><app-editable-text [textValue]="cms.content()?.marquee?.text3 || 'HECHO EN PERÚ'" (contentChanged)="cms.updateMarquee('text3', $event)"></app-editable-text></span>
        </div>
      </div>
    </div>

    <!-- TESTIMONIOS (Igual que antes) -->
    <section class="py-24 bg-nutriflow-cream relative z-10">
      <div class="container mx-auto px-6 max-w-7xl">
        <h2 class="text-4xl md:text-5xl font-black text-center text-nutriflow-green-dark tracking-tighter uppercase mb-4">La Tribu Nutriflow</h2>
        <p class="text-center text-gray-500 font-bold mb-16">Lo que dice nuestra comunidad en redes.</p>
        <div class="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory scroll-smooth justify-start md:justify-center items-stretch" style="scrollbar-width: none;">
          @for (testimonio of cms.content()?.testimonials; track testimonio.id) {
            <div class="min-w-[260px] md:w-[300px] h-[450px] md:h-[500px] flex-shrink-0 snap-center relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-black group cursor-pointer">
              
              <app-editable-video [mediaUrl]="testimonio.videoUrl" mediaClasses="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" (mediaChanged)="cms.updateTestimonial(testimonio.id, $event)"></app-editable-video>
              
              <div class="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 bg-gradient-to-t from-black/80 via-transparent to-transparent">
                <div class="self-end bg-white/20 backdrop-blur-md rounded-full p-2"><svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>
                
                <div class="flex flex-col gap-2 mt-auto">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-nutriflow-yellow flex items-center justify-center border-2 border-white text-nutriflow-green-dark font-black flex-shrink-0">@</div>
                    <!-- ENLACE Y TEXTO EDITABLE -->
                    <a [href]="cms.isEditMode() ? 'javascript:void(0)' : (testimonio.linkUrl || '#')" 
                       (click)="handleLinkClick($event)"
                       [target]="cms.isEditMode() ? '_self' : '_blank'" 
                       class="text-white/90 hover:text-white font-black text-sm md:text-base tracking-wide transition-colors pointer-events-auto flex items-center gap-1 group/link">
                      <app-editable-text 
                        [textValue]="testimonio.username || '@usuario'" 
                        customClasses="inline-block border-b border-transparent group-hover/link:border-white transition-colors" 
                        (contentChanged)="cms.updateTestimonialField(testimonio.id, 'username', $event)">
                      </app-editable-text>
                    </a>
                  </div>
                  
                  @if (cms.isEditMode()) {
                    <button (click)="editTestimonialLink(testimonio.id, testimonio.linkUrl || '')" class="pointer-events-auto bg-white/20 text-white text-[9px] px-3 py-1 rounded-full uppercase tracking-widest backdrop-blur-sm self-start hover:bg-white/40 transition-colors border border-white/30 ml-[52px]">
                      🔗 Cambiar Enlace Web
                    </button>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- BLOG SECTION (Igual que antes) -->
    <!-- ... Resto del código intacto ... -->
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