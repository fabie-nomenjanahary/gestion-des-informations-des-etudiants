<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enseignant extends Model
{
    use HasFactory;

    protected $table = "enseignants";

    protected $fillable = [
        'matricule',
        'grade',
        'titre',
        'personne_id'
    ];
    public function personne()
    {
        return $this->belongsTo('App\Models\Personne');
    }
    public function matieres()
    {
        return $this->belongsToMany(Matiere::class, 'enseignants-matieres')
        ->withTimestamps();
    }
  public static function rules()
    {
        return [
            'matricule' => 'required|unique:enseignants,matricule',
            'personne_id' => 'unique:enseignants,personne_id'
        ];
    }
    public static $messages = [
        'matricule.required' => 'Veuillez saisir le numéro matricule s\'il vous plait',
        'matricule.unique' => 'Ce numéro matricule existe dèjà',
        'personne_id.unique' => 'Cet étudiant est dèjà enregistré'
    ];
}
