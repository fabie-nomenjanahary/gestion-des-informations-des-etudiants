<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Niveau;
use Illuminate\Http\Request;

class NiveauController extends Controller
{
    public function getAll()
    {
        $data = Niveau::get();

        return response()->json($data, 200);
    }

    public function create(Request $request)
    {
        $data['libelle'] = $request['libelle'];

        Niveau::create($data);

        return response()->json([
            'message' => "Niveau ajouté avec succès",
            'success' => true
        ], 200);
    }

    public function get($id)
    {
        $data = Niveau::find($id);

        return response()->json($data, 200);
    }

    public function update(Request $request, $id)
    {
        $data['libelle'] = $request['libelle'];

        Niveau::find($id)->update($data);

        return response()->json([
            'message' => 'Niveau modifié avec succès',
            'success' => true
        ], 200);
    }

    public function delete($id)
    {
        Niveau::find($id)->delete();

        return response()->json([
            'message' => 'Niveau supprimé avec succès',
            'success' => true
        ], 200);
    }
}
