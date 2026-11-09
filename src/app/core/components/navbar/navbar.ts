import { Component, inject, HostListener, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { CmsStateService } from '../../services/cms-state';
import { EditableImageComponent } from '../../../shared/components/editable-image/editable-image';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, EditableImageComponent],
  template: `
    <!-- NAVBAR PRINCIPAL (Efecto Cristal) -->
    <nav class="w-full z-[100] transition-all duration-500"
         [ngClass]="isScrolled() ? 'fixed top-0 bg-white/30 backdrop-blur-md shadow-sm border-b border-white/30 py-3' : 'absolute w-full bg-transparent py-5'">
      <div class="container mx-auto px-6 max-w-7xl flex items-center justify-between mt-0">
        
        <!-- ENLACES CON ESTADO ACTIVO (Solo Desktop) -->
        <div class="hidden md:flex items-center gap-8 w-1/3">
          <a href="/" [class]="getNavLinkClass('/')">Inicio</a>
          <a href="/conocenos" [class]="getNavLinkClass('/conocenos')">Conócenos</a>
          <a href="/#tienda" [class]="getNavLinkClass('/#tienda')">Tienda</a>
          <a href="/diario" [class]="getNavLinkClass('/diario')">Diario</a>
        </div>

        <!-- Botón Hamburguesa (Solo Móvil - Diseño simple y efectivo) -->
        <div class="w-1/3 flex justify-start md:hidden">
          <button class="focus:outline-none transition-transform hover:scale-105" [ngClass]="isScrolled() ? 'text-nutriflow-green-dark' : 'text-white'" (click)="toggleMenu()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-9 h-9">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>

        <!-- LOGO (Cambia al hacer scroll) -->
        <div class="w-1/3 flex justify-center transition-all duration-500 relative z-[130]">
          <div class="w-32 md:w-56 h-10 md:h-16 relative">
            @if(cms.isEditMode()){
              <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 z-[60] bg-black/90 text-white text-[8px] px-2 py-0.5 rounded-full uppercase tracking-widest whitespace-nowrap border border-white/20 hidden md:block">
                {{ isScrolled() ? 'Logo Scroll (Sólido)' : 'Logo Top (Blanco)' }}
              </div>
            }
            <!-- Logo Blanco (Top) -->
            <div class="absolute inset-0 w-full h-full transition-opacity duration-300" [class.opacity-0]="isScrolled()" [class.opacity-100]="!isScrolled()" [class.pointer-events-none]="isScrolled()">
               <app-editable-image [imageUrl]="cms.content()?.navbar?.logoUrl || '/logo.png'" containerClasses="absolute inset-0 w-full h-full" imgClasses="object-contain object-center w-full h-full" (imageChanged)="cms.updateNavbar('logoUrl', $event)"></app-editable-image>
            </div>
            <!-- Logo Sólido (Al bajar) -->
            <div class="absolute inset-0 w-full h-full transition-opacity duration-300" [class.opacity-0]="!isScrolled()" [class.opacity-100]="isScrolled()" [class.pointer-events-none]="!isScrolled()">
               <app-editable-image [imageUrl]="cms.content()?.navbar?.scrolledLogoUrl || '/Logotipo_NFF_01.png'" containerClasses="absolute inset-0 w-full h-full" imgClasses="object-contain object-center w-full h-full" (imageChanged)="cms.updateNavbar('scrolledLogoUrl', $event)"></app-editable-image>
            </div>
          </div>
        </div>

        <!-- REDES Y BOLSO DE COMPRAS -->
        <div class="w-1/3 flex items-center justify-end gap-6 relative z-[130]">
          <a [href]="cms.content()?.navbar?.instagramUrl" target="_blank" class="hidden md:flex transition-transform hover:scale-110" [ngClass]="isScrolled() ? 'text-nutriflow-green-dark' : 'text-white'">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          @if (cms.isEditMode()) {
            <button (click)="editInstagram()" class="hidden md:block text-[10px] bg-white text-black px-2 py-1 rounded-full absolute top-8 right-12 border shadow-lg z-50">🔗 IG</button>
          }
          
          <button (click)="cms.isCartOpen.set(true)" class="relative transition-transform duration-300 flex items-center cursor-pointer hover:scale-110" [ngClass]="isScrolled() ? 'text-nutriflow-green-dark' : 'text-white'">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-7 h-7 md:w-8 md:h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
            @if (cartItems().length > 0) {
              <span class="absolute -top-1 -right-1 md:-right-2 bg-nutriflow-yellow text-nutriflow-green-dark text-[10px] font-black w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full border border-white shadow-sm">
                {{ cartItems().length }}
              </span>
            }
          </button>
        </div>
      </div>
    </nav>

    <!-- ============================================== -->
    <!-- MENÚ MÓVIL (Rediseñado con botón CERRAR claro) -->
    <!-- ============================================== -->
    <div class="md:hidden fixed inset-0 bg-nutriflow-cream z-[200] transition-transform duration-500 ease-in-out flex flex-col"
         [class.translate-x-0]="isMenuOpen()" [class.-translate-x-full]="!isMenuOpen()">
      
      <!-- Header del Menú Móvil -->
      <div class="flex items-center justify-between h-20 px-6 border-b border-nutriflow-green-dark/10 bg-white">
        <span class="text-2xl font-black tracking-tighter text-nutriflow-green-dark">NÜTRIFLOW</span>
        
        <!-- EL BOTÓN CLARO PARA CERRAR -->
        <button (click)="closeMenu()" class="bg-nutriflow-green-dark text-white rounded-full p-2 shadow-md hover:scale-105 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div class="flex flex-col gap-6 flex-grow px-8 pt-10 relative overflow-hidden">
        <!-- Hoja decorativa de fondo -->
        <svg class="absolute -bottom-10 -right-10 text-nutriflow-green-light/20 w-64 h-64 transform rotate-12 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
           <path d="M10,60 C 20,20 80,10 95,40 C 80,80 20,90 10,60 Z"/>
        </svg>

        <a href="/" (click)="closeMenu()" class="text-4xl font-black uppercase tracking-widest text-nutriflow-green-dark hover:text-nutriflow-yellow transition-colors border-b border-nutriflow-green-dark/10 pb-4 relative z-10">Inicio</a>
        <a href="/conocenos" (click)="closeMenu()" class="text-4xl font-black uppercase tracking-widest text-nutriflow-green-dark hover:text-nutriflow-yellow transition-colors border-b border-nutriflow-green-dark/10 pb-4 relative z-10">Conócenos</a>
        <a href="/#tienda" (click)="closeMenu()" class="text-4xl font-black uppercase tracking-widest text-nutriflow-green-dark hover:text-nutriflow-yellow transition-colors border-b border-nutriflow-green-dark/10 pb-4 relative z-10">Tienda</a>
        <a href="/diario" (click)="closeMenu()" class="text-4xl font-black uppercase tracking-widest text-nutriflow-green-dark hover:text-nutriflow-yellow transition-colors border-b border-nutriflow-green-dark/10 pb-4 relative z-10">Diario</a>
      </div>

      <div class="mt-auto px-8 pb-12 relative z-10">
        <div class="w-16 h-1.5 bg-nutriflow-yellow rounded-full mb-8"></div>
        <a [href]="cms.content()?.navbar?.instagramUrl" target="_blank" class="flex items-center gap-3 text-nutriflow-green-dark font-bold uppercase tracking-widest mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          Síguenos en IG
        </a>
      </div>
    </div>

    <!-- ============================================== -->
    <!-- SIDEBAR DEL CARRITO BLINDADO (z-[500])         -->
    <!-- ============================================== -->
    <div class="fixed inset-0 z-[500] transition-all duration-300" 
         [class.opacity-100]="cms.isCartOpen()" 
         [class.opacity-0]="!cms.isCartOpen()"
         [class.invisible]="!cms.isCartOpen()">
         
      <!-- Overlay (Fondo oscuro) -->
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" (click)="cms.isCartOpen.set(false)"></div>
      
      <!-- Drawer Panel -->
      <div class="absolute top-0 right-0 w-full md:w-[420px] h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-500 ease-out" 
           [class.translate-x-0]="cms.isCartOpen()" 
           [class.translate-x-full]="!cms.isCartOpen()">
        
        <div class="p-6 border-b border-gray-100 flex items-center justify-between bg-nutriflow-cream">
          <h2 class="text-2xl font-black text-nutriflow-green-dark tracking-tighter uppercase">Tu Orden</h2>
          <button (click)="cms.isCartOpen.set(false)" class="text-gray-400 hover:text-nutriflow-green-dark transition-colors bg-white rounded-full p-1 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div class="flex-grow overflow-y-auto p-6 flex flex-col gap-6 bg-white">
          @if (cartItems().length === 0) {
            <div class="flex flex-col items-center justify-center h-full text-center text-gray-400 gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
              <p class="font-medium text-lg">Tu bolsa está vacía</p>
              <button (click)="cms.isCartOpen.set(false)" class="text-nutriflow-green-dark font-black underline text-sm uppercase tracking-widest mt-2 hover:text-nutriflow-yellow transition-colors">Ver Tienda</button>
            </div>
          } @else {
            @for (item of cartItems(); track item.name) {
              <div class="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div class="flex-grow">
                  <h3 class="font-black text-nutriflow-green-dark text-lg uppercase tracking-tight">{{ item.name }}</h3>
                  <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Pack x6 (S/38)</p>
                  <div class="flex items-center gap-3 bg-white w-max px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
                    <button (click)="cms.removeOneFromCart(item.name)" class="text-gray-400 hover:text-red-500 font-bold px-2 transition-colors">-</button>
                    <span class="font-black text-nutriflow-green-dark text-sm w-4 text-center">{{ item.quantity }}</span>
                    <button (click)="cms.addToCart(item.name)" class="text-gray-400 hover:text-nutriflow-green-light font-bold px-2 transition-colors">+</button>
                  </div>
                </div>
                <div class="text-right">
                  <span class="font-black text-nutriflow-green-dark text-lg">S/ {{ item.quantity * 38 }}</span>
                </div>
              </div>
            }
          }
        </div>

        @if (cartItems().length > 0) {
          <div class="p-6 border-t border-gray-100 bg-white">
            <div class="flex justify-between items-center mb-6">
              <span class="font-bold text-gray-500 uppercase tracking-widest text-sm">Total a pagar:</span>
              <span class="font-black text-3xl text-nutriflow-green-dark">S/ {{ totalAmount() }}</span>
            </div>
            <button (click)="cms.checkoutWhatsApp()" class="w-full bg-nutriflow-green-dark text-white font-black text-xs uppercase tracking-widest py-5 rounded-xl hover:bg-nutriflow-yellow hover:text-nutriflow-green-dark transition-colors shadow-xl flex items-center justify-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              Completar Pedido
            </button>
          </div>
        }
      </div>
    </div>
  `
})
export class NavbarComponent implements OnInit {
  cms = inject(CmsStateService);
  router = inject(Router);
  
