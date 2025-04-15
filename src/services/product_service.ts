import { Injectable } from '@angular/core';
import Paging from '../models/paging';
import Product from '../models/product';

type RequestMeta = {
  abortSignal?: AbortSignal;
};

@Injectable({ providedIn: 'root' })
export class ProductService {
  async getAll(
    args: {
      limit: number;
      page: number;
    },
    meta?: RequestMeta,
  ): Promise<Paging<Product>> {
    // Prepare the URL with query parameters
    const url = new URL('https://dummyjson.com/products');
    url.searchParams.append('limit', args.limit.toString());
    url.searchParams.append('skip', ((args.page - 1) * args.limit).toString());

    return fetch(url, { signal: meta?.abortSignal })
      .then((res) => res.json())
      .then((res) => ({
        data: res.products,
        total: res.total,
        skip: res.skip,
        limit: res.limit,
      }));
  }

  async get(id: number, meta?: RequestMeta): Promise<Product> {
    const url = new URL(`https://dummyjson.com/products/${id}`);
    return fetch(url, { signal: meta?.abortSignal }).then((res) => res.json());
  }

  async create(
    product: Omit<Product, 'id'>,
    meta?: RequestMeta,
  ): Promise<void> {
    return fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
      signal: meta?.abortSignal,
    })
      .then((res) => res.json())
      .then(console.log);
  }

  async update(product: Product, meta?: RequestMeta): Promise<void> {
    return fetch(`https://dummyjson.com/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
      signal: meta?.abortSignal,
    })
      .then((res) => res.json())
      .then(console.log);
  }

  async delete(id: number, meta?: RequestMeta): Promise<void> {
    return fetch(`https://dummyjson.com/products/${id}`, {
      method: 'DELETE',
      signal: meta?.abortSignal,
    }).then((res) => res.json());
  }
}
