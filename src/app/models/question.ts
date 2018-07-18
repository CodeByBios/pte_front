import {Reponse} from './reponse';
import {Niveau} from './niveau';
import {Langage} from './langage';
import {TypeQuestion} from './typequestion';
import {Candidat} from './candidat';

export class Question {
    idQuestion: number;
    libelle: string;
    etat: boolean;
    reponse: Reponse[];
    niveau: Niveau;
    langage: Langage;
    typequestion: TypeQuestion;
    candidat: Candidat;
}
