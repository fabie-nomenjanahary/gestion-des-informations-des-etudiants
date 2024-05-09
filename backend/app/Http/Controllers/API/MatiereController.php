<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Matiere;
use Illuminate\Support\Facades\Validator;

class MatiereController extends Controller
{
    public function getAll()
    {
        $data = Matiere::with('uniteEnseignement')->with('enseignants')->get();

        return response()->json($data, 200);
    }

    public function create(Request $request)
    {
        $data['nom'] = $request['nom'];
        $data['ET'] = $request['ET'];
        $data['ED'] = $request['ED'];
        $data['EP'] = $request['EP'];
        $data['creditEC'] = $request['creditEC'];
        $data['poidsEC'] = $request['poidsEC'];
        $data['UE_id'] = $request['UE_id'];

        $validator = Validator::make($data, Matiere::rules(), Matiere::$messages);

        if ($validator->fails()) {
            return response()->json(
                ['error' => $validator->errors()]
            );
        } else {

            Matiere::create($data);

            return response()->json([
                'message' => "Matière ajoutée avec succès",
                'success' => true
            ], 200);
        }
    }

    public function get($id)
    {
        $data = Matiere::find($id);

        return response()->json($data, 200);
    }

    public function update(Request $request, $id)
    {
        $data['nom'] = $request['nom'];
        $data['ET'] = $request['ET'];
        $data['ED'] = $request['ED'];
        $data['EP'] = $request['EP'];
        $data['creditEC'] = $request['creditEC'];
        $data['poidsEC'] = $request['poidsEC'];
        $data['UE_id'] = $request['UE_id'];

        $validator = Validator::make($data, Matiere::updateRules($id), Matiere::$messages);

        if ($validator->fails()) {
            return response()->json(
                ['error' => $validator->errors()]
            );
        } else {

            Matiere::find($id)->update($data);

            return response()->json([
                'message' => 'Matière modifiée avec succès',
                'success' => true
            ], 200);
        }
    }

    public function delete($id)
    {
        Matiere::find($id)->delete();

        return response()->json([
            'message' => 'Matière supprimée avec succès',
            'success' => true
        ], 200);
    }
}
