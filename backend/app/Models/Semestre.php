<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Semestre extends Model
{
    use HasFactory;
    protected $table = "semestres";

    protected $fillable = [
        'nom',
        'niveau_id'
    ];
    public function niveau()
    {
        return $this->belongsTo('App\Models\Niveau');
    }
    public function uniteEnseignements()
    {
        return $this->hasMany('App\Models\UniteEnseignement', 'sem_id');
    }

    public static function rules()
    {
        return [
            'nom' => 'unique:semestres,nom'
        ];
    }

    public static function updateRules($id)
    {
        return [
            'nom' => 'unique:semestres,nom,' . $id
        ];
    }

    public static $messages = [
        'nom.unique' => 'Ce semestre existe déjà'
    ];
}
