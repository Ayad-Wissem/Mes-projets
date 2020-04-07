<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Panier extends Model
{
    protected $table = 'Panier';
    
    public function produit() {
        return $this->hasMany('App\Model\Produit');
    }
}
