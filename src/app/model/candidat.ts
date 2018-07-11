import {Utilisteur} from './utilisteur';
import {Question} from './question';

export class Candidat {
    idCandidat : number;
    temps : number;
    nom: string;
    prenom: string;
    note: number;
    date: Date;
    utlisateur: Utilisteur;
    question: Question;
}
