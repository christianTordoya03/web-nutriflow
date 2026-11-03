import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsStateService } from '../../core/services/cms-state';
import { EditableTextComponent } from '../../shared/components/editable-text/editable-text';
import { EditableImageComponent } from '../../shared/components/editable-image/editable-image';
import { EditableVideoComponent } from '../../shared/components/editable-video/editable-video';

@Component({
  selector: 'app-conocenos-page',
  standalone: true,
  imports: [CommonModule, EditableTextComponent, EditableImageComponent, EditableVideoComponent],
  template: `
    <div class="pt-28 pb-20 min-h-screen bg-nutriflow-cream relative z-10 overflow-hidden">
      <!-- Textura de fondo -->
      <div class="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply z-0" style="background-image: url('/image_d1ff89.jpg'); background-size: cover; background-position: center; background-attachment: fixed;"></div>
      
      <div class="container mx-auto px-6 max-w-7xl relative z-10">
        
        <!-- HEADER / FUNDADORAS (Imagen Enorme) -->
        <section class="mb-32">
          <div class="text-center mb-12">
            <app-editable-text [textValue]="cms.content()!.conocenosPage.heroTitle" customClasses="block text-5xl md:text-7xl font-black text-nutriflow-green-dark tracking-tighter uppercase mb-4" (contentChanged)="cms.updateConocenos('heroTitle', $event)"></app-editable-text>
            <app-editable-text [textValue]="cms.content()!.conocenosPage.heroSubtitle" customClasses="block text-lg md:text-2xl font-medium text-gray-500 max-w-3xl mx-auto" (contentChanged)="cms.updateConocenos('heroSubtitle', $event)"></app-editable-text>
          </div>
          
          <div class="w-full aspect-[16/9] md:aspect-[21/9] bg-gray-200 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white relative group">
            <app-editable-image [imageUrl]="cms.content()!.conocenosPage.heroImg" containerClasses="absolute inset-0 w-full h-full" imgClasses="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-700" (imageChanged)="cms.updateConocenos('heroImg', $event)"></app-editable-image>
          </div>
        </section>

        <!-- EL POR QUÉ -->
        <section class="flex flex-col md:flex-row items-center gap-12 lg:gap-24 mb-32">
          <div class="w-full md:w-1/2 relative group">
             <div class="absolute inset-0 bg-[#e8e4db] rounded-[3rem] transform -translate-x-4 translate-y-4 group-hover:-translate-x-6 group-hover:translate-y-6 transition-transform duration-500 border-2 border-white/50 shadow-lg"></div>
             <div class="relative aspect-square rounded-[3rem] overflow-hidden shadow-xl bg-white border-[6px] border-white z-10">
               <app-editable-image [imageUrl]="cms.content()!.conocenosPage.porQueImg" containerClasses="absolute inset-0 w-full h-full" imgClasses="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-700" (imageChanged)="cms.updateConocenos('porQueImg', $event)"></app-editable-image>
             </div>
          </div>
          <div class="w-full md:w-1/2 flex flex-col justify-center">
            <app-editable-text [textValue]="cms.content()!.conocenosPage.porQueTitle" customClasses="block text-5xl md:text-6xl font-black text-nutriflow-green-dark tracking-tighter uppercase mb-6" (contentChanged)="cms.updateConocenos('porQueTitle', $event)"></app-editable-text>
            <div class="w-20 h-1.5 bg-nutriflow-yellow mb-8 rounded-full"></div>
            <app-editable-text [textValue]="cms.content()!.conocenosPage.porQueText" customClasses="block text-xl text-gray-700 font-medium leading-relaxed" (contentChanged)="cms.updateConocenos('porQueText', $event)"></app-editable-text>
          </div>
        </section>

        <!-- EL PARA QUÉ -->
        <section class="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24 mb-32">
          <div class="w-full md:w-1/2 relative group">
             <div class="absolute inset-0 bg-[#e8e4db] rounded-[3rem] transform translate-x-4 translate-y-4 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500 border-2 border-white/50 shadow-lg"></div>
             <div class="relative aspect-square rounded-[3rem] overflow-hidden shadow-xl bg-white border-[6px] border-white z-10">
               <app-editable-image [imageUrl]="cms.content()!.conocenosPage.paraQueImg" containerClasses="absolute inset-0 w-full h-full" imgClasses="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-700" (imageChanged)="cms.updateConocenos('paraQueImg', $event)"></app-editable-image>
             </div>
          </div>
          <div class="w-full md:w-1/2 flex flex-col justify-center">
            <app-editable-text [textValue]="cms.content()!.conocenosPage.paraQueTitle" customClasses="block text-5xl md:text-6xl font-black text-nutriflow-green-dark tracking-tighter uppercase mb-6" (contentChanged)="cms.updateConocenos('paraQueTitle', $event)"></app-editable-text>
            <div class="w-20 h-1.5 bg-nutriflow-yellow mb-8 rounded-full"></div>
            <app-editable-text [textValue]="cms.content()!.conocenosPage.paraQueText" customClasses="block text-xl text-gray-700 font-medium leading-relaxed" (contentChanged)="cms.updateConocenos('paraQueText', $event)"></app-editable-text>
          </div>
        </section>

        <!-- NUESTRA FILOSOFÍA (Mudada desde el Diario) -->
        <section class="w-full relative z-10">
          <div class="bg-white/60 p-10 md:p-16 rounded-[3rem] backdrop-blur-sm border border-white/50 shadow-xl flex flex-col items-center text-center">
            <div class="inline-flex items-center bg-[#2c3e2e] text-white font-bold text-xs px-5 py-2.5 rounded-full uppercase tracking-widest mb-6">
              NUESTRO NORTE
            </div>
            <app-editable-text [textValue]="cms.content()!.conocenosPage.filosofiaTitle" customClasses="block text-5xl md:text-6xl font-black text-nutriflow-green-dark tracking-tighter uppercase mb-6" (contentChanged)="cms.updateConocenos('filosofiaTitle', $event)"></app-editable-text>
            <app-editable-text [textValue]="cms.content()!.conocenosPage.filosofiaText" customClasses="block text-xl text-gray-700 font-medium leading-relaxed max-w-3xl mx-auto mb-12" (contentChanged)="cms.updateConocenos('filosofiaText', $event)"></app-editable-text>
            
            <div class="w-full max-w-5xl aspect-video bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white relative">
              <app-editable-video [mediaUrl]="cms.content()!.conocenosPage.filosofiaVideo" mediaClasses="object-cover object-center w-full h-full" (mediaChanged)="cms.updateConocenos('filosofiaVideo', $event)"></app-editable-video>
            </div>
          </div>
        </section>

      </div>
    </div>
  `
})
export class ConocenosPageComponent {
  cms = inject(CmsStateService);
}