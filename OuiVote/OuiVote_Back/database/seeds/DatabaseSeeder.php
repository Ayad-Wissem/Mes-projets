<?php

use App\Sondage;
use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        // $this->call(CitiesSeeder::class);
            // $this->call(UserSeeder::class);
            // $this->call(SondageSeeder::class);
            // $this->call(ProjetSeeder::class);
            $this->call(VoteSeeder::class);
            
    
    }
}
