<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMatieresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('matieres', function (Blueprint $table) {
            $table->id();
            $table->string('nom')->unique();
            $table->unsignedInteger('ET')->nullable();
            $table->unsignedInteger('ED')->nullable();
            $table->unsignedInteger('EP')->nullable();
            $table->unsignedInteger('creditEC')->nullable();
            $table->unsignedDouble('poidsEC')->nullable();
            $table->unsignedBigInteger('UE_id');
            $table->foreign('UE_id')->references('id')->on('unite-enseignements')->onDelete('cascade');
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
        Schema::dropIfExists('matieres');
    }
}
