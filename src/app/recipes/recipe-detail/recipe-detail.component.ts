// import { Component, OnInit, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService} from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
recipe: Recipe;
id: number;
// @Input() recipe: Recipe; removed
 
constructor(private recipeService: RecipeService,
            private route: ActivatedRoute,
            private router: Router) { }

  ngOnInit() {
    // const id = this.route.snapshot.params['id']; no the way to do it
    this.route.params
        .subscribe(
          (params: Params) => {
            this.id = +params['id']
            this.recipe = this.recipeService.getRecipe(this.id)
          }
        );

  }

    onAddToShoppingList(){
      this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
    }

    onEditRecipe(){
      this.router.navigate(['edit'], {relativeTo: this.route});
    }
// reachout to service, call(id)
    onDeleteRecipe(){
      this.recipeService.deletedRecipe(this.id)
      this.router.navigate(['/recipes']);
    }
}
