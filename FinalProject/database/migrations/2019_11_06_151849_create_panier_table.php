<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePanierTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Panier', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('utilisateur_id')->unsigned();
            $table->float('prix_total')->default(0);
            $table->timestamps();
        });
 
        Schema::table('Panier', function (Blueprint $table) {  
            $table->foreign('utilisateur_id')->references('id')->on('Utilisateur');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Panier');
    }
}
