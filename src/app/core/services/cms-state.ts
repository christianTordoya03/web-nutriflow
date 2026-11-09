import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from './supabase';

export interface WebContent {
  navbar: { logoUrl: string; scrolledLogoUrl?: string; topBannerText: string; instagramUrl: string; };
  promoModal: { title: string; subtitle: string; buttonText: string; isActive: boolean; bgImageUrl: string; };
  hero: { title: string; subtitle: string; buttonText: string; bgMediaUrl: string; };
  
  // ¡Aquí agregamos los nuevos iconos opcionales para Diario!
  products: { id: number; name: string; claim: string; ingredientsTitle?: string; ingredients: string; benefitsTitle?: string; benefits: string; tag: string; bgColor: string; imageUrl: string; hoverImageUrl?: string; diarioQuote?: string; icono1?: string; icono2?: string; icono3?: string; }[];
  
  planes: {
    title: string; subtitle: string;
    packs: { id: number; tag: string; name: string; price: number; description: string; instruction: string; maxPacks: number; }[];
  };
  about: { title: string; text: string; imageUrl: string; };
  
  // ¡Aquí agregamos la propiedad quote para los testimonios!
  testimonials: { id: number; username: string; videoUrl: string; posterUrl?: string; title?: string; quote?: string; linkUrl?: string; }[];
  
  blog: { title: string; buttonText: string; articles: { id: number; title: string; imageUrl: string; }[]; };
  marquee: { text1: string; icon1?: string; text2: string; icon2?: string; text3: string; icon3?: string; };
  adventure: {
    title: string; step1: string; step2: string; step3: string; videoUrl: string; videoPosterUrl: string; 
    eventosTitle: string; eventos: { id: number; title: string; date: string; imageUrl: string }[];
    carouselTitle: string; carouselSubtitle: string; carouselImages: { id: number; imageUrl: string; }[];
  };
  diario: {
    heroTitle: string; heroSubtitle: string;
    mainTag: string; mainTitle: string; mainText: string; mainImage: string;
    collage: { id: number, imageUrl: string }[]; bgDecorUrl: string; diarioImages: { [productId: number]: string };
  };
  conocenosPage: {
    heroTitle: string; heroSubtitle: string; heroImg: string;
    porQueTitle: string; porQueText: string; porQueImg: string;
    paraQueTitle: string; paraQueText: string; paraQueImg: string;
    filosofiaTitle: string; filosofiaText: string; filosofiaVideo: string;
  };
  mediaLibrary: string[];
  trashedMedia?: string[];
}

@Injectable({ providedIn: 'root' })
export class CmsStateService {
  private supabase = inject(SupabaseService);
  isAdmin = signal<boolean>(false);
  isEditMode = signal<boolean>(false);
  content = signal<WebContent | null>(null);
  
  cart = signal<string[]>(this.loadCartFromStorage());
  
  isCartOpen = signal<boolean>(false);
  isGalleryOpen = signal<boolean>(false);
  onMediaSelected: ((url: string) => void) | null = null;

  constructor() { this.loadInitialData(); }

