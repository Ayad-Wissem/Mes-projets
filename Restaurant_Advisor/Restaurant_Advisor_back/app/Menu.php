<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    public $primarykey ='id';

    protected $fillable = ['name', 'description', ' price'];

    public $timestamps = true;
}
