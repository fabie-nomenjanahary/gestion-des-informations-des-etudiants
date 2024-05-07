<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEnseignantsMatieresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('enseignants-matieres', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('mat_id');
            $table->foreign('mat_id')->references('id')->on('matieres')->onDelete('cascade');
            $table->unsignedBigInteger('ens_id');
            $table->foreign('ens_id')->references('id')->on('enseignants')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
