<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Etudiant;
use App\Models\Personne;
use App\Models\EtudiantNiveau;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EtudiantController extends Controller
{
    public function getAll()
    {
        $data = Etudiant::with('personne')->with('parcour')->with('niveaux')->get();
        return response()->json($data, 200);
    }

    public function create(Request $request)
    {
        $personne = [
            'nom' => $request['personne.nom'],
            'prenom' => $request['personne.prenom'],
            'adresse' => $request['personne.adresse'],
            'dateNais' => $request['personne.dateNais'],
            'lieuNais' => $request['personne.lieuNais'],
            'tel' => $request['personne.tel'],
            'mail' => $request['personne.mail']
        ];

        $etudiant = [
            'matricule' => $request['etudiant.matricule'],
            'observation' => $request['etudiant.observation'],
            'parcour_id' => $request['etudiant.parcour_id']
        ];
        $niveaux_annees = $request['etudiant.niveaux_annees'];
        $validator0 = Validator::make($personne, Personne::rules(), Personne::$messages);

        if ($validator0->fails()) {
            try {
                $pers = Personne::firstWhere(
                    [
                        'tel' => $personne['tel'],
                        'mail' => $personne['mail']
                    ]
                );

                $etudiant['personne_id'] = $pers->id;
            } catch (\Throwable $th) {
                $msg = '';
                $pers = new Personne();
                //tel same mail not
                $pers0 = Personne::where('tel', $personne['tel'])->first();
                $pers1 = Personne::where('mail', $personne['mail'])->first();

                if ($pers0) {
                    $pers = $pers0;
                    $msg = 'Vous vouliez saisir ' . $pers->mail . ' au lieu de ' . $personne['mail'] . ' ?';
                } else if ($pers1) {
                    $pers = $pers1;
                    $msg = 'Vous vouliez saisir ' . $pers->tel . ' au lieu de ' . $personne['tel'] . ' ?';
                }

                $et = $pers->etudiant;

                //DO YOU MEAN THIS STUDENT?
                return response()->json([
                    'error' => $msg,
                    'data' => $et
                ]);
            }
        } else {

            $pers = Personne::create($personne);
            $etudiant['personne_id'] = $pers->id;
        }

        $validator1 = Validator::make($etudiant, Etudiant::rules(), Etudiant::$messages);

        if ($validator1->fails()) {
            $et = new Etudiant();
            try {
                $et = Etudiant::firstWhere(
                    [
                        'matricule' => $etudiant['matricule'],
                        'personne_id' => $etudiant['personne_id']
                    ]
                );
            } catch (\Throwable $th) {
                $et = Etudiant::where('matricule', $etudiant['matricule'])
                    ->orWhere('personne_id', $etudiant['personne_id'])->first();
            }
            return response()->json([
                'error' => $validator1->errors(),
                'data' => $et
            ]);
        } else {

            $et = Etudiant::create($etudiant);
            foreach ($niveaux_annees as $key => $niveau_annee) {
                $et->niveaux()->attach(['niveau_id' => $niveau_annee['niveau_id']], ['AS_id' => $niveau_annee['AS_id']]);
            }
            return response()->json([
                'message' => "Etudiant ajouté avec succès",
                'success' => true
            ], 200);
        }
    }

    public function get($id)
    {
        $data = Etudiant::find($id);

        return response()->json($data, 200);
    }

    public function update(Request $request, $id)
    {
        $personne = [
            'nom' => $request['personne.nom'],
            'prenom' => $request['personne.prenom'],
            'adresse' => $request['personne.adresse'],
            'dateNais' => $request['personne.dateNais'],
            'lieuNais' => $request['personne.lieuNais'],
            'tel' => $request['personne.tel'],
            'mail' => $request['personne.mail']
        ];

        $etudiant = [
            'matricule' => $request['etudiant.matricule'],
            'observation' => $request['etudiant.observation'],
            'parcour_id' => $request['etudiant.parcour_id']
        ];

        Personne::find($request['etudiant.personne_id'])->update($personne);
        $et=Etudiant::find($id);
        $et->update($etudiant);
        foreach ($request['etudiant.niveaux_annees'] as $key => $niveau_annee) {
            $et->niveaux()->syncWithoutDetaching([$niveau_annee['niveau_id']=>
                ['AS_id' => $niveau_annee['AS_id']]]//it doeen't take this one into consideration
            );
        }
        return response()->json([
            'message' => 'Etudiant modifié avec succès',
            'success' => true
        ], 200);
    }

    public function delete($id)
    {
        Etudiant::find($id)->delete();

        return response()->json([
            'message' => 'Etudiant supprimé avec succès',
            'success' => true
        ], 200);
    }
}
