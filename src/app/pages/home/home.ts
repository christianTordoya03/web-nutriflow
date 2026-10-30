import { Component } from '@angular/core';
import { HeroCarouselComponent } from '../../features/hero-carousel/hero-carousel';
import { ProductsGridComponent } from '../../features/products-grid/products-grid';
import { BlogSectionComponent } from '../../features/blog-section/blog-section';
import { AdventureSectionComponent } from '../../features/adventure-section/adventure-section';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroCarouselComponent, ProductsGridComponent, BlogSectionComponent, AdventureSectionComponent],
  template: `
    <app-hero-carousel></app-hero-carousel>
    <app-products-grid></app-products-grid>
    <app-blog-section></app-blog-section>
    <app-adventure-section></app-adventure-section>
  `
})
export class HomeComponent {}