<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Note;
use Illuminate\Support\Facades\Validator;

class NoteController extends Controller
{
    public function getAll()
    {
        $data = Note::with('etudiant')->with('ens_mat')->with('session')->get();

        return response()->json($data, 200);
    }

    public function create(Request $request)
    {
        $data['et_id'] = $request['et_id'];
        $data['ens_mat_id'] = $request['ens_mat_id'];
        $data['valeur'] = $request['valeur'];
        $data['session_id'] = $request['session_id'];


        $validator = Validator::make($data, Note::rules(), Note::$messages);

        if ($validator->fails()) {
            return response()->json(
                ['error' => $validator->errors()]
            );
        } else {

            Note::create($data);

            return response()->json([
                'message' => "Note ajoutée avec succès",
                'success' => true
            ], 200);
        }
    }

    public function get($id)
    {
        $data = Note::find($id);

        return response()->json($data, 200);
    }

    public function update(Request $request, $id)
    {
        $data['ens_mat_id'] = $request['ens_mat_id'];
        $data['valeur'] = $request['valeur'];
        $data['session_id'] = $request['session_id'];

        $validator = Validator::make($data, Note::updateRules($id), Note::$messages);

        if ($validator->fails()) {
            return response()->json(
                ['error' => $validator->errors()]
            );
        } else {

            Note::find($id)->update($data);

            return response()->json([
                'message' => 'Note modifiée avec succès',
                'success' => true
            ], 200);
        }
    }

    public function delete($id)
    {
        Note::find($id)->delete();

        return response()->json([
            'message' => 'Note supprimée avec succès',
            'success' => true
        ], 200);
    }
}
