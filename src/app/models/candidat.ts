import {Utilisateur} from './utilisateur';
import {Question} from './question';

export class Candidat {
    id : number;
    temps : number;
    nom: string;
    prenom: string;
    note: number;
    date: Date;
    utilisateurDto: Utilisateur;
    question: Question[];
}
