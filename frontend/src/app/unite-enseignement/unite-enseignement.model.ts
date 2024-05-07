export class UniteEnseignement {
  id : number;
  nom :	string;
  creditUE	: number ;
  parcour_id	: number;
  sem_id : number;
  matieres? : {
    id : number,
    nom : string,
    ET : number,
    ED : number,
    EP : number,
    creditEC : number,
    poidsEC : number,
  }[];
}
