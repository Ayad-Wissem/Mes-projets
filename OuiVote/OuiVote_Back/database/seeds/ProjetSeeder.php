<?php

use App\Projet;
use Illuminate\Database\Seeder;

class ProjetSeeder extends Seeder
{
        /**
         * Run the database seeds.
         *
         * @return void
         */
        public function run()
        {
            Projet::create([
                'titre' => 'Projet 01',
                'description' => 'je suis le projet no: 01',
                'category' => 'Environnemental',
                'users_id' => 1,
                'date'=> '2015/02/28',
                'hour'=> '15h14',
            ]);
            Projet::create([
                'titre' => 'Projet 02',
                'description' => 'je suis le projet no: 02',
                'category' => 'Utilité publique',
                'users_id' => 2,
                'date'=> '2015/02/28',
                'hour'=> '15h14',
            ]);
            Projet::create([
                'titre' => 'Projet 03',
                'description' => 'je suis le projet no: 03',
                'category' => 'Culturel',
                'users_id' => 1,
                'date'=> '2015/02/28',
                'hour'=> '15h14',
            ]);
            Projet::create([
                'titre' => 'Projet 04',
                'description' => 'je suis le projet no: 04',
                'category' => 'Social',
                'users_id' => 2,
                'date'=> '2015/02/28',
                'hour'=> '15h14',
            ]);
        }
    }
    
