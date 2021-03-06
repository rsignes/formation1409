import { Poney } from './../interfaces/poney.interface';
import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data'

@Injectable({
  providedIn: 'root'
})
export class PoneyService extends EntityCollectionServiceBase<Poney> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Ponies', serviceElementsFactory)
  }
}