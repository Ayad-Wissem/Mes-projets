<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSondagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sondages', function (Blueprint $table) {
            $table->Increments('id');
            $table->string('titre');
            $table->string('description');
            $table->enum('category',array('Utilité publique', 'Environnemental', 'Culturel','Social'));
            $table->date('date');
            $table->string('hour');
            $table->integer('users_id')->unsigned();
            $table->timestamps();
        });

        Schema::table('sondages', function(Blueprint $table) {
            $table->foreign('users_id')->references('id')->on('users')
                        ->onDelete('restrict')
                        ->onUpdate('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sondages');
    }
}
