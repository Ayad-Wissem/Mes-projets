<?php

use App\Menu;
use Illuminate\Database\Seeder;

class MenuTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Menu::truncate();
        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 50; $i++) {
            Menu::create([
                'name' => $faker->sentence,
                'description'=> $faker->sentence,
                'price' => $faker->randomDigitNot(5),

            ]);
        }
    }
}
