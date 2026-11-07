import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsStateService } from '../../core/services/cms-state';
import { EditableTextComponent } from '../../shared/components/editable-text/editable-text';
import { EditableImageComponent } from '../../shared/components/editable-image/editable-image';

@Component({
  selector: 'app-conocenos-page',
  standalone: true,
  imports: [CommonModule, EditableTextComponent, EditableImageComponent],
  template: `
    <!-- ESTILO EDITORIAL SUJA ORGANIC CON HOJAS REALISTAS -->
    <div class="min-h-screen bg-nutriflow-cream relative z-10 font-montserrat overflow-hidden">
      
      <style>
        @keyframes spin-slow { 100% { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        
        /* Animaciones para las hojas flotantes (Viento suave) */
        @keyframes float-leaf-1 { 
          0%, 100% { transform: translate(0, 0) rotate(15deg); } 
          50% { transform: translate(20px, 30px) rotate(25deg); } 
        }
        @keyframes float-leaf-2 { 
          0%, 100% { transform: translate(0, 0) rotate(-45deg) scale(0.8); } 
          50% { transform: translate(-30px, -20px) rotate(-60deg) scale(0.8); } 
        }
        @keyframes float-leaf-3 { 
          0%, 100% { transform: translate(0, 0) rotate(75deg) scale(0.5); } 
          50% { transform: translate(15px, -40px) rotate(90deg) scale(0.5); } 
        }
        .animate-float-1 { animation: float-leaf-1 8s ease-in-out infinite; }
        .animate-float-2 { animation: float-leaf-2 12s ease-in-out infinite; }
        .animate-float-3 { animation: float-leaf-3 10s ease-in-out infinite; }
      </style>

      <!-- ELEMENTOS FLOTANTES GLOBALES (Siluetas Realistas + Efecto Desenfoque Fotográfico) -->
      
      <!-- Hoja 1 (Arriba Izquierda) -->
      <div class="absolute top-[20%] left-[2%] text-[#e0e8c7] z-0 animate-float-1 pointer-events-none opacity-80 blur-[2px]">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,60 C 20,20 80,10 95,40 C 80,80 20,90 10,60 Z"/>
        </svg>
      </div>
      <!-- Hoja 2 (Medio Derecha) -->
      <div class="absolute top-[45%] right-[5%] text-[#d1dbb8] z-0 animate-float-2 pointer-events-none opacity-70 blur-[1px]">
        <svg width="150" height="150" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,60 C 20,20 80,10 95,40 C 80,80 20,90 10,60 Z"/>
        </svg>
      </div>
      <!-- Hoja 3 (Abajo Izquierda) -->
      <div class="absolute bottom-[25%] left-[8%] text-[#d1dbb8] z-0 animate-float-3 pointer-events-none opacity-60 blur-[3px]">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,60 C 20,20 80,10 95,40 C 80,80 20,90 10,60 Z"/>
        </svg>
      </div>

      <!-- ============================================== -->
      <!-- HERO EDITORIAL BOLD -->
      <!-- ============================================== -->
      <section class="relative pt-36 pb-32 md:pt-48 md:pb-40 overflow-visible">
        
        <!-- MARCA DE AGUA GIGANTE (Silueta realista, movida hacia el centro para no cortarse) -->
        <div class="absolute top-10 left-10 md:top-16 md:left-20 text-[#e6ecd5] transform -rotate-12 z-0 pointer-events-none">
           <svg width="350" height="350" class="md:w-[450px] md:h-[450px]" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="overflow: visible;">
             <path d="M10,60 C 20,20 80,10 95,40 C 80,80 20,90 10,60 Z"/>
           </svg>
        </div>

        <div class="container mx-auto px-6 max-w-[1400px] relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-16">
          
          <div class="w-full md:w-[45%] flex flex-col items-start text-left relative z-20">
            <div class="bg-nutriflow-yellow text-nutriflow-green-dark px-6 py-2.5 rounded-full font-black uppercase tracking-[0.2em] text-xs md:text-sm shadow-lg transform -rotate-2 mb-8 border-2 border-white">
              <app-editable-text [textValue]="cms.content()!.conocenosPage.heroSubtitle" (contentChanged)="cms.updateConocenos('heroSubtitle', $event)"></app-editable-text>
            </div>

            <app-editable-text 
              [textValue]="cms.content()!.conocenosPage.heroTitle" 
              customClasses="block text-[5rem] md:text-7xl lg:text-[8.5rem] font-black text-nutriflow-green-dark tracking-tighter uppercase leading-[0.85] drop-shadow-sm" 
              (contentChanged)="cms.updateConocenos('heroTitle', $event)">
            </app-editable-text>
            
            <div class="flex items-start gap-5 mt-10 w-full pl-2">
               <div class="hidden md:block w-1.5 h-16 bg-nutriflow-green-light rounded-full flex-shrink-0 mt-1"></div>
               <app-editable-text 
                 [textValue]="$any(cms.content()?.conocenosPage)?.heroIntro || 'Nacimos con una misión clara: revolucionar tu energía diaria con nutrición 100% real, pura y prensada en frío. Sin filtros, sin atajos.'" 
                 customClasses="block text-lg md:text-xl lg:text-2xl font-bold text-nutriflow-green-dark/80 leading-relaxed max-w-lg" 
                 (contentChanged)="cms.updateConocenos('heroIntro', $event)">
               </app-editable-text>
            </div>
          </div>

          <div class="w-full md:w-[55%] relative flex justify-end mt-16 md:mt-0">
            <div class="absolute inset-0 bg-nutriflow-green-light rounded-[3rem] md:rounded-full transform translate-x-4 translate-y-6 md:translate-x-10 md:translate-y-10 scale-[0.96]"></div>

            <div class="relative w-full aspect-[4/5] md:aspect-[3/4] rounded-[3rem] md:rounded-full overflow-hidden shadow-2xl z-10 border-[8px] md:border-[16px] border-white bg-gray-200 group">
              <app-editable-image 
                 [imageUrl]="cms.content()!.conocenosPage.heroImg" 
                 containerClasses="absolute inset-0 w-full h-full" 
                 imgClasses="object-cover object-center w-full h-full group-hover:scale-105 transition-transform duration-1000" 
                 (imageChanged)="cms.updateConocenos('heroImg', $event)">
              </app-editable-image>
            </div>
            
            <!-- STICKER GIRATORIO EDITABLE -->
            <div class="absolute -bottom-6 -left-4 md:-bottom-8 md:left-4 w-32 h-32 md:w-44 md:h-44 bg-nutriflow-yellow rounded-full text-nutriflow-green-dark font-black text-sm md:text-base uppercase flex items-center justify-center text-center p-4 shadow-xl animate-spin-slow hover:[animation-play-state:paused] hover:scale-105 transition-transform z-30 border-[6px] md:border-[10px] border-nutriflow-cream cursor-pointer">
              <!-- Usamos app-editable-text para que puedas cambiar el texto directo desde la web -->
              <app-editable-text 
                [textValue]="$any(cms.content()?.conocenosPage)?.stickerText || 'Nuestra Historia'" 
                customClasses="block leading-[1.1]" 
                (contentChanged)="cms.updateConocenos('stickerText', $event)">
              </app-editable-text>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================================== -->
      <!-- EL POR QUÉ -->
      <!-- ============================================== -->
      <section class="relative bg-white pt-24 pb-32">
        <div class="absolute top-0 left-0 w-full overflow-hidden leading-none transform rotate-180 -mt-[1px]">
          <svg class="relative block w-full h-[50px] md:h-[100px]" preserveAspectRatio="none" viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0 C480,140 960,140 1440,0 L1440,120 L0,120 Z" class="fill-nutriflow-cream"></path>
          </svg>
        </div>

        <div class="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center gap-16 md:gap-24 relative z-10">
          <div class="w-full md:w-1/2 relative flex justify-center">
            <div class="absolute inset-0 bg-nutriflow-yellow rounded-full transform -translate-x-6 translate-y-6 opacity-60 scale-95"></div>
            <div class="relative w-full max-w-md aspect-[3/4] md:aspect-[4/5] rounded-full overflow-hidden shadow-2xl border-[8px] border-white z-10 bg-gray-200">
               <app-editable-image 
                 [imageUrl]="cms.content()!.conocenosPage.porQueImg" 
                 containerClasses="absolute inset-0 w-full h-full" 
                 imgClasses="object-cover object-center w-full h-full hover:scale-105 transition-transform duration-700" 
                 (imageChanged)="cms.updateConocenos('porQueImg', $event)">
               </app-editable-image>
            </div>
          </div>

          <div class="w-full md:w-1/2 flex flex-col items-start relative z-20">
            <app-editable-text 
               [textValue]="cms.content()!.conocenosPage.porQueTitle" 
               customClasses="block text-xl md:text-3xl font-black text-nutriflow-green-light uppercase tracking-widest mb-4" 
               (contentChanged)="cms.updateConocenos('porQueTitle', $event)">
            </app-editable-text>
            <app-editable-text 
               [textValue]="cms.content()!.conocenosPage.porQueText" 
               customClasses="block text-[2.5rem] md:text-5xl lg:text-[4.5rem] font-black text-nutriflow-green-dark tracking-tighter leading-[0.95]" 
               (contentChanged)="cms.updateConocenos('porQueText', $event)">
            </app-editable-text>
          </div>
        </div>
      </section>

      <!-- ============================================== -->
      <!-- EL PARA QUÉ -->
      <!-- ============================================== -->
      <section class="relative bg-nutriflow-green-dark pt-32 pb-32">
        <div class="absolute top-0 left-0 w-full overflow-hidden leading-none transform rotate-180 -mt-[1px]">
          <svg class="relative block w-full h-[60px] md:h-[120px]" preserveAspectRatio="none" viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,80 C320,0 720,0 1440,80 L1440,120 L0,120 Z" class="fill-white"></path>
          </svg>
        </div>

        <div class="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row-reverse items-center gap-16 md:gap-24 relative z-10">
          
          <div class="w-full md:w-1/2 relative flex justify-center">
            <div class="absolute inset-0 bg-nutriflow-green-light rounded-full transform translate-x-6 translate-y-6 scale-95"></div>
            <div class="relative w-full max-w-md aspect-[4/5] rounded-full overflow-hidden shadow-2xl border-4 md:border-8 border-nutriflow-green-dark z-10 bg-gray-200">
               <app-editable-image 
                 [imageUrl]="cms.content()!.conocenosPage.paraQueImg" 
                 containerClasses="absolute inset-0 w-full h-full" 
                 imgClasses="object-cover object-center w-full h-full hover:scale-105 transition-transform duration-700" 
                 (imageChanged)="cms.updateConocenos('paraQueImg', $event)">
               </app-editable-image>
            </div>
            
            <!-- Estrella/Hoja en sección verde -->
            <div class="absolute -bottom-2 -left-2 md:-bottom-6 md:-left-6 z-30 text-nutriflow-yellow transform rotate-12">
               <svg width="100" height="100" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                 <path d="M10,60 C 20,20 80,10 95,40 C 80,80 20,90 10,60 Z"/>
               </svg>
            </div>
          </div>

          <div class="w-full md:w-1/2 flex flex-col items-start relative z-20">
            <app-editable-text 
               [textValue]="cms.content()!.conocenosPage.paraQueTitle" 
               customClasses="block text-xl md:text-3xl font-black text-nutriflow-yellow uppercase tracking-widest mb-4" 
               (contentChanged)="cms.updateConocenos('paraQueTitle', $event)">
            </app-editable-text>
            <app-editable-text 
               [textValue]="cms.content()!.conocenosPage.paraQueText" 
               customClasses="block text-[2.5rem] md:text-5xl lg:text-[4.5rem] font-black text-white tracking-tighter leading-[0.95]" 
               (contentChanged)="cms.updateConocenos('paraQueText', $event)">
            </app-editable-text>
          </div>
        </div>
      </section>

      <!-- ============================================== -->
      <!-- FILOSOFIA (Imagen Izquierda, Texto Derecha)    -->
      <!-- ============================================== -->
      <section class="relative bg-nutriflow-yellow pt-32 pb-32">
        <div class="absolute top-0 left-0 w-full overflow-hidden leading-none transform rotate-180 -mt-[1px]">
          <svg class="relative block w-full h-[60px] md:h-[120px]" preserveAspectRatio="none" viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,120 C480,0 960,0 1440,120 L1440,120 L0,120 Z" class="fill-nutriflow-green-dark"></path>
          </svg>
        </div>

        <div class="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center gap-12 lg:gap-20 relative z-10">
          
          <!-- IMAGEN (Lado Izquierdo) -->
          <div class="w-full md:w-1/2 relative flex justify-center md:justify-end">
            <!-- Sombra circular desplazada color crema -->
            <div class="absolute inset-0 bg-[#f0ebd8] rounded-full transform translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6 max-w-[18rem] md:max-w-[26rem] mx-auto md:mr-0 aspect-square"></div>
            
            <!-- Contenedor circular perfecto (aspect-square) -->
            <div class="relative w-full max-w-[18rem] md:max-w-[26rem] aspect-square rounded-full overflow-hidden shadow-sm z-10 bg-[#fdfbf4]">
               <app-editable-image 
                 [imageUrl]="cms.content()!.conocenosPage.filosofiaVideo" 
                 containerClasses="absolute inset-0 w-full h-full" 
                 imgClasses="object-cover object-center w-full h-full hover:scale-105 transition-transform duration-700" 
                 (imageChanged)="cms.updateConocenos('filosofiaVideo', $event)">
               </app-editable-image>
            </div>
          </div>

          <!-- TEXTO (Lado Derecho) -->
          <div class="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left mt-8 md:mt-0">
            
            <!-- Etiqueta superior recta (sin rotación) -->
            <div class="bg-white text-nutriflow-green-dark font-black uppercase tracking-[0.2em] text-[10px] md:text-xs mb-6 px-5 py-2.5 rounded-full shadow-sm inline-block">
              <app-editable-text [textValue]="cms.content()!.conocenosPage.filosofiaTitle" (contentChanged)="cms.updateConocenos('filosofiaTitle', $event)"></app-editable-text>
            </div>
            
            <!-- Texto alineado y ajustado -->
            <app-editable-text 
               [textValue]="cms.content()!.conocenosPage.filosofiaText" 
               customClasses="block text-[2.5rem] md:text-5xl lg:text-[4rem] font-black text-nutriflow-green-dark tracking-tighter leading-[1.05]" 
               (contentChanged)="cms.updateConocenos('filosofiaText', $event)">
            </app-editable-text>
          </div>

        </div>
      </section>

    </div>
  `
})
export class ConocenosPageComponent {
  cms = inject(CmsStateService);
}