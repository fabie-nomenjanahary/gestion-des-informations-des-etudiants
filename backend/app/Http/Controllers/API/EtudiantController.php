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
