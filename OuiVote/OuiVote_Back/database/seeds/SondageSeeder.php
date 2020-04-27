<?php

use App\Sondage;
use Illuminate\Database\Seeder;

class SondageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Sondage::create([
            'titre' => 'Sondage 01',
            'description' => 'je suis l\'article 01',
            'category' => 'Environnemental',
            'users_id' => 1,
            'date'=> '2015/02/28',
            'hour'=> '15h14',
        ]);
        Sondage::create([
            'titre' => 'Sondage 02',
            'description' => 'je suis l\'article 02',
            'category' => 'Utilité publique',
            'users_id' => 2,
            'date'=> '2015/02/28',
            'hour'=> '15h14',
        ]);
        Sondage::create([
            'titre' => 'Sondage 03',
            'description' => 'je suis l\'article 03',
            'category' => 'Culturel',
            'users_id' => 1,
            'date'=> '2015/02/28',
            'hour'=> '15h14',
        ]);
        Sondage::create([
            'titre' => 'Sondage 04',
            'description' => 'je suis l\'article 04',
            'category' => 'Social',
            'users_id' => 2,
            'date'=> '2015/02/28',
            'hour'=> '15h14',
        ]);
    }
}
