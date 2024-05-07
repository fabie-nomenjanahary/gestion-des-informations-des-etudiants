<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class EnseignantMatiere extends Pivot
{
    use HasFactory;
    protected $table = "enseignants-matieres";
    public $incrementing = true;

    public function etudiants()
    {
        return $this->belongsToMany(Etudiant::class, 'notes');
    }
}
