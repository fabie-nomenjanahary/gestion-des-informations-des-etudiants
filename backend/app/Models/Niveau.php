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
        return $this->hasMany('App\Models\Etudiant');
    }
}
