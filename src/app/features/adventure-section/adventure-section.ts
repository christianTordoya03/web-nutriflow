import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsStateService } from '../../core/services/cms-state';
import { EditableTextComponent } from '../../shared/components/editable-text/editable-text';
import { EditableImageComponent } from '../../shared/components/editable-image/editable-image';
import { EditableVideoComponent } from '../../shared/components/editable-video/editable-video';

@Component({
  selector: 'app-adventure-section',
  standalone: true,
  imports: [CommonModule, EditableTextComponent, EditableImageComponent, EditableVideoComponent],
  template: `
    <section class="py-32 relative z-10 bg-nutriflow-cream overflow-hidden">
      
      <div class="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 -mt-[1px] z-0">
        <svg class="relative block w-[calc(100%+1.3px)] h-[40px] md:h-[70px]" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.34,196.3,109.84C239.5,103.52,282.72,83.1,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>

      <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] -mb-[1px] z-0">
        <svg class="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[90px]" preserveAspectRatio="none" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.34,196.3,109.84C239.5,103.52,282.72,83.1,321.39,56.44Z" class="fill-nutriflow-yellow"></path>
        </svg>
      </div>

      <div class="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply z-0" style="background-image: url('/image_d1ff89.jpg'); background-size: cover; background-position: center;"></div>

      <div class="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-12 max-w-6xl relative z-10">
        
        <div class="w-full lg:w-5/12 flex flex-col text-center lg:text-left">
          <app-editable-text [textValue]="cms.content()!.adventure.title" customClasses="block text-4xl md:text-5xl font-black text-nutriflow-green-dark mb-8 uppercase tracking-tighter leading-tight" (contentChanged)="updateField('title', $event)"></app-editable-text>
          
          <div class="space-y-6 text-nutriflow-green-dark pl-0 lg:pl-5 border-l-0 lg:border-l-4 border-nutriflow-yellow mx-auto lg:mx-0 max-w-md">
            <div><span class="block text-lg md:text-xl font-black italic mb-1 uppercase tracking-tight">1. AGITA</span><app-editable-text [textValue]="cms.content()!.adventure.step1" customClasses="text-base font-medium opacity-80" (contentChanged)="updateField('step1', $event)"></app-editable-text></div>
            <div><span class="block text-lg md:text-xl font-black italic mb-1 uppercase tracking-tight">2. ABRE</span><app-editable-text [textValue]="cms.content()!.adventure.step2" customClasses="text-base font-medium opacity-80" (contentChanged)="updateField('step2', $event)"></app-editable-text></div>
            <div><span class="block text-lg md:text-xl font-black italic mb-1 uppercase tracking-tight">3. TÓMALO</span><app-editable-text [textValue]="cms.content()!.adventure.step3" customClasses="text-base font-medium opacity-80" (contentChanged)="updateField('step3', $event)"></app-editable-text></div>
          </div>
        </div>
        
        <!-- ALTURA Y ANCHO CONTROLADOS: Se redujo a h-[380px] - h-[450px] -->
        <div class="w-full lg:w-6/12 max-w-lg h-[380px] md:h-[450px] mx-auto rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl bg-gray-200 border-[6px] border-white relative">
          <app-editable-video [mediaUrl]="cms.content()!.adventure.videoUrl" (mediaChanged)="updateField('videoUrl', $event)"></app-editable-video>
        </div>

      </div>
    </section>

    <!-- CAROUSEL ZIG-ZAG -->
    <section class="relative bg-nutriflow-yellow pt-16 pb-24 z-0 overflow-hidden -mt-[1px]">
      <div class="container mx-auto px-6 mb-8 text-center relative z-10">
        <app-editable-text [textValue]="cms.content()!.adventure.carouselTitle" customClasses="block text-4xl md:text-6xl font-black text-nutriflow-green-dark uppercase tracking-tighter mb-4" (contentChanged)="updateField('carouselTitle', $event)"></app-editable-text>
        <app-editable-text [textValue]="cms.content()!.adventure.carouselSubtitle" customClasses="block text-lg font-bold text-nutriflow-green-dark/80 max-w-xl mx-auto" (contentChanged)="updateField('carouselSubtitle', $event)"></app-editable-text>
      </div>
      
      <style>
        .marquee-wrapper { width: max-content; display: flex; animation: scroll-marquee 40s linear infinite; }
        .marquee-wrapper:hover { animation-play-state: paused; cursor: pointer; }
        @keyframes scroll-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      </style>
      
      <div class="w-full">
        <div class="marquee-wrapper pt-10 pb-16 px-6 gap-6 items-center">
          @for (img of cms.content()?.adventure?.carouselImages; track img.id) {
            <div class="w-64 h-72 md:w-72 md:h-80 rounded-[2rem] overflow-hidden flex-shrink-0 shadow-lg bg-gray-100 transition-transform duration-500 hover:scale-105 border-[6px] border-white odd:-translate-y-6 even:translate-y-6 relative block">
              <app-editable-image [imageUrl]="img.imageUrl" containerClasses="absolute inset-0 w-full h-full" imgClasses="object-cover w-full h-full" (imageChanged)="cms.updateAdventureImage(img.id, $event)"></app-editable-image>
            </div>
          }
          @for (img of cms.content()?.adventure?.carouselImages; track img.id + 'clone') {
            <div class="w-64 h-72 md:w-72 md:h-80 rounded-[2rem] overflow-hidden flex-shrink-0 shadow-lg bg-gray-100 transition-transform duration-500 hover:scale-105 border-[6px] border-white odd:-translate-y-6 even:translate-y-6 relative block">
              <img [src]="img.imageUrl" class="absolute inset-0 w-full h-full object-cover" onerror="this.src='https://placehold.co/400x400/eeeeee/999999?text=Sin+Imagen'">
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class AdventureSectionComponent {
  cms = inject(CmsStateService);
  updateField(field: string, value: string) { this.cms.updateContent('adventure', field, value); }
}