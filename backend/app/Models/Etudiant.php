<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    use HasFactory;

    protected $table = "etudiants";

    protected $fillable = [
        'matricule',
        'observation',
        'personne_id',
        'parcour_id',
        'niveau_id',
        'AS_id'
    ];

    public function personne()
    {
        return $this->belongsTo('App\Models\Personne');
    }

    public function parcour()
    {
        return $this->belongsTo('App\Models\Parcour');
    }

    public function niveau()
    {
        return $this->belongsTo('App\Models\Niveau');
    }

    public function anneeScolaire()
    {
        return $this->belongsTo('App\Models\AnneeScolaire');
    }

    public static function rules()
    {
        return [
            'etudiant.matricule' => 'required|unique:etudiants,matricule',
        ];
    }
    public static $messages = [
        'etudiant.matricule.required' => 'Veuillez saisir le numéro matricule s\'il vous plait',
        'etudiant.matricule.unique' => 'Ce numéro matricule existe dèjà'
    ];
}
