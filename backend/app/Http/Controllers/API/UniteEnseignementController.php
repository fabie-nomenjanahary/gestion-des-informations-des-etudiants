<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UniteEnseignement;
use Illuminate\Support\Facades\Validator;

class UniteEnseignementController extends Controller
{
    public function getAll()
    {
        //don't take sem_id,UE_id but semestre_id, unite-enseignement_id
        $data = UniteEnseignement::with('parcour')->with('semestre')->with('semestre.niveau')->with('matieres')->get();

        return response()->json($data, 200);
    }

    public function create(Request $request)
    {
        $data['niveau_id'] = $request['niveau_id'];
        $data['parcour_id'] = $request['parcour_id'];
        $data['sem_id'] = $request['sem_id'];
        $data['nom'] = $request['nom'];
        $data['creditUE'] = $request['creditUE'];


        $validator = Validator::make($data, UniteEnseignement::rules(), UniteEnseignement::$messages);

        if ($validator->fails()) {
            return response()->json(
                ['error' => $validator->errors()]
            );
        } else {

            UniteEnseignement::create($data);

            return response()->json([
                'message' => "Unite d'Enseignement ajoutée avec succès",
                'success' => true
            ], 200);
        }
    }

    public function get($id)
    {
        $data = UniteEnseignement::find($id);

        return response()->json($data, 200);
    }

    public function update(Request $request, $id)
    {
        $data['niveau_id'] = $request['niveau_id'];
        $data['parcour_id'] = $request['parcour_id'];
        $data['sem_id'] = $request['sem_id'];
        $data['nom'] = $request['nom'];
        $data['creditUE'] = $request['creditUE'];

        $validator = Validator::make($data, UniteEnseignement::updateRules($id), UniteEnseignement::$messages);

        if ($validator->fails()) {
            return response()->json(
                ['error' => $validator->errors()]
            );
        } else {

            UniteEnseignement::find($id)->update($data);

            return response()->json([
                'message' => 'Unite d\'Enseignement modifiée avec succès',
                'success' => true
            ], 200);
        }
    }

    public function delete($id)
    {
        UniteEnseignement::find($id)->delete();

        return response()->json([
            'message' => 'Unite d\'Enseignement supprimée avec succès',
            'success' => true
        ], 200);
    }
}
