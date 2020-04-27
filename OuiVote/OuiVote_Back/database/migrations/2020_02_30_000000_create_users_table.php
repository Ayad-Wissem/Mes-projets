<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {

            $table->Increments('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            //$table->string('password');
            // $table->enum('role', array('user', 'maire'));
            //$table->boolean('role')->default(false);
            $table->boolean('validate')->default(false);
            $table->boolean('valid')->default(false);
            $table->integer('citie_id')->default(1)->unsigned();
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::table('users', function(Blueprint $table) {
            $table->foreign('citie_id')->references('id')->on('cities')
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
        Schema::dropIfExists('users');
    }
}
