<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Citie extends Model
{
    public $primarykey ='id';

    protected $fillable = [
        'citie',
    ];

    public $timestamps = true;
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}