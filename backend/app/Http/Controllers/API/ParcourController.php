<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Parcour;
use Illuminate\Http\Request;

class ParcourController extends Controller
{
    public function getAll()
    {
        $data = Parcour::get();

        return response()->json($data, 200);
    }

    public function create(Request $request)
    {
        $data['libelle'] = $request['libelle'];

        Parcour::create($data);

        return response()->json([
            'message' => "Parcour ajouté avec succès",
            'success' => true
        ], 200);
    }

    public function get($id)
    {
        $data = Parcour::find($id);

        return response()->json($data, 200);
    }

    public function update(Request $request, $id)
    {
        $data['libelle'] = $request['libelle'];

        Parcour::find($id)->update($data);

        return response()->json([
            'message' => 'Parcour modifié avec succès',
            'success' => true
        ], 200);
    }

    public function delete($id)
    {
        Parcour::find($id)->delete();

        return response()->json([
            'message' => 'Parcour supprimé avec succès',
            'success' => true
        ], 200);
    }
}
