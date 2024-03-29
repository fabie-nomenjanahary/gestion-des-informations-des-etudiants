<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Personne;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PersonneController extends Controller
{
    public function getAll()
    {
        $data = Personne::get();

        return response()->json($data, 200);
    }

    public function create(Request $request)
    {
        $data['nom'] = $request['nom'];
        $data['prenom'] = $request['prenom'];
        $data['adresse'] = $request['adresse'];
        $data['dateNais'] = $request['dateNais'];
        $data['lieuNais'] = $request['lieuNais'];
        $data['tel'] = $request['tel'];
        $data['mail'] = $request['mail'];

        $validator = Validator::make($data, Personne::rules(), Personne::$messages);

        if ($validator->fails()) {

            return response()->json(
                ['error' => $validator->errors()]
            );
        } else {

            Personne::create($data);

            return response()->json([
                'message' => "Personne ajoutée avec succès",
                'success' => true
            ], 200);
        }
    }

    public function get($id)
    {
        $data = Personne::find($id);

        return response()->json($data, 200);
    }

    public function search($nom, $prenom, $mail)
    {
        $data = Personne::where([
            ['nom', $nom],
            ['prenom', $prenom],
            ['mail', $mail]
        ])->first();

        return response()->json($data, 200);
    }

    public function update(Request $request, $id)
    {
        $data['nom'] = $request['nom'];
        $data['prenom'] = $request['prenom'];
        $data['adresse'] = $request['adresse'];
        $data['dateNais'] = $request['dateNais'];
        $data['lieuNais'] = $request['lieuNais'];
        $data['tel'] = $request['tel'];
        $data['mail'] = $request['mail'];

        $validator = Validator::make($data, Personne::updateRules($id), Personne::$messages);

        if ($validator->fails()) {

            return response()->json(
                ['error' => $validator->errors()]
            );
        } else {

            Personne::find($id)->update($data);

            return response()->json([
                'message' => 'Personne modifiée avec succès',
                'success' => true
            ], 200);
        }
    }

    public function delete($id)
    {
        Personne::find($id)->delete();

        return response()->json([
            'message' => 'Personne supprimée avec succès',
            'success' => true
        ], 200);
    }
}
