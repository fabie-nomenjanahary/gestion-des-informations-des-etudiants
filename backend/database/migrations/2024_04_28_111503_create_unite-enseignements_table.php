<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUniteEnseignementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unite-enseignements', function (Blueprint $table) {
            $table->id();
            $table->string('nom')->unique();
            $table->unsignedInteger('creditUE');
            $table->unsignedBigInteger('parcour_id');
            $table->foreign('parcour_id')->references('id')->on('parcours')->onDelete('cascade');
            $table->unsignedBigInteger('sem_id');
            $table->foreign('sem_id')->references('id')->on('semestres')->onDelete('cascade');
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
        Schema::dropIfExists('unite-enseignements');
    }
}
