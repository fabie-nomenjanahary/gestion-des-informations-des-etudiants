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
            'debutAS' => 'unique:annee-scolaires,debutAS,' . $this->id . ',id,finAS,' . $this->finAS,
            // TODO : array('debutAS', 'finAS')
        ];
    }

    public static $messages = [
        'annee.unique' => 'Ce nom d\'année scolaire existe déjà'
    ];
}
