<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UniteEnseignement extends Model
{
    use HasFactory;
    protected $table = "unite-enseignements";

    protected $fillable = [
        'nom',
        'creditUE',
        'parcour_id',
        'sem_id'
    ];
    public function parcour()
    {
        return $this->belongsTo('App\Models\Parcour');
    }
    public function semestre()
    {
        return $this->belongsTo('App\Models\Semestre','sem_id');
    }
    public function matieres()
    {
        return $this->hasMany('App\Models\Matiere', 'UE_id');
    }

    public static function rules()
    {
        return [
            'nom' => 'unique:unite-enseignements,nom'
        ];
    }

    public static function updateRules($id)
    {
        return [
            'nom' => 'unique:unite-enseignements,nom,' . $id
        ];
    }

    public static $messages = [
        'nom.unique' => 'Cette unité d\'enseignements existe déjà'
    ];
}