  private loadCartFromStorage(): string[] {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nutriflow_cart');
        return saved ? JSON.parse(saved) : [];
      } catch { return []; }
    }
    return [];
  }

  private saveCartToStorage(items: string[]) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nutriflow_cart', JSON.stringify(items));
    }
  }

  addToCart(productName: string) {
    this.cart.update(items => {
      const newItems = [...items, productName];
      this.saveCartToStorage(newItems);
      return newItems;
    });
    this.isCartOpen.set(true);
  }

  removeOneFromCart(productName: string) {
    this.cart.update(items => {
      const index = items.indexOf(productName);
      if (index > -1) { 
        const newItems = [...items]; 
        newItems.splice(index, 1); 
        this.saveCartToStorage(newItems);
        return newItems; 
      }
      return items;
    });
  }

  checkoutWhatsApp() {
    const items = this.cart(); if (items.length === 0) return;
    const counts = items.reduce((acc: any, val) => { acc[val] = (acc[val] || 0) + 1; return acc; }, {});
    const list = Object.entries(counts).map(([name, qty]) => `${qty}x Pack x6 de ${name} (S/ ${Number(qty) * 38})`).join('%0A- ');
    const total = items.length * 38;
    const text = `¡Hola Nutriflow! Quiero pedir lo siguiente:%0A- ${list}%0A%0A*Total: S/ ${total}*%0A%0A¿Me ayudas a coordinar el envío de mi pedido?`;
    window.open(`https://wa.me/51964211518?text=${text}`, '_blank');
    
    this.cart.set([]);
    this.saveCartToStorage([]);
    this.isCartOpen.set(false);
  }

  openGallery(callback: (url: string) => void) { this.onMediaSelected = callback; this.isGalleryOpen.set(true); }
  closeGallery() { this.isGalleryOpen.set(false); this.onMediaSelected = null; }

  // Aquí he añadido más detalles al error en consola para futuras depuraciones
  private async saveToDB(updated: WebContent) {
    this.content.set(updated);
    const { error } = await this.supabase.client.from('web_settings').update({ content_data: updated }).eq('id', 1);
    if (error) {
      console.error("⛔ ERROR DETALLADO DE SUPABASE:", error.message, error.details, error.hint);
      alert("⚠️ ERROR al guardar en base de datos. Revisa la consola (F12) para más detalles.");
    }
  }

  async uploadFileToStorage(file: File): Promise<string | null> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;
      const { error: uploadError } = await this.supabase.client.storage.from('media').upload(filePath, file);
      if (uploadError) {
        console.error('Error subiendo a Storage:', uploadError);
        alert('Error al subir el archivo.');
        return null;
      }
      const { data } = this.supabase.client.storage.from('media').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) { console.error('Error inesperado:', error); return null; }
  }

  async addMediaToLibrary(url: string) {
    const current = this.content(); if (!current) return;
    if (current.mediaLibrary.includes(url)) return;
    const newLibrary = [url, ...current.mediaLibrary].slice(0, 15);
    await this.saveToDB({ ...current, mediaLibrary: newLibrary });
  }

  async removeMediaFromLibrary(urlToRemove: string) {
    const current = this.content(); if (!current) return;
    const newLibrary = current.mediaLibrary.filter(url => url !== urlToRemove);
    await this.saveToDB({ ...current, mediaLibrary: newLibrary });
  }

  async trashMedia(urlToTrash: string) {
    const current = this.content(); if (!current) return;
    const newLibrary = current.mediaLibrary.filter(url => url !== urlToTrash);
    const newTrashed = [urlToTrash, ...(current.trashedMedia || [])];
    await this.saveToDB({ ...current, mediaLibrary: newLibrary, trashedMedia: newTrashed });
  }

  async restoreMedia(urlToRestore: string) {
    const current = this.content(); if (!current) return;
    const newTrashed = (current.trashedMedia || []).filter(url => url !== urlToRestore);
    const newLibrary = [urlToRestore, ...current.mediaLibrary];
    await this.saveToDB({ ...current, mediaLibrary: newLibrary, trashedMedia: newTrashed });
  }

  async permanentDeleteMedia(urlToDelete: string) {
    const current = this.content(); if (!current) return;
    const newTrashed = (current.trashedMedia || []).filter(url => url !== urlToDelete);
    await this.saveToDB({ ...current, trashedMedia: newTrashed });
  }

  checkoutPlanWhatsApp(planName: string, price: number, selections: Record<number, number>) {
    const current = this.content(); if (!current) return;
    let flavorsText = '';
    current.products.forEach(p => { const qty = selections[p.id] || 0; if (qty > 0) flavorsText += `%0A- ${qty} pqte(s) de ${p.name} (x7 shots)`; });
    const text = `¡Hola Nutriflow! Quiero adquirir mi plan objetivo:%0A%0A*${planName} (S/ ${price})*%0AMi selección de sabores es:${flavorsText}%0A%0A¿Me ayudas a coordinar mi rutina?`;
    window.open(`https://wa.me/51964211518?text=${text}`, '_blank');
  }

  async loadInitialData() {
    const { data } = await this.supabase.client.from('web_settings').select('content_data').eq('id', 1).single();
    if (data && data.content_data) {
      const loaded = data.content_data as WebContent;
      
      if (!loaded.navbar) loaded.navbar = { logoUrl: '/logo.png', scrolledLogoUrl: '/Logotipo_NFF_01.png', topBannerText: '', instagramUrl: 'https://instagram.com/nutriflowfit' };
      
      if (!loaded.marquee) {
        loaded.marquee = { text1: '100% COLD PRESS', icon1: '', text2: 'SIN AZÚCAR AÑADIDA', icon2: '', text3: 'HECHO EN PERÚ', icon3: '' };
      }

      if (loaded.marquee && typeof loaded.marquee.icon1 === 'undefined') {
        loaded.marquee.icon1 = ''; loaded.marquee.icon2 = ''; loaded.marquee.icon3 = '';
      }
      
      if (!loaded.planes) {
        loaded.planes = {
          title: 'PLANES POR OBJETIVO', subtitle: 'Elige tu rutina ideal y arma tus semanas combinando tus shots favoritos.',
          packs: [
            { id: 1, tag: 'RUTINA 14 DÍAS', name: 'Pack Plus', price: 90, description: 'Rutina práctica para empezar.', instruction: 'Elige 2 sabores.', maxPacks: 2 },
            { id: 2, tag: 'RUTINA 21 DÍAS', name: 'Pack Prime', price: 130, description: 'Afianza un hábito saludable.', instruction: 'Elige 3 sabores.', maxPacks: 3 },
            { id: 3, tag: 'RUTINA 28 DÍAS', name: 'Pack Pro', price: 170, description: 'Mayor constancia y variedad.', instruction: 'Elige 4 sabores.', maxPacks: 4 }
          ]
        };
      }
      
      if (!loaded.about) loaded.about = { title: 'El Propósito Nutriflow', text: 'Nuestra historia...', imageUrl: '' };
      if (loaded.diario && typeof loaded.diario.bgDecorUrl === 'undefined') loaded.diario.bgDecorUrl = '';
      if (loaded.diario && typeof loaded.diario.diarioImages === 'undefined') loaded.diario.diarioImages = {};
      
      if (!loaded.conocenosPage) {
        loaded.conocenosPage = {
          heroTitle: 'NUESTRA HISTORIA', heroSubtitle: 'Dos amigas, una misma pasión por el bienestar real.', heroImg: '',
          porQueTitle: 'EL POR QUÉ', porQueText: 'Nos dimos cuenta que faltaba una opción realmente natural y sincera en el mercado...', porQueImg: '',
          paraQueTitle: 'EL PARA QUÉ', paraQueText: 'Para darte esa energía y recuperación diaria sin sacrificar tu salud.', paraQueImg: '',
          filosofiaTitle: 'NUESTRA FILOSOFÍA', filosofiaText: 'Nutriflow Fit es una marca creada para acompañar el bienestar...', filosofiaVideo: ''
        };
      }

      if (loaded.products) {
        loaded.products = loaded.products.map(p => ({ 
          ...p, 
          diarioQuote: p.diarioQuote || 'hecho con amor,\npara tu bienestar.',
          benefitsTitle: p.benefitsTitle || '¿PARA QUÉ SIRVE?',
          ingredientsTitle: p.ingredientsTitle || 'INSUMOS 100% ORGÁNICOS',
          icono1: p.icono1 || '',
          icono2: p.icono2 || '',
          icono3: p.icono3 || ''
        }));
      }
      
      if (loaded.testimonials) {
        loaded.testimonials = loaded.testimonials.map(t => ({ 
          ...t, 
          title: t.title || '¡Me encanta!', 
          quote: t.quote || 'Escribe aquí la reseña o comentario de esta persona.',
          linkUrl: t.linkUrl || 'https://instagram.com',
          posterUrl: t.posterUrl || '' 
        }));
      }

      if (!loaded.trashedMedia) loaded.trashedMedia = [];

      this.content.set(loaded);
    }
  }

  toggleEditMode() { if (this.isAdmin()) this.isEditMode.update(mode => !mode); }
  
  async updateContent(section: keyof WebContent, field: string, value: any) {
    const current = this.content(); if (!current) return;
    await this.saveToDB({ ...current, [section]: { ...(current[section] as any), [field]: value } });
  }
  async updateMarquee(field: string, value: string) {
    const current = this.content(); if (!current) return;
    await this.saveToDB({ ...current, marquee: { ...current.marquee, [field]: value } });
  }
  async updateNavbar(field: string, value: any) { const current = this.content(); if (!current) return; await this.saveToDB({ ...current, navbar: { ...current.navbar, [field]: value } }); }
  async updateProduct(id: number, field: string, value: any) { const current = this.content(); if (!current) return; const updatedProducts = current.products.map(p => p.id === id ? { ...p, [field]: value } : p); await this.saveToDB({ ...current, products: updatedProducts }); }
  async updatePlanField(field: string, value: any) { const current = this.content(); if (!current) return; await this.saveToDB({ ...current, planes: { ...current.planes, [field]: value } }); }
  async updatePlanPack(id: number, field: string, value: any) { const current = this.content(); if (!current) return; const updatedPacks = current.planes.packs.map(p => p.id === id ? { ...p, [field]: value } : p); await this.saveToDB({ ...current, planes: { ...current.planes, packs: updatedPacks } }); }
  async updateAbout(field: string, value: any) { const current = this.content(); if (!current) return; await this.saveToDB({ ...current, about: { ...current.about, [field]: value } }); }
  async updateTestimonial(id: number, url: string) { const current = this.content(); if (!current) return; const updated = current.testimonials.map(t => t.id === id ? { ...t, videoUrl: url } : t); await this.saveToDB({ ...current, testimonials: updated }); }
  async updateTestimonialField(id: number, field: string, value: string) {
    const current = this.content(); if (!current) return;
    const updated = current.testimonials.map(t => t.id === id ? { ...t, [field]: value } : t);
    await this.saveToDB({ ...current, testimonials: updated });
  }
  async updateDiarioProductImage(productId: number, url: string) { const current = this.content(); if (!current) return; await this.saveToDB({ ...current, diario: { ...current.diario, diarioImages: { ...current.diario.diarioImages, [productId]: url } } }); }
  async updateBlogArticle(id: number, field: string, value: any) { const current = this.content(); if (!current) return; const updatedArticles = current.blog.articles.map(a => a.id === id ? { ...a, [field]: value } : a); await this.saveToDB({ ...current, blog: { ...current.blog, articles: updatedArticles } }); }
  async updateAdventureImage(id: number, url: string) { const current = this.content(); if (!current) return; const updatedImages = current.adventure.carouselImages.map(img => img.id === id ? { ...img, imageUrl: url } : img); await this.saveToDB({ ...current, adventure: { ...current.adventure, carouselImages: updatedImages } }); }
  async updateEvento(id: number, field: string, value: any) { const current = this.content(); if (!current) return; const updatedEventos = current.adventure.eventos.map(e => e.id === id ? { ...e, [field]: value } : e); await this.saveToDB({ ...current, adventure: { ...current.adventure, eventos: updatedEventos } }); }
  async updateDiario(field: string, value: any) { const current = this.content(); if (!current) return; await this.saveToDB({ ...current, diario: { ...current.diario, [field]: value } }); }
  async updateCollageImage(id: number, url: string) { const current = this.content(); if (!current) return; const updatedCollage = current.diario.collage.map(img => img.id === id ? { ...img, imageUrl: url } : img); await this.saveToDB({ ...current, diario: { ...current.diario, collage: updatedCollage } }); }
  async updateConocenos(field: string, value: any) { const current = this.content(); if (!current) return; await this.saveToDB({ ...current, conocenosPage: { ...current.conocenosPage, [field]: value } }); }
}