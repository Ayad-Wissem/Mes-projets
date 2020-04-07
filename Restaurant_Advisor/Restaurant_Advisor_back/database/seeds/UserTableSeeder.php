<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::truncate();

        $faker = \Faker\Factory::create();

    //    $password = Hash::make('toptal');


    //     User::create([
    //         'name' => 'Administrator',
    //         'email' => 'admin@test.com',
    //         'password' => $password,
    //         'username' => $faker->sentence,
    //         'firstname' => $faker->sentence,
    //     ]);
        for ($i = 0; $i < 20; $i++) {
            User::create([
                'name' => $faker->sentence,
                'email' => $faker->sentence,
                'password' => $faker->sentence,
                'login' => $faker->sentence,
                'firstname' => $faker->sentence,
            ]);
        }
    }
}
