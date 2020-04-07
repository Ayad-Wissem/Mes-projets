<?php

use App\Restaurant;
use Illuminate\Database\Seeder;

class RestaurantsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Restaurant::truncate();
        
        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 50; $i++) {
            Restaurant::create([
                'name'          => $faker->sentence,
                'description'   => $faker->sentence,
                'grade' => $faker->randomDigitNot(5),
                'localization'  => $faker->sentence,
                'phone_number'  => $faker->sentence,
                'website'       => $faker->sentence,
                'hours'         => $faker->sentence,
            ]);
        }
    }
}
