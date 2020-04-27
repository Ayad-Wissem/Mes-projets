<?php
use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $faker = \Faker\Factory::create();

            User::create([
                'name' => 'Martin01',
                'email' => 'admin01@test.com',
                'password' => 'password',
                // 'role' => 'maire',
                'valid' => 1,
                'citie_id' => 1
            ]);
            User::create([
                'name' => 'Martin02',
                'email' => 'admin02@test.com',
                'password' => 'password',
                // 'role' => 'user',
                'valid' => 1,
                'citie_id' => 2
            ]);
            User::create([
                'name' => 'Martin03',
                'email' => 'admin03@test.com',
                'password' => 'password',
                // 'role' => 'user',
                'valid' => 0,
                'citie_id' => 3
            ]);
            User::create([
                'name' => 'Martin04',
                'email' => 'admin04@test.com',
                'password' => 'password',
                // 'role' => 'user',
                'valid' => 0,
                'citie_id' => 4
            ]);
    }
}

