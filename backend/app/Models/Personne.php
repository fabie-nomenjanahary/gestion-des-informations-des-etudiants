<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personne extends Model
{
    use HasFactory;

    protected $table = "personnes";

    protected $fillable = [
        'nom',
        'prenom',
        'adresse',
        'dateNais',
        'lieuNais',
        'tel',
        'mail'
    ];
    public function etudiant()
    {
        return $this->hasOne('App\Models\Etudiant');
    }

    public static function rules()
    {
        return [
            'personne.tel' => 'required|unique:personnes,tel',
            'personne.mail' => 'required|unique:personnes,mail',
        ];
    }

    public static $messages = [
        'personne.tel.required' => 'Veuillez saisir le numéro de téléphone s\'il vous plait',
        'personne.tel.unique' => 'Ce numéro de téléphone existe déjà',
        'personne.mail.required' => 'Veuillez saisir l\'adresse e-mail s\'il vous plait',
        'personne.mail.unique' => 'Cet adresse e-mail existe déjà',
    ];
}
