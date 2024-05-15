<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matiere extends Model
{
    use HasFactory;
    protected $table = "matieres";

    protected $fillable = [
        'nom',
        'ET',
        'ED',
        'EP',
        'creditEC',
        'poidsEC',
        'UE_id'
    ];
    public function uniteEnseignement()
    {
        return $this->belongsTo('App\Models\UniteEnseignement','UE_id');
    }
    public function enseignants()
    {
        return $this->belongsToMany(Enseignant::class, 'enseignants-matieres','ens_id','mat_id');
    }

    public static function rules()
    {
        return [
            'nom' => 'unique:matieres,nom'
        ];
    }

    public static function updateRules($id)
    {
        return [
            'nom' => 'unique:matieres,nom,' . $id
        ];
    }

    public static $messages = [
        'nom.unique' => 'Cette matière existe déjà'
    ];
}
