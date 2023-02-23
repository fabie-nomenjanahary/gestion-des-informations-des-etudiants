<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnneeScolaireTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('annee-scolaires', function (Blueprint $table) {
            $table->id();
            $table->string('annee')->unique()->nullable();
            $table->date('debutAS');
            $table->date('finAS');
            $table->timestamps();


            $table->unique(array('debutAS', 'finAS'));
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

        Schema::dropIfExists('annee-scolaire');
    }
}
