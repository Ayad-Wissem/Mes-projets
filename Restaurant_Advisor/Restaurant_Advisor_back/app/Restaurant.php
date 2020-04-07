<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    public $primarykey ='id';

    protected $fillable = ['name', 'description', 'grade ', 'localization', 'phone_number', 'website', 'hours'
    ];

    public $timestamps = false;
    
    public function menus(){
        return $this->hasMany('App\Menu','restaurants_id');
    }
}
