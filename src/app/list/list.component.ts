import { Component } from '@angular/core';
import { HeroesService } from '../heroes.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent {
  constructor(public heroesService: HeroesService, private router: Router, public dialog: MatDialog) { }

  title = 'hero-manager-ang';
  filterName = ''
  selected: any
  formData = {
    name: '',
    age: 0,
  }
  pageSize = 5;
  pageIndex = 0;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

/*   openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        alert('hep')
        // Realizar la acción
      }
    });  } */


  get heroes() {
    return this.heroesService.heroes;
  }
/*   get loading_() {
    return this.heroesService.loading_;
  } */
  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getHeroes();
  }
  getHeroes(pageIndex: number = this.pageIndex, pageSize: number = this.pageSize) {
    // ...
  }

  deleteHero(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.heroesService.deleteHero(id);
        this.heroesService.loading_ = true
        setTimeout(() => {
          this.heroesService.loading_ = false
        }, 1000);
      }
    });

  }

/*   toggleLoading() {
    this.loading_ = !this.loading_
  } */
  get filteredHeroes() {
    return this.heroesService.filteredHeroes;
  }
  editHeroe(id: number) {
    console.log(id)
  }

  filterHeroes() {
    this.heroesService.filterHeroes(this.filterName);
  }
  createHeroe() {
    this.router.navigate(['/create']);
  }

  test() {
    console.log(this.selected)
  }


}
