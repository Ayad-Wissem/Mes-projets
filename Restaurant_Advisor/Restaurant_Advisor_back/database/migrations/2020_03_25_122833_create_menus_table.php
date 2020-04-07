<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMenusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menus', function (Blueprint $table) {
            $table->Increments('id');
            $table->integer('restaurants_id')->unsigned()->nullable();
            $table->string('name');
            $table->string('description');
            $table->float('price');
            $table->timestamps();
        });

        Schema::table('menus',function(Blueprint $table){
            $table->foreign('restaurants_id')->references('id')->on('restaurants');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('menus');
    }
}
