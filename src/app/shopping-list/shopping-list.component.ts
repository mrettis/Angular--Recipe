import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient} from '../shared/ingredient.model';
import { ShoppinglistService} from './shopping.-list.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
 ingredients: Ingredient[]; 
 private subscription: Subscription;

  constructor(private slSerivce: ShoppinglistService) { }

  ngOnInit() {
    this.ingredients = this.slSerivce.getIngredients();
    this.subscription = this.slSerivce.ingredientsChanged
    .subscribe(
      (ingredients: Ingredient []) => {
       this.ingredients = ingredients;
      }
      );
  }

  onEditItem(index: number){
    this.slSerivce.startedEditing.next(index);
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
    
  }
}
