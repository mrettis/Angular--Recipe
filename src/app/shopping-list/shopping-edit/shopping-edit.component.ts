import { Component, OnInit, OnDestroy, ViewChild, } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppinglistService } from '../shopping.-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm; 
subscription: Subscription;
 editMode = false; 
 editedItemIndex: number; 
 editedItem: Ingredient; 

  constructor(private sLservice: ShoppinglistService) { }

  ngOnInit() {
   this.subscription =  this.sLservice.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index; 
          this.editMode = true; 
          this.editedItem = this.sLservice.getIngredient(index); 
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      );
  }

  onAddItem(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount); 
    if (this.editMode){
      this.sLservice.updateIngredient(this.editedItemIndex, newIngredient )
    } else {
      this.sLservice.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete(){
    this.sLservice.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
