<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Niveau extends Model
{
    use HasFactory;

    protected $table = "niveaux";

    protected $fillable = [
        'libelle'
    ];

    public function etudiants()
    {
        return $this->belongsToMany(Etudiant::class, 'etudiant_niveaux');
    }

    public static function rules()
    {
        return [
            'libelle' => 'unique:niveaux,libelle'
        ];
    }

    public static function updateRules($id)
    {
        return [
            'libelle' => 'unique:niveaux,libelle,' . $id
        ];
    }

    public static $messages = [
        'libelle.unique' => 'Ce niveau existe déjà'
    ];
}
