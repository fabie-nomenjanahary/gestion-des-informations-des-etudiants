<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;


class Note extends Pivot
{
    use HasFactory;
    protected $table = "notes";
    public $incrementing = true;

    // protected $fillable = [
    //     'valeur',
    //     'et_id',
    //     'ens_mat_id',
    //     'session_id'
    // ];

    public function session()
    {
        return $this->belongsTo('App\Models\Session');
    }
}
