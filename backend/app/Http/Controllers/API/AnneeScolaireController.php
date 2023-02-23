<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\AnneeScolaire;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;

class AnneeScolaireController extends Controller
{
    public function getAll()
    {
        // var_dump(new DateTime('2020-12-30'));
        $data = AnneeScolaire::get();

        return response()->json($data, 200);
    }

    public function create(Request $request)
    {
        $data['annee'] = $request['annee'];
        $data['debutAS'] = $request['debutAS'];
        $data['finAS'] = $request['finAS'];

        // dd($data);
        AnneeScolaire::create($data);

        return response()->json([
            'message' => "Année scolaire ajoutée avec succès",
            'success' => true
        ], 200);
    }

    public function get($id)
    {
        $data = AnneeScolaire::find($id);

        return response()->json($data, 200);
    }

    public function update(Request $request, $id)
    {
        $data['annee'] = $request['annee'];
        $data['debutAS'] = $request['debutAS'];
        $data['finAS'] = $request['finAS'];

        AnneeScolaire::find($id)->update($data);

        return response()->json([
            'message' => 'Année scolaire modifiée avec succès',
            'success' => true
        ], 200);
    }

    public function delete($id)
    {
        AnneeScolaire::find($id)->delete();

        return response()->json([
            'message' => 'Année scolaire supprimée avec succès',
            'success' => true
        ], 200);
    }
}
