import {Utilisateur} from './utilisateur';
import {Question} from './question';

export class Candidat {
    idCandidat : number;
    temps : number;
    nom: string;
    prenom: string;
    note: number;
    date: Date;
    utilisateur: Utilisateur;
    question: Question;
}
