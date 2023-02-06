<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnneeScolaire extends Model
{
    use HasFactory;

    protected $table = "annee-scolaires";

    protected $fillable = [
        'annee',
        'debutAS',
        'finAS'
    ];

    public function etudiants()
    {
        return $this->hasMany('App\Models\Etudiant');
    }
}