  isScrolledByScroll = signal<boolean>(false);
  forceSolid = signal<boolean>(false);
  currentRoute = signal<string>('/');
  isMenuOpen = signal<boolean>(false); // Señal para el menú móvil
  
  isScrolled = computed(() => this.isScrolledByScroll() || this.forceSolid());

  ngOnInit() {
    this.currentRoute.set(this.router.url);
    this.checkRoute(this.router.url);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute.set(event.urlAfterRedirects);
        this.checkRoute(event.urlAfterRedirects);
      }
    });
  }

  checkRoute(url: string) {
    this.forceSolid.set(url.includes('/diario') || url.includes('/conocenos'));
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolledByScroll.set(window.scrollY > 40);
  }

  // Lógica del Menú Móvil
  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
    if (this.isMenuOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMenu() {
    this.isMenuOpen.set(false);
    document.body.style.overflow = '';
  }

  isActive(path: string): boolean {
    const url = this.currentRoute();
    if (path === '/#tienda') return url.includes('#tienda');
    if (path === '/') return url === '/' || url === '/#';
    return url.includes(path);
  }

  getNavLinkClass(path: string): string {
    const active = this.isActive(path);
    const scrolled = this.isScrolled();
    let base = 'text-sm md:text-base font-black uppercase tracking-widest transition-all pb-1 border-b-2 ';
    
    if (active) {
      base += scrolled ? 'text-nutriflow-green-dark border-nutriflow-green-dark ' : 'text-nutriflow-yellow border-nutriflow-yellow ';
    } else {
      base += scrolled ? 'text-nutriflow-green-dark border-transparent hover:text-nutriflow-yellow hover:border-nutriflow-yellow ' : 'text-white border-transparent hover:text-nutriflow-yellow hover:border-nutriflow-yellow ';
    }
    return base;
  }

  cartItems = computed(() => {
    const counts: Record<string, number> = {};
    this.cms.cart().forEach(item => counts[item] = (counts[item] || 0) + 1);
    return Object.entries(counts).map(([name, quantity]) => ({ name, quantity }));
  });

  totalAmount = computed(() => this.cms.cart().length * 38);

  editInstagram() {
    const url = prompt("Ingresa el enlace de tu Instagram:", this.cms.content()?.navbar?.instagramUrl);
    if (url) this.cms.updateNavbar('instagramUrl', url);
  }
}