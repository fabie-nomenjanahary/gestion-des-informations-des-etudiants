<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Niveau;
use App\Models\Semestre;
use App\Models\EtudiantNiveau;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NiveauController extends Controller
{
    public function getAll()
    {
        $data = Niveau::with('semestres')->get();
        return response()->json($data, 200);
    }

    public function create(Request $request)
    {
        $data['libelle'] = $request['libelle'];
        $sem_1 = new Semestre(['nom' => $request['semestres.sem_1.nom']]);
        $sem_2=new Semestre(['nom' => $request['semestres.sem_2.nom']]);
        $validator = Validator::make($data, Niveau::rules(), Niveau::$messages);

        if ($validator->fails()) {
            return response()->json(
                ['error' => $validator->errors()]
            );
        } else {

            $niveau=Niveau::create($data);
            $niveau->semestres()->save($sem_1);
            $niveau->semestres()->save($sem_2);
            return response()->json([
                'message' => "Niveau ajouté avec succès",
                'success' => true
            ], 200);
        }
    }

    public function get($id)
    {
        $data = Niveau::find($id);

        return response()->json($data, 200);
    }

    public function update(Request $request, $id)
    {
        $data['libelle'] = $request['libelle'];
        $new_sem_1 = $request['semestres.sem_1.nom'];
        $new_sem_2= $request['semestres.sem_2.nom'];
        $id_sem_1 = $request['semestres.sem_1.id'];
        $id_sem_2= $request['semestres.sem_2.id'];
        $validator = Validator::make($data, Niveau::updateRules($id), Niveau::$messages);

        if ($validator->fails()) {
            return response()->json(
                ['error' => $validator->errors()]
            );
        } else {

            $niveau=Niveau::find($id);
            $niveau->update($data);
            $sem_1=$niveau->semestres()->whereId($id_sem_1)->first();
            $sem_2=$niveau->semestres()->whereId($id_sem_2)->first();
            $sem_1->nom=$new_sem_1;
            $sem_1->update();
            $sem_2->nom=$new_sem_2;
            $sem_2->update();
            return response()->json([
                'message' => 'Niveau modifié avec succès',
                'success' => true
            ], 200);
        }
    }

    public function delete($id)
    {
        Niveau::find($id)->delete();
        //DELETE etudiants_niveuax WHEN DELETING niveau

        EtudiantNiveau::where(['niveau_id'=>$id])->delete();
        //DELETE semestres WHEN DELETING niveau
        Semestre::where(['niveau_id'=>$id])->delete();
//max length of semestre should be 3 chars,min length 2
        return response()->json([
            'message' => 'Niveau supprimé avec succès',
            'success' => true
        ], 200);
    }
}
