<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Personne;
use App\Models\Enseignant;
use Illuminate\Support\Facades\Validator;

class EnseignantController extends Controller
{
    public function getAll()
    {
        $data = Enseignant::with('personne')->get();
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

        $enseignant = [
            'matricule' => $request['enseignant.matricule'],
            'grade' => $request['enseignant.grade'],
            'titre' => $request['enseignant.titre']
        ];
        $validator0 = Validator::make($personne, Personne::rules(), Personne::$messages);

        if ($validator0->fails()) {
            try {
                $pers = Personne::firstWhere(
                    [
                        'tel' => $personne['tel'],
                        'mail' => $personne['mail']
                    ]
                );

                $enseignant['personne_id'] = $pers->id;
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

                $et = $pers->enseignant;

                //DO YOU MEAN THIS TEACHER?
                return response()->json([
                    'error' => $msg,
                    'data' => $et
                ]);
            }
        } else {

            $pers = Personne::create($personne);
            $enseignant['personne_id'] = $pers->id;
        }

        $validator1 = Validator::make($enseignant, Enseignant::rules(), Enseignant::$messages);

        if ($validator1->fails()) {
            $et = new Enseignant();
            try {
                $et = Enseignant::firstWhere(
                    [
                        'matricule' => $enseignant['matricule'],
                        'personne_id' => $enseignant['personne_id']
                    ]
                );
            } catch (\Throwable $th) {
                $et = Enseignant::where('matricule', $enseignant['matricule'])
                    ->orWhere('personne_id', $enseignant['personne_id'])->first();
            }
            return response()->json([
                'error' => $validator1->errors(),
                'data' => $et
            ]);
        } else {

            $et = Enseignant::create($enseignant);
            return response()->json([
                'message' => "Enseignant ajouté avec succès",
                'success' => true
            ], 200);
        }
    }

    public function get($id)
    {
        $data = Enseignant::find($id);

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

        $enseignant = [
            'matricule' => $request['enseignant.matricule'],
            'grade' => $request['enseignant.grade'],
            'titre' => $request['enseignant.titre']
        ];
        Personne::find($request['enseignant.personne_id'])->update($personne);
        $et=Enseignant::find($id);
        $et->update($enseignant);
        return response()->json([
            'message' => 'Enseignant modifié avec succès',
            'success' => true
        ], 200);
    }

    public function delete($id)
    {
        Enseignant::find($id)->delete();

        return response()->json([
            'message' => 'Enseignant supprimé avec succès',
            'success' => true
        ], 200);
    }
}
