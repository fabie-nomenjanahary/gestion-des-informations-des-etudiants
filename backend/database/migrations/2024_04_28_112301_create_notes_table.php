<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notes', function (Blueprint $table) {
            $table->id();
            $table->unsignedDouble('valeur');
            $table->unsignedBigInteger('et_id');
            $table->foreign('et_id')->references('id')->on('etudiants')->onDelete('cascade');
            $table->unsignedBigInteger('ens_mat_id');
            $table->foreign('ens_mat_id')->references('id')->on('enseignants-matieres')->onDelete('cascade');
            $table->unsignedBigInteger('session_id');
            $table->foreign('session_id')->references('id')->on('sessions')->onDelete('cascade');
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
        Schema::dropIfExists('notes');
    }
}
