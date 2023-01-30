<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Etudiant;
use Illuminate\Http\Request;

class EtudiantController extends Controller
{
    public function getAll()
    {
        $data = Etudiant::get();

        return response()->json($data, 200);
    }

    public function create(Request $request)
    {
        $data['matricule'] = $request['matricule'];
        $data['observation'] = $request['observation'];

        Etudiant::create($data);

        return response()->json([
            'message' => "Etudiant ajouté avec succès",
            'success' => true
        ], 200);
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
            'message' => 'Etudiany*t supprimé avec succès',
            'success' => true
        ], 200);
    }
}
