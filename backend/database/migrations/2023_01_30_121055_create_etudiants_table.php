<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEtudiantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('etudiants', function (Blueprint $table) {
            $table->id();
            $table->string('matricule')->unique();
            $table->text('observation')->nullable();
            $table->timestamps();
            $table->unsignedBigInteger('personne_id');
            $table->unsignedBigInteger('parcour_id');
            $table->foreign('personne_id')->references('id')->on('personnes')->onDelete('cascade');
            $table->foreign('parcour_id')->references('id')->on('parcours')->onDelete('cascade');
            // $table->unsignedBigInteger('niveau_id');
            // $table->foreign('niveau_id')->references('id')->on('niveaux');
            // $table->unsignedBigInteger('AS_id');
            // $table->foreign('AS_id')->references('id')->on('annee-scolaires');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('etudiants');
    }
}
