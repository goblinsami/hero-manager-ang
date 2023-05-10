import { Component } from '@angular/core';
import { HeroesService, Hero } from '../heroes.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent {
  constructor(private heroesService: HeroesService, private router: Router, public dialog: MatDialog) { }

  title = 'hero-manager-ang';
  filterName = ''
  selected: Hero[] = [];
  pageSize = 5;
  pageIndex = 0;
  selectedHero: Hero | undefined;


  get loading(): boolean {
    return this.heroesService.loading;
  }
  get heroes(): Array<object> {
    return this.heroesService.heroes;
  }


  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
  createHero() {
    this.router.navigate(['/create']);
  }

  selectedHeroId() {
    let result
    if (this.selected.length === 0) {
      result = -1
    } else {
      result = this.selected[0].id
    }
    return result
  }

  emptySelection() {
    return this.selected.length === 0
  }

  deleteHero(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.heroesService.deleteHero(id);
        this.heroesService.loading = true
        setTimeout(() => {
          this.heroesService.loading = false
        }, 1000);
      }
    });

  }

  get filteredHeroes() {
    return this.heroesService.filteredHeroes;
  }

  filterHeroes() {
    this.heroesService.filterHeroes(this.filterName);
  }


}
