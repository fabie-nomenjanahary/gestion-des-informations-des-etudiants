<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parcour extends Model
{
    use HasFactory;

    protected $table = "parcours";

    protected $fillable = [
        'libelle'
    ];

    public function etudiants()
    {
        return $this->hasMany('App\Models\Etudiant');
    }

    public static function rules()
    {
        return [
            'libelle' => 'unique:parcours,libelle'
        ];
    }

    public static function updateRules($id)
    {
        return [
            'libelle' => 'unique:parcours,libelle,' . $id
        ];
    }

    public static $messages = [
        'libelle.unique' => 'Ce parcour existe déjà'
    ];
}
