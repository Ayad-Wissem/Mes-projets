<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projets', function (Blueprint $table) {
            $table->Increments('id');
            $table->string('titre');
            $table->string('description');
            $table->enum('category',array('Utilité publique', 'Environnemental', 'Culturel','Social'));
            $table->date('date');
            $table->string('hour');
            $table->integer('campagne')->default("Scrutin a un tour");
            $table->integer('users_id')->unsigned();
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
        Schema::dropIfExists('projets');
    }
}
