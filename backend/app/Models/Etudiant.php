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

    public function niveaux()
    {
        return $this->belongsToMany(Niveau::class, 'etudiant_niveaux')
            ->withPivot([
                'etudiant_id',
                'niveau_id',
                'AS_id'
            ]);
    }

    public static function rules()
    {
        return [
            'matricule' => 'required|unique:etudiants,matricule',
            'personne_id' => 'unique:etudiants,personne_id'
        ];
    }
    public static $messages = [
        'matricule.required' => 'Veuillez saisir le numéro matricule s\'il vous plait',
        'matricule.unique' => 'Ce numéro matricule existe dèjà',
        'personne_id.unique' => 'Cet étudiant est dèjà enregistré'
    ];
}
