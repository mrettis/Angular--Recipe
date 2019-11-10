import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService} from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
 
//Injectable is used to provide service into another sevice
@Injectable({providedIn:"root"})
export class DataStorageService{
//  httpclient has to introduced in app.module.ts
    constructor(private http: HttpClient, private recipeService: RecipeService){
          
    }
// subscribe here Not in the interface 'header.component' because we don't need
// response  this is just a post storage
//storage is call at header.component.
    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://recipe-app-b1b4e.firebaseio.com/recipes.json'
        , recipes )
            .subscribe(response =>{
                console.log(response);
            })
        }
    fetchRecipes(){
       return this.http
        .get<Recipe[]>('https://recipe-app-b1b4e.firebaseio.com/recipes.json')
        .pipe(map(recipes =>{
            return recipes.map(recipe =>{
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
                }
            });
        }),
        tap(recipes => {
            this.recipeService.setRecipes(recipes);
        })        
        )
            
    }
 }
