import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class ActionsProvider {

  public actionsBehaviorSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public actions: any = {};
  public storageActionsKey = 'sfActions';

  constructor(
  ) {
    console.log('Hello ActionsProvider Provider');
  }


  // (+) Action

  /**
   * Add action
   */
  // addAction( item, id, action, value = 1 ) {
  //   if(!this.actions[item]) this.actions[item] = {};
  //   if(!this.actions[item][id]) this.actions[item][id] = {};
  //   if(!this.actions[item][id][action]) this.actions[item][id][action] = 0;
  //   this.actions[item][id][action] += value;
  //   this.saveActions(this.actions);
  // }

  addAction( action, payload ) {
    if(!this.actions[action]) this.actions[action] = [];
    this.actions[action].push(payload);
    this.saveActions(this.actions);
  }

  removeAction( action, payload, propertyToCheck = 'stringify' ) {
    if(!this.actions[action]) this.actions[action] = [];
    this.actions[action] = this.actions[action].filter(function(el) {
      if(propertyToCheck == 'stringify')
    	 return (JSON.stringify(el) != (JSON.stringify(payload)));
      else
        return (el[propertyToCheck] != payload[propertyToCheck]);
    });
    this.saveActions(this.actions);
  }

  getAction( action ) {
    return this.actions[action];
  }

  // (-) Action


  // (+) Item

  /**
   * Get item
   */
  getItem( item ) {
    return this.actions[item];
  }

  // (-) Item


  // (+) Actions

  /**
   * Save actions
   */
  saveActions(actions: any) {
    localStorage.setItem( this.storageActionsKey, JSON.stringify( actions ) );
    this.actions = actions;
    this.actionsBehaviorSubject.next( true );
  }

  /**
   * Get actions
   */
  getActions() {
    return this.actions;
  }

  /**
   * Get actions
   */
  existsActions() {
    return this.actions ? true : false;
  }

  /**
   * Remove actions
   */
  removeActions() {
    localStorage.removeItem( this.storageActionsKey );
    this.actions = {};
    this.actionsBehaviorSubject.next(false);
  }

  /**
   * Get observable
   */
  getActionsAsObservable(): Observable<any> {
    return this.actionsBehaviorSubject.asObservable();
  }

  /**
   * Check actions
   */
  checkActions() {
    const i = localStorage.getItem( this.storageActionsKey );
    if( i ) {
      this.actions = JSON.parse(i);
      this.actionsBehaviorSubject.next( true );
    } else {
      this.actions = {};
      this.actionsBehaviorSubject.next(false);
    }
    return this.actions;
  }

  // (-) Actions

}
