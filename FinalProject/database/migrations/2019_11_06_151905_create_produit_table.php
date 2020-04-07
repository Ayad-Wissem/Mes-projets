<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProduitTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Produit', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('panier_id')->unsigned()->nullable();
            $table->string('nom');
            $table->longText('description')->nullable();
            $table->string('catégorie');
            $table->float('prix');
            $table->string('image');
            $table->integer('quantité')->unsigned();
            $table->timestamps();
        });
 
        Schema::table('Produit', function (Blueprint $table) {        
            $table->foreign('panier_id')->references('id')->on('Panier');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Produit');
    }
}
