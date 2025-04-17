import Paging from '@shared/models/paging';
import Product from '@modules/product/models/product';
import { Api } from '@core/api';
import { Injectable } from '@angular/core';

type RequestMeta = {
  abortSignal?: AbortSignal;
};

@Injectable()
export class ProductService {
  constructor(private api: Api) {}

  async getAll(
    args: {
      limit: number;
      page: number;
    },
    meta?: RequestMeta,
  ): Promise<Paging<Product>> {
    const res = await this.api
      .get('https://dummyjson.com/products', {
        searchParams: {
          limit: args.limit,
          skip: (args.page - 1) * args.limit,
        },
        signal: meta?.abortSignal,
      })
      .json<{
        products: Product[];
        total: number;
        skip: number;
        limit: number;
      }>();

    return {
      data: res.products,
      total: res.total,
      skip: res.skip,
      limit: res.limit,
    };
  }

  async get(id: number, meta?: RequestMeta): Promise<Product> {
    return this.api
      .get(`https://dummyjson.com/products/${id}`, {
        signal: meta?.abortSignal,
      })
      .json();
  }

  async create(
    product: Omit<Product, 'id'>,
    meta?: RequestMeta,
  ): Promise<void> {
    await this.api.post('https://dummyjson.com/products/add', {
      headers: { 'Content-Type': 'application/json' },
      json: product,
      signal: meta?.abortSignal,
    });
  }

  async update(product: Product, meta?: RequestMeta): Promise<void> {
    await this.api
      .put(`https://dummyjson.com/products/${product.id}`, {
        headers: { 'Content-Type': 'application/json' },
        json: product,
        signal: meta?.abortSignal,
      })
      .then((res) => res.json())
      .then(console.log);
  }

  async delete(id: number, meta?: RequestMeta): Promise<void> {
    await this.api
      .delete(`https://dummyjson.com/products/${id}`, {
        signal: meta?.abortSignal,
      })
      .then((res) => res.json());
  }
}
