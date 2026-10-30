import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CmsStateService } from '../../core/services/cms-state';
import { EditableTextComponent } from '../../shared/components/editable-text/editable-text';
import { EditableImageComponent } from '../../shared/components/editable-image/editable-image';

@Component({
  selector: 'app-blog-section',
  standalone: true,
  imports: [CommonModule, RouterModule, EditableTextComponent, EditableImageComponent],
  template: `
    <section class="relative pt-24 pb-20 bg-white z-20 overflow-hidden">
      
      <!-- ONDA SUPERIOR: Transición suave de Crema a Blanco -->
      <div class="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 -mt-[1px] z-0">
        <svg class="relative block w-[calc(100%+1.3px)] h-[40px] md:h-[70px]" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.34,196.3,109.84C239.5,103.52,282.72,83.1,321.39,56.44Z" class="fill-nutriflow-cream"></path>
        </svg>
      </div>

      <!-- TEXTURA DE HOJAS (Sutil) -->
      <div class="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply z-0" style="background-image: url('/image_d1ff89.jpg'); background-size: cover; background-position: center;"></div>

      <div class="container mx-auto px-6 relative z-10 max-w-6xl">
        
        <div class="mb-12 text-center">
          <app-editable-text [textValue]="cms.content()!.blog.title" customClasses="text-4xl md:text-5xl font-black text-nutriflow-green-dark tracking-tighter" (contentChanged)="updateField('title', $event)"></app-editable-text>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          @for (article of cms.content()?.blog?.articles; track article.id) {
            <!-- Se desactiva routerLink si está en modo edición -->
            <div [routerLink]="cms.isEditMode() ? null : '/diario'" class="flex flex-col bg-white rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div class="w-full aspect-[4/5] relative overflow-hidden bg-gray-100">
                <app-editable-image [imageUrl]="article.imageUrl" containerClasses="absolute inset-0 w-full h-full" imgClasses="object-cover w-full h-full hover:scale-105 transition-transform duration-700" (imageChanged)="cms.updateBlogArticle(article.id, 'imageUrl', $event)"></app-editable-image>
              </div>
              <div class="p-6 md:p-8 flex flex-col justify-center text-center flex-grow bg-white">
                <app-editable-text [textValue]="article.title" customClasses="block text-lg md:text-xl font-black text-nutriflow-green-dark leading-tight" (contentChanged)="cms.updateBlogArticle(article.id, 'title', $event)"></app-editable-text>
              </div>
            </div>
          }
        </div>

        <!-- ENLACE TEXTUAL CON FLECHA -->
        <div class="text-center">
          <a [routerLink]="cms.isEditMode() ? null : '/diario'" class="inline-flex items-center gap-3 text-nutriflow-green-dark font-black text-xs md:text-sm tracking-widest uppercase hover:text-nutriflow-green-light transition-colors group cursor-pointer border-b-2 border-transparent hover:border-nutriflow-green-light pb-1">
            <app-editable-text [textValue]="cms.content()!.blog.buttonText" (contentChanged)="updateField('buttonText', $event)"></app-editable-text>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-4 h-4 transition-transform group-hover:translate-x-1"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </a>
        </div>

      </div>
    </section>
  `
})
export class BlogSectionComponent {
  cms = inject(CmsStateService);
  updateField(field: string, value: string) { this.cms.updateContent('blog', field, value); }
}