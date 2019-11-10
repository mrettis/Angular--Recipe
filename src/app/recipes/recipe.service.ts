import { EventEmitter, Injectable } from '@angular/core';
 
import { Subject } from 'rxjs';
import { Recipe} from './recipe.model';
import{ Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from '../shopping-list/shopping.-list.service';
 
 
@Injectable()
export class RecipeService {
   recipesChanged = new Subject<Recipe[]>();
   recipeSelected = new EventEmitter<Recipe>();
 
   // private recipes: Recipe[] = [
   //      new Recipe('Hamburguer', 
   //      'Tasty and fresh',
   //       'https://www.sbs.com.au/food/sites/sbs.com.au.food/files/lotus-burger-lead.jpg',
   //       [
   //          new Ingredient('Meat', 1),
   //          new Ingredient('French Fries', 20)
   //       ]),
   //      new Recipe('Hot Dog',
   //       'Tasty and delicious',
   //       'https://www.sbs.com.au/food/sites/sbs.com.au.food/files/lotus-burger-lead.jpg',
   //       [
   //          new Ingredient('sausage', 1),
   //          new Ingredient('buns', 1)
   //       ])
   //    ];
 
      private recipes: Recipe[] = []
 
      constructor(private slService: ShoppinglistService){ }
 
   //to overide recipes
   setRecipes(recipes: Recipe[]){
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
   }
 
   getRecipes(){
       return this.recipes.slice();
   }
 
   getRecipe(index: number){
      return this.recipes[index];
   }
 
   addIngredientToShoppingList(ingredients: Ingredient[]){
     this.slService.addIngredients(ingredients);
   }
 
   addRecipe(recipe: Recipe){
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice())
   }
 
   updateRecipe(index: number, newRecipe: Recipe){
      this.recipes[index]= newRecipe;
      this.recipesChanged.next(this.recipes.slice())
   }
 
   deletedRecipe(index: number){
      this.recipes.splice(index, 1);  //delete
      this.recipesChanged.next(this.recipes.slice());
   }
}

