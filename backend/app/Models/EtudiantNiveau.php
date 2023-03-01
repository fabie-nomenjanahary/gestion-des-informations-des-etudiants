<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EtudiantNiveau extends Model
{
    use HasFactory;
    protected $table = "etudiant_niveaux";

    public function anneeScolaire()
    {
        return $this->belongsTo(AnneeScolaire::class);
    }
}
