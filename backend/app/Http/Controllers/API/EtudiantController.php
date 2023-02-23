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
        $data = Etudiant::get();

        return response()->json($data, 200);
    }

    public function create(Request $request)
    {
        // Retrieve flight by name, or create it if it doesn't exist...
        // $flight = App\Models\Flight::firstOrCreate(['name' => 'Flight 10']);

        // Retrieve flight by name, or create it with the name, delayed, and arrival_time attributes...
        // $flight = App\Models\Flight::firstOrCreate(
        //     ['name' => 'Flight 10'],
        //     ['delayed' => 1, 'arrival_time' => '11:30']
        // );

        $data['matricule'] = $request['matricule'];
        $data['observation'] = $request['observation'];
        $data['personne_id'] = $request['personne_id'];
        $data['parcour_id'] = $request['parcour_id'];
        $data['niveau_id'] = $request['niveau_id'];
        $data['AS_id'] = $request['AS_id'];
        $validator = Validator::make($request->all(), Etudiant::rules(), Etudiant::$messages);

        Etudiant::create($data);

        return response()->json([
            'message' => "Etudiant ajouté avec succès",
            'success' => true
        ], 200);
    }

    public function search(Request $request)
    {
        $validator0 = Validator::make($request->all(), Personne::rules(), Personne::$messages);

        if ($validator0->fails()) {
            # code...
            // $etudiant['personne_id'] = 
            $personne = Personne::firstWhere(
                [
                    'tel' => $request['personne.tel'],
                    'mail' => $request['personne.mail']
                ]
            );
            $etudiant['personne_id'] = $personne->id;
        } else {
            # code...
            $personne['nom'] = $request['personne.nom'];
            $personne['prenom'] = $request['personne.prenom'];
            $personne['adresse'] = $request['personne.adresse'];
            $personne['dateNais'] = $request['personne.dateNais'];
            $personne['lieuNais'] = $request['personne.lieuNais'];
            $personne['tel'] = $request['personne.tel'];
            $personne['mail'] = $request['personne.mail'];

            $personne = Personne::create($personne);
            $etudiant['personne_id'] = $personne->id;
        }



        $validator1 = Validator::make($request->all(), Etudiant::rules(), Etudiant::$messages);

        if ($validator1->fails()) {
            return response()->json($validator0->errors());
        } else {
            $etudiant['matricule'] = $request['etudiant.matricule'];
            $etudiant['observation'] = $request['etudiant.observation'];
            $etudiant['parcour_id'] = $request['etudiant.parcour_id'];
            $etudiant['niveau_id'] = $request['etudiant.niveau_id'];
            $etudiant['AS_id'] = $request['etudiant.AS_id'];
            //TODO:validate personne_id
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
