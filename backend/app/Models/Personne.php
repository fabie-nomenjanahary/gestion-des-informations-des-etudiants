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
}
