export class Niveau {
    id: number;
    libelle: string;
    semestres:{
      sem_1:{
        id?:number,
        nom:string
      },
      sem_2:{
        id?:number,
        nom:string
      }
    };
}
