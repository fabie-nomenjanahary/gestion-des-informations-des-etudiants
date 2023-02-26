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

    public static function rules()
    {
        return [
            'annee' => 'unique:annee-scolaires,annee',
            // TODO : array('debutAS', 'finAS')
        ];
    }

    public static $messages = [
        'annee.unique' => 'Ce nom d\'année scolaire existe déjà'
    ];
}
