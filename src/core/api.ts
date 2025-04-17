import ky, { KyInstance } from 'ky';
import { Injectable } from '@angular/core';

type IApi = Pick<
  KyInstance,
  'get' | 'post' | 'put' | 'delete' | 'patch' | 'head'
>;

@Injectable()
export class Api implements IApi {
  private readonly ky: KyInstance = ky.extend({});

  get = this.ky.get;
  post = this.ky.post;
  put = this.ky.put;
  delete = this.ky.delete;
  patch = this.ky.patch;
  head = this.ky.head;
}
