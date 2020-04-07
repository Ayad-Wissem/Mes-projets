<?php

namespace App\Model;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Authenticatable as BasicAuthenticatable;


class Produit extends Model implements Authenticatable
{
    use BasicAuthenticatable;

    protected $table = 'Produit';
    
}
