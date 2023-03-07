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

    public function etudiantNiveaux()
    {
        return $this->hasMany(EtudiantNiveau::class);
    }

    public static function rules()
    {
        return [
            'annee' => 'unique:annee-scolaires,annee',
            'debutAS' => 'unique:annee-scolaires,debutAS',
            'finAS' => 'unique:annee-scolaires,finAS',
            // TODO : array('debutAS', 'finAS')
        ];
    }

    public static function updateRules($id)
    {
        return [
            'annee' => 'unique:annee-scolaires,annee,' . $id,
            'debutAS' => 'unique:annee-scolaires,debutAS,' . $id,
            'finAS' => 'unique:annee-scolaires,finAS,' . $id,
            // TODO : array('debutAS', 'finAS')
        ];
    }

    public static $messages = [
        'annee.unique' => 'Ce nom d\'année scolaire existe déjà',
        'debutAS.unique' => 'Ce début d\'année scolaire existe déjà',
        'finAS.unique' => 'Ce fin d\'année scolaire existe déjà',
    ];
}
