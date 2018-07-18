import {Reponse} from './reponse';
import {Niveau} from './niveau';
import {Langage} from './langage';
import {TypeQuestion} from './typequestion';

export class Question {
    etat: boolean;
    id: number;
    langageDto: Langage[];
    libelle: string;
    niveauDto: Niveau[];
    reponseDto: Reponse[];
    typeQuestionDto: TypeQuestion;
}
