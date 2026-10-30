import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from './supabase';

export interface WebContent {
  promoModal: { title: string; subtitle: string; buttonText: string; isActive: boolean; bgImageUrl: string; };
  hero: { title: string; subtitle: string; buttonText: string; bgMediaUrl: string; };
  products: { id: number; name: string; claim: string; ingredients: string; benefits: string; tag: string; bgColor: string; imageUrl: string; }[];
  blog: { title: string; buttonText: string; articles: { id: number; title: string; imageUrl: string; }[]; };
  adventure: {
    title: string; step1: string; step2: string; step3: string; videoUrl: string;
    eventosTitle: string;
    eventos: { id: number; title: string; date: string; imageUrl: string }[];
    carouselTitle: string; carouselSubtitle: string; carouselImages: { id: number; imageUrl: string; }[];
  };
  diario: { 
    heroTitle: string; heroSubtitle: string;
    mainTag: string; mainTitle: string; mainText: string; mainImage: string;
    conocenosTitle: string; conocenosText: string; conocenosMedia: string; 
    collage: {id: number, imageUrl: string}[];
    bgDecorUrl: string;
    // NUEVO: Imágenes exclusivas para el diario (Desvinculadas de la tienda)
    diarioImages: { [productId: number]: string };
  };
  mediaLibrary: string[]; 
}

@Injectable({ providedIn: 'root' })
export class CmsStateService {
  private supabase = inject(SupabaseService);

  isAdmin = signal<boolean>(false);
  isEditMode = signal<boolean>(false);
  content = signal<WebContent | null>(null);
  cart = signal<string[]>([]);
  isGalleryOpen = signal<boolean>(false);
  onMediaSelected: ((url: string) => void) | null = null;

  constructor() { this.loadInitialData(); }

  openGallery(callback: (url: string) => void) { this.onMediaSelected = callback; this.isGalleryOpen.set(true); }
  closeGallery() { this.isGalleryOpen.set(false); this.onMediaSelected = null; }

  private async saveToDB(updated: WebContent) {
    this.content.set(updated);
    const { error } = await this.supabase.client.from('web_settings').update({ content_data: updated }).eq('id', 1);
    if (error) {
      console.error("Error al guardar en BD:", error);
      alert("⚠️ ERROR: El archivo es demasiado pesado y la base de datos rechazó el cambio. La web volverá a su estado anterior al refrescar.");
    }
  }

  async addMediaToLibrary(url: string) {
    const current = this.content(); if (!current) return;
    if (current.mediaLibrary.includes(url)) return;
    const newLibrary = [url, ...current.mediaLibrary].slice(0, 10);
    await this.saveToDB({ ...current, mediaLibrary: newLibrary });
  }

  async removeMediaFromLibrary(urlToRemove: string) {
    const current = this.content(); if (!current) return;
    const newLibrary = current.mediaLibrary.filter(url => url !== urlToRemove);
    await this.saveToDB({ ...current, mediaLibrary: newLibrary });
  }

  async emergencyClearGallery() {
    const current = this.content(); 
    if (!current) return;
    const confirmed = confirm("¿Estás seguro de vaciar TODA la galería? Esto eliminará las fotos atascadas.");
    if (confirmed) {
        const cleaned = { ...current, mediaLibrary: [] };
        await this.saveToDB(cleaned);
        alert("✅ Galería purgada exitosamente.");
        window.location.reload();
    }
  }

  addToCart(productName: string) {
    this.cart.update(items => [...items, productName]);
    const btn = document.getElementById('cart-bag-icon');
    if(btn) { btn.classList.add('scale-125', 'text-nutriflow-yellow'); setTimeout(() => btn.classList.remove('scale-125', 'text-nutriflow-yellow'), 300); }
  }

  checkoutWhatsApp() {
    const items = this.cart();
    if (items.length === 0) { alert('Tu bolsa está vacía. ¡Agrega algunos shots primero!'); return; }
    const counts = items.reduce((acc: any, val) => { acc[val] = (acc[val] || 0) + 1; return acc; }, {});
    const list = Object.entries(counts).map(([name, qty]) => `${qty}x ${name}`).join('%0A- ');
    const text = `¡Hola Nutriflow! Quiero pedir lo siguiente:%0A- ${list}%0A%0A¿Me ayudas a coordinar mi pedido?`;
    window.open(`https://wa.me/51964211518?text=${text}`, '_blank');
  }

  async loadInitialData() {
    const { data } = await this.supabase.client.from('web_settings').select('content_data').eq('id', 1).single();
    if (data && data.content_data) {
      const loaded = data.content_data as WebContent;
      if (loaded.diario && typeof loaded.diario.bgDecorUrl === 'undefined') {
        loaded.diario.bgDecorUrl = ''; 
      }
      // Inicializar el objeto de imágenes desvinculadas si no existe
      if (loaded.diario && typeof loaded.diario.diarioImages === 'undefined') {
        loaded.diario.diarioImages = {};
      }
      this.content.set(loaded);
    }
  }

  toggleEditMode() { if (this.isAdmin()) this.isEditMode.update(mode => !mode); }

  async updateContent(section: keyof WebContent, field: string, value: any) {
    const current = this.content(); if (!current) return;
    await this.saveToDB({ ...current, [section]: { ...(current[section] as any), [field]: value } });
  }

  async updateProduct(id: number, field: string, value: any) {
    const current = this.content(); if (!current) return;
    const updatedProducts = current.products.map(p => p.id === id ? { ...p, [field]: value } : p);
    await this.saveToDB({ ...current, products: updatedProducts });
  }

  // NUEVO: Método para guardar SOLO la imagen del Diario
  async updateDiarioProductImage(productId: number, url: string) {
    const current = this.content(); if (!current) return;
    const updatedDiarioImages = { ...current.diario.diarioImages, [productId]: url };
    await this.saveToDB({ ...current, diario: { ...current.diario, diarioImages: updatedDiarioImages } });
  }

  async updateBlogArticle(id: number, field: string, value: any) {
    const current = this.content(); if (!current) return;
    const updatedArticles = current.blog.articles.map(a => a.id === id ? { ...a, [field]: value } : a);
    await this.saveToDB({ ...current, blog: { ...current.blog, articles: updatedArticles } });
  }

  async updateAdventureImage(id: number, url: string) {
    const current = this.content(); if (!current) return;
    const updatedImages = current.adventure.carouselImages.map(img => img.id === id ? { ...img, imageUrl: url } : img);
    await this.saveToDB({ ...current, adventure: { ...current.adventure, carouselImages: updatedImages } });
  }
  
  async updateEvento(id: number, field: string, value: any) {
    const current = this.content(); if (!current) return;
    const updatedEventos = current.adventure.eventos.map(e => e.id === id ? { ...e, [field]: value } : e);
    await this.saveToDB({ ...current, adventure: { ...current.adventure, eventos: updatedEventos } });
  }

  async updateDiario(field: string, value: any) {
    const current = this.content(); if (!current) return;
    await this.saveToDB({ ...current, diario: { ...current.diario, [field]: value } });
  }

  async updateCollageImage(id: number, url: string) {
    const current = this.content(); if (!current) return;
    const updatedCollage = current.diario.collage.map(img => img.id === id ? { ...img, imageUrl: url } : img);
    await this.saveToDB({ ...current, diario: { ...current.diario, collage: updatedCollage } });
  }
}