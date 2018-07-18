import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Candidat } from '../models/candidat'


@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.scss']
})
export class ResultatComponent implements OnInit {

  displayedColumns: string[] = ['noms', 'prenoms', 'responsables de test', 'dates', 'notes', 'actions'];
  dataSource: MatTableDataSource<Candidat>;

  constructor() {
    let candidat = new Candidat();
    let candidat2 = new Candidat();

    candidat.nom = "BETTY";
    candidat.prenom = "Brice";
    candidat.note = 14;

    candidat2.nom = "TONGLE";
    candidat2.prenom = "Michael";
    candidat2.note = 13;

    const candidats = [candidat, candidat2];
    this.dataSource = new MatTableDataSource(candidats);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    let element1 = document.getElementById("entete");
    let element2 = document.getElementById("user");

    element2.textContent = "Brice BETTY"
    element1.style.display = "initial";

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  visualiser(row: any) {
    console.log("visualiser");
  }

  supprimer(row: any) {
    console.log("supprimer");
  }
}
