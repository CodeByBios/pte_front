import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Candidat } from '../models/candidat';
import { CandidatService } from '../services/candidat.service';
import { MatDialog } from '@angular/material';
import { DialogSupprimerComponent } from '../dialogSupprimer/dialog-supprimer.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.scss']
})

export class ResultatComponent implements OnInit {

  role: boolean;
  candidats: Candidat[] = [];
  displayedColumns: string[] = ['noms', 'prenoms', 'responsables de test', 'dates', 'notes', 'actions'];
  dataSource: MatTableDataSource<Candidat>;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));

  constructor(private candidatService: CandidatService,
    private toastr: ToastrService,
    public dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    let element = document.getElementById("entete");
    element.style.display = "initial";

    this.checkUser()
    this.chargerTableau();

    if (this.currentUser.utilisateur.role.identite !== "manager") {
      this.role = false;
    } else {
      this.role = true;
    }
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
    const dialogRef = this.dialog.open(DialogSupprimerComponent, {
      data: { question: row, sujet: "resultat" }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.chargerTableau();
    });
  }

  chargerTableau() {
    this.candidatService.getCandidats().subscribe(rep => {
      this.candidats = rep;
      this.dataSource = new MatTableDataSource(this.candidats);

      this.paginator._intl.itemsPerPageLabel = "Nombre par page :"
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
      (error: any) => {
        console.log(error)
        this.toastr.error('Ressource introuvable', 'Erreur');
      });
  }

  checkUser() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let element = document.getElementById("deconn");
    let userElement = document.getElementById("user");

    if (currentUser) {
      element.style.display = "initial";
      userElement.textContent = currentUser.utilisateur.nom + " " + currentUser.utilisateur.prenom;
    } else {
      element.style.display = "none";
      userElement.textContent = "";
    }
  }
}
