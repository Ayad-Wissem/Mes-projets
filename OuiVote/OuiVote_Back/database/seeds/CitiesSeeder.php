<?php

use App\Citie;
use Illuminate\Database\Seeder;

class CitiesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();
        for ($i=0; $i < 5 ; $i++) { 
            
            Citie::create([
                'citie' => 'Je suis une Ville'
            ]);
        }
    }
}
