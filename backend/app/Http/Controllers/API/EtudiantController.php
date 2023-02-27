<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Etudiant;
use App\Models\Personne;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EtudiantController extends Controller
{
    public function getAll()
    {
        $data = Etudiant::with('personne')->with('parcour')->with('niveau')->with('anneeScolaire')->get();

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
            'parcour_id' => $request['etudiant.parcour_id'],
            'niveau_id' => $request['etudiant.niveau_id'],
            'AS_id' => $request['etudiant.AS_id']
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
                //mail same tel not
                //$pers = Personne::where('mail', $personne['mail'])->first();

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

            Etudiant::create($etudiant);

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
        $data['matricule'] = $request['matricule'];
        $data['observation'] = $request['observation'];
        $data['personne_id'] = $request['personne_id'];
        $data['parcour_id'] = $request['parcour_id'];
        $data['niveau_id'] = $request['niveau_id'];
        $data['AS_id'] = $request['AS_id'];

        Etudiant::find($id)->update($data);

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
