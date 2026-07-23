import { useQuery } from '@tanstack/react-query';
import { fetchApi } from './client';
import type { Product, CategoryTile } from '@/types';

export const catalogKeys = {
  all: ['catalog'] as const,
  products: () => [...catalogKeys.all, 'products'] as const,
  productsByCategory: (category: string) => [...catalogKeys.products(), { category }] as const,
  productDetail: (slug: string) => [...catalogKeys.products(), 'detail', slug] as const,
  categories: () => [...catalogKeys.all, 'categories'] as const,
};

export function useProducts(categorySlug?: string) {
  return useQuery({
    queryKey: categorySlug ? catalogKeys.productsByCategory(categorySlug) : catalogKeys.products(),
    queryFn: () => {
      const qs = categorySlug ? `?category=${categorySlug}` : '';
      return fetchApi<Product[]>(`/products${qs}`);
    },
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: catalogKeys.productDetail(slug),
    queryFn: () => fetchApi<Product>(`/products/${slug}`),
    enabled: !!slug,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: catalogKeys.categories(),
    queryFn: () => fetchApi<CategoryTile[]>('/categories'),
  });
}
