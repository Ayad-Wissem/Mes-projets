<?php

use App\Vote;
use Illuminate\Database\Seeder;

class VoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Vote::create([
            'users_id' => 1,
            'sondages_id' => 1,
            'votePour' => 1,
            'votreContre' => 0,
            'voteNull' => 0,
        ]);
    }
}
