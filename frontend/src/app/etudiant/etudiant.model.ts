export class Etudiant {
    id: number;
    matricule: string;
    observation: string;
    personne_id: number;
    parcour_id: number;
    niveaux_annees: { niveau_id: number, AS_id: number }[]=[];
}
