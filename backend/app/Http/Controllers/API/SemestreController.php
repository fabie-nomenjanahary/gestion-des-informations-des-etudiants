<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Semestre;
use Illuminate\Support\Facades\Validator;

class SemestreController extends Controller
{
    public function getAll()
    {
        $data = Semestre::with('niveau')->get();
        return response()->json($data, 200);
    }

    public function create(Request $request)
    {
        $data['nom'] = $request['nom'];
        $data['niveau_id'] = $request['niveau_id'];

        $validator = Validator::make($data, Semestre::rules(), Semestre::$messages);

        if ($validator->fails()) {
            return response()->json(
                ['error' => $validator->errors()]
            );
        } else {

            Semestre::create($data);

            return response()->json([
                'message' => "Semestre ajouté avec succès",
                'success' => true
            ], 200);
        }
    }

    public function get($id)
    {
        $data = Semestre::find($id);

        return response()->json($data, 200);
    }

    public function update(Request $request, $id)
    {
        $data['nom'] = $request['nom'];
        $data['niveau_id'] = $request['niveau_id'];

        $validator = Validator::make($data, Semestre::updateRules($id), Semestre::$messages);

        if ($validator->fails()) {
            return response()->json(
                ['error' => $validator->errors()]
            );
        } else {

            Semestre::find($id)->update($data);

            return response()->json([
                'message' => 'Semestre modifié avec succès',
                'success' => true
            ], 200);
        }
    }

    public function delete($id)
    {
        Semestre::find($id)->delete();

        return response()->json([
            'message' => 'Semestre supprimé avec succès',
            'success' => true
        ], 200);
    }
}
